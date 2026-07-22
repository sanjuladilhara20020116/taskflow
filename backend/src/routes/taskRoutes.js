import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getTaskStats,
  updateTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createTaskRules,
  taskIdRules,
  updateTaskRules,
} from "../validators/taskValidators.js";

const router = express.Router();

// Every task route requires authentication.
router.use(protect);

// The stats route must appear before the ID route.
router.get("/stats", getTaskStats);

router
  .route("/")
  .get(getTasks)
  .post(
    createTaskRules,
    validateRequest,
    createTask
  );

router
  .route("/:id")
  .get(
    taskIdRules,
    validateRequest,
    getTaskById
  )
  .put(
    taskIdRules,
    updateTaskRules,
    validateRequest,
    updateTask
  )
  .delete(
    taskIdRules,
    validateRequest,
    deleteTask
  );

export default router;