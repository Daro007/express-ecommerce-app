const userModel = require("../models/usermodel");

module.exports = {
  signUp: async function (req, res, next) {
    try {
      let user = await userModel.create({
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
};
