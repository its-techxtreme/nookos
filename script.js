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
var welcomeSet = document.getElementById("welcome-set")
if (welcomeSet) welcomeSet.addEventListener("click", function() {
 openWindow(document.getElementById("settings"))
})

function closeWindow(element) {
  element.style.display = "none"
  if (element && element.id == "cam") killCam()
  if (element && element.id == "spot") {
    if (spotCtl) spotCtl.pause()
    else {
      var box = document.getElementById("spot-frame")
      var inner = box && box.querySelector && box.querySelector("iframe")
      if (inner) inner.src = "about:blank"
    }
  }
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
 cam: "open-cam-tab",
 gal: "open-gal-tab",
 widgets: "open-wig-tab",
 term: "open-term-tab"
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
var calcMode = "basic"
function appendToDisplay(input) {
 display.value += input
}
function clearDisplay() {
 display.value = ""
}
function backDisplay() {
 display.value = display.value.slice(0, -1)
}
function dsin(x) { return Math.sin(x * Math.PI / 180) }
function dcos(x) { return Math.cos(x * Math.PI / 180) }
function dtan(x) { return Math.tan(x * Math.PI / 180) }
function calculate() {
 try {
  var raw = display.value
  raw = raw.replace(/π/g, "Math.PI")
  raw = raw.replace(/√/g, "Math.sqrt")
  raw = raw.replace(/\^/g, "**")
  raw = raw.replace(/sin/g, "dsin")
  raw = raw.replace(/cos/g, "dcos")
  raw = raw.replace(/tan/g, "dtan")
  raw = raw.replace(/log/g, "Math.log10")
  raw = raw.replace(/ln/g, "Math.log")
  raw = raw.replace(/%/g, "/100")
  if (!/^[0-9+\-*/()., A-Za-z*]+$/.test(raw)) {
   display.value = "Error"
   return
  }
  var n = Function("dsin", "dcos", "dtan", "return (" + raw + ")")(dsin, dcos, dtan)
  if (typeof n != "number" || n != n || n == Infinity) {
   display.value = "Error"
   return
  }
  display.value = String(Math.round(n * 1e10) / 1e10)
 } catch (error) {
  display.value = "Error"
 }
}
var basicKeys = ["C","\u232b","%","/","7","8","9","*","4","5","6","-","1","2","3","+","0",".","(",")","="]
var sciKeys = ["sin","cos","tan","\u221a","log","ln","\u03c0","^","C","\u232b","%","/","7","8","9","*","4","5","6","-","1","2","3","+","0",".","(",")","="]
function paintKeys() {
 var box = document.getElementById("keys")
 var extra = document.getElementById("calc-extra")
 if (!box || !extra) return
 var sci = calcMode == "sci"
 box.style.display = (calcMode == "basic" || sci) ? "grid" : "none"
 extra.style.display = (calcMode == "basic" || sci) ? "none" : "block"
 box.innerHTML = ""
 extra.innerHTML = ""
 if (calcMode == "basic" || sci) {
  var list = sci ? sciKeys : basicKeys
  var i
  for (i = 0; i < list.length; i++) {
   var b = document.createElement("button")
   b.type = "button"
   b.className = "calc-button"
   b.textContent = list[i]
   if (list[i] == "=") b.className += " eq"
   else if ("+-*/%^".indexOf(list[i]) != -1 || list[i] == "\u221a") b.className += " op"
   box.appendChild(b)
  }
  return
 }
 if (calcMode == "grade") {
  var note = document.createElement("p")
  note.textContent = "got / out of"
  extra.appendChild(note)
  var hold = document.createElement("div")
  hold.id = "grade-rows"
  var r
  for (r = 0; r < 3; r++) {
   var row = document.createElement("div")
   row.className = "gr"
   var a = document.createElement("input")
   a.placeholder = "got"
   var slash = document.createElement("span")
   slash.textContent = "/"
   var c = document.createElement("input")
   c.placeholder = "out of"
   row.appendChild(a)
   row.appendChild(slash)
   row.appendChild(c)
   hold.appendChild(row)
  }
  extra.appendChild(hold)
  var add = document.createElement("button")
  add.type = "button"
  add.id = "grade-add"
  add.textContent = "Add row"
  var gout = document.createElement("p")
  gout.id = "grade-out"
  gout.textContent = "average shows here"
  extra.appendChild(add)
  extra.appendChild(gout)
  return
 }
 var bill = document.createElement("input")
 bill.id = "tip-bill"
 bill.placeholder = "bill"
 var pct = document.createElement("input")
 pct.id = "tip-pct"
 pct.placeholder = "tip %"
 pct.value = "15"
 var ppl = document.createElement("input")
 ppl.id = "tip-ppl"
 ppl.placeholder = "people"
 ppl.value = "1"
 var go = document.createElement("button")
 go.type = "button"
 go.id = "tip-go"
 go.textContent = "Split"
 var ans = document.createElement("p")
 ans.id = "tip-out"
 ans.textContent = "tip and each person"
 extra.appendChild(bill)
 extra.appendChild(pct)
 extra.appendChild(ppl)
 extra.appendChild(go)
 extra.appendChild(ans)
}
function gradeMath() {
 var rows = document.querySelectorAll("#grade-rows .gr")
 var got = 0
 var out = 0
 var n = 0
 var i
 for (i = 0; i < rows.length; i++) {
  var ins = rows[i].querySelectorAll("input")
  var g = parseFloat(ins[0].value)
  var o = parseFloat(ins[1].value)
  if (g != g || o != o || !o) continue
  got += g
  out += o
  n++
 }
 var face = document.getElementById("grade-out")
 if (!face) return
 if (!n) { face.textContent = "type a score first"; return }
 var pct = Math.round((got / out) * 1000) / 10
 face.textContent = got + " / " + out + "   " + pct + "%"
}
function tipMath() {
 var bill = parseFloat(document.getElementById("tip-bill").value)
 var pct = parseFloat(document.getElementById("tip-pct").value)
 var ppl = parseFloat(document.getElementById("tip-ppl").value)
 var face = document.getElementById("tip-out")
 if (!face) return
 if (bill != bill || pct != pct || !ppl) { face.textContent = "need a bill"; return }
 var tip = bill * pct / 100
 var each = (bill + tip) / ppl
 face.textContent = "tip " + (Math.round(tip * 100) / 100) + "   each " + (Math.round(each * 100) / 100)
}
document.getElementById("calc-modes").addEventListener("click", function(e) {
 var mode = e.target.getAttribute && e.target.getAttribute("data-mode")
 if (!mode) return
 calcMode = mode
 var btns = document.querySelectorAll("#calc-modes button")
 var i
 for (i = 0; i < btns.length; i++) btns[i].className = btns[i].getAttribute("data-mode") == mode ? "on" : ""
 paintKeys()
 sizeCalc()
})
document.getElementById("keys").addEventListener("click", function(e) {
 var t = e.target.textContent
 if (!t || e.target.tagName != "BUTTON") return
 if (t == "C") clearDisplay()
 else if (t == "\u232b") backDisplay()
 else if (t == "=") calculate()
 else if (t == "sin" || t == "cos" || t == "tan" || t == "log" || t == "ln") appendToDisplay(t + "(")
 else if (t == "\u221a") appendToDisplay("\u221a(")
 else appendToDisplay(t)
})
document.getElementById("calc-extra").addEventListener("click", function(e) {
 if (e.target.id == "grade-add") {
  var hold = document.getElementById("grade-rows")
  if (!hold) return
  var row = document.createElement("div")
  row.className = "gr"
  var a = document.createElement("input")
  a.placeholder = "got"
  var slash = document.createElement("span")
  slash.textContent = "/"
  var c = document.createElement("input")
  c.placeholder = "out of"
  row.appendChild(a)
  row.appendChild(slash)
  row.appendChild(c)
  hold.appendChild(row)
  return
 }
 if (e.target.id == "tip-go") tipMath()
})
document.getElementById("calc-extra").addEventListener("input", function() {
 if (calcMode == "grade") gradeMath()
})
function sizeCalc() {
 var el = document.getElementById("calculator")
 if (!el || String(el.className).indexOf("big") != -1) return
 var box = { basic: [300, 500], sci: [300, 580], grade: [360, 440], tip: [300, 360] }
 var pick = box[calcMode] || box.basic
 var w = pick[0]
 var h = pick[1]
 if (narrow()) {
  if (w > window.innerWidth - 16) w = window.innerWidth - 16
  if (h > window.innerHeight - headH() - 12) h = window.innerHeight - headH() - 12
 }
 el.style.width = w + "px"
 el.style.height = h + "px"
 grow(el)
}
paintKeys()

var musicScreen = document.querySelector("#music")
document.querySelector("#close-music-tab").addEventListener("click", function() { closeWindow(musicScreen) })
document.querySelector("#open-music-tab").addEventListener("click", function() { openWindow(musicScreen) })
musicScreen.addEventListener("mousedown", function() { tap(musicScreen) })
var spotScreen = document.querySelector("#spot")
document.querySelector("#close-spot-tab").addEventListener("click", function() { closeWindow(spotScreen) })
document.getElementById("open-spot").addEventListener("click", function(e) {
 e.stopPropagation()
 openWindow(spotScreen)
})
spotScreen.addEventListener("mousedown", function() { tap(spotScreen) })
function spotUri() {
 var box = document.getElementById("spot-box")
 var raw = box ? box.value : ""
 raw = raw.replace(/^https?:\/\//, "")
 raw = raw.replace(/^open\.spotify\.com\//, "")
 raw = raw.split("?")[0]
 if (raw.indexOf("embed/") == 0) raw = raw.slice(6)
 if (!raw) raw = "playlist/79FMSJmmkwHxTngEM7fxr6"
 var bits = raw.split("/")
 var kind = bits.length > 1 ? bits[0] : "playlist"
 var id = bits.length > 1 ? bits[1] : bits[0]
 return "spotify:" + kind + ":" + id
}
var spotCtl = null
function loadSpot() {
 if (spotCtl) spotCtl.loadUri(spotUri())
}
window.onSpotifyIframeApiReady = function(api) {
 var el = document.getElementById("spot-frame")
 if (!el) return
 api.createController(el, { uri: spotUri(), width: "100%", height: "360" }, function(ctl) {
  spotCtl = ctl
  var made = document.querySelector("#spot iframe")
  if (made) made.id = "spot-frame"
  ctl.addListener("playback_update", function(e) {
   var d = e && e.data
   if (d && d.isPaused == false) hushLocal()
  })
  ctl.addListener("playback_started", function() { hushLocal() })
 })
}
var spotJs = document.createElement("script")
spotJs.src = "https://open.spotify.com/embed/iframe-api/v1"
document.body.appendChild(spotJs)
window.addEventListener("blur", function() {
 setTimeout(function() {
  var a = document.activeElement
  if (!a) return
  if (a.id == "spot-frame" || (a.closest && a.closest("#spot"))) hushLocal()
 }, 0)
})
document.getElementById("spot-go").addEventListener("click", function(e) {
 e.stopPropagation()
 loadSpot()
})

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
 { image: "pics/10.png", name: "Future Bass", artist: "Sigma", audio: "sounds/sigmamusicart-no-copyright-music-537751.mp3" },
 { image: "pics/6.png", name: "Lofi Beat", artist: "Loksii", audio: "sounds/loksii-no-copyright-music-211881.mp3" },
 { image: "pics/8.png", name: "Vlog Pop", artist: "NastelBom", audio: "sounds/nastelbom-no-copyright-music-617079.mp3" },
 { image: "pics/11.png", name: "Electro", artist: "Sub Clair", audio: "sounds/sub_clair-no-copyright-music-instrumental-612388.mp3" }
]
var audio = document.createElement("audio")
audio.volume = 1
document.body.appendChild(audio)
var currentSongIndex = 0
var songRepeat = false
var bag = {}
var ctx = null
var node = null
var started = 0
var offset = 0
var live = 0
function stopNode() {
 live = 0
 if (!node) return
 try { node.stop() } catch (err) { console.log(err) }
 node = null
}
var holdSpot = 0
function hushLocal() {
 if (Date.now() < holdSpot) return
 if (!live && audio.paused) return
 if (live) offset = clockPos()
 stopNode()
 audio.pause()
 playpauseButton.innerHTML = "play"
}
function hushSpot() {
 holdSpot = Date.now() + 700
 if (spotCtl) spotCtl.pause()
}
function clockPos() {
 if (!live || !ctx) return offset
 return offset + (ctx.currentTime - started)
}
function spin(buf) {
 hushSpot()
 stopNode()
 if (!ctx) return
 node = ctx.createBufferSource()
 node.buffer = buf
 node.connect(ctx.destination)
 if (offset >= buf.duration) offset = 0
 started = ctx.currentTime
 node.start(0, offset)
 live = 1
 playpauseButton.innerHTML = "pause"
 node.onended = function() {
  if (!live) return
  live = 0
  if (songRepeat) {
   offset = 0
   spin(buf)
   return
  }
  offset = 0
  playpauseButton.innerHTML = "play"
 }
}
function pump(andGo) {
 var song = songs[currentSongIndex]
 var Ctx = window.AudioContext || window.webkitAudioContext
 if (!Ctx) return
 if (!ctx) ctx = new Ctx()
 var resume = ctx.resume()
 function go() {
  if (bag[song.audio]) {
   songSlider.max = bag[song.audio].duration
   if (andGo) spin(bag[song.audio])
   return
  }
  fetch(song.audio).then(function(r) {
   if (!r.ok) throw new Error(r.status)
   return r.arrayBuffer()
  }).then(function(raw) {
   return ctx.decodeAudioData(raw)
  }).then(function(buf) {
   bag[song.audio] = buf
   songSlider.max = buf.duration
   if (andGo && songs[currentSongIndex].audio == song.audio) spin(buf)
  }).catch(function(err) {
   console.log(err)
   playpauseButton.innerHTML = "play"
   songArtist.innerText = "no sound"
  })
 }
 if (resume && resume.then) resume.then(go, go)
 else go()
}
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
 if (live || !audio.paused) {
  if (live) offset = clockPos()
  stopNode()
  audio.pause()
  playpauseButton.innerHTML = "play"
  return
 }
 var Ctx = window.AudioContext || window.webkitAudioContext
 if (Ctx) {
  if (!ctx) ctx = new Ctx()
  ctx.resume()
 }
 hushSpot()
 var kick = audio.play()
 playpauseButton.innerHTML = "pause"
 if (kick && kick.then) kick.then(function() {
  stopNode()
 }).catch(function() {
  audio.pause()
  pump(1)
 })
 else pump(1)
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
 stopNode()
 audio.pause()
 offset = 0
 audio.src = song.audio
 playpauseButton.innerHTML = "play"
 songSlider.value = 0
 audio.onloadedmetadata = function() {
  songSlider.max = audio.duration
 }
}
songSlider.addEventListener("change", function() {
 offset = Number(songSlider.value) || 0
 if (audio.duration) audio.currentTime = offset
 if (live) {
  var buf = bag[songs[currentSongIndex].audio]
  if (buf) spin(buf)
 }
})
setInterval(function() {
 if (live) songSlider.value = clockPos()
 else if (audio.duration && !audio.paused) songSlider.value = audio.currentTime
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
var wigScreen = document.querySelector("#widgets")
document.querySelector("#close-wig-tab").addEventListener("click", function() { closeWindow(wigScreen) })
document.querySelector("#open-wig-tab").addEventListener("click", function() {
 openWindow(wigScreen)
 paintWig()
})
wigScreen.addEventListener("mousedown", function() { tap(wigScreen) })
document.getElementById("walls").addEventListener("click", function(e) {
 var t = e.target && e.target.closest ? e.target.closest("button") : e.target
 var kind = t && t.getAttribute && t.getAttribute("data-wall")
 if (!kind) return
 setWall(kind)
})

var startButton = document.getElementById("start")
var stopButton = document.getElementById("stop")
var resetButton = document.getElementById("reset")
var pomoTimer = document.getElementById("pomo-timer")
var timeLeft = 1500
var setFor = 1500
var going = 0
var interval = null
function pad2(n) {
 n = Math.floor(n)
 if (n < 0) n = 0
 if (n < 10) return "0" + n
 return String(n)
}
function faceText(sec) {
 var h = Math.floor(sec / 3600)
 var m = Math.floor((sec % 3600) / 60)
 var s = sec % 60
 if (h) return h + ":" + pad2(m) + ":" + pad2(s)
 return pad2(m) + ":" + pad2(s)
}
function readSet() {
 var h = parseInt(document.getElementById("set-h").value, 10)
 var m = parseInt(document.getElementById("set-m").value, 10)
 var s = parseInt(document.getElementById("set-s").value, 10)
 if (!h || h < 0) h = 0
 if (!m || m < 0) m = 0
 if (!s || s < 0) s = 0
 var total = h * 3600 + m * 60 + s
 if (total > 99 * 3600) total = 99 * 3600
 h = Math.floor(total / 3600)
 m = Math.floor((total % 3600) / 60)
 s = total % 60
 document.getElementById("set-h").value = h
 document.getElementById("set-m").value = m
 document.getElementById("set-s").value = s
 return total
}
function paintFlip() {
 var h = Math.floor(timeLeft / 3600)
 var m = Math.floor((timeLeft % 3600) / 60)
 var s = timeLeft % 60
 var a = document.getElementById("fl-h")
 var b = document.getElementById("fl-m")
 var c = document.getElementById("fl-s")
 if (a) a.textContent = pad2(h)
 if (b) b.textContent = pad2(m)
 if (c) c.textContent = pad2(s)
 var face = document.getElementById("desktimer-read")
 if (face) face.textContent = faceText(timeLeft)
}
function updateTimer() {
 paintFlip()
}
var alarm = null
function beep() {
 if (alarm) return
 try {
  var Ctx = window.AudioContext || window.webkitAudioContext
  var ctx = new Ctx()
  var o = ctx.createOscillator()
  var g = ctx.createGain()
  o.type = "square"
  o.frequency.value = 880
  g.gain.value = 0.22
  o.connect(g)
  g.connect(ctx.destination)
  o.start()
  alarm = { ctx: ctx, o: o }
 } catch (err) {
  if (pomoTimer) pomoTimer.setAttribute("data-ding", "1")
 }
}
function hush() {
 if (!alarm) return
 try { alarm.o.stop() } catch (err) {}
 try { alarm.ctx.close() } catch (err) {}
 alarm = null
}
function startTimer() {
 hush()
 if (interval) return
 if (!going) {
  timeLeft = readSet()
  setFor = timeLeft
 }
 if (timeLeft <= 0) return
 going = 1
 updateTimer()
 interval = setInterval(function() {
  timeLeft--
  if (timeLeft < 0) timeLeft = 0
  updateTimer()
  if (timeLeft === 0) {
   clearInterval(interval)
   interval = null
   going = 0
   beep()
  }
 }, 1000)
}
function stopTimer() {
 clearInterval(interval)
 interval = null
 hush()
}
function resetTimer() {
 clearInterval(interval)
 interval = null
 hush()
 going = 0
 timeLeft = readSet()
 if (!timeLeft) timeLeft = setFor || 1500
 setFor = timeLeft
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
 el.style.top = headH() + "px"
 el.style.left = "8px"
 el.style.width = (window.innerWidth - 16 - extraW) + "px"
 el.style.height = (window.innerHeight - headH() - 12 - extraH) + "px"
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
 if (el.id == "browser" || el.id == "notes" || el.id == "cam" || el.id == "spot") sc = 1
 el.style.setProperty("--sc", String(Math.round(sc * 100) / 100))
}

function headH() {
 var bar = document.getElementById("taskbar")
 if (!bar || bar.style.display == "none") return 8
 return bar.offsetHeight + 6
}
function clamp(el, nx, ny) {
 var keep = 72
 if (ny < headH()) ny = headH()
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
  e.preventDefault()
 }, { passive: false })
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
  el.style.transform = ""
  el.style.transformOrigin = ""
  spread(el)
  return
 }
 remember(el)
 el.style.left = "8px"
 el.style.top = (headH() + 6) + "px"
 el.style.transformOrigin = "top left"
 var natural = el.offsetWidth || 380
 var sc = 0.78
 if (natural * sc > window.innerWidth - 12) sc = (window.innerWidth - 12) / natural
 if (sc > 0.78) sc = 0.78
 if (sc < 0.52) sc = 0.52
 el.style.transform = "scale(" + (Math.round(sc * 100) / 100) + ")"
 var room = window.innerHeight - headH() - 18
 if (room < 160) room = 160
 room = Math.round(room / sc)
 var want = 320
 if (el.id == "notes" || el.id == "calculator") want = 460
 if (el.id == "browser" || el.id == "anime" || el.id == "clock" || el.id == "spot") want = 400
 if (el.id == "pomo") want = 220
 if (el.id == "music") want = 560
 if (el.id == "settings") want = 520
 if (el.id == "widgets") want = 460
 if (el.id == "cam") want = 420
 if (el.id == "gal") want = 480
 if (el.id == "term") want = 380
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
 }
 phone = now
 layIcons()
 fitLoose()
 phoneWidgets()
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
 var sides = ["n", "e", "s", "w", "se", "sw", "ne", "nw"]
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
 if (id == "calculator") {
  if (calcMode == "grade") return { w: 330, h: 400 }
  if (calcMode == "sci") return { w: 280, h: 500 }
  if (calcMode == "tip") return { w: 260, h: 320 }
  return { w: 280, h: 440 }
 }
 if (id == "clock") return { w: 280, h: 340 }
 if (id == "browser") return { w: 300, h: 220 }
 if (id == "music") return { w: 240, h: 220 }
 if (id == "notes") return { w: 280, h: 200 }
 if (id == "anime") return { w: 300, h: 220 }
 if (id == "welcome") return { w: 320, h: 340 }
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
 if (el.id == "browser" || el.id == "notes" || el.id == "cam" || el.id == "spot" || el.id == "calculator") {
  el.style.setProperty("--sc", "1")
  if (el.id == "notes") {
   var paper = document.getElementById("notes-content")
   var topbar = el.querySelector(".app-header")
   var used = topbar ? topbar.offsetHeight : 40
   if (paper) paper.style.height = Math.max(120, el.clientHeight - used) + "px"
  }
  if (el.id == "browser" || el.id == "spot") {
   var frame = document.getElementById(el.id == "spot" ? "spot-frame" : "web-frame")
   var bar = document.getElementById(el.id == "spot" ? "spot-bar" : "web-bar")
   var top = el.querySelector(".app-header")
   var used = (top ? top.offsetHeight : 40) + (bar ? bar.offsetHeight : 0) + 8
   if (frame) frame.style.height = Math.max(120, el.clientHeight - used) + "px"
  }
  if (el.id == "calculator") {
   var pad = document.getElementById("act-calculator")
   var cbar = el.querySelector(".app-header")
   var cused = cbar ? cbar.offsetHeight : 40
   if (pad) pad.style.height = Math.max(220, el.clientHeight - cused - 6) + "px"
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
 if (d == "w" || d == "sw" || d == "nw") {
  w = rs.w - dx
  l = rs.l + dx
 }
 if (d == "n" || d == "ne" || d == "nw") {
  h = rs.h - dy
  t = rs.t + dy
 }
 if (w < minW) {
  if (d == "w" || d == "sw" || d == "nw") l = rs.l + (rs.w - minW)
  w = minW
 }
 if (h < minH) {
  if (d == "n" || d == "ne" || d == "nw") t = rs.t + (rs.h - minH)
  h = minH
 }
 if (t < headH()) {
  if (d == "n" || d == "ne" || d == "nw") h = h - (headH() - t)
  if (h < minH) h = minH
  t = headH()
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
  if (d == "w" || d == "sw" || d == "nw") w = w + l
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
 e.preventDefault()
}, { passive: false })

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
 var lay = ""
 try { lay = localStorage.getItem("nook-lay") || "" } catch (err) { lay = "b" }
 if (lay != "b") return
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
  if (ny < headH()) ny = headH()
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
  if (ny < headH()) ny = headH()
  if (nx > window.innerWidth - 80) nx = window.innerWidth - 80
  if (ny > window.innerHeight - 40) ny = window.innerHeight - 40
  el.style.right = "auto"
  el.style.left = nx + "px"
  el.style.top = ny + "px"
  e.preventDefault()
 }, { passive: false })
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
  if (typeof paintWig == "function") paintWig()
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
 photo.style.top = "108px"
 photo.style.right = "228px"
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
 var quote = document.createElement("div")
 quote.id = "deskquote"
 quote.className = "dy chip"
 quote.style.top = "120px"
 quote.style.left = "620px"
 quote.style.right = "auto"
 quote.style.display = "none"
 var qb = document.createElement("b")
 qb.textContent = "Quote"
 var qv = document.createElement("span")
 qv.id = "deskquote-read"
 var qlines = ["11 is still lucky", "The sofa is the room", "Write it down first"]
 var qn = 0
 qv.textContent = qlines[0]
 var qnext = document.createElement("button")
 qnext.type = "button"
 qnext.textContent = "Next"
 qnext.addEventListener("click", function(e) {
  e.stopPropagation()
  qn = qn + 1
  if (qn >= qlines.length) qn = 0
  qv.textContent = qlines[qn]
 })
 quote.appendChild(qb)
 quote.appendChild(qv)
 quote.appendChild(qnext)
 document.body.appendChild(quote)
 shove(quote)
 peg(quote)
 var todo = document.createElement("div")
 todo.id = "desktodo"
 todo.className = "dy chip"
 todo.style.top = "160px"
 todo.style.left = "430px"
 todo.style.right = "auto"
 todo.style.display = "none"
 var tb = document.createElement("b")
 tb.textContent = "To do"
 var tin = document.createElement("input")
 tin.id = "todo-box"
 tin.placeholder = "Add one"
 var rows = document.createElement("div")
 rows.id = "todo-rows"
 todo.appendChild(tb)
 todo.appendChild(tin)
 todo.appendChild(rows)
 document.body.appendChild(todo)
 shove(todo)
 peg(todo)
 tin.addEventListener("mousedown", function(e) { e.stopPropagation() })
 tin.addEventListener("keydown", function(e) {
  if (e.key != "Enter") return
  var t = tin.value.replace(/^\s+|\s+$/g, "")
  if (!t) return
  var list = pullTodo()
  list.unshift({ t: t, done: 0 })
  if (list.length > 8) list.pop()
  saveTodo(list)
  tin.value = ""
  paintTodo()
 })
 rows.addEventListener("click", function(e) {
  e.stopPropagation()
  var n = e.target.getAttribute && e.target.getAttribute("data-i")
  if (n == null) return
  var list = pullTodo()
  n = parseInt(n, 10)
  if (!list[n]) return
  list[n].done = list[n].done ? 0 : 1
  saveTodo(list)
  paintTodo()
 })
 var spotw = document.createElement("div")
 spotw.id = "deskspot"
 spotw.className = "dy chip"
 spotw.style.top = "160px"
 spotw.style.left = "620px"
 spotw.style.right = "auto"
 spotw.style.display = "none"
 var spb = document.createElement("b")
 spb.textContent = "Spotify"
 var spv = document.createElement("span")
 spv.textContent = "Open"
 spotw.appendChild(spb)
 spotw.appendChild(spv)
 document.body.appendChild(spotw)
 shove(spotw)
 peg(spotw)
 spotw.addEventListener("click", function() {
  if (spotw.getAttribute("data-moved") == "1") {
   spotw.setAttribute("data-moved", "0")
   return
  }
  openWindow(document.getElementById("spot"))
 })
 paintTodo()
 stackChips()
 if (typeof updateTimer == "function") updateTimer()
}

