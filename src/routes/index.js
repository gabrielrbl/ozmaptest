const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = `Servidor funcionando.`;
});

module.exports = router;