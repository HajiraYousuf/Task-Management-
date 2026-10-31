const taskModel = require("../models/taskModel");

// Get all tasks
// Get all tasks with filtering, search and pagination
const getTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 5,
    } = req.query;

    // Validate pagination values
    const currentPage = Number(page);
    const pageLimit = Number(limit);

    if (
      !Number.isInteger(currentPage) ||
      !Number.isInteger(pageLimit) ||
      currentPage < 1 ||
      pageLimit < 1 ||
      pageLimit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or limit value",
      });
    }

    const filters = {
      status,
      priority,
      search,
      page: currentPage,
      limit: pageLimit,
    };

    const tasks = await taskModel.getAllTasks(
      req.user.id,
      filters
    );

    res.status(200).json({
      success: true,
      page: currentPage,
      limit: pageLimit,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

// Get task by ID
const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await taskModel.getTaskById(id, req.user.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Get task error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch task",
    });
  }
};

// Create task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      due_date,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const validStatuses = ["pending", "in-progress", "completed"];
    const validPriorities = ["low", "medium", "high"];

    const taskStatus = status || "pending";
    const taskPriority = priority || "medium";

    if (!validStatuses.includes(taskStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    if (!validPriorities.includes(taskPriority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task priority",
      });
    }

    const task = await taskModel.createTask(
      title.trim(),
      description || null,
      taskStatus,
      taskPriority,
      due_date || null,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Create task error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      status,
      priority,
      due_date,
    } = req.body;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const validStatuses = ["pending", "in-progress", "completed"];
    const validPriorities = ["low", "medium", "high"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task priority",
      });
    }

    const task = await taskModel.updateTask(
      id,
      title.trim(),
      description || null,
      status,
      priority,
      due_date || null,
      req.user.id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.error("Update task error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await taskModel.deleteTask(id, req.user.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};