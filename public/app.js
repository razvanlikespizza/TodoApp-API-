
//shows input on click on the add todo
document.getElementById("addTodo").addEventListener("click", function() {
  document.getElementsByClassName("input")[0].classList.toggle("hidden");
});
// ADD TODO TO DB
document.getElementsByClassName("input")[0].addEventListener("keyup", function(e) {
  if (e.keyCode == 13 && /[^$]/.test(e.target.value) && /^(?!\s+$)/.test(e.target.value)) {
    let data = new URLSearchParams();
    data.set("name", e.target.value);
    e.target.value = ""; this.blur();
    fetch("/api/todos", {
      method: "POST",
      body: data
    })
    .then((data) => data.json())
    .then((data) => getTodos([data]));
  }
});

function addEvents(todo) {
  //shows the delete and update buttons for each todo
  todo.querySelector(".more").addEventListener("click", function() {
    this.nextElementSibling.nextElementSibling.classList.toggle("hidden");
  });
  //on update button, if the input is hidden show it
  todo.querySelector(".update").addEventListener("click", function() {
    if (!document.querySelector(".input").classList.contains("hidden")) {
      let p = this.parentNode.parentNode.querySelector("p");
      let span = this.parentNode.parentNode.querySelectorAll("span")[1];
      let id = this.parentNode.parentNode.getAttribute("data-id");
      let updateData = document.querySelector("input").value;
      if (/[^$]/.test(updateData) && /^(?!\s+$)/.test(updateData)) {
        let data = new URLSearchParams();
        data.set("name", updateData);
        document.querySelector("input").value = ""; document.querySelector("input").blur();
        fetch(`/api/todos/${id}`, {
          method: "PUT",
          body: data
        })
        .then((data) => data.json())
        .then((data) => {
          p.innerText = data.name;
          span.innerText = data.createdDate.substring(0, 10);
        });
      }
    } else {
      document.querySelector(".input").classList.toggle("hidden");
    }
  });
  //add delete class
  todo.querySelector(".delete").addEventListener("click", function() {
    let id = this.parentNode.parentNode.getAttribute("data-id");
    this.parentNode.parentNode.remove();
    //make request
    let data = new URLSearchParams();
    data.set("_id", id);
    console.log(id);
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
      body: data
    });
  });
  //add event listener on each todo, on click toggle completed
  todo.querySelector(".box-li-wrapper").addEventListener("click", function() {
    //get id, get if the box has the calss completed
    let id = this.parentNode.getAttribute("data-id");
    let myBool = !(this.parentNode.classList.contains("completed"));
    this.parentNode.classList.toggle("completed");

    //make request
    let data = new URLSearchParams();
    data.set("completed", myBool);
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: data
    });
  });
}
function getTodos(data) {
  todoNumber = data.length;
  console.log(todoNumber);
  data.forEach((todo) => {
    let li = document.createElement("li");
    li.classList.add("box-li");
    li.setAttribute("data-id", todo._id);
    if (todo.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = 
      `<span class="more">☴</span>
      <div class="box-li-wrapper">
        <div class="left">
            <p>${todo.name}</p>
        </div>
        <div class="right">
          <span class="date">${todo.createdDate.substring(0, 10)}</span>
        </div>
      </div>
      <div class="down hidden">
        <button class="delete">Delete</button>
        <button class="update">Update</button>
      </div>`;
    boxUl.appendChild(li);
    addEvents(li);
  })
};
//add stuff to the page
let d = new Date(),
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    boxUl = document.querySelector(".box-ul"),
    todoNumber = 0;
document.querySelector(".box-title").innerHTML = `<span class="bold">${days[d.getDay()]},<span> ${d.getDate()}`;
document.querySelector(".box-subtitle").innerText = months[d.getMonth()];

//get all todos and show
fetch("/api/todos")
  .then((data) => data.json())
  .then((data) => getTodos(data))
  .then(() => {
    document.querySelector(".tasks").innerText = `${todoNumber} tasks`;
  });