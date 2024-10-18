// #!/usr/bin/env node
const { program } = require('commander');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000';

program 
      .command('create-user <username>')
      .description('Create a new user')
      .action(async (username) => {
          try {
              const response = await axios.post(`${API_URL}/users`, { username });
              console.log('User created successfully !', response.data);
          } catch(error) {
              console.log('Error while creating new user !', error.response.data);
          }
      });

program
      .command('add-task <userId> <description>')
      .description('Add a new task')
      .action(async (userId, description) => {
          try {
              const response = await axios.post(`${API_URL}/users/${userId}/tasks`, { description });
              console.log('Task added successfully !', response.data);
          } catch(error) {
              console.log('Error while adding a task', error.response.data);
              if(error.response) {
                console.log('Error response data:', error);
              } else {
                console.log('Error message:', error.message);
              }
          } 
      }); 


program 
      .command('list-tasks <userId>')
      .description('List all tasks')
      .action(async (userId) => {
         try {
             const response = await axios.get(`${API_URL}/users/${userId}/tasks`);
             console.log('List tasks :', response.data);
         }catch(error) {
            if(error.response) {
                console.log('Error while displaying tasks', error.response.data);
            } else {
                console.log('Error while displaying tasks:' , error.message);
            }
         }
      });

program 
      .command('update-task <userId> <taskID> <description> <completed>')
      .description('Update task')
      .action(async (userId, taskId, description, completed = false ) => {
          try {
              const response = await axios.put(`${API_URL}/users/${userId}/tasks/${taskId}`, { description, 
                completed: completed == 'true' });
              console.log('Task updated successfully !', response.data);
          } catch(error) {
              console.log('Error while updating task', error.response.data);
          }
      });

program 
     .command('delete-task <userId> <taskId>')
     .description('Delete task')
     .action(async (userId, taskId) => {
         try {
             const response = await axios.delete(`${API_URL}/users/${userId}/tasks/${taskId}`);
             console.log('Task deleted successfully !', response.data);
         } catch(error) {
             console.log('Error while deleting task', error.response.data);
         }
     });      

program.parse(process.argv);






