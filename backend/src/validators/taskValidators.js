import { body, param } from "express-validator";

// Return today's date in YYYY-MM-DD format.
const getTodayDate = () => {
  const currentDate = new Date();

  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  );

  return currentDate.toISOString().split("T")[0];
};

// Shared validation rules for creating and updating tasks.
const commonTaskRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required.")
    .isLength({ max: 150 })
    .withMessage("Task title cannot exceed 150 characters."),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters."),

  body("priority")
    .notEmpty()
    .withMessage("Priority is required.")
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be Low, Medium or High."),

  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage(
      "Status must be Pending, In Progress or Completed."
    ),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required.")
    .isISO8601({ strict: true })
    .withMessage("Enter a valid due date."),
];

// Creating a task always requires today or a future date.
export const createTaskRules = [
  ...commonTaskRules,

  body("dueDate").custom((dueDate) => {
    if (dueDate < getTodayDate()) {
      throw new Error(
        "Due date cannot be earlier than today."
      );
    }

    return true;
  }),
];

// Updating allows an existing overdue date to remain unchanged.
// The controller checks whether a past date was newly selected.
export const updateTaskRules = [...commonTaskRules];

// Validate the task ID route parameter.
export const taskIdRules = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Task ID must be a positive number."),
];