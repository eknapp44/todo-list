const inquirer = require('inquirer');

const todos = [
  { 
    id: 0,
    text: "Clean up Tiger's puke",
    complete: false,
    dueDate: '6/27/2020',
    dueTime: '12:00 AM',
  },
  { 
    id: 2,
    text: "Zoom with Howard",
    complete: false,
    dueDate: '6/27/2020',
    dueTime: '12:00 AM',
  },
  { 
    id: 3,
    text: "Cut the Grass",
    complete: false,
    dueDate: '6/28/2020',
    dueTime: '1:00 PM',
  },
];

function addTodo() {
  console.log("Adding to do item.");
}

function updateTodo() {
  console.log("Updating to do item.");
}

function toggleTodo() {
  console.log('Toggling complete...');
}

function deleteTodo() {
  console.log('Deleting todo...');
}

inquirer
  .prompt([
      {
          name: 'command',
          message: "What would you like to do?",
          type: "list",
          choices: ["add", "update", "complete", "delete"]
      }
  ])
  .then(answers => {
    switch(answers.command) {
        case "add":
          addTodo();
          break;
        case "update":
          updateTodo();
          break;
        case "complete":
          toggleComplete();
          break;
        case "delete":
          deleteTodo();
          break;
        default: 
          throw new Error ('You need to enter a real command.')
      }
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
