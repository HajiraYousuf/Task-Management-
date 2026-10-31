const pool = require("../config/db");

// Get all tasks for a user
// Get all tasks with filtering, search and pagination
const getAllTasks = async (userId, filters = {}) => {
  const { status, priority, search, page = 1, limit = 5 } = filters;

  let query = `
    SELECT * FROM tasks
    WHERE user_id = $1
  `;

  const values = [userId];
  let index = 2;

  if (status) {
    query += ` AND status = $${index}`;
    values.push(status);
    index++;
  }

  if (priority) {
    query += ` AND priority = $${index}`;
    values.push(priority);
    index++;
  }

  if (search) {
    query += ` AND title ILIKE $${index}`;
    values.push(`%${search}%`);
    index++;
  }

  const offset = (page - 1) * limit;

  query += ` ORDER BY created_at DESC
             LIMIT $${index} OFFSET $${index + 1}`;

  values.push(limit, offset);

  const result = await pool.query(query, values);

  return result.rows;
};
// Get task by ID
const getTaskById = async (id, userId) => {
  const result = await pool.query(
    `SELECT * FROM tasks
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );

  return result.rows[0];
};

// Create task
const createTask = async (
  title,
  description,
  status,
  priority,
  dueDate,
  userId
) => {
  const result = await pool.query(
    `INSERT INTO tasks
     (title, description, status, priority, due_date, user_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, description, status, priority, dueDate, userId]
  );

  return result.rows[0];
};

// Update task
const updateTask = async (
  id,
  title,
  description,
  status,
  priority,
  dueDate,
  userId
) => {
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1,
         description = $2,
         status = $3,
         priority = $4,
         due_date = $5
     WHERE id = $6 AND user_id = $7
     RETURNING *`,
    [title, description, status, priority, dueDate, id, userId]
  );

  return result.rows[0];
};

// Delete task
const deleteTask = async (id, userId) => {
  const result = await pool.query(
    `DELETE FROM tasks
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
    [id, userId]
  );

  return result.rows[0];
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};