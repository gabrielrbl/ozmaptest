const userSchema = require("./userSchema")

module.exports = function(app) {
  app.schemas = {
    userSchema,
  }
}