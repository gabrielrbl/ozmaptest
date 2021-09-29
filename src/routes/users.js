const Router = require('koa-router');
const queries = require('../db/queries/users');

const router = new Router();

router.get('/users', async (ctx) => {
  try {
    const rows = await queries.getAllUsers();

    ctx.body = { rows, total: rows.length };
  } catch (err) {
    console.log(err);
  }
});

router.post('/user', async (ctx) => {
  try {
    if (ctx.request.body.idade < 18){
      ctx.status = 403;
      ctx.body = {
        message: 'User is younger than 18.'
      }
    } else {
      const user = await queries.addUser(ctx.request.body);

      if (user.length) {
        ctx.status = 201;
        ctx.body = { user };
      } else {
        ctx.status = 400;
        ctx.body = {
          message: 'Something went wrong.'
        };
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/user/:nome', async (ctx) => {
  try {
    const user = await queries.getSingleUser(ctx.params.nome);

    if (user) {
      ctx.status = 200;
      ctx.body = { user };
    } else {
      ctx.status = 404;
      ctx.body = {
        user: {},
        message: 'User not found'
      };
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete('/user/:nome', async (ctx) => {
  try {
    const { nome } = ctx.params;

    const userSelect = await queries.getSingleUser(nome);
    const userDelete = await queries.deleteUser(nome);

    if (userDelete) {
      ctx.status = 200;
      ctx.body = userSelect;
    } else {
      ctx.status = 404;
      ctx.body = {
        message: 'That user does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

module.exports = router;