//Import Routes
const router = require("express").Router();

//Import Controller
const paymentController = require("../controllers/paymentController");

//Import Middleware
const authMiddleware = require("../middlewares/auth");
const uploadReceiptMiddleware = require("../middlewares/uploadReceipt");
const paymentMiddleware = require("../middlewares/paymentMiddleware");

//Routes
router.post(
  "/project/:projectId/payment/uploadreceipt",
  authMiddleware.validateToken,
  uploadReceiptMiddleware.single("receipt"),
  paymentController.upload
);
router.post(
  "/project/:projectId/payment",
  authMiddleware.validateToken,
  paymentMiddleware.validateBody,
  paymentController.payment
);

//test commit
module.exports = router;
