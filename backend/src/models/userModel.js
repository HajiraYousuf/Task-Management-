const pool = require("../config/db");

// Get all users
const getAllUsers = async () => {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users ORDER BY id DESC"
  );

  return result.rows;
};

// Get user by ID
const getUserById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// Create new user
const createUser = async (name, email, password) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, password]
  );

  return result.rows[0];
};

// Update user
const updateUser = async (id, name, email) => {
  const result = await pool.query(
    `UPDATE users
     SET name = $1, email = $2
     WHERE id = $3
     RETURNING id, name, email, created_at`,
    [name, email, id]
  );

  return result.rows[0];
};

// Delete user
const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [id]
  );

  return result.rows[0];
};

// Get user by email
const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};