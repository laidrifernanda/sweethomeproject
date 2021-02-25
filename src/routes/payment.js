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
  "/payment",
  authMiddleware.validateToken,
  paymentMiddleware.validateBody, 
  paymentController.create
);

router.post(
  "/:paymentId/uploadreceipt",
  authMiddleware.validateToken,
  uploadReceiptMiddleware.single('receipt'),
  paymentController.upload
);

module.exports = router;
