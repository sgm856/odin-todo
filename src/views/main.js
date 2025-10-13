import {createIcon} from "../utils.js";

const todoList = document.querySelector(".todo-list");
const projectContainer = document.querySelector(".main-project-container");

const renderTask = function (addedTask) {
    let task = document.createElement('li');
    task.setAttribute("data-id", addedTask.id);
    task.classList.add('task');
    let titleNode = document.createElement('h3');
    const icon = createIcon("icon-circle-outline");
    task.appendChild(icon);
    task.appendChild(titleNode);
    todoList.appendChild(task);
}

export const populateProjectWithTasksView = function(tasks) {
    todoList.innerHTML = ''; 
    for (let task in tasks) {
        renderTask(task);
    }
}

export const renderProject = function (addedProject) {
    projectContainer.setAttribute("data-id", addedProject.id);

    const titleNode = document.createElement('h3');
    titleNode.textContent = addedProject.title;

    const icon = createIcon("icon-circle-outline");

    projectContainer.appendChild(icon);
    projectContainer.appendChild(titleNode);

    project.appendChild(projectContainer);
}