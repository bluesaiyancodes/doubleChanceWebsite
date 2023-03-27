$(document).ready(function(){

  // Page Number Format

  let pglen;
  let dataList ;
  


  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let currPage = params.page; 
  if (currPage==null){
    currPage = 1;
  }

  let startDate = "";
  let endDate = "";
  try{
     startDate = params.startDate.split(" ")[0];
     endDate = params.endDate.split(" ")[0];
  }catch (e){
    startDate = "";
    endDate = "";
  }
  
  let searchType = params.searchType;
  let keyword = params.keyword;
  let manualSearch = params.manualSearch;
  console.log(manualSearch);


  console.log(startDate, endDate, searchType, keyword);

  var payload = {
    startDate: startDate, 
    endDate: endDate, 
    searchType: searchType,
    keyword: keyword
  }

 

  if (manualSearch=="1"){


    let delvData;

    var payloadData = new FormData();
    payloadData.append("json", JSON.stringify(payload));
  
    const getData2 = async () => {
      const response = await fetch('http://localhost:3000/api/delivery/search',{
        method: 'POST',
        body: payloadData
      });
      const data = await response.json();
      delvData = data;
      console.log(data);
    };



    (async () => {
      await getData2();
      console.log(delvData["data"]);
      for (var i =0;i<Object.keys(delvData["data"]).length; i++){
        console.log(delvData["data"][i]);
        var data = delvData["data"][i];
        var dlStatus = parseInt(data["status"])== 0 ? "미완성":"완성인";
        var str_delvdata = '<tr> <td>'+data["id"]+'</td><td>전생슬 사립 템페트스트 학원</td><td>'+data["name"]+'</td><td>'+data["phone"]+'</td><td>'+data["date"]+'</td><td>전생슬 사립 템페트스트 학원</td><td>'+dlStatus+'</td>';
        str_delvdata += '<td>-</td></tr>';
  
        //console.log(str_delvdata)
        var wrapper = $("#deliverydata");
        $(wrapper).append(str_delvdata);
  
        
      }
      
  
    })();
  }else{

    

    const getList = async () => {
      const response = await fetch('http://localhost:3000/api/serial/list');
      const data = await response.json();
      //console.log(data["data"][0]);
      dataList = data["data"];
      var count = 0;
      for (var i in dataList){
       // console.log("i",dataList[i]);
       if (count==1){
        var options = '<option value="'+dataList[i]+'" selected>'+dataList[i]+'</option>';
       }else{
        var options = '<option value="'+dataList[i]+'">'+dataList[i]+'</option>';
       }
        
        $('#filelist').append(options);

      }
      console.log("datalist", dataList);
      return data;
     // tablecontent();
    };


    

   

    const getData = async (serialnum) => {
      const response = await fetch('http://localhost:3000/api/serial/type/'+serialnum+'/page');
      const data = await response.json();
      //console.log("seriel", data);
      //console.log("text1", serialnum);
      pglen = parseInt(data["len"]);
      return data;
    };
  
    
    
    (async () => {
      await getList();
      //console.log("text1a", dataList);
      var curSelected = document.getElementById("filelist");
      console.log(curSelected.value);
      

      await getData(curSelected.value);
      tablecontent();
      dataDelivery();
      //for (var serialnum in dataList){
       // console.log("text15", serialnum);
       // await getData(serialnum);
    //  }
      
    
      
  
    })();


    function tablecontent(){
      //pglen = 5;
      console.log("page len: ", pglen);
        
      console.log("current pg: ", currPage);
      var curPage = parseInt(currPage);
      
      
      $(".pagination").children().remove();
      
      var wrapper = $(".pagination");
      var str_start = '<a onclick="goPage(1)" class="pg_page pg_start"> <i class="fa fa-angle-double-left" aria-hidden="true"> <span class="hidden">처음</span> </i> </a>';
      var str_prev = '<a onclick="true ? goPage() : goPage([['+(curPage-1 == 0 ? 1 : curPage-1)+']])" class="pg_page pg_prev"> <i class="fa fa-angle-left" aria-hidden="true"> <span class="hidden">이전</span></i></a>';
      
      $(wrapper).append(str_start);
      $(wrapper).append(str_prev);
      //console.log(str2)
      var start_ = curPage-5<1? 1 : curPage-5;
      var end_ = curPage+5>pglen? pglen : curPage+5;
      //console.log(end_);
      for (var i=start_;i<=end_;i++){
        if(i==curPage){
          var strLooper = '<strong class="pg_page pg_current">'+i+'</strong>';
        }else{
          var strLooper = '<a onclick="goPage('+i+')" class="pg_page">'+i+'</a>';
        }
        //console.log(strLooper);
        $(wrapper).append(strLooper);
      }
      var str_next = '<a onclick="false ? goPage() : goPage([['+(curPage+1 > pglen ? pglen : curPage+1)+']])" class="pg_page pg_next"><i class="fa fa-angle-right" aria-hidden="true"><span class="hidden">다음</span></i></a>';
      var str_end = '<a onclick="goPage('+pglen+')" class="pg_page pg_end"><i class="fa fa-angle-double-right" aria-hidden="true"><span class="hidden">맨끝</span></i></a>';
      
      $(wrapper).append(str_next);
      $(wrapper).append(str_end);
      //console.log(str_end);
            
          }
  

  function dataDelivery(){

 //$(wrapper2).append(str_delvdata);
 $("#deliverydata").children().remove();
 $("#deliverydata").addClass('table');
 var wrapper2 = $("#deliverydata");
			
 let delvData;
 const getDelData = async (serialnum1) => {
  // console.log('http://localhost:3000/api/serial/type/23020602/page/'+currPage);
  console.log('http://localhost:3000/api/serial/type/'+serialnum1+'/page/'+currPage);
   const response = await fetch('http://localhost:3000/api/serial/type/'+serialnum1+'/page/'+currPage);
   const data = await response.json();
   delvData = data;
   
   return data;
 };
 
 (async () => {
   
   var curSelected = document.getElementById("filelist");
   console.log(curSelected);
   await getDelData(curSelected.value);
   //console.log(dataList);
   //pglen = 5;
   //console.log(Object.keys(delvData["data"]).length);
   for (var i =0;i<Object.keys(delvData["data"]).length; i++){
     //console.log(delvData["data"][i]);
     var data = delvData["data"][i];
     var str_delvdata = '<tr><td>'+data["id"]+'</td><td>'+data["serial"]+'</td><td>'+data["typeid"]+'</td><td>'+data["name"]+'</td><td>'+data["win"]+'</td><td>'+data["used"]+'</td>';
     str_delvdata += '</tr>';

     //console.log(str_delvdata)
     $(wrapper2).append(str_delvdata);

     
   }
  

 })();

  }
 



  $("#filelist").on('change',function(){

    (async () => {
      var curSelected = document.getElementById("filelist");
      tablecontent();

      await getData(curSelected.value);
      dataDelivery();
      //for (var serialnum in dataList){
       // console.log("text15", serialnum);
       // await getData(serialnum);
    //  }
      
    
      
  
    })();
    
  });




  }
 
  
  
  




});

/*

$(function(){	
  /* 시,도 설정 

    $.ajax({
       type : "POST",
      url : "/admin/map/category.do",
      data : {city : cityOrg},
       success : function(res) {
        if(res.result){
          $("#county").children().remove();
          var countySelectBox = '<option value="">시/군/구</option>';
          countySelectBox += '<option value="99">전체</option>';
          for(var i=0; i<res.county.length; i++){
            countySelectBox += '<option value="'+ res.county[i].addressCode +'">' + res.county[i].name + '</option>'
          }
          $('#county').append(countySelectBox);
          $("#county").val(countyOrg).prop("selected", true);
        } else {
          alert(res.msg);
        }
      },
      error : function(xhr){
        if(xhr.status == 403){
          alert("세션이 만료되었습니다. 다시 로그인해주시기 바랍니다.");
          location.href = "/admin/login.do";
        }else{
          alert("오류가 발생하였습니다. 다시 시도해주시기 바랍니다.");
        }
      }
     });
});

*/