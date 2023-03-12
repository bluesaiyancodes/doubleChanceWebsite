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

  $('.back-btn').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    $('#home').animate({right: '0%'});
    $('#tandc-block').animate({left: '100%'});
    // $('#tandc-block').hide();
  })

  $('#btn-tandc').click(function() {
    if ($('#mark').is(':checked')) {
      window.location.href = 'second_page.html';
    }
    else {
      alert('약관을 확인하십시오');
    }
  });

  // var selectEl = document.getElementById("cars");

  var imageList = Array();
  for (var i = 1; i <= 9; i++) {
      imageList[i] = new Image(70, 70);
      imageList[i].src = "https://api.lorem.space/image/movie?w=72"+i+"&h=128"+i;
  }
  $(".list-content").css("background-image", 'url(' + imageList[1].src + ')');
  // selectEl.onclick = function () {
  $('#cars').click(function(){
    var val = parseInt(this.value);
    $(".list-content").css("background-image", 'url(' + imageList[val].src + ')');
    $(".tandc-section2").css("background-image", 'url(' + imageList[val].src + ')');
    var selectedText = $(this).find('option:selected').text();
    $('.header-text').text(selectedText);
  });

  var a = Math.floor(100000 + Math.random() * 900000);   
  a = String(a);
  // a = a.substring(0,4);
  $('.captcha').text(a);

  $('.captcha-reload').click(function(){
    var a = Math.floor(100000 + Math.random() * 900000);   
    a = String(a);
    $('.captcha').text(a);
  });

  var max_fields = 5;
  var wrapper = $(".form-group");
  var add_button = $(".add_more");

  var x = 1;
  $(add_button).click(function(e) {
      e.preventDefault();
      if (x < max_fields) {
        x++;
        $(wrapper).append('<div><input class="input-field" type="text"/> . <button class="input-button">Lorem, ipsum. <i class="fa-solid fa-camera"></i></button></div>'); //add input box
      } else {
          alert('You Reached the limits')
      }
  });
  $(wrapper).on("click", ".delete", function(e) {
    e.preventDefault();
    $(this).parent('div').remove();
      x--;
  });
});