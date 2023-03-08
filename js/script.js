let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");

menu.addEventListener("click", () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
});

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");

  if (window.scrollY > 60) {
    document.querySelector("#scroll-top").classList.add("active");
  } else {
    document.querySelector("#scroll-top").classList.remove("active");
  }
};

function loader() {
  document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
  setInterval(loader, 1000);
}

window.onload = fadeOut();

$(document).ready(function(){
  $("#btn").on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    $('#home').animate({right: '100%'});
    $('#tandc-block').animate({left: '0%'});
    $('#tandc-block').show();
  });

  $('#btn-tandc').click(function() {
    if ($('#mark').is(':checked')) {
        alert('you agreed conditions');
    }
    else {
        alert('please check terms & conditions');
    }
  });

  // var selectEl = document.getElementById("cars");
  var imageList = Array();
for (var i = 1; i <= 9; i++) {
    imageList[i] = new Image(70, 70);
    imageList[i].src = "https://api.lorem.space/image/movie?w=72"+i+"&h=128"+i;
}
  // selectEl.onclick = function () {
  $('#cars').click(function(){
    var val = parseInt(this.value);
    $(".home-slide").css("background-image", 'url(' + imageList[val].src + ')');
  });
});
