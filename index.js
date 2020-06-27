const inquirer = require('inquirer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { exit } = require('process');

const todos = JSON.parse(fs.readFileSync(`todos.json`));

function addTodo() {
  inquirer.prompt([
    {
      name: "text",
      message: "What is your todo?",
    }
  ])
  .then(answers =>{
    const todo = {
      id: uuidv4(),
      text: answers.text,
      complete: false,
    }
    todos.push(todo);
    let data = JSON.stringify(todos);
    fs.writeFileSync('todos.json', data);
    startPrompts();
  })
  .catch(err => console.log(err));
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

function listTodos() {
  console.table(todos);
  startPrompts();
}

function exitToDo() {
  console.log("👋 BYE BYE! TODO AGAIN SOMETIME! PLEASE!")
  process.exit(0);
}

function startPrompts() {
  inquirer
    .prompt([
      {
        name: 'command',
        message: "What would you like to do?",
        type: "list",
        choices: ["list", "add", "update", "complete", "delete", "exit"]
      }
    ])
    .then(answers => {
      switch (answers.command) {
        case "list":
          listTodos();
          break;
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
        case "exit": 
          exitToDo();
          break;
        default:
          throw new Error('You need to enter a real command.')
      }
    })
    .catch(error => {
      if (error.isTtyError) {
        console.log("Is TTY Error!")
      } else {
        console.log("AWWWW SNAP SON! Something is messed!", error.message)
      }
    });
    //startPrompts();
}

startPrompts();