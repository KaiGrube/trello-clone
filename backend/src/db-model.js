const env = require('dotenv').config(); if (env.error) throw env.error;
const Pool = require('pg').Pool;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

function execute(sqlStatement, params) {
  return new Promise(function(resolve, reject) {
    pool.query(sqlStatement, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

async function createProject(title) {
  const statement = 'INSERT INTO projects (title) VALUES($1);';
  const result = await execute(statement, [title]);
  return result;
}

async function getProjects() {
  const statement = 'SELECT * FROM projects ORDER BY id ASC;';
  const result = await execute(statement);
  return result.rows;
}

async function getProject(id) {
  const statement = 'SELECT * FROM projects WHERE id = $1;';
  const result = await execute(statement, [id]);
  return result.rows;
}

async function updateProject(id, title) {
  const statement = 'UPDATE projects SET title=$1 WHERE id=$2;';
  const result = await execute(statement, [title, id]);
  return result;
}

async function deleteProject(id) {
  const statement = 'DELETE FROM projects WHERE id=$1;';
  const result = await execute(statement, [id]);
  return result;
}

async function getTasks(projectId) {
  const statement = 'SELECT * FROM tasks WHERE project_id = $1;';
  const result = await execute(statement, [projectId]);
  return result.rows;
}

async function getTask(id) {
  const statement = 'SELECT * FROM tasks WHERE id = $1;';
  const result = await execute(statement, [id]);
  return result.rows;
}

async function createTask(projectId, description) {
  const statement = 'INSERT INTO tasks (project_id, description) VALUES ($1, $2::text);';  // todo: $2 ::text correct? check!
  const result = await execute(statement, [projectId, description]);
  return result;
}

async function updateTask(id, description) {
  const statement = 'UPDATE tasks SET description = $1::text WHERE id = $2;';
  const result = await execute(statement, [description, id]);
  return result;
}

async function deleteTask(id) {
  const statement = 'DELETE FROM tasks WHERE id = $1;';
  const result = await execute(statement, [id]);
  return result;
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}