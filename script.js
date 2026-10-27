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
 if (desk.getAttribute("data-moved") == "1") {
  desk.setAttribute("data-moved", "0")
  return
 }
 openWindow(clockScreen)
 desk.style.display = "none"
})
clockScreen.addEventListener("mousedown", function() { tap(clockScreen) })


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
  if (element && element.id == "cam") killCam()
}
function openWindow(element) {
  element.style.display = "flex"
  markBase(element)
  var mark = iconFor[element.id]
  if (mark) document.getElementById(mark).classList.remove("selected")
  tuck(element)
  lift(element)
}

var heads = document.querySelectorAll(".app-header")
for (var h = 0; h < heads.length; h++) {
 var mn = document.createElement("button")
 mn.className = "winbtn mn"
 var mx = document.createElement("button")
 mx.className = "winbtn mx"
 var x = heads[h].querySelector(".close-button")
 heads[h].insertBefore(mn, x)
 heads[h].insertBefore(mx, x)
}

var iconFor = {
 welcome: "openWelcomeTab",
 anime: "openAnimeTab",
 notes: "open-notes-tab",
 calculator: "open-calculator-tab",
 music: "open-music-tab",
 browser: "open-browser-tab",
 pomo: "open-pomo-tab",
 settings: "open-set-tab",
 cam: "open-cam-tab"
}

// old zoom used data-big and slid under the bar
// el.style.width = "100%"
// el.style.top = "0"
document.addEventListener("click", function(e) {
 var t = e.target
 var hit = t.className || ""
 if (hit.indexOf("mn") == -1 && hit.indexOf("mx") == -1) return
 var win = t.closest(".app-window")
 if (!win) return
 if (hit.indexOf("mn") != -1) shut(win)
 else swell(win)
})

var notesScreen = document.querySelector("#notes");
var notesScreenClose = document.querySelector("#close-notes-tab");
var notesScreenOpen = document.querySelector("#open-notes-tab");
notesScreenClose.addEventListener("click", function() {
  closeWindow(notesScreen)
})
notesScreenOpen.addEventListener("click", function() {
  openWindow(notesScreen)
})


function tap(el) {
 lift(el)
}
welcomeScreen.addEventListener("mousedown", function() { tap(welcomeScreen) })
notesScreen.addEventListener("mousedown", function() { tap(notesScreen) })

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
an.addEventListener("mousedown", function() { tap(an) })

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

var pickBtns = document.querySelectorAll("#picks button")
var pi
for (pi = 0; pi < pickBtns.length; pi++) {
 pickBtns[pi].style.backgroundImage = "url(pics/" + (pi + 1) + ".png)"
 pickBtns[pi].addEventListener("click", function() {
  var all = document.querySelectorAll("#picks button")
  var j
  for (j = 0; j < all.length; j++) all[j].classList.remove("on")
  this.classList.add("on")
 })
}
pickBtns[0].classList.add("on")

var notesContainer = document.getElementById("notes-content")
var addNoteButton = document.getElementById("new-note-button")
var noteBody = document.getElementById("note-body")
var noteList = document.getElementById("note-list")
var curNote = null

function getNotes() {
 return JSON.parse(localStorage.getItem("nook-stickies") || "[]")
}
function saveNotes(notes) {
 localStorage.setItem("nook-stickies", JSON.stringify(notes))
 var face = document.getElementById("desknotes-read")
 if (face) face.textContent = String(notes.length)
}
function paintNotes() {
 noteList.innerHTML = ""
 var notes = getNotes()
 var i
 for (i = 0; i < notes.length; i++) {
  var b = document.createElement("button")
  b.type = "button"
  var line = (notes[i].content || "").split("\n")[0]
  b.textContent = line || "Empty note"
  b.setAttribute("data-id", notes[i].id)
  if (String(notes[i].id) == String(curNote)) b.className = "on"
  noteList.appendChild(b)
 }
}
function showNote(id) {
 var notes = getNotes()
 var i
 var found = null
 for (i = 0; i < notes.length; i++) {
  if (String(notes[i].id) == String(id)) found = notes[i]
 }
 if (!found) return
 curNote = found.id
 noteBody.value = found.content || ""
 paintNotes()
}
noteList.addEventListener("click", function(e) {
 var id = e.target.getAttribute && e.target.getAttribute("data-id")
 if (!id) return
 showNote(id)
})
noteBody.addEventListener("input", function() {
 if (curNote == null) return
 updateNote(curNote, noteBody.value)
 var on = noteList.querySelector(".on")
 if (!on) return
 var line = noteBody.value.split("\n")[0]
 on.textContent = line || "Empty note"
})
addNoteButton.addEventListener("click", function() { addNote() })

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
 notes.unshift(noteObject)
 saveNotes(notes)
 curNote = noteObject.id
 noteBody.value = ""
 paintNotes()
 noteBody.focus()
}
function updateNote(id, newContent) {
 var notes = getNotes()
 var targetNote = notes.filter(function(note) { return note.id == id })[0]
 if (!targetNote) return
 targetNote.content = newContent
 saveNotes(notes)
}
function deleteNote(id, element) {
 var notes = getNotes().filter(function(note) { return note.id != id })
 saveNotes(notes)
 if (element && element.parentNode) element.parentNode.removeChild(element)
}
document.getElementById("note-drop").addEventListener("click", function() {
 if (curNote == null) return
 deleteNote(curNote)
 var left = getNotes()
 if (!left.length) {
  curNote = null
  noteBody.value = ""
  paintNotes()
  return
 }
 showNote(left[0].id)
})
var opened = getNotes()
if (opened.length) showNote(opened[0].id)
else paintNotes()

