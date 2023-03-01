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
  // var contentBoxWidth = $(".content").width();
  // var imageBoxWith = $(".image").width();

  // $(".btn").click(function(){
  //   $(".content").animate({
  //     width: 0
  //   });
  //   $(".image").animate({
  //     width: 0
  //   });
  // });

  $(".btn").on('click', function(e){
    e.stopPropagation();
    e.preventDefault();

    // $('#home').hide("slide", { direction: "left" }, 500, function () {
    //   $('#tandc-block').show("slide", { direction: "right" }, 500);
    // });
    $('#home').toggle("slide");
    $('#tandc-block').toggle("slide");
    $('#tandc-block').show();
  });
});