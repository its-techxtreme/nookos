function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector(".time-now");
    timeText.innerHTML = currentTime;
}

setInterval( updateTime, 1000)

dragElement(document.getElementById("welcome"));

function dragElement(el) {
 var initialX = 0
 var initialY = 0
 var currentX = 0
 var currentY = 0

 if (document.getElementById(el.id + "header")) {
  document.getElementById(el.id + "header").onmousedown = startDrag
 } else {
  el.onmousedown = startDrag
 }

 function startDrag(e) {
  e = e || window.event
  if (e.target && e.target.id == el.id + "close") return
  e.preventDefault()
  initialX = e.clientX
  initialY = e.clientY
  document.onmouseup = stopDrag
  document.onmousemove = moveWin
 }

 function moveWin(e) {
  e = e || window.event
  e.preventDefault()
  currentX = initialX - e.clientX
  currentY = initialY - e.clientY
  initialX = e.clientX
  initialY = e.clientY
  var nx = el.offsetLeft - currentX
  var ny = el.offsetTop - currentY
  if (ny < 38) ny = 38
  if (nx < 0) nx = 0
  if (nx > window.innerWidth - 80) nx = window.innerWidth - 80
  el.style.top = ny + "px"
  el.style.left = nx + "px"
 }

 function stopDrag() {
  document.onmouseup = null
  document.onmousemove = null
 }
}

var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#closeWelcomeTab");
var welcomeScreenOpen = document.querySelector("#openWelcomeTab");
welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen)
})
welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen)
})

function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "flex"
}

var notesScreen = document.querySelector("#notes");
var notesScreenClose = document.querySelector("#close-notes-tab");
var notesScreenOpen = document.querySelector("#open-notes-tab");
notesScreenClose.addEventListener("click", function() {
  closeWindow(notesScreen)
})
notesScreenOpen.addEventListener("click", function() {
  openWindow(notesScreen)
})

dragElement(notesScreen)

var biggestIndex = 2
function windowTapHandling(el) {
 biggestIndex++
 el.style.zIndex = biggestIndex
 document.getElementById("taskbar").style.zIndex = biggestIndex + 1
}
welcomeScreen.addEventListener("mousedown", function() { windowTapHandling(welcomeScreen) })
notesScreen.addEventListener("mousedown", function() { windowTapHandling(notesScreen) })

var junk = document.querySelector(".menu")

function oldScratch() {
 var box = document.getElementById("scratchbox")
 try {
  box.value = localStorage.getItem("nook-scratch") || ""
 } catch (e) {
  console.log(e)
 }
}

var an = document.getElementById("anime")
document.querySelector("#animeclose").addEventListener("click", function() {
 closeWindow(an)
})
document.querySelector("#openAnimeTab").addEventListener("click", function() {
 openWindow(an)
})
dragElement(an)
an.addEventListener("mousedown", function() { windowTapHandling(an) })

var shot = document.getElementById("shot")
document.getElementById("p1").onclick = function() { shot.src = "pics/1.png" }
document.getElementById("p2").onclick = function() { shot.src = "pics/2.png" }
document.getElementById("p3").onclick = function() { shot.src = "pics/3.png" }

var notesContainer = document.getElementById("notes-content")
var addNoteButton = document.getElementById("new-note-button")

getNotes().forEach(function(note) {
 var noteElement = createNoteElement(note.id, note.content)
 notesContainer.insertBefore(noteElement, addNoteButton)
})

addNoteButton.addEventListener("click", function() { addNote() })

function getNotes() {
 return JSON.parse(localStorage.getItem("nook-stickies") || "[]")
}
function saveNotes(notes) {
 localStorage.setItem("nook-stickies", JSON.stringify(notes))
}
function createNoteElement(id, content) {
 var element = document.createElement("textarea")
 element.classList.add("note")
 element.value = content
 element.placeholder = "Empty Sticky Note"
 element.addEventListener("change", function() {
  updateNote(id, element.value)
 })
 element.addEventListener("dblclick", function() {
  var doDelete = confirm("Delete the sticky note?")
  if (doDelete) {
   deleteNote(id, element)
  }
 })
 return element
}
function addNote() {
 var notes = getNotes()
 var noteObject = {
  id: Math.floor(Math.random() * 100000),
  content: ""
 }
 var noteElement = createNoteElement(noteObject.id, noteObject.content)
 notesContainer.insertBefore(noteElement, addNoteButton)
 notes.push(noteObject)
 saveNotes(notes)
}
function updateNote(id, newContent) {
 var notes = getNotes()
 var targetNote = notes.filter(function(note) { return note.id == id })[0]
 targetNote.content = newContent
 saveNotes(notes)
}
function deleteNote(id, element) {
 var notes = getNotes().filter(function(note) { return note.id != id })
 saveNotes(notes)
 notesContainer.removeChild(element)
}

var calcScreen = document.querySelector("#calculator")
var calcClose = document.querySelector("#close-calculator-tab")
var calcOpen = document.querySelector("#open-calculator-tab")
calcClose.addEventListener("click", function() { closeWindow(calcScreen) })
calcOpen.addEventListener("click", function() { openWindow(calcScreen) })
dragElement(calcScreen)
calcScreen.addEventListener("mousedown", function() { windowTapHandling(calcScreen) })

var display = document.getElementById("display")
function appendToDisplay(input) {
 display.value += input
}
function clearDisplay() {
 display.value = ""
}
function calculate() {
 try {
  display.value = eval(display.value)
 } catch (error) {
  display.value = "Error"
 }
}











 