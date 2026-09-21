function updateTime() {
 var t = new Date().toLocaleString();
 var timeText = document.querySelector("#timeElement");
 timeText.innerHTML = t;
 }
setInterval(updateTime, 1000);
updateTime()
