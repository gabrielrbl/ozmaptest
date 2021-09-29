require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

const app = new Koa();
const { PORT } = process.env;

app
  .use(bodyParser())
  .use(indexRoutes.routes())
  .use(userRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta: ${PORT}`);
});

module.exports = server;