import {Task} from "./models/tasks.js";
import {Project} from "./models/projects.js";

let projects = [];
let tasks = [];
let storageAvailable = false;
let activeProject;

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
        activeProject = getActiveProject();
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
    activeProject = activeProjectId;
    if (storageAvailable) {
        localStorage.setItem("active", activeProjectId);
    }
}

export const getProjects = function() {
    let projectInformation = JSON.parse(localStorage.getItem("projects"));
    if (projectInformation) {
        projectInformation = projectInformation.map((project) => {
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
        taskInformation = taskInformation.map((task) => {
            return Task.taskFromJSON(task);
        });
        tasks = taskInformation;
    }
    return tasks;
}

export const getActiveProject = function() {
    let activeProjectId = JSON.parse(localStorage.getItem("active"));
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

export const getActiveProjectTasks = function() {
    let tasks = getTasks();
    let activeTasks = tasks.filter((task) => {
        if (task.project === activeProject) {
            return true;
        }
        return false;
    })
    return activeTasks;
}

