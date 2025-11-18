const tasks = [
  { id: 1, title: 'Mettre à jour le README', completed: false },
  { id: 2, title: 'Corriger le bug du formulaire', completed: true },
  { id: 3, title: 'Revoir les PRs en attente', completed: false },
  { id: 4, title: 'Nettoyer le CSS', completed: true }
];

const tasksListEl = document.querySelector('#tasks-list');
const emptyStateEl = document.querySelector('#empty-state');

const filterAllBtn = document.querySelector('#filter-all-btn');
const filterActiveBtn = document.querySelector('#filter-active-btn');
const filterCompletedBtn = document.querySelector('#filter-completed-btn');

const FILTERS = {
  all: {
    id: 'all',
    label: 'Toutes les taches',
    predicate: (task) => true
  },
  active: {
    id: 'active',
    label: 'Taches en cours',
    predicate: (task) => !task.completed
  },
  completed: {
    id: 'completed',
    label: 'Taches terminées',
    predicate: (task) => task.completed
  }
};

let currentFilterName = 'all';

function updateTasksList(filterName = currentFilterName) {
  const filterDefinition = FILTERS[filterName];
  const filteredTasks = tasks.filter(filterDefinition.predicate);
  
  renderTasks(filteredTasks, filterDefinition);
}

function renderTasks(filteredTasks, filterDefinition) {
  tasksListEl.innerHTML = '';

  if (filteredTasks.length === 0) {
    let message = 'Aucune tache a afficher.';

    if (filterDefinition.id === 'active') {
      message = 'Aucune tache en cours.';
    } else if (filterDefinition.id === 'completed') {
      message = 'Aucune tache terminée.';
    }

    emptyStateEl.textContent = message;
    emptyStateEl.style.display = 'block';
    return;
  }

  emptyStateEl.style.display = 'none';

  const tasksHtml = filteredTasks.map(task => {
    const liClass = task.completed ? 'task-item task-completed' : 'task-item';
    
    return `<li class="${liClass}"><span>${task.title}</span></li>`;
  }).join('');

  tasksListEl.innerHTML = tasksHtml;
}

function handleFilterClick(nextFilterName) {
  currentFilterName = nextFilterName;
  updateTasksList(nextFilterName);
}

filterAllBtn.addEventListener('click', () => handleFilterClick('all'));
filterActiveBtn.addEventListener('click', () => handleFilterClick('active'));
filterCompletedBtn.addEventListener('click', () => handleFilterClick('completed'));

updateTasksList('all');