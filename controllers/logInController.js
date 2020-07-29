const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  userAuthetication: async function (req, res, next) {
    try {
      console.log(req.body);
      let email = await usermodel.findOne({
        email: req.body.email,
      });
      if (email) {
        if (bcrypt.compareSync(req.body.password, email.password)) {
          const token = jwt.sign(
            { email: email._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({ token: token });
        } else {
          res.json({ mensaje: "Contraseña incorrecta" });
        }
      } else {
        res.json({ mensaje: "Usuario incorrecto" });
      }
    } catch (e) {
      next(e);
    }
  },
};
