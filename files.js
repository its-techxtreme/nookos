// files, notepad, terminal
// this sat at the bottom of script.js
// loads after script.js

var here = ""
var padId = ""
function pullFiles() {
 try {
  var raw = localStorage.getItem("nook-files")
  if (!raw) return []
  var list = JSON.parse(raw)
  if (!list || typeof list.length != "number") return []
  return list
 } catch (err) {
  console.log(err)
  return []
 }
}
function stashFiles(list) {
 try {
  localStorage.setItem("nook-files", JSON.stringify(list))
 } catch (err) {
  console.log(err)
 }
}
// files
function fileById(id) {
 var list = pullFiles()
 var i
 for (i = 0; i < list.length; i++) if (String(list[i].id) == String(id)) return list[i]
 return null
}
function kidsOf(parent) {
 var list = pullFiles()
 var out = []
 var i
 var want = String(parent || "")
 for (i = 0; i < list.length; i++) if (String(list[i].parent || "") == want) out.push(list[i])
 return out
}
function cleanName(s) {
 s = String(s || "").replace(/^\s+|\s+$/g, "")
 if (!s) return ""
 if (s.indexOf("\\") != -1 || s.indexOf("/") != -1 || s.indexOf(":") != -1) return ""
 if (s == "." || s == "..") return ""
 return s
}
function nameTaken(parent, name, skipId) {
 var low = name.toLowerCase()
 if (!parent && (low == "notes" || low == "camera" || low == "apps")) return 1
 if (!parent && deskApps) {
  var e
  for (e = 0; e < deskApps.length; e++) if (deskApps[e][0].toLowerCase() == low) return 1
 }
 var kids = kidsOf(parent)
 var i
 for (i = 0; i < kids.length; i++) {
  if (skipId && String(kids[i].id) == String(skipId)) continue
  if (kids[i].name.toLowerCase() == low) return 1
 }
 return 0
}
function tackExt(nm, kind) {
 var low = nm.toLowerCase()
 if (kind == "md" || low.slice(-3) == ".md") {
  if (low.slice(-3) != ".md") nm = nm + ".md"
  return { name: nm, kind: "md" }
 }
 if (low.slice(-4) != ".txt") nm = nm + ".txt"
 return { name: nm, kind: "txt" }
}
function freshName(parent, base, kind) {
 var n = base
 var i = 2
 while (nameTaken(parent, n)) {
  if (kind == "dir") n = base + " " + i
  else {
   var dot = base.lastIndexOf(".")
   n = base.slice(0, dot) + " " + i + base.slice(dot)
  }
  i++
  if (i > 30) return ""
 }
 return n
}
function makeItem(parent, name, kind) {
 var nm = cleanName(name)
 if (!nm) return null
 if (kind == "txt" || kind == "md") {
  var fixed = tackExt(nm, kind)
  nm = fixed.name
  kind = fixed.kind
 }
 if (nameTaken(parent, nm)) return null
 var list = pullFiles()
 var item = {
  id: String(Date.now()) + String(Math.floor(Math.random() * 1000)),
  parent: String(parent || ""),
  name: nm,
  kind: kind,
  text: ""
 }
 list.push(item)
 stashFiles(list)
 return item
}
function findKid(parent, name) {
 var low = String(name || "").toLowerCase()
 var kids = kidsOf(parent)
 var i
 for (i = 0; i < kids.length; i++) if (kids[i].name.toLowerCase() == low) return kids[i]
 if (low.slice(-4) != ".txt" && low.slice(-3) != ".md") {
  for (i = 0; i < kids.length; i++) if (kids[i].name.toLowerCase() == low + ".txt" || kids[i].name.toLowerCase() == low + ".md") return kids[i]
 }
 return null
}
function filesPath(id) {
 var bits = []
 var guard = 0
 var cur = id
 while (cur && guard < 24) {
  var f = fileById(cur)
  if (!f) break
  bits.unshift(f.name)
  cur = f.parent
  guard++
 }
 return termRoot + (bits.length ? "\\" + bits.join("\\") : "")
}
function paintFiles() {
 var list = document.getElementById("files-list")
 var path = document.getElementById("files-path")
 if (!list) return
 if (path) path.textContent = filesPath(here)
 list.innerHTML = ""
 if (!here) {
  var e
  for (e = 0; e < deskApps.length; e++) {
   var er = document.createElement("div")
   er.className = "rw"
   var eb = document.createElement("button")
   eb.type = "button"
   eb.className = "fi exe"
   eb.setAttribute("data-app", deskApps[e][1])
   eb.textContent = deskApps[e][0]
   er.appendChild(eb)
   list.appendChild(er)
  }
 }
 var kids = kidsOf(here)
 if (!kids.length && here) {
  var empty = document.createElement("p")
  empty.id = "files-empty"
  empty.textContent = "empty folder"
  list.appendChild(empty)
  paintDesk()
  return
 }
 var i
 for (i = 0; i < kids.length; i++) {
  var row = document.createElement("div")
  row.className = "rw"
  var b = document.createElement("button")
  b.type = "button"
  b.className = kids[i].kind == "dir" ? "fi dir" : kids[i].kind == "md" ? "fi md" : "fi"
  b.setAttribute("data-id", kids[i].id)
  b.textContent = kids[i].name
  var x = document.createElement("button")
  x.type = "button"
  x.className = "x"
  x.setAttribute("data-del", kids[i].id)
  x.textContent = "x"
  row.appendChild(b)
  row.appendChild(x)
  list.appendChild(row)
 }
 paintDesk()
}
function paintDesk() {
 var old = document.querySelectorAll(".dk")
 var n
 for (n = 0; n < old.length; n++) old[n].parentNode.removeChild(old[n])
 var kids = kidsOf("")
 var x = 18
 var i
 for (i = 0; i < kids.length; i++) {
  var b = document.createElement("button")
  b.type = "button"
  b.className = "dk " + kids[i].kind
  b.setAttribute("data-desk", kids[i].id)
  if (kids[i].x || kids[i].x === 0) {
   b.style.left = kids[i].x + "px"
   b.style.top = kids[i].y + "px"
  } else {
   b.style.left = x + "px"
   b.style.bottom = "16px"
   x = x + 86
  }
  var mark = document.createElement("b")
  var lab = document.createElement("span")
  lab.textContent = kids[i].name
  b.appendChild(mark)
  b.appendChild(lab)
  document.body.appendChild(b)
 }
}
function pinSpot(id, left, top) {
 var list = pullFiles()
 var i
 for (i = 0; i < list.length; i++) {
  if (String(list[i].id) != String(id)) continue
  list[i].x = left
  list[i].y = top
  stashFiles(list)
  return
 }
}
function tuckIn(id, folderId) {
 var f = fileById(id)
 var dest = fileById(folderId)
 if (!f || !dest || dest.kind != "dir") return 0
 if (String(f.id) == String(dest.id)) return 0
 var walk = dest
 var n = 0
 while (walk && n < 24) {
  if (String(walk.id) == String(f.id)) return 0
  walk = walk.parent ? fileById(walk.parent) : null
  n++
 }
 if (nameTaken(dest.id, f.name, f.id)) {
  var path = document.getElementById("files-path")
  if (path) path.textContent = "already there"
  return 0
 }
 var list = pullFiles()
 var i
 for (i = 0; i < list.length; i++) {
  if (String(list[i].id) != String(f.id)) continue
  list[i].parent = String(dest.id)
  list[i].x = null
  list[i].y = null
  stashFiles(list)
  break
 }
 paintFiles()
 return 1
}
function parkOut(id, left, top) {
 var f = fileById(id)
 if (!f) return 0
 if (nameTaken("", f.name, f.id)) {
  var path = document.getElementById("files-path")
  if (path) path.textContent = "already there"
  return 0
 }
 var list = pullFiles()
 var i
 for (i = 0; i < list.length; i++) {
  if (String(list[i].id) != String(f.id)) continue
  list[i].parent = ""
  list[i].x = left
  list[i].y = top
  stashFiles(list)
  break
 }
 if (String(here) == String(f.id)) here = f.parent || ""
 paintFiles()
 return 1
}
function applyName(id, raw) {
 var f = fileById(id)
 if (!f) return
 var next = cleanName(raw)
 if (!next) { paintFiles(); return }
 if (f.kind == "txt" || f.kind == "md") {
  var fixed = tackExt(next, f.kind)
  next = fixed.name
  f.kind = fixed.kind
 }
 if (next == f.name) { paintFiles(); return }
 if (nameTaken(f.parent, next, f.id)) {
  var path = document.getElementById("files-path")
  if (path) path.textContent = "already there"
  paintFiles()
  return
 }
 var list = pullFiles()
 var i
 for (i = 0; i < list.length; i++) {
  if (String(list[i].id) != String(f.id)) continue
  list[i].name = next
  if (f.kind == "txt" || f.kind == "md") list[i].kind = f.kind
  stashFiles(list)
  break
 }
 if (String(padId) == String(f.id)) {
  var nameEl = document.getElementById("pad-name")
  var title = document.querySelector("#pad .header-title")
  if (nameEl) nameEl.value = next
  if (title) title.textContent = next + " - Notepad"
 }
 if (String(termAt) == String(f.id)) {
  var pr = document.getElementById("term-prompt")
  if (pr) pr.textContent = termPath() + ">"
 }
 paintFiles()
}
function nameBox(id, where) {
 var f = fileById(id)
 if (!f) return
 var old = document.getElementById("nmbox")
 if (old && old.parentNode) old.parentNode.removeChild(old)
 var anchor = null
 var nodes
 var i
 if (where == "files") {
  nodes = document.querySelectorAll("#files-list button")
  for (i = 0; i < nodes.length; i++) if (nodes[i].getAttribute("data-id") == String(id)) anchor = nodes[i]
 }
 if (!anchor) {
  nodes = document.querySelectorAll(".dk")
  for (i = 0; i < nodes.length; i++) if (nodes[i].getAttribute("data-desk") == String(id)) anchor = nodes[i].querySelector("span") || nodes[i]
 }
 if (!anchor) return
 var r = anchor.getBoundingClientRect()
 var inp = document.createElement("input")
 inp.id = "nmbox"
 inp.value = f.name
 inp.style.left = r.left + "px"
 inp.style.top = (r.bottom - 22) + "px"
 inp.style.width = Math.max(r.width, 86) + "px"
 document.body.appendChild(inp)
 var killed = 0
 function close(save) {
  if (killed) return
  killed = 1
  var typed = inp.value
  if (inp.parentNode) inp.parentNode.removeChild(inp)
  if (save) applyName(id, typed)
  else paintFiles()
 }
 inp.addEventListener("keydown", function(e) {
  e.stopPropagation()
  if (e.key == "Enter") { e.preventDefault(); close(1) }
  if (e.key == "Escape") { e.preventDefault(); close(0) }
 })
 inp.addEventListener("mousedown", function(e) { e.stopPropagation() })
 inp.addEventListener("click", function(e) { e.stopPropagation() })
 inp.addEventListener("blur", function() { close(1) })
 setTimeout(function() {
  if (killed || !inp.parentNode) return
  inp.focus()
  inp.select()
 }, 30)
}
function askDrop(id) {
 var f = fileById(id)
 if (!f) return
 var old = document.getElementById("bye")
 if (old && old.parentNode) old.parentNode.removeChild(old)
 var shade = document.createElement("div")
 shade.id = "bye"
 var card = document.createElement("div")
 card.className = "card"
 var p = document.createElement("p")
 var word = f.kind == "dir" ? "folder" : "file"
 p.textContent = "You are deleting this " + word + " permanently. It cannot be recovered."
 var go = document.createElement("button")
 go.type = "button"
 go.className = "go"
 go.textContent = "Delete"
 var no = document.createElement("button")
 no.type = "button"
 no.className = "no"
 no.textContent = "Cancel"
 card.appendChild(p)
 card.appendChild(go)
 card.appendChild(no)
 shade.appendChild(card)
 document.body.appendChild(shade)
 function shut() {
  if (shade.parentNode) shade.parentNode.removeChild(shade)
 }
 shade.addEventListener("mousedown", function(e) {
  if (e.target != shade) return
  e.stopPropagation()
  shut()
 })
 no.addEventListener("click", function(e) {
  e.stopPropagation()
  shut()
 })
 go.addEventListener("click", function(e) {
  e.stopPropagation()
  shut()
  dropItem(id)
 })
}
function dropItem(id) {
 var f = fileById(id)
 if (!f) return 0
 var gone = {}
 function mark(pid, n) {
  if (n > 24 || gone[String(pid)]) return
  gone[String(pid)] = 1
  var kids = kidsOf(pid)
  var i
  for (i = 0; i < kids.length; i++) mark(kids[i].id, n + 1)
 }
 mark(id, 0)
 var left = pullFiles().filter(function(it) { return !gone[String(it.id)] })
 stashFiles(left)
 if (gone[String(padId)]) {
  padId = ""
  var box = document.getElementById("pad-box")
  var nm = document.getElementById("pad-name")
  if (box) box.value = ""
  if (nm) nm.value = ""
 }
 if (gone[String(here)]) here = f.parent || ""
 if (gone[String(termAt)]) {
  termAt = f.parent || ""
  var pr = document.getElementById("term-prompt")
  if (pr) pr.textContent = termPath() + ">"
 }
 paintFiles()
 return 1
}
function openPad(item) {
 var name = document.getElementById("pad-name")
 var box = document.getElementById("pad-box")
 var title = document.querySelector("#pad .header-title")
 if (item) {
  padId = item.id
  if (name) name.value = item.name
  if (box) box.value = item.text || ""
  if (title) title.textContent = item.name + " - Notepad"
 } else {
  padId = ""
  if (name) name.value = ""
  if (box) box.value = ""
  if (title) title.textContent = "Notepad"
 }
 var win = document.getElementById("pad")
 if (win) openWindow(win)
 if (box) box.focus()
}
function savePad() {
 var nameEl = document.getElementById("pad-name")
 var box = document.getElementById("pad-box")
 var nm = cleanName(nameEl ? nameEl.value : "")
 if (!nm) return
 var curKind = "txt"
 if (padId) {
  var cur = fileById(padId)
  if (cur && cur.kind) curKind = cur.kind
 }
 var fixed = tackExt(nm, curKind)
 nm = fixed.name
 var text = box ? box.value : ""
 var list = pullFiles()
 var i
 if (padId) {
  for (i = 0; i < list.length; i++) {
   if (String(list[i].id) != String(padId)) continue
   if (nameTaken(list[i].parent, nm, padId)) return
   list[i].name = nm
   list[i].kind = fixed.kind
   list[i].text = text
   stashFiles(list)
   if (nameEl) nameEl.value = nm
   var title = document.querySelector("#pad .header-title")
   if (title) title.textContent = nm + " - Notepad"
   paintFiles()
   return
  }
 }
 if (nameTaken(here, nm)) return
 var item = {
  id: String(Date.now()) + String(Math.floor(Math.random() * 1000)),
  parent: String(here || ""),
  name: nm,
  kind: fixed.kind,
  text: text
 }
 list.push(item)
 padId = item.id
 stashFiles(list)
 if (nameEl) nameEl.value = nm
 var title2 = document.querySelector("#pad .header-title")
 if (title2) title2.textContent = nm + " - Notepad"
 paintFiles()
}

