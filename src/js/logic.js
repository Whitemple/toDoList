function addList(){
    const li = document.createElement('li');
    const radioBtn = document.createElement('input');
    const text = document.createElement('p');
    const deleteBtn = document.createElement('button');

    li.classList.add('orderedList__li');
    radioBtn.type='radio';
    radioBtn.classList.add('orderedList__radioBtn');
    radioBtn.name="radio";
    text.classList.add('orderedList__text');
    deleteBtn.classList.add('orderedList__deleteBtn');
    deleteBtn.type="submit";
    // console.log(deleteBtn)
}
addList()