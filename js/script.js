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

  $("#opn_submit_btn").on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    $('#home').animate({right: '100%'});
    $('#tandc-block').animate({left: '0%'});
    $('#tandc-block').show();
  });

  $('#opn_back_btn').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    $('#home').animate({right: '0%'});
    $('#tandc-block').animate({left: '100%'});
    // $('#tandc-block').hide();
  })

  $('#opn_submit_btn_final').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    window.location.href = 'third_page.html';
  });

  $('#btn-tandc').click(function(e) {
    if ($('#mark').is(':checked')) {
      window.location.href = 'second_page.html';
    }
    else {
      alert('약관을 확인하십시오');
    }
  });


  $("#flip").click(function(){
    $("#panel").slideDown("slow");
  });

  // Page 2 -  Second Page JS

  // var selectEl = document.getElementById("cars");

  // Image PreLoad

  var imageList = Array();
  /*
 
  for (var i = 1; i <= 9; i++) {
      
  }

  */

  const productList = document.getElementById("cars");
  console.log({ productList });
  const getPost = async () => {
    const response = await fetch("http://202.31.200.222/api/goods/types");
    const data = await response.json();
    console.log(data);
    return data;
  };
  
  const displayOption = async () => {
    const options = await getPost();
    var i = 1;
    for (option of options) {
      const newOption = document.createElement("option");
      newOption.value = option.typeid;
      newOption.text = option.typename;
      newOption.id = i;
      productList.appendChild(newOption);
      imageList[i] = new Image(70, 70);
      imageList[i].src = "http://202.31.200.222/api/goods/image/"+option.typeid;
      console.log(i);
      console.log(imageList[i].src);
      i = i+1;
    }
    console.log(imageList)
    $(".list-content").css("background-image", 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(' + imageList[1].src + ')');
    // selectEl.onclick = function () {
    $('#cars').click(function(){
      //var val = parseInt(this.value);
      var val = $("#cars").children(":selected").attr("id");
      $(".list-content").css("background-image", 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(' + imageList[val].src + ')');
      $(".tandc-section2").css("background-image", 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(' + imageList[val].src + ')');
      var selectedText = $(this).find('option:selected').text();
      $('.header-text').text(selectedText);
    });

  };
  
  displayOption();


  







  // Page 3

  // For Captcha Generation

  var a = Math.floor(100000 + Math.random() * 900000);   
  a = String(a);
  // a = a.substring(0,4);
  $('.captcha').text(a);

  $('.captcha-reload').click(function(){
    var a = Math.floor(100000 + Math.random() * 900000);   
    a = String(a);
    $('.captcha').text(a);
  });

  // Add more Coupon Space

  var max_fields = 5;
  var wrapper = $(".form-group");
  var add_button = $(".add_more");

  var x = 1
  $(add_button).click(function(e) {
      e.preventDefault();
      if (x < max_fields) {
        x++;
        var str1 = '<div class="form-group">';
        var str2 = '<div class="form-group"><input class="hide" type="file" accept="image/*" id="file-input'+(x+2)+'" capture="environment" ><input class="input-field" type="text" placeholder="알파벳 4자리" id="coupon'+(x+2)+'" /> . <button class="input-button" onclick="$('+'\'#file-input'+(x+2)+'\').click()" >숫자입력  <i class="fa-solid fa-camera"></i></button></div>'
        $(wrapper).append(str2); //add input box
      } else {
          alert('You Reached the limits')
      }
  });  

  $('#upload').on('change', function(){
    var reader = new FileReader();
    reader.onload = function (event) {
      $image_crop.croppie('bind', {
        url: event.target.result
      }).then(function(){
        console.log('jQuery bind complete');
      });
    }
    reader.readAsDataURL(this.files[0]);
    $('#myModal').modal('show');
  });



  $('.crop_image').click(function(event){
    $image_crop.croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function(response){
      $.ajax({
        url:'<?php echo base_url(); ?>crop/upload',
        type: "POST",
        data:{"image": response},
        success:function(data)
        {
          $('#myModal').modal('hide');
          $('#uploaded').html(data);
        }
      });
    })
  });





  //Image Handling
  const fileInput = document.getElementById('file-input1');
  //fileInput.addEventListener('change', (e) =>{

    //doSomethingWithFiles(e.dataTransfer.files);

  //});

  // Captcha and Coupon Validation
  var coupon1L = 19;
  var coupon2L = 14;

  

  $('#submit_coupons').click(function(e) {


  var emptyCouponFlag = true;
  var capchaFlag = false;
  var validateFlag = false;

    // Captcha Validation
    var capchaInput = document.getElementById('captcha_input').value;
    var capchaReal = $('.captcha').text();
    if (capchaInput==capchaReal){
        console.log("Captcha Success!");
        capchaFlag = false;
      }
    else{
      alert("자동입력 방지문자 입력을 다시 확인해 주세요");
      capchaFlag = true;
      document.getElementsByClassName('captcha-reload')[0].click();
    }

    // Coupon Validation 1
    
    // Candidate coupons
    var couponArray = Array();

    if (!capchaFlag){

      coupon_count = $("div#form-group input").length;
      // because there are two input tags per each input box
      coupon_count = coupon_count/2
      
      for (var i=1; i<= coupon_count; i++){
        var coupon_i = document.getElementById('coupon'+i.toString()).value;

        if (coupon_i == "" ){
          $('#coupon'+i.toString()).css("border-style","none");
          continue;
        }else{
          if (coupon_i.length!=coupon1L && coupon_i.length!=coupon2L){
            $('#coupon'+i.toString()).css("border-style","solid");
            validateFlag = true;
          }else{
            $('#coupon'+i.toString()).css("border-style","none");
            couponArray[i-1] = coupon_i
            emptyCouponFlag = false
          }
  
        }
  
      }
  
        if (validateFlag){
          alert("쿠폰을 다시 확인해 주세요");
          validateFlag = false;
          document.getElementsByClassName('captcha-reload')[0].click();
        }else{
          if (!emptyCouponFlag){
            console.log("Coupon Success!")
            console.log(couponArray)
            window.location.replace("result.html");
          }
         


        }

    }


    
    
  });



  // adress form submit

  $("#addresssubmitbtn").click(function(){
    console.log(document.getElementById("cityField").value)
    if (document.getElementById("cityField").value == ""){
      alert("도시 정보를 삽입합니다");
    }else if (document.getElementById("zipField").value == ""){
      alert("도시 정보를 삽입합니다");
    }else if (document.getElementById("addressField").value == ""){
      alert("적절한 주소 정보를 삽입하십시오");
    }else{
      alert("성공적으로 제출되었습니다");
      window.location.replace("index.html");
    }
  });


  





});

// async data fetch
$(function(){ 
  /*
  coupon_count = $("div#form-group input").length;
  for (var i=1; i<= coupon_count; i++){
    $('#coupon'+i.toString()).keyup(function() {
      if(this.value.length>5){
        alert('Coupon'+i.toString()+": done");
       
      }
      
    });
  }
  */
  
});




// api url
const api_url = 
"http://202.31.200.222/api/goods/types";

// Defining async function
async function getapi(url) {

// Storing response
const response = await fetch(url);

// Storing data in form of JSON
var data = await response.json();

if (response) {
console.log(data[0]);

}
//show(data);
}
// Calling that async function
getapi(api_url);

/*


function addsub(){
  console.log(document.getElementById("cityField"))
  if (document.getElementById("cityField") == ""){
    alert("도시 정보를 삽입합니다");
  }else if (document.getElementById("zipField") == ""){
    alert("도시 정보를 삽입합니다");
  }else if (document.getElementById("addressField") == ""){
    alert("적절한 주소 정보를 삽입하십시오");
  }else{
    alert("성공적으로 제출되었습니다");
  }
  
  return true;
}
  */





