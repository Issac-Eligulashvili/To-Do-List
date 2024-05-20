const clear = document.querySelector(".clear")

const dateElement = document.getElementById('date')
const list = document.getElementById('list')
const input = document.getElementById('input')
const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const LINE_THROUGH = 'lineThrough'

const options = {weekday: "long", month:"short", day:"numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options)


let LIST = [];
let id = 0;

//get items from local storage


let variable = localStorage.getItem('key')
localStorage.setItem("TODO", JSON.stringify(LIST))

let data = localStorage.getItem("TODO")

if(data) {

LIST = JSON.parse(data);
loadToDo(LIST);
id = LIST.length


} else {
    LIST = [];
    id=0;
}

function loadToDo (array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash)
    })
}




function addToDo(toDo, id,done, trash ) {

if(trash) { return; }

const DONE = done ? CHECK : UNCHECK;
const LINE = done ? LINE_THROUGH : "";

    const text = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job = "delete" id="${id}"></i>
</li>`

const position = "beforeend";

list.insertAdjacentHTML(position, text)

}

document.addEventListener("keyup", function(event){
    if(event.keyCode === 13) {
        const toDo = input.value;
        if(toDo) {
            addToDo(toDo,id,false,false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );

            input.value = "";
            id++
        }
        
    }
})

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH )
    LIST[element.id].done = LIST[element.id].done ? false : true
}

function removeToDo(element ) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true;
}

list.addEventListener ("click", function(event) {
    let element = event.target;
    const elementJOB = event.target.attributes.job.value
    if (elementJOB == 'complete') {
        completeToDo(element);
    } else if (elementJOB =='delete') {
        removeToDo(element);
    }
})

