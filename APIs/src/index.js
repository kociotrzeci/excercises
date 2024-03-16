<<<<<<< HEAD
import "./styles.scss";
=======
import "./styles.scss";
import { Notebook } from './logic.js';
import { Display } from './interface'


const notebook = new Notebook();
const display = new Display(notebook);
display.refreshLeft();
display.refreshRight();
notebook.saveStorage();
>>>>>>> 1a1c2cc4b4d9132947ec4a5bb6dff43bc8b34e22
