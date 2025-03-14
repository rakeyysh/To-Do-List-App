
console.log("Welcome to my todo app");

let todos = [];
let todoDataList = document.getElementById("todo-data-list");

let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");

let getPendingTodos = document.getElementById("get-todos");

getPendingTodos.addEventListener("click", ()=> {
    todos = todos.filter((todo) => todo.status != "Finished");
    reRenderTodos()

})



todoInputBar.addEventListener("keyup", function toggleSaveButton() {
    console.log("good");

    let todotext = todoInputBar.value;
    console.log(todotext);
    if (todotext.length == 0) {
        if (saveButton.classList.contains("disabled")) return;
        saveButton.classList.add("disabled");

    }
    else if (saveButton.classList.contains("disabled")) {
    
        saveButton.classList.remove("disabled");
    }

})


saveButton.addEventListener("click", function getTextAndAddTodo() {

    let todotext = todoInputBar.value;
    if (todotext.length == 0) return;
    let todo = { text: todotext, status: "In progress", finishButtontext: "Finish" };
    todos.push(todo);

    addTodo(todo, todos.length);
    todoInputBar.value = '';

});

function reRenderTodos() {
    todoDataList.innerHTML = '';
    todos.forEach((element, idx) => {

        addTodo(element, idx + 1);
    })
}





function removeTodo(event) {

    let deletePressedButton = event.target;
    console.log(deletePressedButton);

    let indexToBeRemoved = Number(deletePressedButton.getAttribute("todo-idx"));
    console.log(indexToBeRemoved);
    todos.splice(indexToBeRemoved, 1);
    reRenderTodos();
}

function finishTodo(event) {
    let finishButtonPressed = event.target;
    console.log(event);
    let indexToBeFinished = Number(finishButtonPressed.getAttribute("todo-idx"));


    //toggle
    if (todos[indexToBeFinished].status == "Finished") {

        todos[indexToBeFinished].status = "In progress";
        todos[indexToBeFinished].finishButtontext = "Finish";
    }
    else {

        todos[indexToBeFinished].status = "Finished";
        todos[indexToBeFinished].finishButtontext = "Undo";
    }
    todos.sort((a, b) => {
        if (a.status == "Finished") return 1;

        return -1;
    });




    // todos[indexToBeFinished].finishButtontext = "Undo.";
    // finishedButton.textContent = "Undo"
    reRenderTodos();

}



function editTodo(event){
    let editButtonPressed = event.target;
    console.log(event);
    let indexToBeEdited = Number(editButtonPressed.getAttribute("todo-idx"));
    
    let detailDiv = document.querySelector(`div[todo-idx = "${indexToBeEdited}"]`);
    let input =  document.querySelector(`input[todo-idx = "${indexToBeEdited}"]`);
    console.log("K");
    detailDiv.style.display = "none";
    input.type = "text";
    input.value = detailDiv.textContent;

    //reRenderTodos();
}

function saveEditedToDo(event){

    let input = event.target;
    let indexToBeEdited = Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx = "${indexToBeEdited}"]`);

    if(event.keyCode == "13"){
        detailDiv.textContent = input.value;
        detailDiv.style.display = "block";
        input.type = '';
        console.log(input.type);
        input.type = "hidden";
       
    }
    console.log(event.keyCode);
}



function addTodo(todo, todoCount) {
    /** step 1 */
    let rowDiv = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");
    let editButton =  document.createElement("button");
    let hiddenInput = document.createElement("input");
    let hr = document.createElement("hr");

    /** step 4 */
    //  adding classes
    rowDiv.classList.add("row");
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail");
    todoStatus.classList.add("todo-status");
    todoActions.classList.add("todo-action", "d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn", "btn-danger", "delete-todo");
    finishedButton.classList.add("btn", "btn-success", "finish-todo");
    editButton.classList.add("btn", "btn-warning", "edit-todo");
    hiddenInput.classList.add("form-control","todo-detail");


     // adding attributes
    finishedButton.setAttribute("todo-idx", todoCount - 1);
    deleteButton.setAttribute("todo-idx", todoCount - 1);
    editButton.setAttribute("todo-idx",todoCount-1);
    todoDetail.setAttribute("todo-idx",todoCount-1);
    hiddenInput.setAttribute("todo-idx",todoCount-1);


     // adding click listeners
    deleteButton.onclick = removeTodo;
    finishedButton.onclick = finishTodo;
    editButton.onclick = editTodo;
    hiddenInput.type = "hidden";
    
    hiddenInput.addEventListener("keypress",saveEditedToDo);


    /** step 3 */
    todoNumber.textContent = `${todoCount}.`;
    todoDetail.textContent = todo.text; //sets the todo text sent from input element
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete";
    finishedButton.textContent = todo.finishButtontext;
    editButton.textContent = "Edit";

    /** step 2 */   /** creating the div on dom */
    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);
    todoActions.appendChild(editButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoActions);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);

}





















// Reference:
// let getTodosButton = document.getElementById('get-todos');
// // registration of event listener
// getTodosButton.addEventListener('click',() => {
//     console.log("clicked");
// })

// getTodosButton.addEventListener('click',() => {
//     console.log("clicked WoW...");
// })

// multiple ways to add events to the element

// getTodosButton.onclick = () =>{
//     console.log("clicked");
// }