function pullTodo() {
 try {
  var raw = localStorage.getItem("nook-todo")
  if (!raw) return []
  var list = JSON.parse(raw)
  if (!list) return []
  return list
 } catch (err) {
  console.log(err)
  return []
 }
}
function saveTodo(list) {
 try { localStorage.setItem("nook-todo", JSON.stringify(list)) } catch (err) { console.log(err) }
}
function paintTodo() {
 var box = document.getElementById("todo-rows")
 if (!box) return
 box.innerHTML = ""
 var list = pullTodo()
 var i
 for (i = 0; i < list.length; i++) {
  var row = document.createElement("button")
  row.type = "button"
  row.setAttribute("data-i", String(i))
  row.textContent = (list[i].done ? "x " : "o ") + list[i].t
  if (list[i].done) row.className = "done"
  box.appendChild(row)
 }
}
function stackChips() {
 var ids = ["desktimer", "deskmusic", "deskpin", "desknotes"]
 var rights = [10, 22, 8, 16]
 var date = document.getElementById("deskdate")
 var y = 214
 if (date && !date.style.left) {
  date.style.top = "196px"
  date.style.right = "12px"
  date.style.zIndex = "6"
  y = date.offsetTop + date.offsetHeight - 22
 }
 var i
 for (i = 0; i < ids.length; i++) {
  var el = document.getElementById(ids[i])
  if (!el) continue
  if (el.style.left) continue
  el.style.right = rights[i] + "px"
  el.style.top = y + "px"
  el.style.zIndex = String(7 + i)
  y = y + el.offsetHeight - 18
 }
 var photo = document.getElementById("deskphoto")
 if (photo && (!photo.style.left || photo.style.left == "auto")) {
  photo.style.top = "74px"
  photo.style.right = "140px"
  photo.style.left = "auto"
  photo.style.zIndex = "5"
 }
}

