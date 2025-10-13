export const createIcon = (iconName) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon', `icon-${iconName}`);
  
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#icon-${iconName}`);
  
  svg.appendChild(use);
  return svg;
};

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
    addClickEventHandler(button2, form, submitCallBack);

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