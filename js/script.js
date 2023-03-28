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

$(document).ready(function () {


  $("#btn").on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#home').animate({ right: '100%' });
    $('#tandc-block').animate({ left: '0%' });
    $('#tandc-block').show();
  });

  $("#opn_submit_btn").on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#home').animate({ right: '100%' });
    $('#tandc-block').animate({ left: '0%' });
    $('#tandc-block').show();
  });

  $('#opn_back_btn').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('#home').animate({ right: '0%' });
    $('#tandc-block').animate({ left: '100%' });
    // $('#tandc-block').hide();
  })


  $('#btn-tandc').click(function (e) {
    if ($('#mark').is(':checked')) {
      window.location.href = 'second_page.html';
    }
    else {
      alert('약관을 확인하십시오');
    }
  });

  $(".img-card").click(function(e){
    selectedText = $(this).find('p').text();
    // alert(header_text);
    e.stopPropagation();
    e.preventDefault();
    $('#home').animate({ right: '100%' });
    $('#tandc-block').animate({ left: '0%' });
    $('#tandc-block').show();
    $('.header-text').text(selectedText);
  });

  /*
    $("#flip").click(function(){
      $("#panel").slideDown("slow");
    });
    */

  // Page 2 -  Second Page JS

  // var selectEl = document.getElementById("cars");

  // Image PreLoad

  var imageList = Array();

  //const productList = document.getElementById("cars");
  //console.log({ productList });
  var pData; 
  const getData = async () => {
    const response = await fetch('http://localhost:3000/api/goods/types');
    const data = await response.json();
    pData = data;
    console.log(data);
  };



  (async () => {
    await getData();
    var wrapper = $("#cars");
    
    for(var i in pData){
     console.log(i);
     var data = pData[i];
     //var str_tiles = '<div class="img-card" id="img-'+(parseInt(i)+1)+'"><p>'+data["typename"]+'</p></div>';
     var str_tiles = '<option id="img-'+(parseInt(i)+1)+'" value="'+(parseInt(i)+1)+'"><p>'+data["typename"]+'</p></option>';
     //<option value="">----</option>
     console.log(str_tiles);
     wrapper.append(str_tiles);

      
    }


    $(".form-card").click(function(e){
      var optionE = document.getElementById("cars");
      var selectedText = optionE.options[optionE.selectedIndex].text;
    //selectedText = $(this).text();
      console.log(selectedText);
      // alert(header_text);
      e.stopPropagation();
      e.preventDefault();
      $('#home').animate({ right: '100%' });
      $('#tandc-block').animate({ left: '0%' });
      $('#tandc-block').show();
      //$('#productname').text(selectedText);
      document.getElementById("productname").innerHTML = selectedText;
      createCookie("doubleChanceTck", $(this)[0].id, 15)
      createCookie("doubleChanceTckName", $(this)[0].id, 15)
    });

    function createCookie(name,value,minutes) {
      if (minutes) {
       var date = new Date();
       date.setTime(date.getTime()+(minutes*60*1000));
       var expires = "; expires="+date.toGMTString();
      } else {
         var expires = "";
      }
     document.cookie = name+"="+value+expires+"; path=/";
 }		

    

  })();



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
      imageList[i].src = "http://localhost:3000/api/goods/image/" + option.typeid;
      console.log(i);
      console.log(imageList[i].src);
      i = i + 1;
    }

    console.log(imageList)
    $(".list-content").css("background-image", 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(' + imageList[1].src + ')');
    // selectEl.onclick = function () {
    $('#cars').click(function () {
      //var val = parseInt(this.value);
      var val = $("#cars").children(":selected").attr("id");
      $(".list-content").css("background-image", 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(' + imageList[val].src + ')');
      $(".tandc-section2").css("background-image", 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(' + imageList[val].src + ')');
      var selectedText = $(this).find('option:selected').text();
      $('.header-text').text(selectedText);
    });
  };

  //displayOption();

  // Page  2 Validation
  $('#opn_submit_btn_final').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();

    var validateFlag = true;
    for (var i = 1; i <= 11; i++) {
      var inputData = document.getElementById('id' + i.toString()).value;
      console.log(inputData);
      if (inputData == "") {
        $('#id' + i.toString()).css("border-color", "red");
        $('#id' + i.toString()).css("border-style", "solid");
        validateFlag = false;
      } else {
        $('#id' + i.toString()).css("border-style", "none");
      }
    }

    if (validateFlag) {
      window.location.href = 'third_page.html';


      /*
      var myRedirect = function(redirectUrl, arg, value) {
        var form = $('<form action="' + redirectUrl + '" method="post">' +
        '<input type="hidden" name="'+ arg +'" value="' + value + '"></input>' + '</form>');
        $('body').append(form);
        $(form).submit();
      };
      */


    }



  });






  // Page 3

  // For Captcha Generation

  var a = Math.floor(100000 + Math.random() * 900000);
  a = String(a);
  // a = a.substring(0,4);
  $('.captcha').text(a);

  $('.captcha-reload').click(function () {
    var a = Math.floor(100000 + Math.random() * 900000);
    a = String(a);
    $('.captcha').text(a);
  });

  // Add more Coupon Space

  var max_fields = 5;
  var wrapper = $(".form-group");
  var add_button = $(".add_more");

  var x = 1
  $(add_button).click(function (e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      var str1 = '<div class="form-group">';
      var str2 = '<div class="form-group"><input class="hide" type="file" accept="image/*" id="file-input' + (x + 2) + '" capture="environment" ><input class="input-field" type="text" placeholder="쿠폰을 입력하십시오" maxlength="19" id="coupon' + (x + 2) + '" /> . <button class="input-button" onclick="$(' + '\'#file-input' + (x + 2) + '\').click()" >이미지 스캔 <i class="fa-solid fa-camera"></i></button></div>'
      $(wrapper).append(str2); //add input box
    } else {
      alert('You Reached the limits')
      // Maximum limit reached
    }
  });

  $('#upload').on('change', function () {
    var reader = new FileReader();
    reader.onload = function (event) {
      $image_crop.croppie('bind', {
        url: event.target.result
      }).then(function () {
        console.log('jQuery bind complete');
      });
    }
    reader.readAsDataURL(this.files[0]);
    $('#myModal').modal('show');
  });

  $('.crop_image').click(function (event) {
    $image_crop.croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function (response) {
      $.ajax({
        url: '<?php echo base_url(); ?>crop/upload',
        type: "POST",
        data: { "image": response },
        success: function (data) {
          $('#myModal').modal('hide');
          $('#uploaded').html(data);
        }
      });
    })
  });

 function doSomethingWithFiles(e){
  var file_id = e.target.id;

    //var file_name_arr = new Array();
    //var process_path = site_url + 'public/uploads/';

    

//    for (i = 0; i < $("#" + file_id).prop("files").length; i++) {

        $(".loading").show();


        
        var form_data = new FormData();
        var file_data = $("#" + file_id).prop("files")[0];
        form_data.append("image", file_data);

        //console.log(i);
        $.ajax({
          //url         :   site_url + "inc/upload_image.php?width=96&height=60&show_small=1",
          url: "http://localhost:3000/api/ocr",
          cache: false,
          contentType: false,
          processData: false,
          async: false,
          data: form_data,
          type: 'post',
          success: function(data) {
            //$(".loading").hide();
              // display image
              console.log(data);
              var ib = document.getElementById("coupon1");
              ib.value = data["data"];
              
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) { 
            $(".loading").hide();
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }      
      });

 }

  //Image Handling
  const fileInput = document.getElementById('file-input1');
  fileInput.addEventListener('change', (e) =>{
    console.log(e.target.id);

  //document.getElementById('spinner').style.display= 'block' ;
  doSomethingWithFiles(e);
    
  });

  // Captcha and Coupon Validation
  var coupon1L = 19;
  var coupon2L = 14;

  $('#submit_coupons').click(function (e) {

    var emptyCouponFlag = true;
    var capchaFlag = false;
    var validateFlag = false;

    // Captcha Validation
    var capchaInput = document.getElementById('captcha_input').value;
    var capchaReal = $('.captcha').text();
    if (capchaInput == capchaReal) {
      console.log("Captcha Success!");
      capchaFlag = false;
    }
    else {
      alert("자동입력 방지문자 입력을 다시 확인해 주세요");
      capchaFlag = true;
      document.getElementsByClassName('captcha-reload')[0].click();
    }

    // Coupon Validation 1

    // Candidate coupons
    var couponArray = Array();
    if (!capchaFlag) {
      coupon_count = $("div#form-group input").length;
      // because there are two input tags per each input box
      coupon_count = coupon_count / 2

      for (var i = 1; i <= coupon_count; i++) {
        var coupon_i = document.getElementById('coupon' + i.toString()).value;

        if (coupon_i == "") {
          $('#coupon' + i.toString()).css("border-style", "none");
          continue;
        } else {
          if (coupon_i.length != coupon1L && coupon_i.length != coupon2L) {
            $('#coupon' + i.toString()).css("border-style", "solid");
            validateFlag = true;
          } else {
            $('#coupon' + i.toString()).css("border-style", "none");
            couponArray[i - 1] = coupon_i
            emptyCouponFlag = false

            $.ajax({
              type: "POST",
              dataType: "json",
              url: "http://localhost:3000/api/win/valid",
              headers: {
                'serial': coupon_i,
                'type': coupon_i
              },
              success: function (data) {
                alert(data);
              },
              error: function (error) {

                jsonValue = jQuery.parseJSON(error.responseText);
                alert("error" + error.responseText);
              }
            });

          }

        }

      }

      if (validateFlag) {
        alert("쿠폰을 다시 확인해 주세요");
        validateFlag = false;
        document.getElementsByClassName('captcha-reload')[0].click();
      } else {
        if (!emptyCouponFlag) {
          console.log("Coupon Success!")
          console.log(couponArray)

          if (couponArray[1] == "IKPJ-660723708") {
            window.location.replace("denied.html");
          } else if (couponArray[2] == "IKPJ-660723708") {
            window.location.replace("denied.html");
          }
          else if (couponArray[3] == "IKPJ-660723708") {
            window.location.replace("denied.html");
          }

          window.location.replace("result.html");
          if (couponArray.length > 2) {
            window.location.replace("result.html");
          } else {
            window.location.replace("denied.html");
          }

          /*
          $.post("www.abc.com/details", {
            json_string: JSON.stringify({id:"John", validity:"+valid"})
        });
       */
        }
      }
    }
  });

  // adress form submit

  $("#addresssubmitbtn").click(function () {
    console.log(document.getElementById("cityField").value)
    if (document.getElementById("cityField").value == "") {
      alert("도시 정보를 삽입합니다");
    } else if (document.getElementById("zipField").value == "") {
      alert("도시 정보를 삽입합니다");
    } else if (document.getElementById("addressField").value == "") {
      alert("적절한 주소 정보를 삽입하십시오");
    } else {
      alert("성공적으로 제출되었습니다");
      window.location.replace("index.html");
    }
  });
});

// async data fetch
$(function () {
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
  "http://localhost:3000/auth/check";

// Defining async function
async function getapi(url) {

  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  const obj_ = JSON.parse(data);

  if (response) {
    console.log("data-");
    console.log(obj_);


    if (data[0] != 0) {
      console.log("kakao");
    }

  }
  //show(data);
}
// Calling that async function
getapi(api_url);

fetch('http://localhost:3000/auth/check')
  .then(response => response.text()) // the promise
  .then(data => console.log('Data', data)) // data
  .catch(error => console.log('Error', error))

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





