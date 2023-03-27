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


  }else{

    

    const getList = async () => {
      const response = await fetch('http://localhost:3000/api/survey/list');
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


    

   

    const getData = async (dataType) => {
      const response = await fetch('http://localhost:3000/api/survey/result/'+dataType+"/page");
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
 $("#deliveryhead").children().remove();
 $("#deliveryhead").addClass('table');
 $("#deliverydata").children().remove();
 $("#deliverydata").addClass('table');

 var wrapper1 = $("#deliveryhead");
 var wrapper2 = $("#deliverydata");
			


 let delvHead;
 const getDelHead = async (dataType) => {

   const response = await fetch('http://localhost:3000/api/survey/result/'+dataType);
   const data = await response.json();
   delvHead = data;
   return data;
 };

 let delvData;
 const getDelData = async (dataType) => {
  
   const response = await fetch('http://localhost:3000/api/survey/result/'+dataType+'/page/'+currPage);
   const data = await response.json();
   delvData = data["data"][0];
   //console.log(delvData);
   return data;
 };
 
 (async () => {
   
   var curSelected = document.getElementById("filelist");
   //console.log(curSelected);
   await getDelHead(curSelected.value);


    //console.log(delvData["data"][i]);
    var data = delvHead["data"];
    //console.log("head:", data);
    var str_delvhead = '<tr>';
    for (var i in data){
      //console.log(i);
      str_delvhead += '<th scope="col">'+data[i]+'</th>';
    } 
    str_delvhead += '</tr>';
   // console.log(str_delvhead);

    //console.log(str_delvdata)
    $(wrapper1).append(str_delvhead);

    
    // Table aData


   await getDelData(curSelected.value);
   //console.log(delvData);
   //pglen = 5;
   //console.log(Object.keys(delvData["data"]).length);
     var str_delvdata = '<tr>';
     for (var i in delvData){
       //console.log(i);
       str_delvdata += '<td>'+delvData[i]+'</td>';
     } 
     str_delvdata += '</tr>';

     //console.log(str_delvdata)
     $(wrapper2).append(str_delvdata);

    

 })();

  }
 
  



  $("#filelist").on('change',function(){

    (async () => {
      var curSelected = document.getElementById("filelist");

      await getData(curSelected.value);
      tablecontent();
      dataDelivery();
      //for (var serialnum in dataList){
       // console.log("text15", serialnum);
       // await getData(serialnum);
    //  }
      
    
      
  
    })();
    
  });






  }
 
  
  
  




});
