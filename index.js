var button = document.getElementById('add-item');
var input = document.getElementById('item');
var list = document.getElementById('todo');
var deleteall = document.getElementById('delete-all');

deleteall.addEventListener('click', ()=>{
    const ul = document.querySelector('ul');
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
}
});

function addItem() {
    if (input.value.trim() !== "") {
        var li = document.createElement('li');
        var bye = document.createElement('button');
        bye.textContent = "×";
        bye.classList.add('delete');

        bye.addEventListener('click', () => {
            list.removeChild(li);
            saveItems();
        });

        li.textContent = input.value;
        li.appendChild(bye);
        list.appendChild(li);
        input.value = "";

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveItems();
        });
        
        saveItems();
    }
}

function saveItems() {
    const items = [];
    list.querySelectorAll('li').forEach(li => {
        items.push(li.firstChild.textContent);
    });
    localStorage.setItem('todoList', JSON.stringify(items));
}

function loadItems() {
    const items = JSON.parse(localStorage.getItem('todoList'));
    if (items) {
        items.forEach(item => {
            input.value = item;
            addItem();
        });
    }
}

button.addEventListener('click', () => {
    addItem();
    saveItems();
});

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addItem();
        saveItems();
    }
});

loadItems();
