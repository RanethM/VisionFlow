const express = require("express");
const router = express.Router();

// ✅ IMPORT THE CONTROLLER (THIS WAS MISSING)
const scanController = require("../controllers/scanController");

// ✅ CREATE a scan
router.post("/", scanController.createScan);

// ✅ GET all scans
router.get("/", scanController.getAllScans);

// ✅ GET scans by userId
router.get("/user/:userId", scanController.getScanByUser);

module.exports = router;
