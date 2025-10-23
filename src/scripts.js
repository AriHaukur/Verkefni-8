// @ts-ignore
import { checkListState, updateStats, createTodoItem, clearList, toggleTodoItemStatus, toggleFinished} from "./lib/todo.js";


  


/**
 * @param {HTMLElement} todolist
 */
function initialize(todolist) {
  const form = todolist.querySelector('.form')

//CLEAR BUTTON HERE
const clearButton = todolist.querySelector(".clear-all")

if(clearButton)
  clearButton.addEventListener("click", ()=>{
    clearList(todolist);
    updateStats(todolist); }); 
    else{

    }

    //FELA KLÁRUÐ HÉR
    const toggleButton = todolist.querySelector('.toggle-finished');
    if(toggleButton) {
      toggleButton.addEventListener("click", ()=> {

        const isShown = toggleFinished(todolist);
        toggleButton.textContent = isShown ? 'Fela Kláruð atriði' : 'Sýna kláruð atriði';

    });
  
    }

  if (!form) {
    console.error('form fannst ekki, hætti')
    return;
  }

  console.log(form)

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const input = todolist.querySelector('input')

    if (!input) {
      console.error('input fannst ekki');
      return;
    }
    const value = input.value;

    // TODO staðfesta að value er OK

    const clean = value.trim();

    if(clean.length == 0) {
    input.style = "border-color:red"
      return
    } 

    createTodoItem(todolist, value);
    updateStats(todolist);
    input.value = "";
  })
  
  
  /* TODO setja submit event handler á form */
  /* TODO finna gildi textareits í formi innan event handlers og búa til todo item útfrá því */
  /* TODO tengja „Fela kláruð atriði“ og „Hreinsa lista“ takka */
}


// Finnum todo lista og keyrum fall sem setur allt upp
const todoList = document.querySelector(".todo-list");

// Viljum vera viss um að todoList hafi fundist og sé HTMLElement
if (todoList && todoList instanceof HTMLElement) {
  initialize(todoList);
} else {
  console.error("no todo list found");
}
