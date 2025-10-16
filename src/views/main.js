// Creates HTML only to be displayed in the main content/active project area

import {createIcon} from "../utils.js";

const todoList = document.querySelector(".todo-list");
const projectContainer = document.querySelector(".project-container");

const renderTask = function (addedTask) {
    let task = document.createElement('li');
    task.setAttribute("data-id", addedTask.projectId);
    task.classList.add('task');
    let titleNode = document.createElement('h3');
    titleNode.textContent = addedTask.title;
    const icon = createIcon("icon-circle-outline");
    task.appendChild(icon);
    task.appendChild(titleNode);
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