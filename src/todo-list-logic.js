let todos = {};
let projects = {};
const TASK_PROPERTIES = ['title', 'description', 'dueDate', 'priority', 'complete', 'notes'];
const PROJECT_PROPERTIES = ['title', 'description', 'notes'];


export const createTask = (title, description, dueDate, priority, checklist, notes, tags) => {
    const id = crypto.randomUUID();
    let complete = false;
    let task = {id, title, description, dueDate, priority, complete, checklist, notes, tags};
    todos[id] = task;
}

export const updateTask = (id, updates) => {
    if (!todos[id]) {
        return;
    }

    for (const key in updates) {
        if (TASK_PROPERTIES.includes(key)) {
            todos[id][key] = updates[key];
        }
    }
}

export const createProject = (title, description, notes, tags, tasks) => {
    const id = crypto.randomUUID();
    let project = {id, title, description, notes, tags};
    projects[id] = project;
}

export const updateProject = (id, updates) => {
    if (!projects[id]) {
        return;
    }

    for (const key in updates) {
        if (PROJECT_PROPERTIES.includes(key)) {
            projects[id][key] = updates[key];
        }
    }
}

export const getTask = (id) => {
    if (tasks[id]) {
        return tasks[id];
    }
}

export const getProject = (id) => {
    if (projects[id]) {
        return projects[id];
    }
}

export const removeTask = (id) => {
    delete todos[id];
}

export const removeProject = (id) => {
    delete projects[id];
}

