const express = require('express');
const { Todo } = require('../mongo');
const redis = require('../redis');

const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });

  const addedTodos = Number(await redis.get('added_todos')) || 0;
  await redis.set('added_todos', addedTodos + 1);

  res.send(todo);
});

const singleRouter = express.Router();

/* Find todo by ID. */
const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  req.todo = await Todo.findById(id);

  if (!req.todo) {
    return res.sendStatus(404);
  }

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne();
  res.sendStatus(200);
});

/* GET single todo. */
singleRouter.get('/', (req, res) => {
  res.send(req.todo);
});

/* UPDATE single todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text;
  req.todo.done = req.body.done;

  const updatedTodo = await req.todo.save();

  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
