var faces = document.querySelectorAll(".clk")
for (var f = 0; f < faces.length; f++) {
 var box = faces[f].querySelector(".number")
 var out = faces[f].className.indexOf("sm") != -1 ? 64 : 100
 for (var i = 1; i <= 12; i++) {
  var span = document.createElement("span")
  span.textContent = i
  var angle = i * 30
  span.style.transform = "rotate(" + angle + "deg) translate(0, -" + out + "px) rotate(-" + angle + "deg)"
  box.appendChild(span)
 }
}

function tickFaces() {
 var now = new Date()
 var hours = now.getHours() % 12
 var minutes = now.getMinutes()
 var seconds = now.getSeconds()
 var secondDeg = seconds * 6
 var minuteDeg = minutes * 6 + seconds * 0.1
 var hourDeg = hours * 30 + minutes * 0.5
 var hh = document.querySelectorAll(".hour-hand")
 var mm = document.querySelectorAll(".minute-hand")
 var ss = document.querySelectorAll(".second-hand")
 for (var n = 0; n < hh.length; n++) {
  hh[n].style.transform = "rotate(" + hourDeg + "deg)"
  mm[n].style.transform = "rotate(" + minuteDeg + "deg)"
  ss[n].style.transform = "rotate(" + secondDeg + "deg)"
 }
 var h = now.getHours()
 var am = h >= 12 ? "PM" : "AM"
 h = h % 12
 if (h == 0) h = 12
 var m = minutes < 10 ? "0" + minutes : minutes
 var s = seconds < 10 ? "0" + seconds : seconds
 document.getElementById("clkread").textContent = h + ":" + m + ":" + s + " " + am
}
tickFaces()
setInterval(tickFaces, 1000)

var clockScreen = document.querySelector("#clock")
var desk = document.querySelector("#deskclock")
document.querySelector("#close-clock-tab").addEventListener("click", function() {
 closeWindow(clockScreen)
 desk.style.display = "block"
})
desk.addEventListener("click", function() {
 openWindow(clockScreen)
 desk.style.display = "none"
})
dragElement(clockScreen)
clockScreen.addEventListener("mousedown", function() { windowTapHandling(clockScreen) })

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
document.getElementById("p4").onclick = function() { shot.src = "pics/4.png" }
document.getElementById("p5").onclick = function() { shot.src = "pics/5.png" }
document.getElementById("p6").onclick = function() { shot.src = "pics/6.png" }
document.getElementById("p7").onclick = function() { shot.src = "pics/7.png" }
document.getElementById("p8").onclick = function() { shot.src = "pics/8.png" }
document.getElementById("p9").onclick = function() { shot.src = "pics/9.png" }
document.getElementById("p10").onclick = function() { shot.src = "pics/10.png" }
document.getElementById("p11").onclick = function() { shot.src = "pics/11.png" }

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
  var raw = display.value.replace(/%/g, "/100")
  display.value = eval(raw)
 } catch (error) {
  display.value = "Error"
 }
}

var musicScreen = document.querySelector("#music")
document.querySelector("#close-music-tab").addEventListener("click", function() { closeWindow(musicScreen) })
document.querySelector("#open-music-tab").addEventListener("click", function() { openWindow(musicScreen) })
dragElement(musicScreen)
musicScreen.addEventListener("mousedown", function() { windowTapHandling(musicScreen) })

