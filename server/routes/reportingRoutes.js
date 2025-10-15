// server/routes/reportingRoutes.js
const express = require("express");
const router = express.Router();
const reportingController = require("../controllers/reportingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/data", authMiddleware, reportingController.getReportingData);

// CSV report
router.post(
  "/download/csv",
  authMiddleware,
  reportingController.generateCSVReport
);

//  Excel report
router.post(
  "/download/xlsx",
  authMiddleware,
  reportingController.generateExcelReport
);

// PDF report
router.post(
  "/download/pdf",
  authMiddleware,
  reportingController.generatePDFReport
);

module.exports = router;
