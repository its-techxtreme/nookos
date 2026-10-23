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
}
function openWindow(element) {
  element.style.display = "flex"
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
 pomo: "open-pomo-tab"
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
 if (el.id == "browser" || el.id == "notes") sc = 1
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
 if (el.id == "pomo" || el.id == "welcome") want = 260
 if (want > room) want = room
 el.style.height = want + "px"
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
 return { w: 200, h: 150 }
}

function place(el, l, t, w, h) {
 el.style.left = Math.round(l) + "px"
 el.style.top = Math.round(t) + "px"
 el.style.width = Math.round(w) + "px"
 el.style.height = Math.round(h) + "px"
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
}
boot()











 