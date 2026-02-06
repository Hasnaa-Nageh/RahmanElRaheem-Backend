const express = require("express");
const assetsController = require("../controller/assets.controller");
const verifyJWT = require("../middlewares/verifyJWT");
const validate = require("../middlewares/validate");
const router = express.Router();

router.use(verifyJWT);

router.post("/create", assetsController.createAssets);
router.get("/all", assetsController.getAllAssets);
router.get("/search", assetsController.searchAssets);
router.get("/:assetsId", assetsController.getSingleAssets);
router.put("/:assetsId", assetsController.updateAssets);
router.delete("/:assetsId", assetsController.deleteAssets);

module.exports = router;
