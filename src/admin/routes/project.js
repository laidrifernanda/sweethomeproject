//Import dependencies
const router = require("express").Router();

//Controller
const projectController = require("../controller/project");

//Middleware
const uploadReceiptMiddleware = require("../middleware/uploadReceipt");
const authMiddleware = require("../middleware/auth");

//Routes
router.get("/project", authMiddleware.validateToken, projectController.browse);
router.get(
  "/project/:id",
  authMiddleware.validateToken,
  projectController.read
);
router.post("/project", authMiddleware.validateToken, projectController.add);

router.post(
  "/project/:projectId/upload",
  authMiddleware.validateToken,
  uploadReceiptMiddleware.single("receipt"),
  projectController.upload
);
router.put(
  "/project/:id/status",
  authMiddleware.validateToken,
  projectController.status
);
// router.put(
//   "/project/:id",
//   projectMiddleware.edit,
//   projectController.edit
// );
// router.delete("/project/:id", projectController.delete);

//Module exports
module.exports = router;
