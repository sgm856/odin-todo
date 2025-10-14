import {Project} from "./models/projects.js";
import {Task} from "./models/tasks.js";
import * as storage from "./storage.js";

import * as mainView from "./views/main.js";
import * as editModalView from "./views/editModal.js";
import * as sidebarView from "./views/sidebar.js";

let activeProject;

export const initializeApp = function () {
    storage.initialize();
    attachSidebarHandlers();
    attachFormButtonHandlers();
    displayActiveProject();
    console.log(activeProject);
}

/* -------------------------- Default Project Setup ------------------------- */

const createDefaultProject = function() {
    const defaultProject = new Project('Default', '', '', '');
    return defaultProject;
}

const displayActiveProject = function() {
    if (storage.getProjects().length === 0) {
        const defProject = createDefaultProject();
        activeProject = defProject;
        storage.saveActiveProjectId(defProject.id);
    } else if (!activeProject) {
        activeProject = storage.getActiveProject();
    }
    sidebarView.renderProjectSidebarView(storage.getProjects());
    mainView.populateProjectWithTasksView(storage.getActiveProjectTasks());
}

/* ----------------------- Sidebar EventHandler Setup ----------------------- */

const attachSidebarHandlers = function() {
    const projectCreationDialog = document.querySelector("#project-dialog");
    const taskDialog = document.querySelector("#task-dialog");
    const editDialog = document.querySelector("#edit-modal");
    const sidebarTopButtonsContainer = document.querySelector(".sidebar-top");
    sidebarTopButtonsContainer.addEventListener('click', (e) => {
        if (e.target.matches(".add-task")) {
            taskDialog.showModal();
        } else if (e.target.matches(".calendar-today")) {
            taskDialog.showModal();
        } else if (e.target.matches(".calendar-week")) {
            taskDialog.showModal();
        } else if (e.target.matches(".calendar-month")) {
            taskDialog.showModal();
        }
    })

    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.addEventListener('click', () => {
        projectCreationDialog.showModal();
    })
}

const attachFormButtonHandlers = function() {
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        if (form.parentElement.matches("#project-dialog")) {
            addFormButtonHandlers(form,
                () => form.parentElement.close(),
                () => handleProjectSubmission(Object.fromEntries(new FormData(form))));
        } else if (form.parentElement.matches("#task-dialog")) {
            addFormButtonHandlers(form,
                () => form.parentElement.close(),
                () => handleTaskSubmission(Object.fromEntries(new FormData(form))));
        } else if (form.parentElement.matches("#edit-modal")) {
                        addFormButtonHandlers(form,
                () => form.parentElement.close(),
                () => handleProjectSubmission(Object.fromEntries(new FormData(form))));
        }
    })
}

const addFormButtonHandlers = function(form, closeCallBack, submitCallback) {
    const closeButton = form.querySelector(".cancel-btn");
    const submitButton = form.querySelector(".save-btn");
    closeButton.addEventListener("click", () => {
        closeCallBack();
    })
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        submitCallback();
    })
}

/* ------------------- Add Task/Project Callback Functions ------------------ */

const handleProjectSubmission = function(data) {
    const projectRequest = new Project(data.title, data.description,
        data.notes, data.tags);
    storage.addProject(projectRequest);
    mainView.renderProject(projectRequest);
    sidebarView.renderProjectSidebarView(storage.getProjects());
}

const handleTaskSubmission = function(data) {
    const taskRequest = new Task(data.projectId, data.title,
    data.description, data.dueData, data.priority,
    data.checkList, data.notes, data.tags);
    storage.addTask(taskRequest);
}

/* ------------------------- Active Project Methods ------------------------- */

const setActiveProject = function(project) {
    activeProject = project;
    storage.saveActiveProjectId(project);
}

const getActiveProject = function() {
    if (activeProject == null || activeProject == undefined) {
        return storage.getActiveProject();
    } 
    return activeProject;
}