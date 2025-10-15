import {createIcon} from "../utils.js";

const sidebarList = document.querySelector(".sidebar-project-list");

export const renderProjectSidebarView = (projects) => {
    sidebarList.innerHTML = '';
    projects.forEach(proj => {
        const tabContainer = document.createElement('li');
        tabContainer.dataset.projectId = proj.id;
        tabContainer.classList.add("project-tab");
        const icon = createIcon("icon-circle-outline");

        const titleNode = document.createElement('h3');
        titleNode.textContent = proj.title;
        tabContainer.appendChild(icon);
        tabContainer.appendChild(titleNode);

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