var songImage = document.getElementById("song-image")
var songName = document.getElementById("song-name")
var songArtist = document.getElementById("song-artist")
var songSlider = document.getElementById("slider-song")
var playpauseButton = document.getElementById("playpause-song")
var prevSongButton = document.getElementById("prev-song")
var nextSongButton = document.getElementById("next-song")
var shuffleButton = document.getElementById("shuffle-song")
var replayButton = document.getElementById("replay-song")
var songs = [
 { image: "pics/1.png", name: "window rain", artist: "Athan", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
 { image: "pics/2.png", name: "old tape", artist: "Athan", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
 { image: "pics/3.png", name: "late night", artist: "Athan", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
 { image: "pics/1.png", name: "porch air", artist: "Athan", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" }
]
var audio = document.createElement("audio")
var currentSongIndex = 0
var songRepeat = false
updateSong()
prevSongButton.addEventListener("click", function() {
 if (currentSongIndex == 0) return
 currentSongIndex--
 updateSong()
})
nextSongButton.addEventListener("click", function() {
 if (currentSongIndex == songs.length - 1) return
 currentSongIndex++
 updateSong()
})
playpauseButton.addEventListener("click", function() {
 if (!audio.paused) {
  audio.pause()
  playpauseButton.innerHTML = "play"
 } else {
  audio.play().catch(function(e) { console.log(e) })
  playpauseButton.innerHTML = "pause"
 }
})
shuffleButton.addEventListener("click", function() {
 currentSongIndex = Math.floor(Math.random() * songs.length)
 updateSong()
})
replayButton.addEventListener("click", function() {
 songRepeat = !songRepeat
 replayButton.innerHTML = songRepeat ? "loop on" : "loop"
})
audio.addEventListener("ended", function() {
 if (songRepeat) audio.play().catch(function(e) { console.log(e) })
})
function updateSong() {
 var song = songs[currentSongIndex]
 songImage.src = song.image
 songName.innerText = song.name
 songArtist.innerText = song.artist
 audio.pause()
 audio.src = song.audio
 playpauseButton.innerHTML = "play"
 songSlider.value = 0
 audio.onloadedmetadata = function() {
  songSlider.max = audio.duration
 }
}
songSlider.addEventListener("change", function() {
 if (audio.duration) audio.currentTime = songSlider.value
})
setInterval(function() {
 if (audio.duration) songSlider.value = audio.currentTime
}, 1000)

var browserScreen = document.querySelector("#browser")
document.querySelector("#close-browser-tab").addEventListener("click", function() { closeWindow(browserScreen) })
document.querySelector("#open-browser-tab").addEventListener("click", function() { openWindow(browserScreen) })
dragElement(browserScreen)
browserScreen.addEventListener("mousedown", function() { windowTapHandling(browserScreen) })
document.getElementById("go-web").addEventListener("click", function() {
 var u = document.getElementById("web-box").value
 if (u.indexOf("http") != 0) u = "https://" + u
 document.getElementById("web-frame").src = u
})

var pomoScreen = document.querySelector("#pomo")
document.querySelector("#close-pomo-tab").addEventListener("click", function() { closeWindow(pomoScreen) })
document.querySelector("#open-pomo-tab").addEventListener("click", function() { openWindow(pomoScreen) })
dragElement(pomoScreen)
pomoScreen.addEventListener("mousedown", function() { windowTapHandling(pomoScreen) })

var startButton = document.getElementById("start")
var stopButton = document.getElementById("stop")
var resetButton = document.getElementById("reset")
var pomoTimer = document.getElementById("pomo-timer")
var timeLeft = 1500
var interval = null
function updateTimer() {
 var minutes = Math.floor(timeLeft / 60)
 var seconds = timeLeft % 60
 if (seconds < 10) seconds = "0" + seconds
 pomoTimer.innerHTML = minutes + ":" + seconds
}
function startTimer() {
 if (interval) return
 interval = setInterval(function() {
  timeLeft--
  updateTimer()
  if (timeLeft === 0) {
   clearInterval(interval)
   interval = null
   alert("times up")
   timeLeft = 1500
   updateTimer()
  }
 }, 1000)
}
function stopTimer() {
 clearInterval(interval)
 interval = null
}
function resetTimer() {
 clearInterval(interval)
 interval = null
 timeLeft = 1500
 updateTimer()
}
startButton.addEventListener("click", startTimer)
stopButton.addEventListener("click", stopTimer)
resetButton.addEventListener("click", resetTimer)











 