var calcScreen = document.querySelector("#calculator")
var calcClose = document.querySelector("#close-calculator-tab")
var calcOpen = document.querySelector("#open-calculator-tab")
calcClose.addEventListener("click", function() { closeWindow(calcScreen) })
calcOpen.addEventListener("click", function() { openWindow(calcScreen) })
calcScreen.addEventListener("mousedown", function() { tap(calcScreen) })

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
musicScreen.addEventListener("mousedown", function() { tap(musicScreen) })

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
 { image: "pics/1.png", name: "Window Rain", artist: "Athan", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
 { image: "pics/2.png", name: "Old Tape", artist: "Athan", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
 { image: "pics/3.png", name: "Late Night", artist: "Athan", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
 { image: "pics/1.png", name: "Porch Air", artist: "Athan", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" }
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
 var face = document.getElementById("deskmusic-read")
 if (face) face.textContent = song.name
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
browserScreen.addEventListener("mousedown", function() { tap(browserScreen) })
document.getElementById("go-web").addEventListener("click", function() {
 var u = document.getElementById("web-box").value
 if (u.indexOf("http") != 0) u = "https://" + u
 document.getElementById("web-frame").src = u
})

var pomoScreen = document.querySelector("#pomo")
document.querySelector("#close-pomo-tab").addEventListener("click", function() { closeWindow(pomoScreen) })
document.querySelector("#open-pomo-tab").addEventListener("click", function() { openWindow(pomoScreen) })
pomoScreen.addEventListener("mousedown", function() { tap(pomoScreen) })

var setScreen = document.querySelector("#settings")
document.querySelector("#close-set-tab").addEventListener("click", function() { closeWindow(setScreen) })
document.querySelector("#open-set-tab").addEventListener("click", function() { openWindow(setScreen) })
setScreen.addEventListener("mousedown", function() { tap(setScreen) })
document.getElementById("walls").addEventListener("click", function(e) {
 var kind = e.target.getAttribute && e.target.getAttribute("data-wall")
 if (!kind) return
 setWall(kind)
})

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
 var face = document.getElementById("desktimer-read")
 if (face) face.textContent = minutes + ":" + seconds
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

var zN = 2
var order = []
var slots = {}

function slot(el) {
 if (!el) return null
 if (slots[el.id]) return slots[el.id]
 slots[el.id] = {
  el: el,
  big: 0,
  t: el.style.top || "",
  l: el.style.left || "",
  w: el.style.width || "",
  h: el.style.height || ""
 }
 return slots[el.id]
}

function pile() {
 var n
 var base = 30
 for (n = 0; n < order.length; n++) {
  order[n].style.zIndex = base + n
 }
 zN = base + order.length
 var bar = document.getElementById("taskbar")
 if (bar) bar.style.zIndex = zN + 2
 var icons = document.querySelectorAll(".app-icon")
 for (n = 0; n < icons.length; n++) icons[n].style.zIndex = 3
 if (desk) desk.style.zIndex = 4
}

function lift(el) {
 if (!el) return
 var i = order.indexOf(el)
 if (i != -1) order.splice(i, 1)
 order.push(el)
 pile()
 slot(el)
}

function shut(el) {
 closeWindow(el)
 var mark = iconFor[el.id]
 if (mark) {
  var ic = document.getElementById(mark)
  if (ic) ic.classList.add("selected")
 }
 if (el.id == "clock" && desk) desk.style.display = "block"
}

function swell(el) {
 var s = slot(el)
 if (!s) return
 if (s.big) {
  el.style.top = s.t
  el.style.left = s.l
  el.style.width = s.w
  el.style.height = s.h
  el.classList.remove("big")
  el.style.removeProperty("--sc")
  s.big = 0
  grow(el)
  lift(el)
  return
 }
 s.t = el.offsetTop + "px"
 s.l = el.offsetLeft + "px"
 s.w = getComputedStyle(el).width
 s.h = getComputedStyle(el).height
 // full bleed looked right until the bar covered the title
 // el.style.top = "0px"
 // el.style.width = "100%"
 el.classList.add("big")
 var extraW = 0
 var extraH = 0
 s.cw = el.clientWidth
 s.ch = el.clientHeight
 el.style.top = "36px"
 el.style.left = "8px"
 el.style.width = (window.innerWidth - 16 - extraW) + "px"
 el.style.height = (window.innerHeight - 48 - extraH) + "px"
 fit(el, s)
 s.big = 1
 lift(el)
}

function fit(el, s) {
 var head = el.querySelector(".app-header")
 var hh = head ? head.offsetHeight : 0
 var oldH = s.ch - hh
 if (oldH < 40) oldH = s.ch
 var newH = el.clientHeight - hh
 var sx = el.clientWidth / s.cw
 var sy = newH / oldH
 var sc = sx < sy ? sx : sy
 if (sc < 1) sc = 1
 if (el.id == "browser" || el.id == "notes" || el.id == "cam") sc = 1
 el.style.setProperty("--sc", String(Math.round(sc * 100) / 100))
}

function clamp(el, nx, ny) {
 var keep = 72
 if (ny < 38) ny = 38
 if (nx < 80 - el.offsetWidth) nx = 80 - el.offsetWidth
 if (nx > window.innerWidth - keep) nx = window.innerWidth - keep
 return { x: nx, y: ny }
}

function grab(el) {
 var sx = 0
 var sy = 0
 var ox = 0
 var oy = 0
 var on = 0
 var head = document.getElementById(el.id + "header")
 if (!head) return
 head.addEventListener("mousedown", function(e) {
  var hit = e.target && e.target.className ? e.target.className : ""
  if (hit.indexOf("close") != -1 || hit.indexOf("mn") != -1 || hit.indexOf("mx") != -1) return
  if (e.button && e.button != 0) return
  sx = e.clientX
  sy = e.clientY
  ox = el.offsetLeft
  oy = el.offsetTop
  on = 1
  lift(el)
 })
 document.addEventListener("mousemove", function(e) {
  if (!on) return
  var p = clamp(el, ox + (e.clientX - sx), oy + (e.clientY - sy))
  el.style.left = p.x + "px"
  el.style.top = p.y + "px"
 })
 document.addEventListener("mouseup", function() {
  on = 0
 })
 head.addEventListener("touchstart", function(e) {
  var p = e.touches && e.touches[0]
  if (!p) return
  var hit = e.target && e.target.className ? e.target.className : ""
  if (hit.indexOf("close") != -1 || hit.indexOf("mn") != -1 || hit.indexOf("mx") != -1) return
  sx = p.clientX
  sy = p.clientY
  ox = el.offsetLeft
  oy = el.offsetTop
  on = 1
  lift(el)
 }, { passive: true })
 document.addEventListener("touchmove", function(e) {
  if (!on) return
  var p = e.touches && e.touches[0]
  if (!p) return
  var box = clamp(el, ox + (p.clientX - sx), oy + (p.clientY - sy))
  el.style.left = box.x + "px"
  el.style.top = box.y + "px"
 }, { passive: true })
 document.addEventListener("touchend", function() {
  on = 0
 })
}

function narrow() {
 return window.innerWidth < 720
}

function iconFloor() {
 var icons = document.querySelectorAll(".app-icon")
 var n = 52
 var i
 for (i = 0; i < icons.length; i++) {
  var b = icons[i].offsetTop + icons[i].offsetHeight
  if (b > n) n = b
 }
 return n
}

function remember(el) {
 var s = slot(el)
 if (!s || s.home) return
 s.home = {
  l: el.style.left,
  t: el.style.top,
  w: el.style.width,
  h: el.style.height
 }
}

function spread(el) {
 var s = slot(el)
 if (!s || !s.home) return
 if (s.big) return
 el.style.left = s.home.l
 el.style.top = s.home.t
 el.style.width = s.home.w
 el.style.height = s.home.h
 s.home = null
}

function tuck(el) {
 if (!el) return
 if (el.className.indexOf("big") != -1) return
 if (el.style.display == "none") return
 if (!narrow()) {
  spread(el)
  return
 }
 remember(el)
 var edge = el.offsetWidth - el.clientWidth
 if (getComputedStyle(el).boxSizing == "border-box") edge = 0
 var w = window.innerWidth - 16 - edge
 if (w < 200) w = 200
 el.style.left = "8px"
 el.style.width = w + "px"
 var top = iconFloor() + 8
 if (top < 96) top = 96
 el.style.top = top + "px"
 var room = window.innerHeight - top - 12
 if (room < 160) room = 160
 var want = 320
 if (el.id == "notes" || el.id == "calculator") want = 460
 if (el.id == "browser" || el.id == "anime" || el.id == "clock") want = 400
 if (el.id == "pomo") want = 220
 if (el.id == "settings") want = 280
 if (el.id == "cam") want = 420
 if (el.id == "welcome") want = 0
 if (want > room) want = room
 if (want) el.style.height = want + "px"
 grow(el)
}

var phone = narrow() ? 1 : 0

function onSize() {
 var id
 for (id in slots) {
  var s = slots[id]
  if (!s.big) continue
  var el = s.el
  var extraW = el.offsetWidth - el.clientWidth
  var extraH = el.offsetHeight - el.clientHeight
  if (getComputedStyle(el).boxSizing == "border-box") {
   extraW = 0
   extraH = 0
  }
  el.style.top = "36px"
  el.style.left = "8px"
  el.style.width = (window.innerWidth - 16 - extraW) + "px"
  el.style.height = (window.innerHeight - 48 - extraH) + "px"
  fit(el, s)
 }
 var now = narrow() ? 1 : 0
 var list = document.querySelectorAll(".app-window")
 var i
 for (i = 0; i < list.length; i++) {
  if (list[i].className.indexOf("big") != -1) continue
  if (now != phone) tuck(list[i])
  else if (now && list[i].style.display != "none" && list[i].offsetLeft < 24) {
   var edge = list[i].offsetWidth - list[i].clientWidth
   if (getComputedStyle(list[i]).boxSizing == "border-box") edge = 0
   var w = window.innerWidth - 16 - edge
   if (w < 200) w = 200
   list[i].style.width = w + "px"
  }
 }
 phone = now
 layIcons()
}

window.addEventListener("resize", onSize)

function wrap(el) {
 if (el.querySelector(".fit")) return
 var box = document.createElement("div")
 box.className = "fit"
 var kids = []
 var i
 for (i = 0; i < el.children.length; i++) {
  if (el.children[i].className.indexOf("app-header") == -1) kids.push(el.children[i])
 }
 for (i = 0; i < kids.length; i++) box.appendChild(kids[i])
 el.appendChild(box)
}

function grips(el) {
 if (el.querySelector(".grip")) return
 var sides = ["n", "e", "s", "w", "se", "sw", "ne"]
 var i
 for (i = 0; i < sides.length; i++) {
  var g = document.createElement("div")
  g.className = "grip " + sides[i]
  g.setAttribute("data-d", sides[i])
  el.appendChild(g)
 }
}

var rs = null

function unbig(el) {
 var s = slot(el)
 if (!s || !s.big) return
 el.classList.remove("big")
 el.style.removeProperty("--sc")
 s.big = 0
}

document.addEventListener("mousedown", function(e) {
 var t = e.target
 var hit = t.className || ""
 if (hit.indexOf("grip") == -1) return
 var el = t.parentNode
 if (!el || String(el.className).indexOf("app-window") == -1) return
 e.preventDefault()
 e.stopPropagation()
 if (String(el.className).indexOf("big") == -1) markBase(el)
 unbig(el)
 var cs = getComputedStyle(el)
 rs = {
  el: el,
  d: t.getAttribute("data-d"),
  x: e.clientX,
  y: e.clientY,
  l: el.offsetLeft,
  t: el.offsetTop,
  w: parseFloat(cs.width),
  h: parseFloat(cs.height)
 }
 lift(el)
})

document.addEventListener("touchstart", function(e) {
 var t = e.target
 var hit = t.className || ""
 if (hit.indexOf("grip") == -1) return
 var el = t.parentNode
 if (!el || String(el.className).indexOf("app-window") == -1) return
 var p = e.touches && e.touches[0]
 if (!p) return
 unbig(el)
 var cs = getComputedStyle(el)
 rs = {
  el: el,
  d: t.getAttribute("data-d"),
  x: p.clientX,
  y: p.clientY,
  l: el.offsetLeft,
  t: el.offsetTop,
  w: parseFloat(cs.width),
  h: parseFloat(cs.height)
 }
 lift(el)
}, { passive: true })

function mins(id) {
 if (id == "calculator") return { w: 250, h: 280 }
 if (id == "clock") return { w: 280, h: 340 }
 if (id == "browser") return { w: 300, h: 220 }
 if (id == "music") return { w: 240, h: 220 }
 if (id == "notes") return { w: 280, h: 200 }
 if (id == "anime") return { w: 300, h: 220 }
 if (id == "welcome") return { w: 280, h: 200 }
 if (id == "pomo") return { w: 200, h: 150 }
 if (id == "cam") return { w: 260, h: 220 }
 return { w: 200, h: 150 }
}

function markBase(el) {
 var s = slot(el)
 if (!s || s.baseW) return
 if (el.clientWidth < 40) return
 var head = el.querySelector(".app-header")
 var hh = head ? head.offsetHeight : 40
 var fit = el.querySelector(".fit")
 var content = fit ? fit.scrollHeight : 0
 if (content < 24) content = el.clientHeight - hh
 if (content < 24) content = 24
 s.baseW = el.clientWidth
 s.baseH = content + hh
}

function grow(el) {
 var s = slot(el)
 if (!s || !s.baseW) return
 if (String(el.className).indexOf("big") != -1) return
 if (el.id == "browser" || el.id == "notes" || el.id == "cam") {
  el.style.setProperty("--sc", "1")
  if (el.id == "browser") {
   var frame = document.getElementById("web-frame")
   var bar = document.getElementById("web-bar")
   var top = el.querySelector(".app-header")
   var used = (top ? top.offsetHeight : 40) + (bar ? bar.offsetHeight : 40) + 8
   if (frame) frame.style.height = Math.max(120, el.clientHeight - used) + "px"
  }
  return
 }
 var fit = el.querySelector(".fit")
 if (fit) fit.style.width = s.baseW + "px"
 var head = el.querySelector(".app-header")
 var hh = head ? head.offsetHeight : 40
 var bh = s.baseH - hh
 if (bh < 30) bh = s.baseH
 var sx = el.clientWidth / s.baseW
 var sy = (el.clientHeight - hh) / bh
 var sc = sx < sy ? sx : sy
 if (sc < 0.45) sc = 0.45
 el.style.setProperty("--sc", String(Math.round(sc * 100) / 100))
}

function place(el, l, t, w, h) {
 el.style.left = Math.round(l) + "px"
 el.style.top = Math.round(t) + "px"
 el.style.width = Math.round(w) + "px"
 el.style.height = Math.round(h) + "px"
 grow(el)
}

function dragSize(e) {
 if (!rs) return
 var px = e.clientX
 var py = e.clientY
 if (e.touches && e.touches.length) {
  px = e.touches[0].clientX
  py = e.touches[0].clientY
 }
 var dx = px - rs.x
 var dy = py - rs.y
 var l = rs.l
 var t = rs.t
 var w = rs.w
 var h = rs.h
 var d = rs.d
 var fl = mins(rs.el.id)
 var minW = fl.w
 var minH = fl.h
 if (d == "e" || d == "ne" || d == "se") w = rs.w + dx
 if (d == "s" || d == "se" || d == "sw") h = rs.h + dy
 if (d == "w" || d == "sw") {
  w = rs.w - dx
  l = rs.l + dx
 }
 if (d == "n" || d == "ne") {
  h = rs.h - dy
  t = rs.t + dy
 }
 if (w < minW) {
  if (d == "w" || d == "sw") l = rs.l + (rs.w - minW)
  w = minW
 }
 if (h < minH) {
  if (d == "n" || d == "ne") t = rs.t + (rs.h - minH)
  h = minH
 }
 if (t < 38) {
  if (d == "n" || d == "ne") h = h - (38 - t)
  if (h < minH) h = minH
  t = 38
 }
 var extraW = rs.el.offsetWidth - rs.el.clientWidth
 var extraH = rs.el.offsetHeight - rs.el.clientHeight
 var maxR = window.innerWidth - extraW
 var maxB = window.innerHeight - extraH
 if (l + w > maxR) {
  if (d == "e" || d == "ne" || d == "se") w = maxR - l
  else l = maxR - w
 }
 if (t + h > maxB) {
  if (d == "s" || d == "se" || d == "sw") h = maxB - t
  else t = maxB - h
 }
 if (l < 0) {
  if (d == "w" || d == "sw") w = w + l
  l = 0
 }
 if (w < minW) {
  l = l - (minW - w)
  w = minW
  if (l < 0) l = 0
 }
 if (h < minH) h = minH
 place(rs.el, l, t, w, h)
}

document.addEventListener("mousemove", dragSize)
document.addEventListener("touchmove", function(e) {
 if (!rs) return
 dragSize(e)
}, { passive: true })

document.addEventListener("mouseup", function() {
 rs = null
})
document.addEventListener("touchend", function() {
 rs = null
})

function stashWidgets() {
 var bag = {}
 var nodes = document.querySelectorAll("#deskclock, .dy")
 var i
 for (i = 0; i < nodes.length; i++) {
  var el = nodes[i]
  var rec = { l: el.style.left, t: el.style.top }
  rec.gone = el.style.display == "none" ? 1 : 0
  rec.lock = el.getAttribute("data-lock") == "1" ? 1 : 0
  rec.paint = el.style.background || ""
  var input = el.querySelector("input")
  if (input) rec.text = input.value
  bag[el.id] = rec
 }
 try {
  localStorage.setItem("nook-widgets", JSON.stringify(bag))
 } catch (err) {
  console.log(err)
 }
}

function pullWidgets() {
 var raw
 try { raw = localStorage.getItem("nook-widgets") } catch (err) { return }
 if (!raw) return
 var bag
 try { bag = JSON.parse(raw) } catch (err) { return }
 var id
 for (id in bag) {
  var el = document.getElementById(id)
  if (!el || !bag[id]) continue
  if (bag[id].l && bag[id].l.indexOf("px") != -1) {
   el.style.left = bag[id].l
   el.style.right = "auto"
  }
  if (bag[id].t) el.style.top = bag[id].t
  if (bag[id].text) {
   var input = el.querySelector("input")
   if (input) input.value = bag[id].text
  }
  if (bag[id].gone) el.style.display = "none"
  if (bag[id].lock) {
   el.setAttribute("data-lock", "1")
   var lk = el.querySelectorAll(".wg button:not(.sw)")
   if (lk[0]) lk[0].textContent = "Free"
  }
  if (bag[id].paint) el.style.background = bag[id].paint
 }
}

function shove(el) {
 if (!el) return
 var sx = 0
 var sy = 0
 var ox = 0
 var oy = 0
 var on = 0
 function down(x, y) {
  if (el.getAttribute("data-lock") == "1") return
  sx = x
  sy = y
  ox = el.offsetLeft
  oy = el.offsetTop
  on = 1
 }
 el.addEventListener("mousedown", function(e) {
  if (e.button && e.button != 0) return
  down(e.clientX, e.clientY)
 })
 el.addEventListener("touchstart", function(e) {
  var p = e.touches && e.touches[0]
  if (!p) return
  down(p.clientX, p.clientY)
 }, { passive: true })
 document.addEventListener("mousemove", function(e) {
  if (!on) return
  var nx = ox + e.clientX - sx
  var ny = oy + e.clientY - sy
  if (Math.abs(e.clientX - sx) > 4 || Math.abs(e.clientY - sy) > 4) el.setAttribute("data-moved", "1")
  if (nx < 8) nx = 8
  if (ny < 36) ny = 36
  if (nx > window.innerWidth - 80) nx = window.innerWidth - 80
  if (ny > window.innerHeight - 40) ny = window.innerHeight - 40
  el.style.right = "auto"
  el.style.left = nx + "px"
  el.style.top = ny + "px"
 })
 document.addEventListener("touchmove", function(e) {
  if (!on) return
  var p = e.touches && e.touches[0]
  if (!p) return
  var nx = ox + p.clientX - sx
  var ny = oy + p.clientY - sy
  if (Math.abs(p.clientX - sx) > 4 || Math.abs(p.clientY - sy) > 4) el.setAttribute("data-moved", "1")
  if (nx < 8) nx = 8
  if (ny < 36) ny = 36
  if (nx > window.innerWidth - 80) nx = window.innerWidth - 80
  if (ny > window.innerHeight - 40) ny = window.innerHeight - 40
  el.style.right = "auto"
  el.style.left = nx + "px"
  el.style.top = ny + "px"
 }, { passive: true })
 document.addEventListener("mouseup", function() {
  if (!on) return
  on = 0
  stashWidgets()
 })
 document.addEventListener("touchend", function() {
  if (!on) return
  on = 0
  stashWidgets()
 })
}

function makeDate() {
 if (document.getElementById("deskdate")) return
 var d = document.createElement("div")
 d.id = "deskdate"
 d.className = "dy"
 var now = new Date()
 var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
 var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
 var mo = document.createElement("b")
 mo.textContent = days[now.getDay()]
 var num = document.createElement("span")
 num.textContent = now.getDate()
 var sub = document.createElement("div")
 sub.className = "sub"
 sub.textContent = months[now.getMonth()]
 d.appendChild(mo)
 d.appendChild(num)
 d.appendChild(sub)
 document.body.appendChild(d)
 shove(d)
 peg(d)
}

function peg(el) {
 if (!el || el.querySelector(".wg")) return
 var bar = document.createElement("div")
 bar.className = "wg"
 var lock = document.createElement("button")
 lock.type = "button"
 lock.textContent = "Fix"
 lock.addEventListener("click", function(e) {
  e.stopPropagation()
  if (el.getAttribute("data-lock") == "1") {
   el.removeAttribute("data-lock")
   lock.textContent = "Fix"
  } else {
   el.setAttribute("data-lock", "1")
   lock.textContent = "Free"
  }
  stashWidgets()
 })
 var hide = document.createElement("button")
 hide.type = "button"
 hide.textContent = "Hide"
 hide.addEventListener("click", function(e) {
  e.stopPropagation()
  el.style.display = "none"
  bar.style.display = "none"
  stashWidgets()
 })
 var paints = ["#ff6b6b", "#f0c230", "#4ecdc4", "#d9a5e8", "#8fde5d"]
 var i
 for (i = 0; i < paints.length; i++) {
  var sw = document.createElement("button")
  sw.type = "button"
  sw.className = "sw"
  sw.style.background = paints[i]
  sw.addEventListener("click", function(e) {
   e.stopPropagation()
   el.style.background = this.style.background
   stashWidgets()
  })
  bar.appendChild(sw)
 }
 bar.appendChild(lock)
 bar.appendChild(hide)
 el.appendChild(bar)
 el.addEventListener("contextmenu", function(e) {
  e.preventDefault()
  e.stopPropagation()
  bar.style.display = bar.style.display == "block" ? "none" : "block"
 })
}

function chipFace(id, title, top, app) {
 var el = document.createElement("div")
 el.id = id
 el.className = "dy chip"
 el.style.top = top + "px"
 el.style.right = "16px"
 var k = document.createElement("b")
 k.textContent = title
 var v = document.createElement("span")
 v.id = id + "-read"
 el.appendChild(k)
 el.appendChild(v)
 document.body.appendChild(el)
 shove(el)
 peg(el)
 el.addEventListener("click", function() {
  if (el.getAttribute("data-moved") == "1") {
   el.setAttribute("data-moved", "0")
   return
  }
  var win = document.getElementById(app)
  if (win) openWindow(win)
 })
 return el
}

function makeChips() {
 chipFace("desktimer", "Timer", 300, "pomo")
 document.getElementById("desktimer-read").textContent = "25:00"
 chipFace("deskmusic", "Music", 368, "music")
 document.getElementById("deskmusic-read").textContent = songs[0].name
 var pin = document.createElement("div")
 pin.id = "deskpin"
 pin.className = "dy chip"
 pin.style.top = "436px"
 pin.style.right = "16px"
 var lab = document.createElement("b")
 lab.textContent = "Pin"
 var box = document.createElement("input")
 box.id = "deskpin-box"
 box.placeholder = "Write something"
 pin.appendChild(lab)
 pin.appendChild(box)
 document.body.appendChild(pin)
 shove(pin)
 peg(pin)
 box.addEventListener("mousedown", function(e) { e.stopPropagation() })
 box.addEventListener("change", stashWidgets)
 chipFace("desknotes", "Notes", 504, "notes")
 var nr = document.getElementById("desknotes-read")
 if (nr) nr.textContent = String(getNotes().length)
 var photo = document.createElement("div")
 photo.id = "deskphoto"
 photo.className = "dy po"
 photo.style.top = "70px"
 photo.style.right = "240px"
 photo.style.left = "auto"
 var tack = document.createElement("div")
 tack.className = "tk"
 var img = document.createElement("img")
 img.src = "pics/4.png"
 img.alt = ""
 var n = 4
 var next = document.createElement("button")
 next.type = "button"
 next.textContent = "Next"
 next.addEventListener("click", function(e) {
  e.stopPropagation()
  n = n + 1
  if (n > 11) n = 1
  img.src = "pics/" + n + ".png"
 })
 var cap = document.createElement("div")
 cap.className = "cap"
 cap.textContent = "Anime"
 photo.appendChild(tack)
 photo.appendChild(img)
 photo.appendChild(cap)
 photo.appendChild(next)
 document.body.appendChild(photo)
 shove(photo)
 peg(photo)
 photo.addEventListener("click", function() {
  if (photo.getAttribute("data-moved") == "1") {
   photo.setAttribute("data-moved", "0")
   return
  }
  openWindow(document.getElementById("anime"))
 })
 stackChips()
 if (typeof updateTimer == "function") updateTimer()
}

function stackChips() {
 var ids = ["desktimer", "deskmusic", "deskpin", "desknotes"]
 var y = 300
 var date = document.getElementById("deskdate")
 if (date) y = date.offsetTop + date.offsetHeight + 12
 var i
 for (i = 0; i < ids.length; i++) {
  var el = document.getElementById(ids[i])
  if (!el) continue
  if (el.style.left) continue
  el.style.top = y + "px"
  y = y + el.offsetHeight + 10
 }
}

function makeMenu() {
 var box = document.createElement("div")
 box.id = "deskmenu"
 var names = [
  ["welcome", "Welcome"],
  ["anime", "Anime"],
  ["notes", "Notes"],
  ["calculator", "Calc"],
  ["music", "Music"],
  ["browser", "Web"],
  ["pomo", "Timer"],
  ["clock", "Clock"],
  ["settings", "Settings"],
  ["cam", "Camera"]
 ]
 var i
 for (i = 0; i < names.length; i++) {
  var b = document.createElement("button")
  b.type = "button"
  b.textContent = names[i][1]
  b.setAttribute("data-app", names[i][0])
  box.appendChild(b)
 }
 var bits = [
  ["deskclock", "Clock"],
  ["deskdate", "Date"],
  ["desktimer", "Timer"],
  ["deskmusic", "Music"],
  ["deskpin", "Pin"],
  ["desknotes", "Notes"],
  ["deskphoto", "Photo"]
 ]
 var list = document.createElement("div")
 list.id = "wglist"
 var toggle = document.createElement("button")
 toggle.type = "button"
 toggle.textContent = "Widgets"
 toggle.addEventListener("click", function(e) {
  e.stopPropagation()
  list.style.display = list.style.display == "block" ? "none" : "block"
 })
 box.appendChild(toggle)
 for (i = 0; i < bits.length; i++) {
  var show = document.createElement("button")
  show.type = "button"
  show.textContent = bits[i][1]
  show.setAttribute("data-bit", bits[i][0])
  show.addEventListener("click", function(e) {
   e.stopPropagation()
   var id = this.getAttribute("data-bit")
   var node = document.getElementById(id)
   if (!node) return
   node.style.display = ""
   stashWidgets()
  })
  list.appendChild(show)
 }
 box.appendChild(list)
 document.body.appendChild(box)
 box.addEventListener("click", function(e) {
  var id = e.target.getAttribute && e.target.getAttribute("data-app")
  if (!id) return
  var win = document.getElementById(id)
  if (win) openWindow(win)
  if (id == "clock" && desk) desk.style.display = "none"
  box.style.display = "none"
 })
 document.addEventListener("contextmenu", function(e) {
  var t = e.target
  if (t.closest && t.closest(".app-window, .app-icon, .dy, #deskclock, #deskmenu, #taskbar")) return
  e.preventDefault()
  box.setAttribute("data-hold", "1")
  box.style.left = e.clientX + "px"
  box.style.top = e.clientY + "px"
  box.style.display = "block"
 })
 document.addEventListener("click", function(e) {
  if (box.getAttribute("data-hold") == "1") {
   box.setAttribute("data-hold", "0")
   return
  }
  if (e.target && e.target.closest && e.target.closest("#deskmenu")) return
  box.style.display = "none"
 })
}

shove(desk)
peg(desk)
makeDate()
makeChips()
pullWidgets()
makeMenu()

function boot() {
 var list = document.querySelectorAll(".app-window")
 var i
 for (i = 0; i < list.length; i++) {
  wrap(list[i])
  grips(list[i])
  slot(list[i])
  order.push(list[i])
  grab(list[i])
 }
 pile()
 var j
 for (j = 0; j < list.length; j++) {
  if (getComputedStyle(list[j]).display == "none") continue
  markBase(list[j])
  grow(list[j])
 }
}
boot()

function setWall(kind) {
 var bg = document.getElementById("background")
 if (!bg) return
 if (!kind || kind == "sofa") {
  bg.className = ""
  bg.style.backgroundColor = ""
  kind = "sofa"
 } else {
  bg.className = "flat"
  bg.style.backgroundColor = kind
 }
 var btns = document.querySelectorAll("#walls button")
 var i
 for (i = 0; i < btns.length; i++) {
  if (btns[i].getAttribute("data-wall") == kind) btns[i].className = "on"
  else btns[i].className = ""
 }
 try {
  localStorage.setItem("nook-wall", kind)
 } catch (err) {
  console.log(err)
 }
}
var kept = "sofa"
try { kept = localStorage.getItem("nook-wall") || "sofa" } catch (err) { console.log(err) }
setWall(kept)

var camScreen = document.querySelector("#cam")
var camStream = null
document.querySelector("#close-cam-tab").addEventListener("click", function() { closeWindow(camScreen) })
document.querySelector("#open-cam-tab").addEventListener("click", function() { openWindow(camScreen) })
camScreen.addEventListener("mousedown", function() { tap(camScreen) })

function pullRoll() {
 try {
  var raw = localStorage.getItem("nook-cam")
  if (!raw) return []
  return JSON.parse(raw)
 } catch (err) {
  console.log(err)
  return []
 }
}
function stashRoll(list) {
 try {
  localStorage.setItem("nook-cam", JSON.stringify(list))
 } catch (err) {
  console.log(err)
  document.getElementById("cam-note").textContent = "Could not save that shot"
 }
}
function killCam() {
 if (!camStream) return
 var tracks = camStream.getTracks()
 var i
 for (i = 0; i < tracks.length; i++) tracks[i].stop()
 camStream = null
 var vid = document.getElementById("cam-view")
 if (vid) vid.srcObject = null
}
function showRoll() {
 var box = document.getElementById("cam-roll")
 if (!box) return
 box.innerHTML = ""
 var list = pullRoll()
 var i
 for (i = 0; i < list.length; i++) {
  var slot = document.createElement("div")
  slot.className = "shot"
  var img = document.createElement("img")
  img.src = list[i]
  img.setAttribute("data-i", String(i))
  var x = document.createElement("button")
  x.type = "button"
  x.textContent = "x"
  x.setAttribute("data-i", String(i))
  slot.appendChild(img)
  slot.appendChild(x)
  box.appendChild(slot)
 }
}
function openCam() {
 killCam()
 var note = document.getElementById("cam-note")
 if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  note.textContent = "Camera is blocked in this browser"
  return
 }
 navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false }).then(function(stream) {
  camStream = stream
  var vid = document.getElementById("cam-view")
  vid.srcObject = stream
  note.textContent = ""
 }).catch(function(err) {
  console.log(err)
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function(stream) {
   camStream = stream
   var vid = document.getElementById("cam-view")
   vid.srcObject = stream
   note.textContent = ""
  }).catch(function(err2) {
   console.log(err2)
   if (err2 && err2.name == "NotAllowedError") {
    note.textContent = "Camera is blocked. Allow it and hit Open again."
   } else {
    note.textContent = "No camera turned up. Hit Open again."
   }
  })
 })
}
function snapCam() {
 var vid = document.getElementById("cam-view")
 if (!vid || !vid.videoWidth) {
  document.getElementById("cam-note").textContent = "Open the camera first"
  return
 }
 var c = document.getElementById("cam-grab")
 var w = vid.videoWidth
 var h = vid.videoHeight
 if (w > 280) {
  h = Math.round(h * 280 / w)
  w = 280
 }
 c.width = w
 c.height = h
 var g = c.getContext("2d")
 g.translate(w, 0)
 g.scale(-1, 1)
 g.drawImage(vid, 0, 0, w, h)
 var url = c.toDataURL("image/jpeg", 0.6)
 var list = pullRoll()
 list.unshift(url)
 if (list.length > 6) list.length = 6
 stashRoll(list)
 showRoll()
}
document.getElementById("cam-go").addEventListener("click", function(e) {
 e.stopPropagation()
 openCam()
})
document.getElementById("cam-snap").addEventListener("click", function(e) {
 e.stopPropagation()
 snapCam()
})
document.getElementById("cam-roll").addEventListener("click", function(e) {
 e.stopPropagation()
 var i = e.target.getAttribute && e.target.getAttribute("data-i")
 if (i == null) return
 var list = pullRoll()
 var n = Number(i)
 if (e.target.tagName == "BUTTON") {
  var shown = document.getElementById("cam-big")
  if (shown && shown.getAttribute("src") == list[n]) {
   shown.className = ""
   shown.removeAttribute("src")
  }
  list.splice(n, 1)
  stashRoll(list)
  showRoll()
  return
 }
 var big = document.getElementById("cam-big")
 if (!big || !list[n]) return
 big.src = list[n]
 big.className = "on"
})
showRoll()

