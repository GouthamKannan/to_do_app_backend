/**
 * Controller for handling task related functions
 */

const { client: mongoClient } = require("../model/mongodb");


// Connect to MongoDB database
const dbConnection = mongoClient.db("todo_application");

// Initialize the collections for the database
const taskCollection = dbConnection.collection("task_details");

/**
 * Add the task to the database
 * @param {number} id : ID of the task
 * @param {string} user_name : User who created the task
 * @param {string} value : Task description
 * @param {string} completed : Task status - whether it is completed
 * @returns The ID of the inserted document
 */
const add_task = async (id, user_name, value, completed) => {
  const response = await taskCollection.insertOne({
    id, user_name, value, completed
  });
  return response;
}

/**
 * Retrive tasks of the particular user
 * @param {string} user_name : User name
 * @returns : Array of tasks for the given user
 */
const get_tasks = async (user_name) => {
  const response = await taskCollection.find({user_name : user_name}).toArray();
  return response;
}

/**
 * Check whether a task exists in the database
 * @param {string} user_name : User name
 * @param {number} id : Task ID
 * @returns : true if task exists else false
 */
const task_exists = async ( user_name, id) => {
  const response = await taskCollection.find({id:id, user_name:user_name}).toArray();
  if(response.length==1){
    return true;
  }
  return false;
}

/**
 * Update the status of the task
 * @param {number} id : Task ID
 * @param {string} user_name : User name
 * @param {boolean} completed : status of the task (whether it is completed)
 */
const update_task = async ( id, user_name, completed) => {
  await taskCollection.updateOne(
    {id:id, user_name:user_name},
    {$set : {
      completed : completed
    }});
}

/**
 * Delete a task with given task ID
 * @param {string} user_name : User name
 * @param {number} id : Task ID to delete
 */
const delete_task = async ( user_name, id) => {
  await taskCollection.deleteOne({id:id, user_name:user_name});
}

// Exports functions
module.exports = {
  add_task,
  get_tasks,
  task_exists,
  update_task,
  delete_task
}