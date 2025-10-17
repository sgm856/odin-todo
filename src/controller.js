// All real logic contained in this module.
// This module uses the others to get its work done.
import {Project} from "./models/projects.js";
import {Task} from "./models/tasks.js";
import * as storage from "./storage.js";

import * as mainView from "./views/main.js";
import * as editModalView from "./views/modal.js";
import * as sidebarView from "./views/sidebar.js";
import {parse, add, format, isBefore, compareAsc, compareDsc, differenceInDays} from "date-fns";

let activeProject;

// Inject all Handlers and Load All User Info
export const initializeApp = function () {
    storage.initialize();
    attachSidebarHandlers();
    attachFormButtonHandlers();
    attachProjectListTabsHandler();
    attachTaskButtonHandler();
    displayActiveProject();
    sidebarView.renderProjectSidebarView(storage.getProjects());
}

/* -------------------------- Default Project Setup ------------------------- */

const createDefaultProject = function() {
    const defaultProject = new Project('Default', '', '', '');
    return defaultProject;
}

// Remember the User's Last Active Project and Render It

const displayActiveProject = function() {
    if (storage.getProjects().length === 0) {
        const defProject = createDefaultProject();
        activeProject = defProject;
        storage.addProject(defProject);
        storage.saveActiveProjectId(defProject.id);
    } else if (!activeProject) {
        activeProject = storage.getStoredActiveProject();
    }
    sidebarView.renderProjectSidebarView(storage.getProjects());
    mainView.renderProject(activeProject);
    mainView.populateTodoListView(getRelevantTasksByProjId(activeProject.id));
}

/* ----------------------- Sidebar EventHandler Setup ----------------------- */

// Add Event Listeners to Every Sidebar Button
const attachSidebarHandlers = function() {
    const projectCreationDialog = document.querySelector("#project-dialog");
    const taskDialog = document.querySelector("#task-dialog");
    const editDialog = document.querySelector("#edit-modal");
    const sidebarTopButtonsContainer = document.querySelector(".sidebar-top");
    sidebarTopButtonsContainer.addEventListener('click', (e) => {
        if (e.target.matches(".add-task")) {
            const projects = storage.getProjects();
            const projectSelector = taskDialog.querySelector("#project-select");
            projectSelector.innerHTML = "";
            projects.forEach((project) => {
                const option = editModalView.createLinkedOptionElement(project.title, project.id);
                projectSelector.appendChild(option);
            })
            const dateElement = taskDialog.querySelector("input#date");
            dateElement.valueAsDate = new Date();
            taskDialog.showModal();
        } else if (e.target.matches(".view-all")) {
            const tasks = storage.getTasks();
            mainView.clearMainContent();
            mainView.setHeader("All Tasks");
            mainView.populateTodoListView(tasks);
            console.log(tasks);
        }else if (e.target.matches(".calendar-today")) {
            mainView.clearMainContent();
            mainView.setHeader("Today's Tasks");
            let tasks = storage.getTasks();
            const today = new Date();
            const formattedTodayDate = format(today, "yyyy-MM-dd");
            tasks = tasks.filter((task) => {
                const parsedDate = format(parse(task.dueDate, "yyyy-MM-dd", formattedTodayDate), "yyyy-MM-dd");
                return parsedDate === formattedTodayDate;
            })
            mainView.populateTodoListView(tasks);
        } else if (e.target.matches(".calendar-week")) {
            mainView.clearMainContent();
            mainView.setHeader("Next 7 Days");
            let tasks = storage.getTasks();
            const today = new Date();
            const weekFromNow = add(today, {days:7});
            tasks = tasks.filter((task) => {
                const parsedDate = parse(task.dueDate, "yyyy-MM-dd", today);
                return isBefore(parsedDate, weekFromNow);
            })
            mainView.populateTodoListView(tasks);
        } else if (e.target.matches(".calendar-month")) {
            mainView.clearMainContent();
            mainView.setHeader("Next 30 Days");
            let tasks = storage.getTasks();
            const today = new Date();
            const monthFromNow = add(today, {days:30});
            tasks = tasks.filter((task) => {
                const parsedDate = parse(task.dueDate, "yyyy-MM-dd", today);
                return isBefore(parsedDate, monthFromNow);
            })
            mainView.populateTodoListView(tasks);
        }
    })

    const addProjectButton = document.querySelector(".add-project");
    addProjectButton.addEventListener('click', () => {
        projectCreationDialog.showModal();
    })
}

// Add Proper Close and Save Handlers to Every Form in the HTML
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

// Add Given Functions to the Cancel and Submit Buttons

const addFormButtonHandlers = function(form, closeCallBack, submitCallback) {
    const closeButton = form.querySelector(".cancel-btn");
    const submitButton = form.querySelector(".save-btn");
    closeButton.addEventListener("click", () => {
        closeCallBack();
    })
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        submitCallback();
        closeCallBack();
    })
}

// Setup Event Handler for Entire List of Projects, so User Can Choose
// Their Desired Active Project

const attachProjectListTabsHandler = function() {
    sidebarView.getProjectListElementContainer().addEventListener("click",
        (e) => {
            if (e.target.matches(".project-tab")) {
                const id = e.target.dataset.projectId;
                const project = storage.getProjects().find((proj) => proj.id === id);
                mainView.renderProject(project);
                storage.saveActiveProjectId(project.id);
                mainView.populateTodoListView(getRelevantTasksByProjId(project.id));
            }
        }
    )
}

/* ------------------- Add Task/Project Callback Functions ------------------ */

//Pretty self-explanatory, but creates and saves projects, renders if necessary
const handleProjectSubmission = function(data) {
    const projectRequest = new Project(data.title, data.description,
        data.notes, data.tags);
    storage.addProject(projectRequest);
    mainView.renderProject(projectRequest);
    sidebarView.renderProjectSidebarView(storage.getProjects());
    mainView.populateTodoListView(getRelevantTasksByProjId(projectRequest.id));
}

const handleTaskSubmission = function(data) {
    const taskRequest = new Task(data.title,
    data.description, data.dueDate, data.priority,
    data.checkList, data.notes, data.tags, data.projectId);
    storage.addTask(taskRequest);
    mainView.renderProject(getProjectById(data.projectId));
    mainView.populateTodoListView(getRelevantTasksByProjId(data.projectId));
    console.log(data.dueDate);
}

/* ---------------------- Handle Todo List Task Buttons --------------------- */

const attachTaskButtonHandler = function() {
    const todoList = document.querySelector(".todo-list");
    todoList.addEventListener('click', (e) => {
        if (e.target.matches(".todo-complete-button") || e.target.matches(".icon-circle-with-check")) {
            const entireTask = e.target.closest("li.task");
            const taskId = entireTask.dataset.id;
            const projectId = entireTask.dataset.projectId;
            storage.removeTask(taskId);
            entireTask.remove();
            mainView.populateTodoListView(getRelevantTasksByProjId(projectId));
        }
    });
}

/* ---------------------------------- Misc ---------------------------------- */

const getRelevantTasksByProjId = function(projectId) {
    const associatedTasks = storage.getTasks().filter(
        (task) => {
        return task.projectId === projectId;})

    return associatedTasks;
}

const getProjectById = function(id) {
    return storage.getProjects().find((proj) => proj.id === id);
}