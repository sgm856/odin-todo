import {createIcon} from "../utils.js";

const sidebarList = document.querySelector(".sidebar-project-list");

export const renderProjectSidebarView = (projects) => {
    sidebarList.innerHTML = '';
    projects.forEach(proj => {
        const tabContainer = document.createElement('li');
        tabContainer.dataset.projectId = proj.id;
        tabContainer.classList.add("project-tab");
        const icon = createIcon("format-list-checkbox");

        const titleNode = document.createElement('h3');
        titleNode.textContent = proj.title;

        const leftSide = document.createElement("div");
        leftSide.appendChild(icon);
        leftSide.appendChild(titleNode);
        leftSide.classList.add("project-tab-left");

        const rightSide = document.createElement("div");
        const button = document.createElement("button");
        button.classList.add("todo-button");
        button.classList.add("project-tab-edit-button");

        const editIcon = createIcon("pencil");
        button.appendChild(editIcon);
        rightSide.appendChild(button);
        rightSide.classList.add("project-tab-right");

        tabContainer.appendChild(leftSide);
        tabContainer.appendChild(rightSide);
        
        sidebarList.appendChild(tabContainer);
    });
};

export const getProjectListElementContainer = function() {
  return sidebarList;
}

export const setActiveProject = (projectId) => {
  const active = document.querySelector(`data-${projectId}`);
  active.classList.add("active-project");
};

export const setInactiveProject = (projectId) => {
  const inactive = document.querySelector(`data-${projectId}`);
  inactive.classList.remove("active-project");
}

export const removeProject = (projectId) => {
  const removed = document.querySelector(`data-${projectId}`);
  sidebarList.removeChild(removed);
};