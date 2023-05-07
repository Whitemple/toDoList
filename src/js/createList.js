// Создаем константы которые будут нужны для работы
const cart__btn = document.querySelector(".cart__btn");
const orderedList = document.querySelector(".orderedList");
const showDoneWishesBtn = document.getElementById('cart__showDoneBtn');
const showToDoWishesBtn = document.getElementById('cart__showToDoBtn');
// Создаем переменную чтобы иметь к ней доступ везде в коде
let valueToLocal;
// Создаем 2 пустых массива для записи данных в LocalStorage
let dataBase = [];
const doneWishes = [];
// Создаем переменные для ограничения по кол-ву записанных дел
let dataBaseWishesNumber = 10;
let doneWishesNumber = 10;

// Функция добавления данных в LocalStorage
function setToLocalStorage(value) {
  const getFromDataBase = localStorage.getItem("dataBase");
  if (getFromDataBase) {
    const dataBaseJson = JSON.parse(getFromDataBase);
    if (dataBaseJson.length > 0) {
      dataBase = dataBaseJson;
    }
  }
  if (dataBase.length <= dataBaseWishesNumber) {
    dataBase.push(value);
  } else {
    dataBase.shift();
    dataBase.push(value);
  }
  const str = JSON.stringify(dataBase);
  localStorage.setItem("dataBase", str);
}

// Функция построения элемента списка при вводе данных в инпут
function addList() {
  const randomDataAttr = Math.floor(Math.random() * (1000 - 1) + 1);
  const subTextAttr = Math.floor(Math.random() * (500 - 1) + 1);
  const li = document.createElement("li");
  const radioBtn = document.createElement("div");
  const text = document.createElement("p");
  const deleteBtn = document.createElement("button");
  const inputValue = document.getElementById("text");

  li.classList.add("orderedList__li");
  li.dataset.listItems = randomDataAttr;
  radioBtn.classList.add("orderedList__radioBtn");
  radioBtn.dataset.subItems = subTextAttr;
  text.classList.add("orderedList__text");
  text.innerText = inputValue.value;
  valueToLocal = inputValue.value;
  text.dataset.subItems = subTextAttr;
  deleteBtn.classList.add("orderedList__deleteBtn");
  deleteBtn.type = "submit";
  deleteBtn.innerText = "Delete";
  deleteBtn.dataset.listItems = randomDataAttr;

  if (inputValue.value != "") {
    li.append(radioBtn);
    li.append(text);
    li.append(deleteBtn);
    orderedList.append(li);

    // Очищаем input
    inputValue.value = "";
    inputValue.placeholder = "What needs to be done?";
    inputValue.style.setProperty("--c", "gray");
  } else {
    inputValue.placeholder = "Input value should not to be empty!";
    inputValue.style.setProperty("--c", "#ff9898db");
  }
}

// Функция построения элемента списка и переноса его в другую секцию с ранее нажатыми параметарми
function getListByLocalStorage(data, classTitleBtn="orderedList__radioBtn", classTitleText="orderedList__text") {
  const randomDataAttr = Math.floor(Math.random() * (1000 - 1) + 1);
  const subTextAttr = Math.floor(Math.random() * (500 - 1) + 1);
  const li = document.createElement("li");
  const radioBtn = document.createElement("div");
  const text = document.createElement("p");
  const deleteBtn = document.createElement("button");

  li.classList.add("orderedList__li");
  li.dataset.listItems = randomDataAttr;
  radioBtn.classList.add(classTitleBtn);
  radioBtn.dataset.subItems = subTextAttr;
  text.classList.add(classTitleText);
  text.innerText = data;
  text.dataset.subItems = subTextAttr;
  deleteBtn.classList.add("orderedList__deleteBtn");
  deleteBtn.type = "submit";
  deleteBtn.innerText = "Delete";
  deleteBtn.dataset.listItems = randomDataAttr;

  li.append(radioBtn);
  li.append(text);
  li.append(deleteBtn);
  return li;
};

