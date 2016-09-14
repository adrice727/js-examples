const app = () => {

  const getLastIndex = () => {
    const items = document.getElementsByClassName('list-item');
    const lastItem = items[items.length - 1];
    return lastItem.id;
  }

  const getItemsFromServer = () =>
    new Promise((resolve) => {
      const items = [{
        id: 1,
        task: 'Order socks'
      }, {
        id: 2,
        task: 'Buy dish soap'
      }, {
        id: 3,
        task: 'Build a canoe'
      }];
      setTimeout(() => resolve(items), 1000);
    })

  const markDone = item => {
    item.classList.toggle('done');
  }

  const createListItem = item => {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.id = `item-${item.id}`
    li.innerHTML = item.task;
    li.onclick = e => markDone(e.target);
    return li;
  }

  const createNewTodo = () => {
    const newTask = document.getElementById('newTodo');
    if (!newTask.value) {
      alert('New todo cannot be empty');
      return;
    }
    const list = document.getElementById('itemsList');
    list.appendChild(createListItem({id: getLastIndex + 1, task: newTask.value}));
    newTask.value = '';
  }

  getItemsFromServer()
    .then(items => {
      const list = document.getElementById('itemsList');
      items.forEach(item => list.appendChild(createListItem(item)));
    });

   document.getElementById('createNewTodo').addEventListener('click', createNewTodo);
}


document.addEventListener('DOMContentLoaded', app);