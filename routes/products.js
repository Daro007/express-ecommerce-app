var express = require("express");
var router = express.Router();

const productsController = require("../controllers/productsController");

// Libre acceso para todos los usuarios

/* GET ALL products */
router.get("/", productsController.getAll);
/* Get by ID */
router.get("/:id", productsController.getById);

// Acceso restringido para usuarios validados

/* Create product */
router.post(
  "/",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  productsController.createProduct
);
/* Update product */
router.put(
  "/:id",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  productsController.updateProdruct
);
/* Delete product */
router.delete(
  "/:id",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  productsController.deleteProdruct
);

module.exports = router;