function paintWig() {
 var box = document.getElementById("wig-list")
 if (!box) return
 var bits = [
  ["deskclock", "Clock"],
  ["deskdate", "Date"],
  ["desktimer", "Timer"],
  ["deskmusic", "Music"],
  ["deskpin", "Pin"],
  ["desknotes", "Notes"],
  ["deskphoto", "Anime"],
  ["deskquote", "Quote"],
  ["desktodo", "To do"],
  ["deskspot", "Spotify"]
 ]
 box.innerHTML = ""
 var i
 for (i = 0; i < bits.length; i++) {
  var id = bits[i][0]
  var el = document.getElementById(id)
  var b = document.createElement("button")
  b.type = "button"
  b.setAttribute("data-bit", id)
  var on = el && el.style.display != "none"
  b.textContent = on ? bits[i][1] + " is on the desk" : bits[i][1]
  if (on) b.className = "on"
  box.appendChild(b)
 }
}
document.getElementById("wig-list").addEventListener("click", function(e) {
 var id = e.target.getAttribute && e.target.getAttribute("data-bit")
 if (!id) return
 var el = document.getElementById(id)
 if (!el) return
 if (el.style.display != "none") return
 el.style.display = ""
 stashWidgets()
 paintWig()
})
function makeMenu() {
 var box = document.createElement("div")
 box.id = "deskmenu"
 var names = [
  ["settings", "Settings"],
  ["widgets", "Widgets"],
  ["browser", "Web"],
  ["term", "Terminal"]
 ]
 var i
 for (i = 0; i < names.length; i++) {
  var b = document.createElement("button")
  b.type = "button"
  b.textContent = names[i][1]
  b.setAttribute("data-app", names[i][0])
  box.appendChild(b)
 }
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
 var holdT = 0
 document.addEventListener("touchstart", function(e) {
  var t = e.target
  if (t.closest && t.closest(".app-window, .app-icon, .dy, #deskclock, #deskmenu, #taskbar")) return
  var p = e.touches && e.touches[0]
  if (!p) return
  var x = p.clientX
  var y = p.clientY
  clearTimeout(holdT)
  holdT = setTimeout(function() {
   box.style.left = x + "px"
   box.style.top = y + "px"
   box.style.display = "block"
  }, 480)
 }, { passive: true })
 document.addEventListener("touchend", function() { clearTimeout(holdT) })
 document.addEventListener("touchmove", function() { clearTimeout(holdT) }, { passive: true })
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
 bg.style.backgroundImage = ""
 if (!kind || kind == "sofa") {
  bg.className = ""
  bg.style.backgroundColor = ""
  bg.style.backgroundImage = ""
  kind = "sofa"
 } else if (kind == "anime") {
  bg.className = "anime"
  bg.style.backgroundColor = ""
  bg.style.backgroundImage = "url(images/anime.jpg)"
 } else if (kind == "pic") {
  var pic = ""
  try { pic = localStorage.getItem("nook-pic") || "" } catch (err) { console.log(err) }
  if (!pic) {
   bg.className = ""
   kind = "sofa"
  } else {
   bg.className = "own"
   bg.style.backgroundColor = ""
   bg.style.backgroundImage = "url(" + pic + ")"
  }
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
 var own = document.getElementById("own-lab")
 if (own) own.className = kind == "pic" ? "on" : ""
 try {
  localStorage.setItem("nook-wall", kind)
 } catch (err) {
  console.log(err)
 }
}
var kept = "sofa"
try { kept = localStorage.getItem("nook-wall") || "sofa" } catch (err) { console.log(err) }
setWall(kept)

function readLook() {
 var look = { theme: "nook", size: "m", font: "fred", cols: "2", curve: 0 }
 try {
  var raw = localStorage.getItem("nook-look")
  if (raw) {
   var saved = JSON.parse(raw)
   if (saved.theme) look.theme = saved.theme
   if (saved.size) look.size = saved.size
   if (saved.font) look.font = saved.font
   if (saved.cols) look.cols = String(saved.cols)
   if (saved.curve) look.curve = 1
  }
 } catch (err) { console.log(err) }
 return look
}
function saveLook(look) {
 try { localStorage.setItem("nook-look", JSON.stringify(look)) } catch (err) { console.log(err) }
}
function markRow(sel, attr, val) {
 var list = document.querySelectorAll(sel)
 var i
 for (i = 0; i < list.length; i++) {
  list[i].className = list[i].getAttribute(attr) == String(val) ? "on" : ""
 }
}
function paintLook(look) {
 var b = document.body
 b.classList.remove("th-night", "th-candy", "sz-s", "sz-b", "font-plain", "font-story", "curvy", "cols-1")
 if (look.theme == "night") b.classList.add("th-night")
 if (look.theme == "candy") b.classList.add("th-candy")
 if (look.size == "s") b.classList.add("sz-s")
 if (look.size == "b") b.classList.add("sz-b")
 if (look.font == "plain") b.classList.add("font-plain")
 if (look.font == "story") b.classList.add("font-story")
 if (look.curve) b.classList.add("curvy")
 if (String(look.cols) == "1") b.classList.add("cols-1")
 markRow("#themes button", "data-theme", look.theme)
 markRow("#sizes button", "data-size", look.size)
 markRow("#fonts button", "data-font", look.font)
 markRow("#cols button", "data-cols", look.cols)
 var curve = document.getElementById("curve-go")
 if (curve) {
  curve.className = look.curve ? "on" : ""
  curve.textContent = look.curve ? "Curvy corners are on" : "Curvy corners are off"
 }
 layIcons()
}
document.getElementById("settings").addEventListener("click", function(e) {
 var t = e.target
 if (t && t.closest) t = t.closest("button")
 if (!t || !t.getAttribute) return
 var look = readLook()
 if (t.getAttribute("data-theme")) look.theme = t.getAttribute("data-theme")
 else if (t.getAttribute("data-size")) look.size = t.getAttribute("data-size")
 else if (t.getAttribute("data-font")) look.font = t.getAttribute("data-font")
 else if (t.getAttribute("data-cols")) look.cols = t.getAttribute("data-cols")
 else if (t.id == "curve-go") look.curve = look.curve ? 0 : 1
 else return
 saveLook(look)
 paintLook(look)
})
document.getElementById("own-pic").addEventListener("change", function() {
 var f = this.files && this.files[0]
 var note = document.getElementById("set-note")
 if (!f) return
 var reader = new FileReader()
 reader.onload = function() {
  var img = new Image()
  img.onload = function() {
   var c = document.createElement("canvas")
   var w = img.width
   var h = img.height
   if (w > 960) {
    h = Math.round(h * 960 / w)
    w = 960
   }
   c.width = w
   c.height = h
   c.getContext("2d").drawImage(img, 0, 0, w, h)
   var url = c.toDataURL("image/jpeg", 0.7)
   try {
    localStorage.setItem("nook-pic", url)
    setWall("pic")
    if (note) note.textContent = ""
   } catch (err) {
    if (note) note.textContent = "That picture is too heavy to keep"
    console.log(err)
   }
  }
  img.src = reader.result
 }
 reader.readAsDataURL(f)
})
paintLook(readLook())

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
var camFx = "none"
var camWait = 0
var camTick = null
var fxCss = {
 none: "none",
 warm: "sepia(0.35) saturate(1.25)",
 cool: "hue-rotate(18deg) saturate(1.15)",
 bright: "brightness(1.28) contrast(1.05)",
 fade: "contrast(0.82) saturate(0.7) brightness(1.08)",
 noir: "grayscale(1) contrast(1.25)"
}
function paintFx() {
 var vid = document.getElementById("cam-view")
 if (vid) vid.style.filter = fxCss[camFx] || "none"
 var row = document.querySelectorAll("#cam-fx button")
 var i
 for (i = 0; i < row.length; i++) {
  row[i].className = row[i].getAttribute("data-fx") == camFx ? "on" : ""
 }
}
function killCam() {
 if (camTick) {
  clearInterval(camTick)
  camTick = null
 }
 var num = document.getElementById("cam-count")
 if (num) num.textContent = ""
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
 paintGal()
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
 g.filter = fxCss[camFx] || "none"
 g.translate(w, 0)
 g.scale(-1, 1)
 g.drawImage(vid, 0, 0, w, h)
 g.filter = "none"
 var url = c.toDataURL("image/jpeg", 0.6)
 var list = pullRoll()
 list.unshift(url)
 if (list.length > 12) list.length = 12
 stashRoll(list)
 showRoll()
}
function countSnap() {
 if (camTick) return
 if (!camWait) {
  snapCam()
  return
 }
 var left = camWait
 var box = document.getElementById("cam-count")
 if (box) box.textContent = left
 camTick = setInterval(function() {
  left--
  if (left > 0) {
   if (box) box.textContent = left
   return
  }
  clearInterval(camTick)
  camTick = null
  if (box) box.textContent = ""
  snapCam()
 }, 1000)
}
document.getElementById("cam-fx").addEventListener("click", function(e) {
 e.stopPropagation()
 var fx = e.target.getAttribute && e.target.getAttribute("data-fx")
 if (!fx) return
 camFx = fx
 paintFx()
})
document.getElementById("cam-row").addEventListener("click", function(e) {
 var sec = e.target.getAttribute && e.target.getAttribute("data-sec")
 if (!sec) return
 e.stopPropagation()
 var n = Number(sec)
 camWait = camWait == n ? 0 : n
 var waits = document.querySelectorAll(".cam-wait")
 var i
 for (i = 0; i < waits.length; i++) {
  waits[i].className = "cam-wait" + (camWait && waits[i].getAttribute("data-sec") == String(camWait) ? " on" : "")
 }
})
document.getElementById("cam-go").addEventListener("click", function(e) {
 e.stopPropagation()
 openCam()
})
document.getElementById("cam-snap").addEventListener("click", function(e) {
 e.stopPropagation()
 countSnap()
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
var galPick = 0
var galUndo = []
var galRedo = []
var galBase = ""
function markHist() {
 var u = document.getElementById("gal-undo")
 var r = document.getElementById("gal-redo")
 var d = document.getElementById("gal-drop")
 if (u) u.className = galUndo.length ? "" : "off"
 if (r) r.className = galRedo.length ? "" : "off"
 if (d) d.className = galBase && pullRoll()[galPick] != galBase ? "" : "off"
}
function paintGal() {
 var box = document.getElementById("gal-grid")
 if (!box) return
 var list = pullRoll()
 var note = document.getElementById("gal-note")
 var pic = document.getElementById("gal-pic")
 box.innerHTML = ""
 if (!list.length) {
  if (note) note.textContent = "No shots yet. Take one in Camera."
  if (pic) { pic.className = ""; pic.removeAttribute("src") }
  return
 }
 if (galPick >= list.length) galPick = 0
 if (!galBase) galBase = list[galPick]
 if (note) note.textContent = (galPick + 1) + " of " + list.length
 if (pic) { pic.src = list[galPick]; pic.className = "on" }
 var i
 for (i = 0; i < list.length; i++) {
  var img = document.createElement("img")
  img.src = list[i]
  img.setAttribute("data-i", String(i))
  if (i == galPick) img.className = "on"
  box.appendChild(img)
 }
 markHist()
}
function saveUrl(url, name) {
 var a = document.createElement("a")
 a.href = url
 a.download = name
 document.body.appendChild(a)
 a.click()
 a.remove()
}
function applyUrl(url) {
 var list = pullRoll()
 if (!list[galPick]) return
 galUndo.push(list[galPick])
 galRedo = []
 list[galPick] = url
 stashRoll(list)
 showRoll()
}
function bake(how) {
 var list = pullRoll()
 if (!list[galPick]) return
 var img = new Image()
 img.onload = function() {
  var c = document.createElement("canvas")
  var g = c.getContext("2d")
  if (how == "turn") {
   c.width = img.height
   c.height = img.width
   g.translate(c.width / 2, c.height / 2)
   g.rotate(Math.PI / 2)
   g.drawImage(img, -img.width / 2, -img.height / 2)
  } else {
   return
  }
  try {
   applyUrl(c.toDataURL("image/jpeg", 0.7))
  } catch (err) {
   console.log(err)
   document.getElementById("gal-note").textContent = "Could not save that edit"
  }
 }
 img.src = list[galPick]
}
function dumpAll() {
 var list = pullRoll()
 var note = document.getElementById("gal-note")
 if (!list.length) {
  if (note) note.textContent = "Nothing to save"
  return
 }
 var i = 0
 function next() {
  if (i >= list.length) return
  saveUrl(list[i], "nook-" + (i + 1) + ".jpg")
  i++
  setTimeout(next, 350)
 }
 next()
}
var galScreen = document.querySelector("#gal")
document.querySelector("#close-gal-tab").addEventListener("click", function() { closeWindow(galScreen) })
document.querySelector("#open-gal-tab").addEventListener("click", function() {
 openWindow(galScreen)
 paintGal()
})
galScreen.addEventListener("mousedown", function() { tap(galScreen) })
document.getElementById("gal-grid").addEventListener("click", function(e) {
 var i = e.target.getAttribute && e.target.getAttribute("data-i")
 if (i == null) return
 galPick = Number(i)
 galUndo = []
 galRedo = []
 galBase = pullRoll()[galPick] || ""
 var win = document.getElementById("gal")
 if (win) win.classList.remove("cutting")
 paintGal()
})
document.getElementById("gal-turn").addEventListener("click", function(e) {
 e.stopPropagation()
 bake("turn")
})
document.getElementById("gal-crop").addEventListener("click", function(e) {
 e.stopPropagation()
 var win = document.getElementById("gal")
 var pic = document.getElementById("gal-pic")
 var box = document.getElementById("gal-box")
 if (!win || !pic || !pic.getAttribute("src")) return
 if (win.classList.contains("cutting")) {
  win.classList.remove("cutting")
  return
 }
 win.classList.add("cutting")
 box.style.left = "12%"
 box.style.top = "12%"
 box.style.width = "76%"
 box.style.height = "76%"
})
var cropOn = 0
var cropHow = ""
var cropX = 0
var cropY = 0
var crop0 = null
document.addEventListener("mousedown", function(e) {
 var win = document.getElementById("gal")
 if (!win || !win.classList.contains("cutting")) return
 if (e.target.id != "gal-box" && e.target.id != "gal-grip") return
 e.preventDefault()
 var box = document.getElementById("gal-box")
 cropOn = 1
 cropHow = e.target.id == "gal-grip" ? "size" : "move"
 cropX = e.clientX
 cropY = e.clientY
 crop0 = { l: box.offsetLeft, t: box.offsetTop, w: box.offsetWidth, h: box.offsetHeight }
})
document.addEventListener("mousemove", function(e) {
 if (!cropOn || !crop0) return
 var box = document.getElementById("gal-box")
 var stage = document.getElementById("gal-stage")
 if (!box || !stage) return
 var dx = e.clientX - cropX
 var dy = e.clientY - cropY
 var l = crop0.l
 var t = crop0.t
 var w = crop0.w
 var h = crop0.h
 if (cropHow == "size") {
  w = crop0.w + dx
  h = crop0.h + dy
 } else {
  l = crop0.l + dx
  t = crop0.t + dy
 }
 if (w < 28) w = 28
 if (h < 28) h = 28
 if (l < 0) l = 0
 if (t < 0) t = 0
 if (l + w > stage.clientWidth) {
  if (cropHow == "size") w = stage.clientWidth - l
  else l = stage.clientWidth - w
 }
 if (t + h > stage.clientHeight) {
  if (cropHow == "size") h = stage.clientHeight - t
  else t = stage.clientHeight - h
 }
 box.style.left = l + "px"
 box.style.top = t + "px"
 box.style.width = w + "px"
 box.style.height = h + "px"
})
document.addEventListener("mouseup", function() { cropOn = 0 })
document.getElementById("gal-ok").addEventListener("click", function(e) {
 e.stopPropagation()
 var pic = document.getElementById("gal-pic")
 var box = document.getElementById("gal-box")
 var stage = document.getElementById("gal-stage")
 var win = document.getElementById("gal")
 if (!pic || !box || !stage || !pic.naturalWidth) return
 var img = new Image()
 img.onload = function() {
  var sx = box.offsetLeft / stage.clientWidth
  var sy = box.offsetTop / stage.clientHeight
  var sw = box.offsetWidth / stage.clientWidth
  var sh = box.offsetHeight / stage.clientHeight
  var c = document.createElement("canvas")
  c.width = Math.max(1, Math.round(img.naturalWidth * sw))
  c.height = Math.max(1, Math.round(img.naturalHeight * sh))
  var g = c.getContext("2d")
  g.drawImage(img, Math.round(img.naturalWidth * sx), Math.round(img.naturalHeight * sy), c.width, c.height, 0, 0, c.width, c.height)
  try {
   applyUrl(c.toDataURL("image/jpeg", 0.7))
  } catch (err) {
   console.log(err)
   document.getElementById("gal-note").textContent = "Could not crop that"
  }
  if (win) win.classList.remove("cutting")
 }
 img.src = pic.src
})
document.getElementById("gal-undo").addEventListener("click", function(e) {
 e.stopPropagation()
 if (!galUndo.length) return
 var list = pullRoll()
 galRedo.push(list[galPick])
 list[galPick] = galUndo.pop()
 stashRoll(list)
 showRoll()
})
document.getElementById("gal-redo").addEventListener("click", function(e) {
 e.stopPropagation()
 if (!galRedo.length) return
 var list = pullRoll()
 galUndo.push(list[galPick])
 list[galPick] = galRedo.pop()
 stashRoll(list)
 showRoll()
})
document.getElementById("gal-drop").addEventListener("click", function(e) {
 e.stopPropagation()
 if (!galBase) return
 var list = pullRoll()
 if (!list[galPick] || list[galPick] == galBase) return
 galUndo.push(list[galPick])
 galRedo = []
 list[galPick] = galBase
 stashRoll(list)
 var win = document.getElementById("gal")
 if (win) win.classList.remove("cutting")
 showRoll()
})
document.getElementById("gal-one").addEventListener("click", function(e) {
 e.stopPropagation()
 var list = pullRoll()
 if (!list[galPick]) return
 saveUrl(list[galPick], "nook-" + (galPick + 1) + ".jpg")
})
document.getElementById("gal-all").addEventListener("click", function(e) {
 e.stopPropagation()
 dumpAll()
})
showRoll()

function layIcons() {
 var icons = document.querySelectorAll(".app-icon")
 var col = document.body.className.indexOf("cols-1") != -1 ? 1 : 2
 var x0 = 12
 var y0 = headH() + 12
 var cw = 86
 var ch = 108
 if (narrow()) {
  col = 2
  x0 = 8
  cw = 70
  ch = 72
  var want = ["openWelcomeTab","openAnimeTab","open-calculator-tab","open-music-tab","open-pomo-tab","open-set-tab","open-gal-tab","open-cam-tab","open-browser-tab","open-notes-tab","open-term-tab","open-wig-tab"]
  var placed = {}
  var n = 0
  var k
  for (k = 0; k < want.length; k++) {
   var one = document.getElementById(want[k])
   if (!one) continue
   one.style.left = (x0 + (n % col) * cw) + "px"
   one.style.top = (y0 + Math.floor(n / col) * ch) + "px"
   placed[want[k]] = 1
   n++
  }
  var i2
  for (i2 = 0; i2 < icons.length; i2++) {
   if (placed[icons[i2].id]) continue
   icons[i2].style.left = (x0 + (n % col) * cw) + "px"
   icons[i2].style.top = (y0 + Math.floor(n / col) * ch) + "px"
   n++
  }
  return
 }
 var i
 for (i = 0; i < icons.length; i++) {
  var el = icons[i]
  if (!narrow() && el.getAttribute("data-set") == "1") continue
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
 var lay = ""
 try { lay = localStorage.getItem("nook-lay") || "" } catch (err) { lay = "b" }
 if (lay != "b") {
  try { localStorage.setItem("nook-lay", "b") } catch (err) { console.log(err) }
  return
 }
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
  if (ny < headH()) ny = headH()
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
  if (ny < headH()) ny = headH()
  el.style.left = nx + "px"
  el.style.top = ny + "px"
  e.preventDefault()
 }, { passive: false })
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
function clearBar() {
 var floor = headH()
 var list = document.querySelectorAll(".app-window, .app-icon, #deskclock, #deskdate, .dy")
 var i
 for (i = 0; i < list.length; i++) {
  if (list[i].offsetTop < floor) list[i].style.top = floor + "px"
 }
}
document.getElementById("barhide").addEventListener("click", function(e) {
 e.stopPropagation()
 document.getElementById("taskbar").style.display = "none"
})
pullIcons()
layIcons()
clearBar()
var iconNodes = document.querySelectorAll(".app-icon")
var ii
for (ii = 0; ii < iconNodes.length; ii++) dragIcon(iconNodes[ii])
function phoneWidgets() {
 var pin = document.getElementById("deskpin")
 var clock = document.getElementById("deskclock")
 if (!narrow()) {
  if (clock) {
   clock.style.transform = ""
   clock.style.transformOrigin = ""
  }
  if (pin && pin.getAttribute("data-userhide") != "1") pin.style.display = ""
  var back = ["desknotes", "deskquote", "desktodo"]
  var bi
  for (bi = 0; bi < back.length; bi++) {
   var was = document.getElementById(back[bi])
   if (!was || was.getAttribute("data-phone") != "1") continue
   was.style.display = back[bi] == "desknotes" ? "" : "none"
   was.removeAttribute("data-phone")
  }
  return
 }
 if (pin && pin.style.display != "none") pin.setAttribute("data-phone", "1")
 if (pin) pin.style.display = "none"
 var notes = document.getElementById("desknotes")
 if (notes && notes.style.display != "none") notes.setAttribute("data-phone", "1")
 if (notes) notes.style.display = "none"
 var extras = ["deskquote", "desktodo"]
 var ei
 for (ei = 0; ei < extras.length; ei++) {
  var extra = document.getElementById(extras[ei])
  if (!extra) continue
  if (extra.style.display == "none") extra.setAttribute("data-phone", "1")
  extra.style.display = ""
 }
 if (clock) {
  clock.style.left = "auto"
  clock.style.right = "4px"
  clock.style.top = (headH() + 2) + "px"
 }
 function put(id, t, r) {
  var el = document.getElementById(id)
  if (!el || id == "deskpin" || id == "desknotes") return
  el.style.left = "auto"
  el.style.right = r + "px"
  el.style.top = t + "px"
 }
 var y = headH() + 4
 put("deskphoto", y, 126)
 put("deskdate", y + 72, 4)
 put("desktimer", y + 148, 4)
 put("deskmusic", y + 222, 4)
 put("deskquote", y + 300, 4)
 put("desktodo", y + 378, 4)
}
function fitLoose() {
 if (!narrow()) return
 var nodes = document.querySelectorAll("#deskclock, #deskdate, .dy")
 var i
 for (i = 0; i < nodes.length; i++) {
  var el = nodes[i]
  if (el.style.display == "none") continue
  var w = el.offsetWidth || 90
  if (el.offsetLeft + 40 > window.innerWidth) el.style.left = Math.max(8, window.innerWidth - w - 8) + "px"
  if (el.offsetTop + 30 > window.innerHeight) el.style.top = Math.max(headH(), window.innerHeight - 90) + "px"
 }
}
if (narrow()) {
 var openWins = document.querySelectorAll(".app-window")
 var wi
 for (wi = 0; wi < openWins.length; wi++) {
  if (openWins[wi].style.display == "none") continue
  tuck(openWins[wi])
 }
 fitLoose()
 phoneWidgets()
}
sizeCalc()

var termAt = ""
var termHist = []
var termRoot = "C:\\ColorfulNOOK"
function termPath() {
 return termAt ? termRoot + "\\" + termAt : termRoot
}
function termSay(text) {
 var log = document.getElementById("term-log")
 if (!log) return
 var p = document.createElement("p")
 p.textContent = text
 log.appendChild(p)
 var screen = document.getElementById("term-screen")
 if (screen) screen.scrollTop = screen.scrollHeight
}
function splitCmd(s) {
 var out = []
 var cur = ""
 var q = ""
 var i
 for (i = 0; i < s.length; i++) {
  var ch = s.charAt(i)
  if (q) {
   if (ch == q) q = ""
   else cur += ch
  } else if (ch == "\"" || ch == "'") q = ch
  else if (ch == " ") {
   if (cur) { out.push(cur); cur = "" }
  } else cur += ch
 }
 if (cur) out.push(cur)
 return out
}
function termNames() {
 if (termAt == "Notes") {
  var notes = getNotes()
  var names = []
  var i
  for (i = 0; i < notes.length; i++) names.push("note-" + (i + 1) + ".txt")
  return names
 }
 if (termAt == "Camera") {
  var shots = pullRoll()
  var pics = []
  var j
  for (j = 0; j < shots.length; j++) pics.push("shot-" + (j + 1) + ".jpg")
  return pics
 }
 if (termAt == "Apps") return ["Welcome", "Anime", "Notes", "Calc", "Music", "Web", "Timer", "Settings", "Camera", "Gallery", "Widgets", "Terminal", "Spotify", "Clock"]
 return ["Notes", "Camera", "Apps"]
}
function termOpen(name) {
 var key = name.toLowerCase()
 var map = {
  welcome: "welcome", anime: "anime", notes: "notes", calc: "calculator", calculator: "calculator",
  music: "music", web: "browser", browser: "browser", timer: "pomo", pomo: "pomo",
  settings: "settings", camera: "cam", cam: "cam", gallery: "gal", gal: "gal",
  widgets: "widgets", terminal: "term", term: "term", spotify: "spot", clock: "clock"
 }
 var id = map[key]
 if (!id) return 0
 var win = document.getElementById(id)
 if (!win) return 0
 openWindow(win)
 if (id == "clock" && desk) desk.style.display = "none"
 if (id == "gal") paintGal()
 if (id == "widgets") paintWig()
 return 1
}
function termRun(raw) {
 var line = raw.replace(/^\s+|\s+$/g, "")
 termSay(termPath() + "> " + line)
 if (!line) return
 termHist.push(line)
 var bits = splitCmd(line)
 var cmd = bits[0].toLowerCase()
 var rest = bits.slice(1).join(" ")
 if (cmd == "help") {
  termSay("help      commands")
  termSay("cls       clear the screen")
  termSay("dir       list this folder")
  termSay("cd        change folder")
  termSay("type      read a note")
  termSay("echo      print some text")
  termSay("date      today's date")
  termSay("time      the clock")
  termSay("whoami    who is at the desk")
  termSay("ver       which nook this is")
  termSay("history   what you typed")
  termSay("start     open an app")
  termSay("title     rename this window")
  termSay("color     cream mustard aqua coral lime")
  return
 }
 if (cmd == "cls" || cmd == "clear") {
  document.getElementById("term-log").innerHTML = ""
  return
 }
 if (cmd == "echo") { termSay(rest); return }
 if (cmd == "pwd") { termSay(termPath()); return }
 if (cmd == "whoami") { termSay("Athan"); return }
 if (cmd == "ver") { termSay("ColorfulNOOK OS"); return }
 if (cmd == "date" || cmd == "time") {
  var now = new Date()
  termSay(cmd == "date" ? now.toDateString() : now.toLocaleTimeString())
  return
 }
 if (cmd == "history") {
  var h
  for (h = 0; h < termHist.length; h++) termSay((h + 1) + "  " + termHist[h])
  return
 }
 if (cmd == "title") {
  var title = document.querySelector("#term .header-title")
  if (title) title.textContent = rest || "Terminal"
  return
 }
 if (cmd == "color") {
  var ink = { cream: "#fff6d8", mustard: "#f0c230", aqua: "#4ecdc4", coral: "#ff6b6b", lime: "#8fde5d" }
  var pick = ink[(rest || "cream").toLowerCase()]
  if (!pick) { termSay("try cream mustard aqua coral lime"); return }
  document.getElementById("term-screen").style.color = pick
  document.getElementById("term-in").style.color = pick
  return
 }
 if (cmd == "dir" || cmd == "ls") {
  var names = termNames()
  if (!names.length) { termSay("empty"); return }
  var n
  for (n = 0; n < names.length; n++) termSay(names[n])
  return
 }
 if (cmd == "cd") {
  var go = rest.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "")
  if (!go || go.toLowerCase() == "c:" || go.toLowerCase() == "c:/colorfulnook") {
   termAt = ""
  } else if (go == "..") {
   termAt = ""
  } else {
   var leaf = go.split("/").pop().toLowerCase()
   if (leaf == "notes") termAt = "Notes"
   else if (leaf == "camera") termAt = "Camera"
   else if (leaf == "apps") termAt = "Apps"
   else { termSay("no folder named " + rest); return }
  }
  document.getElementById("term-prompt").textContent = termPath() + ">"
  return
 }
 if (cmd == "type" || cmd == "cat") {
  if (termAt != "Notes") { termSay("notes live in the Notes folder"); return }
  var m = /(\d+)/.exec(rest)
  var notes = getNotes()
  var ix = m ? Number(m[1]) - 1 : -1
  if (ix < 0 || !notes[ix]) { termSay("no file named " + (rest || "that")); return }
  termSay(notes[ix].content || "")
  return
 }
 if (cmd == "start" || cmd == "open") {
  if (!rest) { termSay("start Notes   or Camera, Gallery, Web..."); return }
  if (!termOpen(rest.split(" ")[0])) termSay("no app named " + rest)
  return
 }
 termSay("'" + bits[0] + "' is not a command. Type help")
}
var termScreen = document.getElementById("term")
document.getElementById("close-term-tab").addEventListener("click", function() { closeWindow(termScreen) })
document.getElementById("open-term-tab").addEventListener("click", function() {
 openWindow(termScreen)
 var box = document.getElementById("term-in")
 if (box) box.focus()
})
termScreen.addEventListener("mousedown", function() { tap(termScreen) })
document.getElementById("term-line").addEventListener("submit", function(e) {
 e.preventDefault()
 var box = document.getElementById("term-in")
 termRun(box.value)
 box.value = ""
})
document.getElementById("term-screen").addEventListener("click", function() {
 document.getElementById("term-in").focus()
})
termSay("ColorfulNOOK terminal. Type help")











 