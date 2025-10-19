//This is intended to only read and save task/project data
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
    if (checkStorageAvailable("localStorage")) {
        tasks = getTasks() ?? [];
        projects = getProjects() ?? [];
    }
}

/* - Store New Tasks and Projects Temporarily anprojectId = 0, id=null, fromd then Add to Local Storage - */

export const addTask = function(task) {
    tasks.push(task);
    storeTasks();
}

export const addProject = function(project) {
    projects.push(project);
    storeProjects();
}

export const updateTask = function(task) {
    const index = tasks.findIndex((t) => t.id === task.id);
    tasks[index] = task;
    storeTasks();
}

export const updateProject = function(project) {
    const index = projects.findIndex((p) => p.id === project.id);
    projects[index] = project;
    storeProjects();
}

const storeTasks = function() {
    if (storageAvailable) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

const storeProjects = function() {
    if (storageAvailable) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }
}

export const saveActiveProjectId = function(activeProjectId) {
    if (storageAvailable) {
        localStorage.setItem("active", activeProjectId);
    }
}

export const getProjects = function() {
    let projectInformation = JSON.parse(localStorage.getItem("projects"));
    if (projectInformation) {
        projectInformation = projectInformation.filter(proj => proj !== null).map((project) => {
            return Project.projectFromJSON(project);
        });
        projects = projectInformation;
    }
    return projects;
}

export const getTasks = function() {
    /* This will become an array */
    let taskInformation = JSON.parse(localStorage.getItem("tasks"));
    /* Turn them into task objects */
    if (taskInformation) {
        taskInformation = taskInformation.filter(task => task !== null).map((task) => {
            return Task.taskFromJSON(task);
        });
        tasks = taskInformation;
    }
    return tasks;
}

export const getStoredActiveProject = function() {
    console.log(localStorage.getItem("active"));
    let activeProjectId = localStorage.getItem("active");
    if (activeProjectId) {
        const active = projects.find((proj) => {
            if (proj.id === activeProjectId) {
                return true;
            } else {
                return false;
            }
        });
        return active;
    } else if (projects.length > 0) {
        return projects[0];
    }
    return null;
}

export const removeProject = function(projectId) {
    const projIndex = projects.findIndex(proj => proj.id === projectId);
    if (projIndex >= 0) {
        projects.splice(projIndex, 1);
    }
    storeProjects();
}

export const removeTask = function(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex >= 0) {
        tasks.splice(taskIndex, 1);
    }
    storeTasks();
    console.log(tasks);
}

