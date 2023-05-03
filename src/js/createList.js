const cart__btn = document.querySelector('.cart__btn');
const orderedList = document.querySelector('.orderedList');
let valueToLocal;
let dataBase = [];
let doneWishes = [];

function setToLocalStorage(value){
    const getFromDataBase = localStorage.getItem('dataBase');
    if(getFromDataBase){
        const dataBaseJson = JSON.parse(getFromDataBase);
        if (dataBaseJson.length > 0) {
            dataBase = dataBaseJson;
        }
    }
    if (dataBase.length <= 10) {
        dataBase.push(value);
    }
    else {
        dataBase.shift();
        dataBase.push(value);
    }
    const str = JSON.stringify(dataBase);
    localStorage.setItem("dataBase", str); 
}

function addList(){
    const randomDataAttr = Math.floor(Math.random() * (1000 - 1) + 1);
    const subTextAttr = Math.floor(Math.random() * (500 - 1) + 1);
    const li = document.createElement('li');
    const radioBtn = document.createElement('div');
    const text = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const inputValue = document.getElementById('text');
    
    li.classList.add('orderedList__li');
    li.dataset.listItems = randomDataAttr;
    radioBtn.classList.add('orderedList__radioBtn');
    radioBtn.dataset.subItems = subTextAttr;
    text.classList.add('orderedList__text');
    text.innerText = inputValue.value;
    valueToLocal = inputValue.value;
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
        inputValue.placeholder = 'What needs to be done?';
        inputValue.style.setProperty("--c", "gray");
        
    } else{
        inputValue.placeholder = 'Input value should not to be empty!'
        inputValue.style.setProperty("--c", "red");
    }
}

function getListByLocalStorage(data){
    const randomDataAttr = Math.floor(Math.random() * (1000 - 1) + 1);
    const subTextAttr = Math.floor(Math.random() * (500 - 1) + 1);
    const li = document.createElement('li');
    const radioBtn = document.createElement('div');
    const text = document.createElement('p');
    const deleteBtn = document.createElement('button');
    
    li.classList.add('orderedList__li');
    li.dataset.listItems = randomDataAttr;
    radioBtn.classList.add('orderedList__radioBtn');
    radioBtn.dataset.subItems = subTextAttr;
    text.classList.add('orderedList__text');
    text.innerText = data;
    text.dataset.subItems = subTextAttr;
    deleteBtn.classList.add('orderedList__deleteBtn');
    deleteBtn.type="submit";
    deleteBtn.innerText = 'Delete';
    deleteBtn.dataset.listItems = randomDataAttr;

    li.append(radioBtn);
    li.append(text);
    li.append(deleteBtn);
    return li;
}

orderedList.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.dataset.listItems){
        let deleteLists = document.querySelector(`[data-list-items="${event.target.dataset.listItems}"]`);
        orderedList.removeChild(deleteLists);
        const previousSibling = event.target.previousSibling.innerText;
        const getFromDataBase = localStorage.getItem('dataBase');
        if(getFromDataBase){
            const dataBaseJson = JSON.parse(getFromDataBase);
            for(let i = 0; i<dataBaseJson.length; i++){
                if (dataBaseJson[i] === previousSibling) {
                    dataBaseJson.splice(i, 1);
                    i--;
                    dataBase = dataBaseJson;
                    const str = JSON.stringify(dataBase);
                    localStorage.setItem("dataBase", str);
                }
            }
        }
    }
    if(event.target.dataset.subItems){
        if(event.target.className === 'orderedList__radioBtn'){
            let text = event.target.nextSibling;
            text.style.textDecoration = "line-through";
            event.target.style.backgroundColor = '#c5c5c5';
            event.target.style.boxShadow = 'inset 0px 0px 1px 5px #fff';
            
            const nextSibling = event.target.nextSibling.innerText;
            const getFromDataBase = localStorage.getItem('dataBase');
            if(getFromDataBase){
                const dataBaseJson = JSON.parse(getFromDataBase);
                for(let i = 0; i<dataBaseJson.length; i++){
                    if (dataBaseJson[i] === nextSibling) {
                        dataBaseJson.splice(i, 1);
                        i--;
                        dataBase = dataBaseJson;
                        const str = JSON.stringify(dataBase);
                        localStorage.setItem("dataBase", str);
                    }
                }
            }
            if(doneWishes.length<=10){
                doneWishes.push(nextSibling);
            }
            else{
                doneWishes.shift();
                doneWishes.push(nextSibling);
            }
            const str = JSON.stringify(doneWishes);
            localStorage.setItem("doneWishes", str);
        }
    }
});


cart__btn.addEventListener('click', (e) => {
    e.preventDefault();
    addList();
    if(valueToLocal){
        setToLocalStorage(valueToLocal)
    }
});

(function(){
    const getData = localStorage.getItem('dataBase');
    if(getData && getData.length>0){
        const getDataJson = JSON.parse(getData)
        for(data of getDataJson){
            orderedList.append(getListByLocalStorage(data));
            
        }
    }
}())