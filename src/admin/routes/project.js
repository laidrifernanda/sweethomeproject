//Import dependencies
const router = require("express").Router();

//Controller
const projectController = require("../controller/project");

//Middleware
const uploadReceiptMiddleware = require("../middleware/uploadReceipt");

//Routes
router.get("/project", projectController.browse);
router.get("/project/:id", projectController.read);
router.post(
  "/project",
  // projectMiddleware.add,
  projectController.add
); 

router.post(
  "/project/:projectId/upload",
  uploadReceiptMiddleware.single("receipt"),
  projectController.upload
);
// router.put(
//   "/project/:id",
//   projectMiddleware.edit,
//   projectController.edit
// );
// router.delete("/project/:id", projectController.delete);

//Module exports
module.exports = router;
