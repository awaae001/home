function showTime() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();

    var element = document.getElementById('time');
    element.innerHTML = hour + '点' + minute +'分'
}
setInterval('showTime()', 1000);

/** 
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
*/
  