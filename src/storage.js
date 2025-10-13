import {Task} from "./models/tasks.js";
import {Project} from "./models/projects.js";

let projects = [];
let tasks = [];
let storageAvailable = false;

/* ----------------- Just ensure local storage is available ----------------- */

const checkStorageAvailable = function(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    storageAvailable = true;
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

/* ---------- Fetch Saved Data When Running App for the First Time ---------- */

export const initialize = function() {
    if (checkStorageAvailable()) {
        tasks = getTasks() ?? [];
        projects = getProjects ?? [];
    }
}

/* - Store New Tasks and Projects Temporarily and then Add to Local Storage - */

export const addTask = function(task) {
    tasks.push(task);
    storeTasks();
    storeProjects();
}

export const addProject = function(project) {
    projects.push(project);
    storeProjects();
}

export const storeTasks = function() {
    if (storageAvailable) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

export const storeProjects = function() {
    if (storageAvailable) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }
}

export const getProjects = function() {
    const projectInformation = JSON.parse(localStorage.getItem("projects"));
    if (projectInformation) {
        projects = map(projectInformation, (project) => {
            Project.projectFromJSON(project);
        });
    }
    return projects;
}

export const getTasks = function() {
    /* This will become an array */
    const taskInformation = JSON.parse(localStorage.getItem("tasks"));
    /* Turn them into task objects */
    if (taskInformation) {
        tasks = map(taskInformation, (task) => {
            Task.taskFromJSON(task);
        });
    }
    return tasks;
}

