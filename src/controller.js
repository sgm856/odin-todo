import * as dom from "./dom.js";
import * as projects from "./projects.js";
import * as tasks from "./tasks.js";
import * as storage from "./storage.js";

export const initializeApp = function () {
    storage.initialize();
    attachUtilityButtonHandlers();
    addDialogFormButtons();
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