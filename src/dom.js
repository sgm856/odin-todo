export const addTask = function (addedTask) {
    const projectTaskList = document.querySelector(`${projectId} .todo-list`);
    let task = document.createElement('li');
    task.setAttribute("data-id", addedTask.id);
    task.classList.add('task');
    let titleNode = document.createElement('h3');
    let svgNode = document.createElement('svg');
    let useNode = document.createElement('use');
    task.appendChild(svgNode);
    task.appendChild(titleNode);
    task.append(useNode);
    projectTaskList.document.appendChild(task);
}

export const addProject = function (addedProject) {
    const projectsList = document.querySelector('.sidebar-project-list');
    let project = document.createElement('li');
    project.setAttribute("data-id", addedProject.id);
    project.classList.add('project');
    let titleNode = document.createElement('h3');
    let svgNode = document.createElement('svg');
    let useNode = document.createElement('use');
    project.appendChild(svgNode);
    project.appendChild(titleNode);
    project.append(useNode);
    projectsList.document.appendChild(project);
}

export const showProjects = function (projects) {
    const projectsList = document.querySelector('sidebar-project-list');
    projectsList.innerHTML = '';
    for (let project in projects) {
        addProject(project);
    }
}

export const showTasks = function(tasks) {
    const tasksList = document.querySelector('todo-list');
    tasksList.innerHTML = ''; 
    for (let task in tasks) {
        addTask(task);
    }
}

export const showModal = function (modalID) {
    const modalDialog = document.querySelector(`#${modalID}`);
    modalDialog.showModal();
}

export const showEditModal = function(item, editableFields) {
    const modal = document.querySelector('#edit-modal');
    const fieldsContainer = document.querySelector('#modal-fields');
  
    fieldsContainer.innerHTML = '';
  
    editableFields.forEach(field => {
        fieldsContainer.appendChild(createFieldElement(field, item[field]));
    });
  
    modal.showModal();
    return modal;
}

const createFieldElement = function(fieldName, value) {
  const container = document.createElement('div');
  container.className = 'field-group';
  
  const label = document.createElement('label');
  label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  label.htmlFor = fieldName;
  
  const input = document.createElement('input');
  input.id = fieldName;
  input.name = fieldName;
  input.value = value || '';
  
  container.append(label, input);
  return container;
}

export const addButtonHandler = function(identifier, callback) {
    const addTaskButton = document.querySelector(`${identifier}`);
    addTaskButton.addEventListener('click', callback);
}

export const getAllForms = function() {
    const forms = document.querySelectorAll("dialog form");
    return forms;
}

export const addHandler = function(element, callback) {
    element.addEventListener('click', callback);
}

const addSubmitButtonHandler = function(button, form, submitCallback) {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        //submitCallback(Object.fromEntries(formData));
    });
}

const addCancelButtonHandler = function(button, dialog) {
    button.addEventListener('click', () => {
        dialog.close();
    });
}

export const addFormButtonGroup = function(form, submitCallBack) {
    const div = document.createElement('div');
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    button1.type = "button";
    button2.type = "submit";
    button1.classList.add("cancel-butn");
    button2.classList.add("save-btn");
    button1.textContent = "Cancel";
    button2.textContent = "Save";

    const parentDialog = form.parentElement;
    addCancelButtonHandler(button1, parentDialog);
    addSubmitButtonHandler(button2, form, submitCallBack);

    div.appendChild(button1);
    div.appendChild(button2);
    div.classList.add("form-buttons");
    form.appendChild(div);
}

export const getListItems = function(targetList) {
    return document.querySelectorAll(`${targetList} li`);
}

export const addTagCollectionContainers = function(form) {
    const container = document.createElement('div');
    const button = document.createElement('button');
    const tagList = document.createElement('ul');
    
    container.classList.add("tag-container");
    button.classList.add("tag-btn");
    tagList.classList.add("tag-list");

    container.appendChild(button);
    container.appendChild(tagList);
    form.appendChild(container);
}