// terminal
var termAt = ""
var termHist = []
var deskApps = [
 ["welcome.exe", "welcome"],
 ["anime.exe", "anime"],
 ["keepnotes.exe", "notes"],
 ["calc.exe", "calculator"],
 ["music.exe", "music"],
 ["web.exe", "browser"],
 ["timer.exe", "pomo"],
 ["settings.exe", "settings"],
 ["camera.exe", "cam"],
 ["gallery.exe", "gal"],
 ["widgets.exe", "widgets"],
 ["terminal.exe", "term"],
 ["explorer.exe", "files"],
 ["store.exe", "store"],
 ["notepad.exe", "pad"]
]
var termRoot = "C:\\colorful-nookos"
function termPath() {
 if (!termAt) return termRoot
 if (termAt == "Notes" || termAt == "Camera" || termAt == "Apps") return termRoot + "\\" + termAt
 var f = fileById(termAt)
 if (f) return filesPath(f.id)
 return termRoot
}
function termSay(text) {
 var log = document.getElementById("term-log")
 if (!log) return
 var p = document.createElement("p")
 p.textContent = text
 log.appendChild(p)
 log.scrollTop = log.scrollHeight
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
 if (termAt == "Apps") return ["Welcome", "Anime", "Keep", "Calc", "Music", "Web", "Timer", "Settings", "Camera", "Gallery", "Widgets", "Terminal", "Files", "Store", "Notepad", "Spotify", "Clock"]
 var kids = kidsOf(termAt)
 var names = []
 var k
 for (k = 0; k < kids.length; k++) names.push(kids[k].name)
 if (termAt) return names
 var exes = []
 var e
 for (e = 0; e < deskApps.length; e++) exes.push(deskApps[e][0])
 return exes.concat(names)
}
function termOpen(name) {
 var key = String(name || "").toLowerCase()
 if (key.slice(-4) == ".exe") key = key.slice(0, -4)
 var map = {
  welcome: "welcome", anime: "anime", notes: "notes", keepnotes: "notes", calc: "calculator", calculator: "calculator",
  music: "music", web: "browser", browser: "browser", timer: "pomo", pomo: "pomo",
  settings: "settings", camera: "cam", cam: "cam", gallery: "gal", gal: "gal",
  widgets: "widgets", terminal: "term", term: "term", files: "files", explorer: "files", store: "store", notepad: "pad", pad: "pad", keep: "notes", keepnotes: "notes", spotify: "spot", clock: "clock"
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
function homeName(go) {
 var h = String(go || "").toLowerCase()
 if (h == "c:" || h == "desktop") return 1
 if (h == "c:/colorful-nookos" || h == "c:/colorfulnook") return 1
 return 0
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
  termSay("md        make a folder")
  termSay("notepad   open a text file")
  termSay("del       delete a file")
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
  if (!go || homeName(go)) {
   termAt = ""
  } else if (go == "..") {
   if (!termAt || termAt == "Notes" || termAt == "Camera" || termAt == "Apps") termAt = ""
   else {
    var up = fileById(termAt)
    termAt = up && up.parent ? up.parent : ""
   }
  } else {
   var leaf = go.split("/").pop()
   var low = leaf.toLowerCase()
   var parent = ""
   if (termAt && termAt != "Notes" && termAt != "Camera" && termAt != "Apps") parent = termAt
   else if (termAt) { termSay("no folder named " + rest); return }
   if (!parent && low == "notes") termAt = "Notes"
   else if (!parent && low == "camera") termAt = "Camera"
   else if (!parent && low == "apps") termAt = "Apps"
   else {
    var hit = findKid(parent, leaf)
    if (!hit || hit.kind != "dir") { termSay("no folder named " + rest); return }
    termAt = hit.id
   }
  }
  document.getElementById("term-prompt").textContent = termPath() + ">"
  return
 }
 if (cmd == "type" || cmd == "cat") {
  if (termAt == "Notes") {
   var m = /(\d+)/.exec(rest)
   var notes = getNotes()
   var ix = m ? Number(m[1]) - 1 : -1
   if (ix < 0 || !notes[ix]) { termSay("no file named " + (rest || "that")); return }
   termSay(notes[ix].content || "")
   return
  }
  if (termAt == "Camera" || termAt == "Apps") { termSay("not a text file"); return }
  var file = findKid(termAt || "", rest)
  if (!file || (file.kind != "txt" && file.kind != "md")) { termSay("no file named " + (rest || "that")); return }
  termSay(file.text || "")
  return
 }
 if (cmd == "md" || cmd == "mkdir") {
  if (termAt == "Notes" || termAt == "Camera" || termAt == "Apps") { termSay("not in here"); return }
  var made = makeItem(termAt || "", rest, "dir")
  if (!made) { termSay("could not make that"); return }
  termSay("made " + made.name)
  paintFiles()
  return
 }
 if (cmd == "notepad") {
  if (termAt == "Notes" || termAt == "Camera" || termAt == "Apps") { termSay("not in here"); return }
  if (!rest) { openPad(null); return }
  var got = findKid(termAt || "", rest)
  if (got && got.kind == "dir") { termSay("that is a folder"); return }
  if (!got) {
   var want = rest.toLowerCase().slice(-3) == ".md" ? "md" : "txt"
   got = makeItem(termAt || "", rest, want)
   if (!got) { termSay("could not make that"); return }
   paintFiles()
  }
  openPad(got)
  return
 }
 if (cmd == "del" || cmd == "erase") {
  if (termAt == "Notes" || termAt == "Camera" || termAt == "Apps") { termSay("not in here"); return }
  var victim = findKid(termAt || "", rest)
  if (!victim) { termSay("no file named " + (rest || "that")); return }
  if (!dropItem(victim.id)) { termSay("could not delete that"); return }
  termSay("deleted " + victim.name)
  return
 }
 if (cmd == "start" || cmd == "open") {
  if (!rest) { termSay("start Notes   or Camera, Gallery, Web..."); return }
  if (!termOpen(rest.split(" ")[0])) termSay("no app named " + rest)
  return
 }
 if (!rest && termOpen(cmd)) return
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
var filesWin = document.getElementById("files")
document.getElementById("close-files-tab").addEventListener("click", function() { closeWindow(filesWin) })
document.getElementById("open-files-tab").addEventListener("click", function() {
 openWindow(filesWin)
 paintFiles()
})
filesWin.addEventListener("mousedown", function() { tap(filesWin) })
document.getElementById("files-up").addEventListener("click", function() {
 if (!here) return
 var f = fileById(here)
 here = f && f.parent ? f.parent : ""
 paintFiles()
})
document.getElementById("files-newdir").addEventListener("click", function() {
 var nm = prompt("folder name")
 if (nm == null) return
 var madeDir = makeItem(here, nm, "dir")
 var path = document.getElementById("files-path")
 if (!madeDir) {
  if (path) path.textContent = "already there"
  return
 }
 paintFiles()
})
document.getElementById("files-newtxt").addEventListener("click", function() {
 var nm = prompt("file name")
 if (nm == null) return
 var madeTxt = makeItem(here, nm, "txt")
 if (!madeTxt) {
  var path2 = document.getElementById("files-path")
  if (path2) path2.textContent = "already there"
  return
 }
 paintFiles()
 openPad(madeTxt)
})
document.getElementById("files-newmd").addEventListener("click", function() {
 var nm = prompt("markdown name")
 if (nm == null) return
 var madeMd = makeItem(here, nm, "md")
 if (!madeMd) {
  var path3 = document.getElementById("files-path")
  if (path3) path3.textContent = "already there"
  return
 }
 paintFiles()
 openPad(madeMd)
})
document.getElementById("files-list").addEventListener("click", function(e) {
 if (deskSkip) return
 var app = e.target.getAttribute && e.target.getAttribute("data-app")
 if (app) { termOpen(app); return }
 var del = e.target.getAttribute && e.target.getAttribute("data-del")
 if (del) { askDrop(del); return }
 var id = e.target.getAttribute && e.target.getAttribute("data-id")
 if (!id) return
 var f = fileById(id)
 if (!f) return
 if (f.kind == "dir") { here = f.id; paintFiles() }
 else openPad(f)
})
var padWin = document.getElementById("pad")
document.getElementById("close-pad-tab").addEventListener("click", function() { closeWindow(padWin) })
document.getElementById("open-pad-tab").addEventListener("click", function() {
 if (padWin.style.display != "none") { openWindow(padWin); return }
 openPad(null)
})
padWin.addEventListener("mousedown", function() { tap(padWin) })
document.getElementById("pad-save").addEventListener("click", function() { savePad() })
document.getElementById("pad-down").addEventListener("click", function() {
 if (document.getElementById("pad-name").value) savePad()
 var nameEl = document.getElementById("pad-name")
 var box = document.getElementById("pad-box")
 var nm = nameEl && nameEl.value ? nameEl.value.replace(/^\s+|\s+$/g, "") : "notes.txt"
 if (!nm) nm = "notes.txt"
 var blob = new Blob([box ? box.value : ""], { type: "text/plain" })
 var a = document.createElement("a")
 var url = URL.createObjectURL(blob)
 a.href = url
 a.download = nm
 document.body.appendChild(a)
 a.click()
 document.body.removeChild(a)
 setTimeout(function() { URL.revokeObjectURL(url) }, 1200)
})
var deskHold = null
var deskSkip = 0
function deskTarget(x, y, skip) {
 var list = document.elementsFromPoint(x, y)
 var i
 for (i = 0; i < list.length; i++) {
  if (skip && (list[i] == skip || skip.contains(list[i]))) continue
  var icon = list[i].closest && list[i].closest(".dk.dir")
  if (icon && icon != skip) return icon
  var row = list[i].closest && list[i].closest("#files-list button.fi.dir")
  if (row) return row
 }
 return null
}
function deskSlide(x, y) {
 if (!deskHold) return
 var nx = deskHold.ox + x - deskHold.sx
 var ny = deskHold.oy + y - deskHold.sy
 if (Math.abs(x - deskHold.sx) + Math.abs(y - deskHold.sy) > 5) deskHold.moved = 1
 if (!deskHold.moved) return
 deskHold.el.setAttribute("data-moved", "1")
 if (deskHold.el.className.indexOf(" go") == -1) deskHold.el.className += " go"
 if (nx < 4) nx = 4
 if (ny < headH()) ny = headH()
 if (nx > window.innerWidth - 74) nx = window.innerWidth - 74
 if (ny > window.innerHeight - 64) ny = window.innerHeight - 64
 deskHold.el.style.bottom = "auto"
 deskHold.el.style.left = nx + "px"
 deskHold.el.style.top = ny + "px"
 var old = document.querySelectorAll(".hot")
 var i
 for (i = 0; i < old.length; i++) old[i].className = old[i].className.replace(" hot", "")
 var onto = deskTarget(x, y, deskHold.el)
 var tid = onto && (onto.getAttribute("data-desk") || onto.getAttribute("data-id"))
 if (onto && String(tid) != String(deskHold.id)) {
  onto.className += " hot"
  document.body.style.cursor = "alias"
 } else document.body.style.cursor = "grabbing"
}
function deskDrop(x, y) {
 if (!deskHold) return
 var hold = deskHold
 deskHold = null
 document.body.style.cursor = ""
 hold.el.className = hold.el.className.replace(" go", "")
 var old = document.querySelectorAll(".hot")
 var i
 for (i = 0; i < old.length; i++) old[i].className = old[i].className.replace(" hot", "")
 if (hold.moved) {
  deskSkip = 1
  setTimeout(function() { deskSkip = 0 }, 0)
 }
 var onto = hold.moved ? deskTarget(x, y, hold.el) : null
 var did = 0
 if (onto) {
  var tid = onto.getAttribute("data-desk") || onto.getAttribute("data-id")
  if (tid && tuckIn(hold.id, tid)) did = 1
 }
 if (!did && hold.moved && hold.ghost) {
  hold.el.style.display = "none"
  var hit = document.elementFromPoint(x, y)
  var blocked = hit && hit.closest && hit.closest(".app-window, #taskbar, #pick, #deskmenu")
  if (!blocked) did = parkOut(hold.id, hold.el.offsetLeft, hold.el.offsetTop) ? 1 : 0
 }
 if (!did && hold.moved && !hold.ghost) pinSpot(hold.id, hold.el.offsetLeft, hold.el.offsetTop)
 if (hold.ghost && hold.el.parentNode) hold.el.parentNode.removeChild(hold.el)
}
document.addEventListener("mousedown", function(e) {
 if (e.button && e.button != 0) return
 var hit = e.target.closest && e.target.closest(".dk")
 if (hit) {
  deskHold = { el: hit, id: hit.getAttribute("data-desk"), sx: e.clientX, sy: e.clientY, ox: hit.offsetLeft, oy: hit.offsetTop, moved: 0, ghost: 0 }
  hit.setAttribute("data-moved", "0")
  return
 }
 var row = e.target.closest && e.target.closest("#files-list button.fi")
 if (!row || !row.getAttribute("data-id")) return
 var g = document.createElement("button")
 g.type = "button"
 var kind = row.className.indexOf("dir") != -1 ? "dir" : row.className.indexOf("md") != -1 ? "md" : "txt"
 g.className = "dk " + kind
 g.setAttribute("data-desk", row.getAttribute("data-id"))
 var mark = document.createElement("b")
 var lab = document.createElement("span")
 lab.textContent = row.textContent
 g.appendChild(mark)
 g.appendChild(lab)
 document.body.appendChild(g)
 var gx = e.clientX - 28
 var gy = e.clientY - 18
 g.style.left = gx + "px"
 g.style.top = gy + "px"
 g.style.bottom = "auto"
 deskHold = { el: g, id: row.getAttribute("data-id"), sx: e.clientX, sy: e.clientY, ox: gx, oy: gy, moved: 0, ghost: 1 }
})
document.addEventListener("mousemove", function(e) {
 if (!deskHold) return
 deskSlide(e.clientX, e.clientY)
})
document.addEventListener("mouseup", function(e) { deskDrop(e.clientX, e.clientY) })
document.addEventListener("touchstart", function(e) {
 var hit = e.target.closest && e.target.closest(".dk")
 if (!hit) return
 var p = e.touches && e.touches[0]
 if (!p) return
 deskHold = { el: hit, id: hit.getAttribute("data-desk"), sx: p.clientX, sy: p.clientY, ox: hit.offsetLeft, oy: hit.offsetTop, moved: 0 }
 hit.setAttribute("data-moved", "0")
}, { passive: true })
document.addEventListener("touchmove", function(e) {
 if (!deskHold) return
 var p = e.touches && e.touches[0]
 if (!p) return
 deskSlide(p.clientX, p.clientY)
 e.preventDefault()
}, { passive: false })
document.addEventListener("touchend", function(e) {
 var p = e.changedTouches && e.changedTouches[0]
 if (!p) return
 deskDrop(p.clientX, p.clientY)
})
document.addEventListener("click", function(e) {
 if (deskSkip) {
  deskSkip = 0
  return
 }
 if (document.getElementById("nmbox")) return
 var hit = e.target.closest && e.target.closest(".dk")
 if (!hit) return
 var f = fileById(hit.getAttribute("data-desk"))
 if (!f) return
 if (f.kind == "dir") {
  here = f.id
  openWindow(document.getElementById("files"))
  paintFiles()
 } else openPad(f)
})
document.getElementById("pad-new").addEventListener("click", function() {
 var box = document.getElementById("pad-box")
 if (box && box.value && !confirm("start a blank page?")) return
 openPad(null)
})
document.getElementById("pad-box").addEventListener("input", function() {
 if (!padId) return
 var list = pullFiles()
 var i
 for (i = 0; i < list.length; i++) {
  if (String(list[i].id) != String(padId)) continue
  list[i].text = document.getElementById("pad-box").value
  stashFiles(list)
  return
 }
})
termSay("ColorfulNOOK terminal. Type help")
paintDesk()
