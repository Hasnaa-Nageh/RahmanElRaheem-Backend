const Assets = require("../models/assets");

const createAssets = async (req, res, next) => {
  try {
    const { name, category, quantity, status, location, notes } = req.body;

    const assets = await Assets.create({
      name,
      category,
      quantity,
      status,
      location,
      notes,
    });

    res.status(201).json({
      status: "success",
      message: "Assets created successfully",
      data: assets,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllAssets = async (req, res, next) => {
  try {
    const assets = await Assets.find();
    if (assets.length === 0) {
      return res.status(200).json({ message: "No Assets Found" });
    }
    res.status(200).json({
      status: "success",
      results: assets.length,
      data: assets,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getSingleAssets = async (req, res, next) => {
  try {
    const { assetsId } = req.params;
    const assets = await Assets.findById(assetsId);
    if (!assets) {
      return res.status(404).json({
        message: "Assets Not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: assets,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateAssets = async (req, res, next) => {
  try {
    const { assetsId } = req.params;
    const { name, category, quantity, status, location, notes } = req.body;

    const assets = await Assets.findByIdAndUpdate(
      assetsId,
      {
        ...(name && { name }),
        ...(category && { category }),
        ...(quantity !== undefined && { quantity }),
        ...(status && { status }),
        ...(location && { location }),
        ...(notes && { notes }),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!assets) {
      return res.status(404).json({
        status: "fail",
        message: "Assets not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Assets updated successfully",
      data: assets,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteAssets = async (req, res, next) => {
  try {
    const { assetsId } = req.params;
    const assets = await Assets.findByIdAndDelete(assetsId);

    if (!assets) {
      return res.status(404).json({
        message: "Assets Not Found",
      });
    }
    res.json({ message: "Assets deleted successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const searchAssets = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }

    const assets = await Assets.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    });

    res.status(200).json({
      success: true,
      results: assets.length,
      data: assets,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createAssets,
  getAllAssets,
  getSingleAssets,
  updateAssets,
  deleteAssets,
  searchAssets,
};
