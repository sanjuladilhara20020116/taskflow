import pool from "../config/database.js";

// Select task fields using frontend-friendly property names.
const taskSelectFields = `
  id,
  title,
  description,
  priority,
  status,
  DATE_FORMAT(due_date, '%Y-%m-%d') AS dueDate,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

// Return today's local date as YYYY-MM-DD.
const getTodayDate = () => {
  const currentDate = new Date();

  currentDate.setMinutes(
    currentDate.getMinutes() -
      currentDate.getTimezoneOffset()
  );

  return currentDate.toISOString().split("T")[0];
};

// Find one task that belongs to the current user.
const findOwnedTask = async (taskId, userId) => {
  const [tasks] = await pool.execute(
    `
      SELECT ${taskSelectFields}
      FROM tasks
      WHERE id = ? AND user_id = ?
      LIMIT 1
    `,
    [taskId, userId]
  );

  return tasks[0] || null;
};

// Return tasks with search, filters, sorting and pagination.
export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : "";

    const status = req.query.status || "";
    const priority = req.query.priority || "";
    const sort = req.query.sort || "newest";

    const requestedPage = Number.parseInt(
      req.query.page,
      10
    );

    const requestedLimit = Number.parseInt(
      req.query.limit,
      10
    );

    const page =
      Number.isInteger(requestedPage) &&
      requestedPage > 0
        ? requestedPage
        : 1;

    const limit =
      Number.isInteger(requestedLimit) &&
      requestedLimit > 0
        ? Math.min(requestedLimit, 50)
        : 8;

    const offset = (page - 1) * limit;

    const conditions = ["user_id = ?"];
    const queryValues = [userId];

    if (search) {
      conditions.push("title LIKE ?");
      queryValues.push(`%${search}%`);
    }

    if (
      ["Pending", "In Progress", "Completed"].includes(
        status
      )
    ) {
      conditions.push("status = ?");
      queryValues.push(status);
    }

    if (
      ["Low", "Medium", "High"].includes(priority)
    ) {
      conditions.push("priority = ?");
      queryValues.push(priority);
    }

    const sortOptions = {
      newest: "created_at DESC",
      oldest: "created_at ASC",
      dueDate: "due_date ASC, created_at DESC",
    };

    const orderBy =
      sortOptions[sort] || sortOptions.newest;

    const whereClause = conditions.join(" AND ");

    const [countRows] = await pool.execute(
      `
        SELECT COUNT(*) AS total
        FROM tasks
        WHERE ${whereClause}
      `,
      queryValues
    );

    const totalItems = Number(countRows[0].total);
    const totalPages = Math.max(
      Math.ceil(totalItems / limit),
      1
    );

    const [tasks] = await pool.execute(
      `
        SELECT ${taskSelectFields}
        FROM tasks
        WHERE ${whereClause}
        ORDER BY ${orderBy}
        LIMIT ${limit}
        OFFSET ${offset}
      `,
      queryValues
    );

    return res.status(200).json({
      success: true,
      tasks,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Return dashboard statistics.
export const getTaskStats = async (
  req,
  res,
  next
) => {
  try {
    const [rows] = await pool.execute(
      `
        SELECT
          COUNT(*) AS total,
          SUM(status = 'Pending') AS pending,
          SUM(status = 'In Progress') AS inProgress,
          SUM(status = 'Completed') AS completed,
          SUM(
            due_date < CURDATE()
            AND status <> 'Completed'
          ) AS overdue
        FROM tasks
        WHERE user_id = ?
      `,
      [req.user.id]
    );

    const stats = rows[0];

    return res.status(200).json({
      success: true,
      stats: {
        total: Number(stats.total || 0),
        pending: Number(stats.pending || 0),
        inProgress: Number(stats.inProgress || 0),
        completed: Number(stats.completed || 0),
        overdue: Number(stats.overdue || 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Return one task by ID.
export const getTaskById = async (
  req,
  res,
  next
) => {
  try {
    const task = await findOwnedTask(
      req.params.id,
      req.user.id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task was not found.",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new task.
export const createTask = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      dueDate,
    } = req.body;

    const [result] = await pool.execute(
      `
        INSERT INTO tasks
          (
            user_id,
            title,
            description,
            priority,
            status,
            due_date
          )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        req.user.id,
        title.trim(),
        description?.trim() || null,
        priority,
        status,
        dueDate,
      ]
    );

    const createdTask = await findOwnedTask(
      result.insertId,
      req.user.id
    );

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task: createdTask,
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing task.
export const updateTask = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      dueDate,
    } = req.body;

    const existingTask = await findOwnedTask(
      req.params.id,
      req.user.id
    );

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task was not found.",
      });
    }

    // Reject a newly selected past date.
    // An existing overdue task may keep its current date.
    if (
      dueDate !== existingTask.dueDate &&
      dueDate < getTodayDate()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Due date cannot be earlier than today.",
      });
    }

    await pool.execute(
      `
        UPDATE tasks
        SET
          title = ?,
          description = ?,
          priority = ?,
          status = ?,
          due_date = ?
        WHERE id = ? AND user_id = ?
      `,
      [
        title.trim(),
        description?.trim() || null,
        priority,
        status,
        dueDate,
        req.params.id,
        req.user.id,
      ]
    );

    const updatedTask = await findOwnedTask(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a task.
export const deleteTask = async (
  req,
  res,
  next
) => {
  try {
    const existingTask = await findOwnedTask(
      req.params.id,
      req.user.id
    );

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task was not found.",
      });
    }

    await pool.execute(
      `
        DELETE FROM tasks
        WHERE id = ? AND user_id = ?
      `,
      [req.params.id, req.user.id]
    );

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};