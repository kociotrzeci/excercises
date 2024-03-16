import "date-fns"

export class Notebook {
    constructor() {
        console.log(localStorage.getItem('notes'));
        this.notes = [];
        this.projects = [];
        if (localStorage.getItem('projects') != null) {
            let _projects = JSON.parse(localStorage.getItem('projects') || '[]');
            _projects.forEach(element => {
                console.log(element);
                this.addProject(element.name);
                element.notes.forEach(note => {
                    this.addNote(note.title, note.description, note.dueDate, note.priority, element.id);
                });
            });
        }
        else {
            this.addDummyContent();

        };
        console.log("projects from JSON:");
        console.log(this.getProjects());
        console.log("notes get from JSON");
        console.log(this.getNotesOfProject(0));
    }
    addNote(title, description, dueDate, priority, projectID) {
        this.projects[projectID].addNote(title, description, dueDate, priority);
        const newNote = new Note(title, description, dueDate, priority, projectID);
        console.log(`new note id: ${newNote.id}`);

    }
    addProject(projectName) {
        this.projects.push(new Project(projectName));
    }
    getNotes() {
        return (this.notes);
    }
    getProjects() {
        return (this.projects);
    }
    getNotesOfProject(projectID) {
        if (this.projects[projectID] === undefined) { return }
        const _notes = this.projects[projectID].notes;
        const _notesPriority = _notes.sort((a, b) => b.priority - a.priority);

        return _notesPriority.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    markNoteAsDone(id) {
        this.notes[id].isComplete = true;
    }
    removeProject(projectID) {
        const ID = this.projects.map((project) => project.id).indexOf(projectID);
        this.projects.splice(ID, 1);
    }
    removeNote(projectID, noteID) {
        console.log(`remove note - projectID: ${projectID}, noteID: ${noteID}`);
        const _noteID = this.projects[projectID].notes.map((note) => note.id).indexOf(noteID);
        this.projects[projectID].notes.splice(_noteID, 1);
    }
    saveStorage() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
        console.log("Saved!");
    }
    addDummyContent() {
        this.addProject('Project 1');
        this.addProject('Project 2');
        this.addNote('title1', 'desc', '2024-10-20', '1', 0);
        this.addNote('title2', 'desc', '2024-10-20', '1', 0);
        this.addNote('title3', 'desc', '2024-10-20', '1', 0);
        this.addNote('title4', 'desc', '2024-10-20', '1', 0);

        /*        this.addNote('title0', 'desc', '2024-10-20', '0', 0);
                this.addNote('title1', 'desc', '2024-10-21', '2', 0);
                this.addNote('title2', 'desc', '2024-10-22', '2', 0);
                this.addNote('title3', 'desc', '2024-10-22', '1', 0);
                this.addNote('title4', 'desc', '2024-10-23', '0', 0);
                this.addNote('title5', 'desc', '2024-10-21', '0', 0);
                this.addNote('title6', 'desc', '2024-10-20', '1', 0);
                this.addNote('title2', 'desc', '2024-10-23', '1', 0);
                this.addNote('title3', 'desc', '2024-10-22', '2', 1);
                this.addNote('title4', 'desc', '2024-10-20', '1', 1);
                this.addNote('title5', 'desc', '2024-10-21', '0', 1);
                this.addNote('title6', 'desc', '2024-10-20', '0', 1);
                */
        console.log('Added dummy notes:');
        console.log(this.projects[0].notes);
        console.log(this.notes);
    }

}

class Note {
    static id = 0;
    static priorities = ['Low', 'Medium', 'High'];
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.dateDisplay = this.dueDate.toLocaleDateString("pl-PL");
        this.priorityLabel = Note.priorities[priority];
        this.priority = priority;
        this.project = project;
        this.id = Note.id;
        Note.id++;
        this.isComplete = false;
    }
}

class Project {
    static id = 0;

    constructor(projectName) {
        this.name = projectName;
        this.notes = [];

        this.id = Project.id;
        Project.id++;
    }
    addNote(title, description, dueDate, priority) {
        this.notes.push(new Note(title, description, dueDate, priority, this.id));
    }
}

