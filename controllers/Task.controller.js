const TaskRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const TaskModel = require("../model/Task.model");

function recordsToSkip(page, limit) {
  return page === 1 ? Number(0) : (page - 1) * limit;
}

TaskRouter.get("/", async (req, res, next) => {
  //   TaskModel.find()
  //     .then((response) => {
  //       if (response) {
  //         res.status(200).json({
  //           success: true,
  //           message: "Tasks fetched successfully",
  //           data: response,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         success: false,
  //         error: err,
  //         message: "Internal server Error",
  //       });
  //     });
  try {
    const response = await TaskModel.find()
      .limit(Number(req.query.limit) || 5)
      .skip(recordsToSkip(Number(req.query.page), Number(req.query.limit)))
      .select({ __v: 0 });
    if (response.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        data: response,
        length: response.length,
        page: req.query.page || 1,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No Task Found",
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal server Error",
    });
  }
});

TaskRouter.get("/:id", async (req, res, next) => {
  try {
    const response = await TaskModel.find({ _id: req.params.id }).select({
      __v: 0,
    });
    if (response.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Task fetched successfully",
        data: response,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No Task Found",
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal server Error",
    });
  }
});

TaskRouter.post("/create", async (req, res, next) => {
  const NewTask = new TaskModel(req.body);
  try {
    const response = await NewTask.save();
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "Tasks created successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal server Error",
    });
  }
});

TaskRouter.put("/update/:id", async (req, res, next) => {
  try {
    const response = await TaskModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      req.body,
      { new: true }
    );
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "Tasks updated successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal server Error",
    });
  }
});

TaskRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    const response = await TaskModel.findOneAndDelete(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (response && response._id) {
      return res.status(200).json({
        success: true,
        message: "Tasks deleted successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Internal server Error",
    });
  }
});

module.exports = TaskRouter;
