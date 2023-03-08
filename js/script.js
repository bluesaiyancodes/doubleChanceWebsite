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
  var imageUrl1 = "https://images.unsplash.com/photo-1567712757969-10f9685a38ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80";
  var imageUrl2 = "https://images.unsplash.com/photo-1630394242249-6ffe76311e6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  var imageUrl3 = "https://images.unsplash.com/photo-1543274511-628d791f4059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  var imageUrl4 = "https://images.unsplash.com/photo-1617125319101-5af7a7039b37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  var imageUrl5 = "https://images.unsplash.com/photo-1633428109931-841207a73157?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  var imageUrl6 = "https://images.unsplash.com/photo-1634472777899-0da9b0500c2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  var imageUrl7 = "https://images.unsplash.com/photo-1511104798669-e37caf0cdd43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  var imageUrl8 = "https://images.unsplash.com/photo-1511104592628-985b41b275b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  var imageUrl9 = "https://images.unsplash.com/photo-1438180363262-23d500170976?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80";
  var imageUrl10 = "https://images.unsplash.com/photo-1478071735433-5d8f19ad0fca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  // selectEl.onclick = function () {
  $('#cars').click(function(){
    if (this.value == "opt1") {
      $(".home-slide").css("background-image", "url(" + imageUrl1 + ")");
    }
    else if(this.value == "opt2"){
      $(".home-slide").css("background-image", "url(" + imageUrl2 + ")");
    }
    else if(this.value == "opt3"){
      $(".home-slide").css("background-image", "url(" + imageUrl3 + ")");
    }
    else if(this.value == "opt4"){
      $(".home-slide").css("background-image", "url(" + imageUrl4 + ")");
    }
    else if(this.value == "opt5"){
      $(".home-slide").css("background-image", "url(" + imageUrl5 + ")");
    }
    else if(this.value == "opt6"){
      $(".home-slide").css("background-image", "url(" + imageUrl6 + ")");
    }
    else if(this.value == "opt7"){
      $(".home-slide").css("background-image", "url(" + imageUrl7 + ")");
    }
    else if(this.value == "opt8"){
      $(".home-slide").css("background-image", "url(" + imageUrl8 + ")");
    }
    else if(this.value == "opt9"){
      $(".home-slide").css("background-image", "url(" + imageUrl9 + ")");
    }
    else if(this.value == "opt10"){
      $(".home-slide").css("background-image", "url(" + imageUrl10 + ")");
    }
    else {
      $(".home-slide").css("background-color", "white");
    }
  });
});
