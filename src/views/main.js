// Creates HTML only to be displayed in the main content/active project area

import {createIcon} from "../utils.js";

const todoList = document.querySelector(".todo-list");
const projectContainer = document.querySelector(".project-container");

const renderTask = function (addedTask) {
    let task = document.createElement('li');
    task.setAttribute("data-id", addedTask.id);
    task.setAttribute("data-project-id", addedTask.projectId);
    task.classList.add('task');
    let titleNode = document.createElement('h3');
    titleNode.textContent = addedTask.title;

    const circleCheckButton = document.createElement("button");
    circleCheckButton.classList.add("icon-circle-with-check");
    circleCheckButton.classList.add("todo-task-button");
    circleCheckButton.classList.add("todo-complete-button");
    circleCheckButton.innerHTML = `<svg class="icon icon-circle-with-check" viewBox="0 0 32 32" width="100%" height="100%">
        <path d="M16 26.667c-5.891 0-10.667-4.776-10.667-10.667v0c0-5.891 4.776-10.667 10.667-10.667v0c5.891 0 10.667 4.776 10.667 10.667v0c0 5.891-4.776 10.667-10.667 10.667v0zM16 2.667c-7.364 0-13.333 5.97-13.333 13.333v0c0 7.364 5.97 13.333 13.333 13.333v0c7.364 0 13.333-5.97 13.333-13.333v0c0-7.364-5.97-13.333-13.333-13.333v0z"></path>
        <path class="inner-check" d="M23 11.333l-8 8-3.667-3.667 0.94-0.94 2.727 2.72 7.06-7.053 0.94 0.94z"></path>
      </svg>`;

    const leftSide = document.createElement('div');

    leftSide.appendChild(circleCheckButton);
    leftSide.appendChild(titleNode);
    leftSide.classList.add("task-info");

    const rightSide = document.createElement('div');
    const editButton = document.createElement("button");
    const trashButton = document.createElement("button");

    editButton.classList.add("todo-task-button");
    editButton.classList.add("todo-edit-button");
    trashButton.classList.add("todo-task-button");
    trashButton.classList.add("todo-trash-button");
    const editSvg = createIcon("pencil");
    const trashSvg = createIcon("trash-can-outline");

    editButton.appendChild(editSvg);
    trashButton.appendChild(trashSvg);

    rightSide.appendChild(editButton);
    rightSide.appendChild(trashButton);
    rightSide.classList.add("task-utils");
    
    task.appendChild(leftSide);
    task.appendChild(rightSide);
    todoList.appendChild(task);
}

export const populateTodoListView = function(tasks) {
    todoList.innerHTML = ''; 
    for (let task of tasks) {
        renderTask(task);
    }
}

export const renderProject = function (addedProject) {
    projectContainer.innerHTML = "";
    projectContainer.setAttribute("data-id", addedProject.id);

    const titleNode = document.createElement('h3');
    titleNode.textContent = addedProject.title;

    const icon = createIcon("icon-circle-outline");

    projectContainer.appendChild(icon);
    projectContainer.appendChild(titleNode);
}

export const clearMainContent = function() {
    todoList.innerHTML = "";
    projectContainer.innerHTML = "";
}

export const setHeader = function(text) {
    const titleNode = document.createElement('h3');
    titleNode.textContent = text;
    projectContainer.appendChild(titleNode);
}