export class Task {
    static EDITABLE_PROPERTIES = ['project', 'title', 'description', 'dueDate', 'priority', 'checklist', 'notes', 'tags'];
    constructor(id, projectId = 0, title, description="", dueDate, priority, checklist, notes, tags) {
        this._type = "task";
        this.complete = false;
        this.id = id ?? crypto.randomUUID();
        this.project = projectId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklist = checklist;
        this.notes = notes;
        this.tags = tags;
    }

    updateTask(updates) {
        for (const key in updates) {
            if (EDITABLE_PROPERTIES.includes(key)) {
                todos[id][key] = updates[key];
            }
        }
    }

    static taskFromJSON(parsedJSONObject) {
        const task = new Task(parsedJSONObject.id, parsedJSONObject.title, parsedJSONObject.description,
            parsedJSONObject.dueDate, parsedJSONObject.priority, parsedJSONObject.checklist,
            parsedJSONObject.notes, parsedJSONObject.tags
        );

        return task;
    }

    static retrieveValidProperties() {
        return this.EDITABLE_PROPERTIES;
    }
}

export const taskFromJSON = function(json) {
    return new Task(json.id, json.title, json.description, json.dueDate, json.priority, json.checklist, json.notes, json.tags);
}

