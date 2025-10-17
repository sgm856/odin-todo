// Task class
export class Task {
    static EDITABLE_PROPERTIES = ['project', 'title', 'description', 'dueDate', 'priority', 'checklist', 'notes', 'tags'];
    constructor(title, description="", dueDate="", priority=0, checklist=[], notes="", tags=[], projectId = 0, id=null) {
        this._type = "task";
        this.complete = false;
        this.id = id ?? crypto.randomUUID();
        this.projectId = projectId;
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
                this.key = updates[key];
            }
        }
    }

    static taskFromJSON(parsedJSONObject) {
        const task = new Task(parsedJSONObject.title, parsedJSONObject.description,
            parsedJSONObject.dueDate, parsedJSONObject.priority, parsedJSONObject.checklist,
            parsedJSONObject.notes, parsedJSONObject.tags, parsedJSONObject.projectId, parsedJSONObject.id
        );

        return task;
    }

    static retrieveValidProperties() {
        return this.EDITABLE_PROPERTIES;
    }
}

