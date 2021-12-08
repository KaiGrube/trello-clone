const express = require('express');
const cors = require('cors');
const trello_model = require('./db-model');

const app = express();
app.use(cors());

const routes = [
  // { path: '*', method: 'get', queryParams: [], modelHandler: (req, res) => { res.redirect('https://' + req.headers('host') + req.url) }},
  { path: '/projects', method: 'get', queryParams: [], modelHandler: trello_model.getProjects },
  { path: '/projects', method: 'post', queryParams: ['title'], modelHandler: trello_model.createProject },
  { path: '/project', method: 'get', queryParams: ['id'], modelHandler: trello_model.getProject },
  { path: '/project', method: 'put', queryParams: ['id', 'title'], modelHandler: trello_model.updateProject },
  { path: '/project', method: 'delete', queryParams: ['id'], modelHandler: trello_model.deleteProject },
  { path: '/tasks', method: 'get', queryParams: ['projectId'], modelHandler: trello_model.getTasks },
  { path: '/tasks', method: 'post', queryParams: ['projectId', 'description'], modelHandler: trello_model.createTask },
  { path: '/task', method: 'get', queryParams: ['id'], modelHandler: trello_model.getTask },
  { path: '/task', method: 'put', queryParams: ['id', 'description'], modelHandler: trello_model.updateTask },
  { path: '/task', method: 'delete', queryParams: ['id'], modelHandler: trello_model.deleteTask },
];

async function handler (req, res, queryParams, modelHandler) {
  try {
    const argList = [];
    queryParams.forEach(arg => {
      const str = req.query[arg];
      if (str === null || str === undefined) {
        throw new Error(`Query string '${arg}' null or undefined.`);
      } else {
        argList.push(str);
      }
    })
    const response = await modelHandler(...argList);
    res.status(200).send(response);
  }
  catch (error) {
    res.status(400).send(`400 Bad Request:  ${error.message}`);
  }
}

routes.forEach(route =>
  app[route.method](route.path, (req, res) => handler (req, res, route.queryParams, route.modelHandler))
);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server listening on ${process.env.APP_HOST}:${process.env.APP_PORT}`));