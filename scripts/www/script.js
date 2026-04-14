let alarms = [], notes = []
window.onload = ()=>{
let pwd = prompt("密码：123456");if(pwd!=="123456"){alert("密码错误");return}
startClock();loadData();render()
}
function startClock(){
setInterval(()=>{
let d=new Date();
document.getElementById("clock").innerText=d.toTimeString().slice(0,8);
document.getElementById("date").innerText=`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 星期${"日一二三四五六"[d.getDay()]}`
},1000)
}
function switchTab(n){
document.querySelectorAll(".page").forEach(p=>p.style.display="none");
document.querySelectorAll(".tab").forEach(t=>t.classList.remove("cur"));
document.getElementById("p"+n).style.display="block";
event.target.classList.add("cur")
}
function loadData(){
alarms=JSON.parse(localStorage.getItem("alarms"))||[]
notes=JSON.parse(localStorage.getItem("notes"))||[]
}
function saveData(){
localStorage.setItem("alarms",JSON.stringify(alarms))
localStorage.setItem("notes",JSON.stringify(notes))
alert("已保存到手机本地！")
}
function render(){
document.getElementById("alarm_box").innerHTML=alarms.map((a,i)=>`<div class="card" onclick="editAlarm(${i})">${a.time}<br>${a.week}</div>`).join("")
document.getElementById("note_box").innerHTML=notes.map((n,i)=>`<div class="card" onclick="editNote(${i})">${n.content}</div>`).join("")
}
function addAlarm(){
let t=prompt("时间(08:30)"),w=prompt("周几1,2,3");
if(!t)return;alarms.push({time:t,week:w});saveData();render()
}
function editAlarm(i){
let t=prompt("改时间",alarms[i].time),w=prompt("改周几",alarms[i].week);
if(t)alarms[i].time=t;if(w)alarms[i].week=w;saveData();render()
}
function addNote(){
let c=prompt("写笔记");if(!c)return;notes.push({content:c});saveData();render()
}
function editNote(i){
let c=prompt("修改",notes[i].content);if(c)notes[i].content=c;saveData();render()
}
function exitApp(){if(confirm("退出？"))window.close()}