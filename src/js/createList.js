
const cart__btn = document.querySelector('.cart__btn');
const orderedList = document.querySelector('.orderedList');

function addList(){
    const randomDataAttr = Math.floor(Math.random() * (1000 - 1) + 1);
    const subTextAttr = Math.floor(Math.random() * (500 - 1) + 1);
    const li = document.createElement('li');
    const radioBtn = document.createElement('div');
    const text = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const orderedList = document.querySelector('.orderedList');
    const inputValue = document.getElementById('text');
    // const form = document.createElement('form');
    
    li.classList.add('orderedList__li');
    li.dataset.listItems = randomDataAttr;
    // form.setAttribute('method', 'get');
    // radioBtn.type='radio';
    radioBtn.classList.add('orderedList__radioBtn');
    // radioBtn.name="radio";
    radioBtn.dataset.subItems = subTextAttr;
    text.classList.add('orderedList__text');
    text.innerText = inputValue.value;
    text.dataset.subItems = subTextAttr;
    deleteBtn.classList.add('orderedList__deleteBtn');
    deleteBtn.type="submit";
    deleteBtn.innerText = 'Delete';
    deleteBtn.dataset.listItems = randomDataAttr;

    if(inputValue.value != ''){
        li.append(radioBtn);
        li.append(text);
        li.append(deleteBtn);
        orderedList.append(li);
        // Очищаем input
        inputValue.value = '';
    } else{
        alert('Поле ввода не должо быть пустым!')
    }
}


orderedList.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.dataset.listItems){
        let deleteLists = document.querySelector(`[data-list-items="${event.target.dataset.listItems}"]`);
        orderedList.removeChild(deleteLists);
    }
    if(event.target.dataset.subItems){
        if(event.target.className === 'orderedList__radioBtn'){
            let text = event.target.nextSibling;
            text.style.textDecoration = "line-through";
            event.target.style.backgroundColor = '#c5c5c5';
            event.target.style.boxShadow = 'inset 0px 0px 1px 5px #fff';
        }
        
    }
})


cart__btn.addEventListener('click', (e) => {
    e.preventDefault();
    addList();
})