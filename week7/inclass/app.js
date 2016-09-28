const app = () => {

  const getTodosFromServer = () => {
    return new Promise((resolve) => {

      const todos = [
         {id: '123bja', task: 'Build a canoe'},
         {id: '3adbja', task: 'Grocery shopping'},
         {id: '344mja', task: 'Eat dinner'},
      ];

      setTimeout(() => resolve(todos), 1000);

    });
  };

  const toggleDone = e => {
    const id = e.target.id;
    const listItem = document.getElementById(id);
    listItem.classList.toggle('done');
  };

  const addTodo = todo => {
    const list = document.getElementById('todoList');
    const listItem = document.createElement('li');
    listItem.id = todo.id ? `todo-${todo.id}` : `todo-${todo.task}`
    listItem.innerHTML = todo.task;
    listItem.addEventListener('click', toggleDone);
    list.appendChild(listItem);
  };

  const addNewTodo = () => {
    const taskInput = document.getElementById('newTodo');
    const task = taskInput.value;
    if (!task) { return; }
    taskInput.value = '';
    addTodo({ task });
  };

  const init = () => {
    getTodosFromServer()
    .then(todos => {
      todos.forEach(todo => addTodo(todo));
    });
  };

  document.getElementById('addTodo').addEventListener('click', addNewTodo);

  init();

}

document.addEventListener('DOMContentLoaded', app);