/**
 * API Endpoints to handle task relation functions
 */
const TaskController=require('../controller/task')
const router = require('express').Router();

/**
 * API Endpoint to add new task to the database
 */
router.post("/add_task", async (req, res) => {
    const { id, user_name, value, completed } = req.body;
    try{
        await TaskController.add_task(id, user_name, value, completed)
        return res.status(200).json({
          success: true,
          data: "task added successfully",
        });
    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in adding task :: ${error.message}`,
      });
    }
  });

/**
 * API Endpoint to get tasks from the database
 */
router.post("/get_tasks", async (req, res) => {
    try {
      // Get the task details
      var data = await TaskController.get_tasks(req.body.user_name);
      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in retriving the data :: ${error.message}`,
      });
    }
  });

/**
 * API Endpoint to update status of the task
 */
router.put("/check_task", async (req, res) => {
    const { id, user_name, completed } = req.body;
    try {
      // Check if the task exist in database
      var exist = await TaskController.task_exists( user_name, id);
      if(exist) {

        // Update the task status
        await TaskController.update_task( id, user_name, completed);
        return res.status(200).json({
          success: true,
          data: "Task updated successfully",
        })
      }
      else {
        return res.status(200).json({
          success: false,
          data: "Task not found",
        });
      }
    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in updating the task :: ${error.message}`,
      });
    }
  });

  /**
   * API Endpoint to delete a task from database
   */
router.delete("/delete_task", async (req, res) => {
  const { id, user_name } = req.body;
  try {
    // Check whether task exist
    var exist = await TaskController.task_exists(user_name, id);
    if(exist) {
      // Delete the task from database
      await TaskController.delete_task(user_name, id);
      return res.status(200).json({
        success: true,
        data: "Task delete successfully",
      })
    }
    else {
      return res.status(200).json({
        success: false,
        data: "Task not found",
      });
    }
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      data: `Error in deleting the task :: ${error.message}`,
    });
  }
});

module.exports = router;