function layIcons() {
 var icons = document.querySelectorAll(".app-icon")
 var col = 2
 var x0 = 12
 var y0 = 58
 var cw = 86
 var ch = 84
 var i
 for (i = 0; i < icons.length; i++) {
  var el = icons[i]
  if (el.getAttribute("data-set") == "1") continue
  var c = i % col
  var r = Math.floor(i / col)
  el.style.left = (x0 + c * cw) + "px"
  el.style.top = (y0 + r * ch) + "px"
 }
}
function stashIcons() {
 var bag = {}
 var icons = document.querySelectorAll(".app-icon")
 var i
 for (i = 0; i < icons.length; i++) {
  var el = icons[i]
  if (el.getAttribute("data-set") != "1") continue
  bag[el.id] = { l: el.style.left, t: el.style.top }
 }
 try {
  localStorage.setItem("nook-icons", JSON.stringify(bag))
 } catch (err) {
  console.log(err)
 }
}
function pullIcons() {
 var raw
 try { raw = localStorage.getItem("nook-icons") } catch (err) { return }
 if (!raw) return
 var bag
 try { bag = JSON.parse(raw) } catch (err) { return }
 var id
 for (id in bag) {
  var el = document.getElementById(id)
  if (!el || !bag[id] || !bag[id].l) continue
  el.style.left = bag[id].l
  el.style.top = bag[id].t
  el.setAttribute("data-set", "1")
 }
}
function dragIcon(el) {
 var sx = 0
 var sy = 0
 var ox = 0
 var oy = 0
 var on = 0
 function down(x, y) {
  sx = x
  sy = y
  ox = el.offsetLeft
  oy = el.offsetTop
  on = 1
  el.setAttribute("data-moved", "0")
 }
 el.addEventListener("mousedown", function(e) {
  if (e.button && e.button != 0) return
  down(e.clientX, e.clientY)
 })
 el.addEventListener("touchstart", function(e) {
  var p = e.touches && e.touches[0]
  if (!p) return
  down(p.clientX, p.clientY)
 }, { passive: true })
 document.addEventListener("mousemove", function(e) {
  if (!on) return
  var nx = ox + e.clientX - sx
  var ny = oy + e.clientY - sy
  if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 4) el.setAttribute("data-moved", "1")
  if (nx < 4) nx = 4
  if (ny < 40) ny = 40
  if (nx > window.innerWidth - 70) nx = window.innerWidth - 70
  if (ny > window.innerHeight - 60) ny = window.innerHeight - 60
  el.style.left = nx + "px"
  el.style.top = ny + "px"
 })
 document.addEventListener("touchmove", function(e) {
  if (!on) return
  var p = e.touches && e.touches[0]
  if (!p) return
  var nx = ox + p.clientX - sx
  var ny = oy + p.clientY - sy
  if (Math.abs(p.clientX - sx) + Math.abs(p.clientY - sy) > 4) el.setAttribute("data-moved", "1")
  if (nx < 4) nx = 4
  if (ny < 40) ny = 40
  el.style.left = nx + "px"
  el.style.top = ny + "px"
 }, { passive: true })
 document.addEventListener("mouseup", function() {
  if (!on) return
  on = 0
  if (el.getAttribute("data-moved") == "1") {
   el.setAttribute("data-set", "1")
   stashIcons()
  }
 })
 document.addEventListener("touchend", function() {
  if (!on) return
  on = 0
  if (el.getAttribute("data-moved") == "1") {
   el.setAttribute("data-set", "1")
   stashIcons()
  }
 })
}
document.addEventListener("click", function(e) {
 var ic = e.target.closest && e.target.closest(".app-icon")
 if (!ic) return
 if (ic.getAttribute("data-moved") != "1") return
 e.stopPropagation()
 e.preventDefault()
 ic.setAttribute("data-moved", "0")
}, true)
pullIcons()
layIcons()
var iconNodes = document.querySelectorAll(".app-icon")
var ii
for (ii = 0; ii < iconNodes.length; ii++) dragIcon(iconNodes[ii])











 