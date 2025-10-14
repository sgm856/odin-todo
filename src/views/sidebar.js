import {createIcon} from "../utils.js";

const sidebarList = document.querySelector('.sidebar-project-list');

export const renderProjectSidebarView = (projects) => {
    sidebarList.innerHTML = '';
    projects.forEach(proj => {
        const tabContainer = document.createElement('div');
        const icon = createIcon("icon-circle-outline");

        const titleNode = document.createElement('h3');
        titleNode.textContent = proj.title;
        tabContainer.appendChild(icon);
        tabContainer.appendChild(titleNode);

        sidebarList.appendChild(tabContainer);
    });
};

export const renderTasksSideBarView = (tasks) => {

}

export const addProject = (project) => {

};

export const setActiveProject = (projectId) => {
};

export const removeProject = (projectId) => {
  // Remove a project tab
};