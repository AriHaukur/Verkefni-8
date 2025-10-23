/* TODO hugsanlega importa el, empty úr ./elements.js */

import {el, empty} from "./elements.js"

// Leyfilegt að breyta skilgreiningum á föllum og bæta við fleiri föllum.

/* TODO merkja viðeigandi föll með `export` */

/**
 * Breytir stöðu atriðis í lista. Ef kláruð atriði eru sýnd er það sýnt, annars er það falið um leið og það er klárað.
 * @param {HTMLElement} item
 * @param {boolean} isShown `true` ef kláruð atriði eru sýnileg, annars `false`.
 * @returns {void}
 */
export function toggleTodoItemStatus(item, isShown = true) {
  item.classList.toggle('finished');
  if(!isShown && item.classList.contains('finished')){
    item.classList.add('hidden');
  } else if (isShown){
    item.classList.remove('hidden');
  }
  }
  


/**
 * Fjarlægja atriði (sem DOM element) úr lista.
 * @param {HTMLElement} item
 * @returns {void}
 */
function removeTodoItem(item) {
  console.log("EYÐA", item);
  const spanEl = item.querySelector("span.item");

  let text = "<unknown item>";
  if (!spanEl) {
    console.warn("cannot find spanEl");
  } else {
    text = spanEl.textContent;
  }

  if (confirm(`Viltu eyða „${text}“?`)) {
    item.remove();
  }
}

/**
 * Breytir sýnileika kláraðra atriða í lista.
 * @param {HTMLElement} todolist
 * @return {boolean} `true` if finished items are shown, `false` if hidden
 */
export function toggleFinished(todolist) {
  const finishedItems = todolist.querySelectorAll('.list li.finished');
  const currentState = todolist.getAttribute('data-finished');
  
  if(currentState === 'shown') {
    finishedItems.forEach(item => item.classList.add('hidden'));
    todolist.setAttribute('data-finished', 'hidden');
    return false;
  } else {
    finishedItems.forEach(item => item.classList.remove('hidden'));
    todolist.setAttribute('data-finished', 'shown');
    return true;
    }    
  }

  


/**
 * Hreinsar allan lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function clearList(todolist) {

  const list = todolist.querySelector(".list");
  if(!list) {
    return;
  }
  if(confirm("ertu viss?")){
    empty(list);

  }
  }


  

/**
 * Uppfærir upplýsingar um fjölda kláraðra og ókláraðra atriða í lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function updateStats(todolist) {
  const finishedEl = todolist.querySelector(".stats .finished");
  const unfinishedEl = todolist.querySelector(".stats .unfinished");

  if (!finishedEl || !unfinishedEl) {
    console.warn("could not find finished/unfinished nodes");
    return;
  }

  const allItems = todolist.querySelectorAll(".list li");
  const allFinishedItems = todolist.querySelectorAll(".list li.finished");

  if (!allItems || !allFinishedItems) {
    return;
  }

  const finishedCount = allFinishedItems.length;
  const unfinishedCount = allItems.length - finishedCount;

  finishedEl.textContent = finishedCount.toString();
  unfinishedEl.textContent = unfinishedCount.toString();

  checkListState(todolist);
}

/**
 * Býr til nýtt atriði í lista með texta `text`.
 * @param {HTMLElement} todolist
 * @param {string} text
 * @return {void}
 */
export function createTodoItem(todolist, text) {

  
  // console.log('hi frá createTodoItem', todolist, text)

  /*
<li>
  <label>
    <input type="checkbox" name="finished"  />
    <span class="item"
      >Dæmi um atriði með löngum texta og orði sem er mjög langt
      Vaðlaheiðarvegavinnuverkfærageymsluskúrslyklakippuhringurinn</span
    >
  </label>
  <button title="Fjarlægja atriði">🗑️</button>
</li>
  */
  const li = document.createElement("li");

  const button = document.createElement("button");
  button.textContent = "🗑️";
  button.addEventListener("click", () => {
    removeTodoItem(li);
    updateStats(todolist);
  });

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "finished");
  input.addEventListener("change", () => {
    const isShown = todolist.getAttribute('data-finished') === 'shown';
    toggleTodoItemStatus(li, isShown);
    updateStats(todolist);
    console.log("input", input.checked);
  });

  const span = document.createElement("span");
  span.classList.add("item");
  span.textContent = text;

  const label = document.createElement("label");

  label.appendChild(input);
  label.appendChild(span);
  li.appendChild(label);
  li.appendChild(button);

  const list = todolist.querySelector("ul.list");
  list?.appendChild(li);
}

/**
 * Athugar hvort listinn sé tómur og sýnir eða felur skilaboð um tóman lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function checkListState(todolist) {
  /* TODO útfæra */
  if(todolist.querySelectorAll("li").length == 0){
    todolist.querySelectorAll(".empty")[0].classList = "empty";
  }else{
        todolist.querySelectorAll(".empty")[0].classList = "empty hidden";

  }
}
