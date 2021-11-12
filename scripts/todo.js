//create a class for the tasks
class Task
{
    constructor(taskName, taskDate)
    {
        this.taskName = taskName;
        this.taskDate = taskDate;
    }
}

var i = 0;
var images = [];
var slideTime = 3500; // 3.5 seconds

images[0] = 'Images/mountain3.jpeg';
images[1] = 'Images/mountain4.jpg';
images[2] = 'Images/sun2.jpg';
images[3] = 'Images/sun1.jpg';
images[4] = 'Images/mountain2.jpg';
images[5] = 'Images/mountain.jpg';

function changePicture() {

    document.getElementsByClassName('hero-image')[0].style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + images[i] + ")"

    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }
    setTimeout(changePicture, slideTime);
}


window.onload = changePicture;

//create a function to display the form
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  

//create a function to dismiss the form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }


//create a function to upload the task
let submitBtn = document.getElementById('submit').onclick = function() {
    //get the root element
    const mainCard = document.getElementsByClassName('jumbotron')[0];

    let name = document.getElementById("taskname").value;
    let time = document.getElementById("tasktime").value;

    const newTask = new Task(name, time);

    //create a row to display the card
    const row = document.createElement("div");
    row.className = 'row';
    mainCard.appendChild(row);
   

    //display the data in the list of tasks

    //display the text
   
    const bodycard = document.createElement('div');
    bodycard.className = "card";
    row.appendChild(bodycard);
    bodycard.style.width = "100%";

    const cardbody = document.createElement('div');
    cardbody.className = "card-body";
    bodycard.appendChild(cardbody);
    cardbody.style.clear = "both";

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.style.margin = '7px';
    checkbox.style.transform = "scale(1.5)";
    checkbox.style.float = 'left';
    // checkbox.src = 'Images/unchecked.png';
    // checkbox.style.width = '30px';
    // checkbox.style.float = 'left';
    
    cardbody.appendChild(checkbox);

    let title = document.createElement('H5');

    let newTaskJson = JSON.stringify(newTask);

    localStorage.setItem(title, newTaskJson);

    let myTasks = localStorage.getItem(title);

    let myNewTask = JSON.parse(myTasks);

    let tasks = [];
    tasks.push(myNewTask);

    title.innerHTML = myNewTask.taskName;
    title.style.float = "left";
    title.style.marginLeft = "12px";
    title.style.fontStyle = 'italic';
    cardbody.appendChild(title);
    cardbody.style.backgroundColor = "teal"

    checkbox.onclick = function() {
        if(checkbox.checked) {
            completeTask(title);
        }
        else
        {
            checkbox.unchecked = false;
            title.style.textDecoration = 'none';
        }
        
    }


    let date = document.createElement("H6");
    date.innerHTML = myNewTask.taskDate;
    cardbody.appendChild(date);
    date.style.float = "right";

    closeForm();
    sortTasks(newTask.title);

    const deleteBtn = document.createElement('img');
    const editBtn = document.createElement('img');

    editBtn.src = 'Images/edit.png';
    deleteBtn.src = 'Images/delete.png';

    editBtn.style.margin = '2px'
    deleteBtn.style.margin = '2px'

    editBtn.style.float = 'right'
    deleteBtn.style.float = 'right'

    deleteBtn.style.marginRight = '20px'
    editBtn.style.marginRight = '12px'

    cardbody.appendChild(deleteBtn);
    cardbody.appendChild(editBtn);

    deleteBtn.style.cursor = 'pointer'
    checkbox.style.cursor = 'pointer'
    editBtn.style.cursor = 'pointer'

    deleteBtn.onclick = function() {
        deleteTask(bodycard, cardbody );
    }
    editBtn.onclick = function() {
        editTask(title, date, cardbody,bodycard);
    }

    changeColor(title, "white");
    changeColor(date, "whitesmoke");
    saveState(cardbody);
}

//create a function to sort the list of tasks
function sortTasks(task) {
    let tasks = [];
    tasks.push(task);
    tasks.sort();
}

function changeColor(element, color) {
    element.style.color = color;
}

function deleteTask(parent, card) {
    if (confirm("Are you sure you want to delete this task?")) {
        parent.removeChild(card);
      } 
}

//create a function to edit the task
function editTask(task, time, card, parent) {
    openForm();
   
    
    task = document.getElementById('taskname').value;
    time = document.getElementById('tasktime').value;

    const newTask = new Task(task, time);

    parent.removeChild(card)
    let title = document.createElement('H5');
    let date = document.createElement('H6');

    title.innerHTML = newTask.taskName;
    date.innerHTML = newTask.taskDate;
    

    card.appendChild(title);
    card.appendChild(date);
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

//create a function to delete the task
function completeTask(task)
{
    task.style.textDecoration = 'line-through';
    
}

function saveState(element)
{
    let elementJSON = JSON.stringify(element);
    localStorage.setItem('element', elementJSON);
    
    let newElement = localStorage.getItem(JSON.parse('element'))

}










