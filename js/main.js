var quest = [];
var score = 0;
var WordData = [`안녕하세요`, `안녕`, `좋아`, `무엇`, `어디`, `왜`, `누구`, `언제`, `어떻게`, `완벽한`];

$("body").append(`<div class="RainBox"></div>`)
  .append("<input type='text' class='Input' onkeydown='Enter_Check()'>")
  .append("<button onClick='Check()' class='Check'>확인</button>")
  .append("<div class='Score'>점수 : </div>")
  .append(`<div class="ScorePoint">0</div>`);
$(".Input").focus();

function RainWord(){
  let minx = 50;
  let maxx = 1650;
  let x = Math.random() * (maxx - minx) + minx;
  let speed = Math.floor(Math.random() * 6 + 3);
  let word = Math.floor(Math.random() * (WordData.length - 1));
  $(".RainBox").append(`<div class="Quest" style="position:absolute; left:${x}px;">${WordData[word]}</div>`)
  quest.push({
    x:x,
    y:0,
    speed:speed,
    word:WordData[word],
    life:true,
    tag:$(".RainBox .Quest:last-child")
  });
}

/*
function ScoreGet(){
  document.querySelector(".ScorePoint").css("animation-name", "ScoreGrow");
  document.querySelector(".ScorePoint").css("animation-duration", "1s");
  setTimeout(ScoreGetEnd, 1000);
}*/

function ScoreGetEnd(){
  document.querySelector(".ScorePoint").css("animation-name", "none");
  document.querySelector(".ScorePoint").css("animation-duration", "1s");
}

function ScoreChange(_score){
  score += Math.floor(_score);

  document.querySelector(".ScorePoint").innerHTML = `${score}`;
  if(_score>0){
    if($(".ScorePoint").hasClass("Increase")){
    }
    else
    document.querySelector(".ScorePoint").classList.toggle("Increase");

    if($(".ScorePoint").hasClass("Decrease")){
      document.querySelector(".ScorePoint").classList.toggle("Decrease");
    }
  }
  else if(_score<0){
    if($(".ScorePoint").hasClass("Decrease")){
    }
    else
      document.querySelector(".ScorePoint").classList.toggle("Decrease");

    if($(".ScorePoint").hasClass("Increase")){
      document.querySelector(".ScorePoint").classList.toggle("Increase");
    }
  }
  //ScoreGet();
}

function RainMove(){
  let i;
  for(i = 0; i < quest.length; ++i){
    quest[i].tag.css("top", quest[i].y);
    quest[i].y += quest[i].speed;

    if(!quest[i].life){
      quest[i].tag.detach();
      quest.splice(i, 1);
      ScoreChange(100);
    }

    if(quest[i].y > 495){
      ScoreChange(-10);
      quest[i].tag.detach();
      quest.splice(i, 1);
      --i;
    }
  }
}

function Check(){
  let i;
  for(i = 0; i < quest.length; ++i) {
    if (quest[i].word == document.querySelector(".Input").value) {
      if(quest[i].life){
        quest[i].life = false;
        quest[i].tag.css("animation-name", "delete_anim");
        quest[i].tag.css("animation-duration", "1s");
      }
      break;
    }
  }
  document.querySelector(".Input").value = null;
  $(".Input").focus();
}

function Enter_Check() {
  if ( window.event.keyCode == 13 ) {
    Check();
  }
}

setInterval(RainWord, 1500);
setInterval(RainMove, 100);


/*
var id = 0;

$("body").append(`<div class="RainBox"></div>`);
$(".RainBox").append("<div class='Line'></div>")
  .append("<input type='text' class='Input' onkeydown='Enter_Check()'>")
  .append("<button onClick='Check()' class='Check'>확인</button>");

$(".Input").focus();

function RainWord(){
  let random = Math.random()*400;
  let randomInt = Math.floor(Math.random()*10);

  quest.push({
    id:id,
    x:random,
    y:0,
    data: WordData[randomInt]
  });
  $(".RainBox").append(`<div class="Quest ${quest[quest.length - 1].id}"
                        style="position:absolute; left:${quest[quest.length-1].x}px;">
                            ${quest[quest.length-1].data}
                            </div>`);
  id++;
}

function RainSpeed(){
  let i = 0;
  let randomSpeed = Math.floor(Math.random()*10+1);

  for(i = 0; i < quest.length; ++i){
    $(`.${quest[i].id}`).css("top", quest[i].y);
    quest[i].y += randomSpeed;

    if(quest[i].y > 490){
      $(".Quest").remove(`.${i}`);
    }
  }
}

setInterval(RainWord, 2000);
setInterval(RainSpeed, 100);

function Check(){
  let i = 0;
  for(i=0; i<quest.length; ++i) {
    if (quest[i].data == document.querySelector(".Input").value) {
      $(".Quest").remove(`.${i}`);
      i=9999999;
    }
  }
  document.querySelector(".Input").value = null;
  $(".Input").focus();
}

function Enter_Check() {
  if ( window.event.keyCode == 13 ) {
    Check();
  }
}
*/
