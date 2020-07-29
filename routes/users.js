var express = require("express");
var router = express.Router();

// LOG IN
const logInController = require("../controllers/logInController");

// SIGN UP
const singUpController = require("../controllers/signUpController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Puedes ver tu perfil de usuario");
});
// Log In of an authenticated user
router.post("/logIn", logInController.userAuthetication);

// Signing up a New User
router.post("/signUp", singUpController.signUp);

module.exports = router;
