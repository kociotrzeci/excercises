import "date-fns"
var dateFNS = new Date();
export class Display {
    constructor(notebook) {
        this.left = document.getElementById('left-panel');
        this.right = document.getElementById('right-panel');
        this.body = document.querySelector('body');
        this.notebook = notebook;
        this.selectedProject = 0;

    }
    refreshLeft() {
        while (this.left.lastChild) {
            this.left.removeChild(this.left.lastChild);
        }
        this.notebook.projects.forEach(element => {
            const container = document.createElement('div')
            container.className = 'project-card';
            if (element.id === this.selectedProject) container.className = 'project-card project-active';
            else container.className = 'project-card';
            container.addEventListener('click', () => {
                this.selectedProject = element.id;
                this.refreshRight();
                this.refreshLeft();
            })
            const name = document.createElement('p');
            const btn = document.createElement('button');
            btn.addEventListener('click', () => {
                this.notebook.removeProject(element.id)
                console.log(element.id);
                this.refreshLeft();
            }
            )
            btn.textContent = 'X';
            name.textContent = element.name;
            container.appendChild(name);
            container.appendChild(btn);
            this.left.appendChild(container);
        });
        const btn = document.createElement('button');
        btn.textContent = 'Add Project';
        btn.classList.add('add-project');
        btn.addEventListener('click', (event) => {
            this.createForm(projectForm);
        })
        this.left.appendChild(btn);
        this.notebook.saveStorage();
    }
    refreshRight() {
        while (this.right.lastChild) {
            this.right.removeChild(this.right.lastChild);
        };
        this.displayNotes();
        const btn = document.createElement('button');
        btn.textContent = 'Add note';
        btn.classList.add('note-card');
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            this.createForm(noteForm);
        });
        this.right.appendChild(btn);
        this.notebook.saveStorage();
    }
    text() {
        this.notebook.test();
    }
    form() {
        this.createForm(noteForm);
    }
    createForm(input) {
        const formContainer = document.createElement('div');
        const backdrop = document.createElement('div');
        formContainer.classList.add('popup-form');
        backdrop.classList.add('backdrop');
        for (const key in input) {
            const element = input[key];
            const div = document.createElement('div');
            div.classList.add('form-group');
            const label = document.createElement('label');
            label.textContent = element.label;
            div.appendChild(label);

            if (key === 'optionsRadio') {
                const select = document.createElement('select');
                select.id = key;
                element.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.label;
                    if (option.value === element.value) {
                        console.log("tony halik")
                        optionElement.selected = true;
                    }
                    select.appendChild(optionElement);
                    select.appendChild(optionElement);
                });

                div.appendChild(select);
            }
            else {
                const inputElement = document.createElement('input');
                inputElement.type = element.type;
                inputElement.id = key;
                inputElement.value = element.value;
                div.appendChild(inputElement);
            }
            formContainer.appendChild(div);
        }
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            const formData = {};
            const formInputs = formContainer.querySelectorAll('.form-group input, .form-group select');
            formInputs.forEach(input => {
                formData[input.id] = input.value;

            })
            console.log(formData);
            this.submit(formData);
            backdrop.remove();
            formContainer.remove();
        });
        formContainer.appendChild(submitButton);
        document.body.appendChild(backdrop);
        document.body.appendChild(formContainer);
    }
    submit(formInput) {
        if (formInput.title) {
            this.notebook.addNote(formInput.title, formInput.description, formInput.dueDate, formInput.optionsRadio, this.selectedProject);
            this.refreshRight();
            this.refreshLeft();
        }
        if (formInput.name) {
            console.log(formInput.name);
            this.notebook.addProject(formInput.name);
            this.refreshLeft();
        }
        console.log('submit');
        this.hideForm();
    }
    hideForm() {
        const backdrop = document.querySelector('.backdrop');
        const formContainer = document.querySelector('.popup-form');
        backdrop.remove();
        formContainer.remove();
    }
    displayNotes() {
        console.log("get notes of project");
        console.log(this.notebook.projects[this.selectedProject].notes);
        this.notebook.getNotesOfProject(this.selectedProject).forEach(element => {
            const container = document.createElement('div');
            container.addEventListener('click', () => {
                this.editNote(element.id);
            });
            container.className = 'note-card priority-' + element.priorityLabel;
            const title = document.createElement('h4');
            const priority = document.createElement('p')
            const dueDate = document.createElement('p');
            dueDate.className = 'date';
            title.className = 'note-title';
            const btn = document.createElement('button');
            btn.addEventListener('click', (event) => {
                event.stopPropagation();
                this.notebook.removeNote(this.selectedProject, element.id)
                console.log(element.id);
                this.refreshRight();
            });
            btn.textContent = 'done';
            title.textContent = element.title;
            dueDate.textContent = element.dateDisplay;
            priority.textContent = element.priorityLabel;
            container.appendChild(title);
            container.appendChild(priority);
            container.appendChild(dueDate);
            container.appendChild(btn);
            this.right.appendChild(container);
        })
    }

    editNote(noteID) {
        console.log(`noteID: ${noteID}`);
        console.log(this.notebook.projects[this.selectedProject].notes);
        const _noteID = this.notebook.projects[this.selectedProject].notes.map((note) => note.id).indexOf(noteID);
        this.createForm(editNoteFormFactory(this.notebook.projects[this.selectedProject].notes[_noteID]));
        this.notebook.removeNote(this.selectedProject, noteID);
    };
}





const projectForm = {
    name: {
        type: 'text',
        label: 'Project name:'
    }
};

const noteForm = {
    title: {
        type: 'text',
        label: 'Note name:',
        value: ''
    },
    description: {
        type: 'textarea',
        label: 'Description:',
        value: ''
    },
    optionsRadio: {
        options: [
            { value: '2', label: 'High' },
            { value: '1', label: 'Medium' },
            { value: '0', label: 'Low' }
        ],
        label: 'Priority:',
        value: '1'

    },
    dueDate: {
        label: 'Due date:',
        value: new Date().toISOString().split('T')[0]

    }
};

function editNoteFormFactory(note) {
    const noteForm = {
        title: {
            type: 'text',
            label: 'Note name:',
            value: note.title
        },
        description: {
            type: 'textarea',
            label: 'Description:',
            value: note.description
        },
        optionsRadio: {
            options: [
                { value: '2', label: 'High' },
                { value: '1', label: 'Medium' },
                { value: '0', label: 'Low' }
            ],
            label: 'Priority:',
            value: note.priority
        },
        dueDate: {
            type: 'date',
            label: 'Due date:',
            value: new Date(note.dueDate).toISOString().split('T')[0]
        }
    };
    return noteForm;

}
