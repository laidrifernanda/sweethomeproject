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
  "/:projectId/uploadreceipt",
  authMiddleware.validateToken,
  uploadReceiptMiddleware.single('receipt'),
  paymentController.upload
);

router.get(
  "/:paymentId/payment",
  authMiddleware.validateToken,
  paymentController.find
)
//test commit
module.exports = router;
