function updateTime() {
 var t = new Date().toLocaleString();
 var timeText = document.querySelector("#timeElement");
 timeText.innerHTML = t;
 }
setInterval(updateTime, 1000);
updateTime()

dragWin(document.getElementById("welcome"));

function dragWin(el) {
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

function hideWin(el) {
 el.style.display = "none"
}
function showWin(el) {
 el.style.display = "flex"
}

var wel = document.getElementById("welcome")
var sc = document.getElementById("scratch")

document.querySelector("#welcomeclose").addEventListener("click", function() {
 hideWin(wel)
})
document.querySelector("#welcomeopen").addEventListener("click", function() {
 showWin(wel)
})
document.querySelector("#brand").addEventListener("click", function() {
 showWin(wel)
})
document.querySelector("#scratchclose").addEventListener("click", function() {
 hideWin(sc)
})
document.querySelector("#scratchopen").addEventListener("click", function() {
 showWin(sc)
})

dragWin(sc)

var biggestIndex = 1
function bump(el) {
 biggestIndex++
 el.style.zIndex = biggestIndex
 document.getElementById("topbar").style.zIndex = biggestIndex + 1
}
wel.addEventListener("mousedown", function() { bump(wel) })
sc.addEventListener("mousedown", function() { bump(sc) })

var junk = document.querySelector(".menu")

var box = document.getElementById("scratchbox")
try {
 box.value = localStorage.getItem("nook-scratch") || ""
} catch (e) {
 console.log(e)
}
box.addEventListener("input", function() {
 try {
  localStorage.setItem("nook-scratch", box.value)
 } catch (e) {
  console.log(e)
 }
})
 