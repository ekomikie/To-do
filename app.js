const addForm = document.querySelector('.add');
const search = document.querySelector('.search input');
const list = document.querySelector('.todos');

loadEventListener();

function loadEventListener() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTodos);

  // add todos event
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if (!todo.length) {
      alert('Add a task');
    } else {
      const li = document.createElement('li');
      li.className =
        'list-group-item d-flex justify-content-between align-items-center';

      li.innerHTML = ` <span class="text-light">${todo}</span>
                   <i class="fa text-light fa-trash-alt delete"></i>`;
      list.appendChild(li);
      storeTaskInLocalStorage(todo);
      addForm.reset();
    }
  });

  // delete todos event
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();

      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement);
    }
  });

  // filter todos event
  search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
  });
}

// Store Task
function storeTaskInLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

const filterTodos = (term) => {
  // add filtered class
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

  // remove filtered class
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
};

//Get Tasks from LS
function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    const li = document.createElement('li');
    // Add class
    li.className =
      'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = ` <span class="text-light">${todo}</span>
                   <i class="fa text-light fa-trash-alt delete"></i>`;

    //Append li to Ul
    list.appendChild(li);
  });
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo, index) {
    if (taskItem.firstElementChild.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}
