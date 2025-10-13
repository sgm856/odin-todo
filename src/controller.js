import * as projects from "./models/projects.js";
import * as tasks from "./models/tasks.js";
import * as storage from "./storage.js";

import * as mainView from "./views/main.js";
import * as modalView from "./views/modal.js";
import * as sidebarView from "./views/sidebar.js";

export const initializeApp = function () {
    storage.initialize();
    attachUtilityButtonHandlers();
    addDialogFormButtons();
    checkDefaultProject();
}

/* -------------------------- Default Project Setup ------------------------- */

const createDefaultProject = function() {
    const defaultProject = new Project('Default', '', '', '');
    dom.buildAndShowProjectSideTabComponent(defaultProject);
    dom.buildAndShowProjectTodoComponent(defaultProject);
}

const checkDefaultProject = function() {
    if (storage.getProjects().length === '0') {
        createDefaultProject();
    }
}

const attachUtilityButtonHandlers = function() {
    dom.addButtonHandler('.add-task', () => {
        dom.showModal('task-dialog');
    })
    dom.addButtonHandler('.calendar-today', () => console.log('hi'));
    dom.addButtonHandler('.calendar-week', () => console.log('hi'));
    dom.addButtonHandler('.calendar-month', () => console.log('hi'));
}

const addDialogFormButtons = function() {
    const formNodes = dom.getAllForms();
    for (const node of formNodes) {
        dom.addFormButtonGroup(node, );
    }
}

const createTaskFromForm = function(formInfo) {
    
}