// Функция удаления значения из LocalStorage
function removeFromAllDB(allDataBase, prevSub){
  const getFromDataBase = localStorage.getItem(allDataBase);
  if (getFromDataBase) {
    const dataBaseJson = JSON.parse(getFromDataBase);
    for (let i = 0; i < dataBaseJson.length; i++) {
      if (dataBaseJson[i] === prevSub) {
        dataBaseJson.splice(i, 1);
        i--;
        dataBase = dataBaseJson;
        const str = JSON.stringify(dataBase);
        localStorage.setItem(allDataBase, str);
      }
    }
  }
}

// Слушаем событие на родителе списка и по нажатию выполняем действия. Вешаем один обработчик на элемент вместо того чтобы вешать на каждый элемент один и тот же обработчик
orderedList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.dataset.listItems) {
    const deleteLists = document.querySelector(
      `[data-list-items="${event.target.dataset.listItems}"]`
    );
    orderedList.removeChild(deleteLists);
    const previousSibling = event.target.previousSibling.innerText;
    removeFromAllDB("dataBase", previousSibling);
    removeFromAllDB("doneWishes", previousSibling);
  }
  if (event.target.dataset.subItems) {
    if (event.target.className === "orderedList__radioBtn") {
      const text = event.target.nextSibling;
      text.classList.remove('orderedList__text');
      text.classList.add('orderedList__textUnactive');
      event.target.classList.remove('orderedList__radioBtn');
      event.target.classList.add('orderedList__radioBtnUnactive');
      const nextSibling = event.target.nextSibling.innerText;
      const getFromDataBase = localStorage.getItem("dataBase");
      if (getFromDataBase) {
        const dataBaseJson = JSON.parse(getFromDataBase);
        for (let i = 0; i < dataBaseJson.length; i++) {
          if (dataBaseJson[i] === nextSibling) {
            dataBaseJson.splice(i, 1);
            i--;
            dataBase = dataBaseJson;
            const str = JSON.stringify(dataBase);
            localStorage.setItem("dataBase", str);
          }
        }
      }
      if (doneWishes.length <= doneWishesNumber) {
        doneWishes.push(nextSibling);
      } else {
        doneWishes.shift();
        doneWishes.push(nextSibling);
      }
      const str = JSON.stringify(doneWishes);
      localStorage.setItem("doneWishes", str);
    }
  }
});

// Строим элемент при наличии данных в LocalStorage
function createStartPage(dataBase){
  const getData = localStorage.getItem(dataBase);
  if (getData && getData.length > 0) {
    const getDataJson = JSON.parse(getData);
    if(dataBase === 'doneWishes'){
      for (data of getDataJson) {
        orderedList.append(getListByLocalStorage(data, 'orderedList__radioBtnUnactive', 'orderedList__textUnactive'));
      }
    }
    else{
      for (data of getDataJson) {
        orderedList.append(getListByLocalStorage(data));
      }
    }    
  }
};

// При нажатии на кнопку строим элемент
cart__btn.addEventListener("click", (e) => {
  e.preventDefault();
  addList();
  if (valueToLocal) {
    setToLocalStorage(valueToLocal);
  }
});

// Слушаем событие при нажатии на кнопку "Показать выполеннные"
showDoneWishesBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showToDoWishesBtn.classList.remove('colorText');
  showDoneWishesBtn.classList.add('colorText');
  orderedList.innerHTML = '';
  createStartPage("doneWishes");
});

// Слушаем событие при нажатии на кнопку "В работе"
showToDoWishesBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showDoneWishesBtn.classList.remove('colorText');
  showToDoWishesBtn.classList.add('colorText');
  orderedList.innerHTML = '';
  createStartPage("dataBase");
});

// При загрузке страницы выводим список из LocalStorage при наличии
window.onload = () => {
  orderedList.innerHTML = '';
  createStartPage("dataBase");
};