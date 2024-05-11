function opensiteshow() {
  document.getElementById('support-dialog').style.display = 'block';
}
function closesiteshow() {
  document.getElementById('support-dialog').style.display = 'none';
}
function openabotmeshow() {
  document.getElementById('about-me').style.display = 'block';
}
function closeabotmeshow() {
  document.getElementById('about-me').style.display = 'none';
}

fetch('https://v1.hitokoto.cn')
.then(function (res){
  return res.json();
})
.then(function (data) {
  var hitokoto = document.getElementById('hitokoto-b');
  hitokoto.innerText = data.hitokoto; 
})
.catch(function (err) {
  console.error(err);
})


