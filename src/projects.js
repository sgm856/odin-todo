export class Project {
    static EDITABLE_PROPERTIES = ['title', 'description', 'notes', 'tags'];
    constructor(title, description, notes, tags) {
        this._type = 'project';
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.notes = notes;
        this.tags = tags;
    }

    updateProject(id, updates) {
        for (const key in updates) {
            if (PROJECT_PROPERTIES.includes(key)) {
                projects[id][key] = updates[key];
            }
        }
    }

    get id() {
        return this.id;
    }

    static projectFromJSON(parsedJSONObject) {
        const project = new Project(parsedJSONObject.id, parsedJSONObject.title, parsedJSONObject.description,
            parsedJSONObject.notes, parsedJSONObject.tags
        );

        return project;
    }

    static retrieveValidProperties() {
        return this.EDITABLE_PROPERTIES;
    }
}
