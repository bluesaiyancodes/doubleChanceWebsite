$(document).ready(function(){

  // Page Number Format

  let pglen;
  


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


  const getData = async () => {
    const response = await fetch('http://localhost:3000/api/shop/page');
    const data = await response.json();
    pglen = parseInt(data["len"]);
    return data;
  };
  
  (async () => {
    await getData();
    //pglen = 5;
    console.log("page len: ", pglen);

  console.log("current pg: ", currPage);


  var wrapper = $(".pagination");
  var str_start = '<a onclick="goPage(1)" class="pg_page pg_start"> <i class="fa fa-angle-double-left" aria-hidden="true"> <span class="hidden">처음</span> </i> </a>';
  var str_prev = '<a onclick="true ? goPage() : goPage([['+(currPage-1 == 0 ? 1 : currPage-1)+']])" class="pg_page pg_prev"> <i class="fa fa-angle-left" aria-hidden="true"> <span class="hidden">이전</span></i></a>';
  
  $(wrapper).append(str_start);
  $(wrapper).append(str_prev);
  //console.log(str2)
  for (var i=1;i<=pglen;i++){
    if(i==currPage){
      var strLooper = '<strong class="pg_page pg_current">'+i+'</strong>';
    }else{
      var strLooper = '<a onclick="goPage('+i+')" class="pg_page">'+i+'</a>';
    }
    //console.log(strLooper);
    $(wrapper).append(strLooper);
  }
  var str_next = '<a onclick="false ? goPage() : goPage([['+(currPage+1 > pglen ? pglen : currPage+1)+']])" class="pg_page pg_next"><i class="fa fa-angle-right" aria-hidden="true"><span class="hidden">다음</span></i></a>';
  var str_end = '<a onclick="goPage('+pglen+')" class="pg_page pg_end"><i class="fa fa-angle-double-right" aria-hidden="true"><span class="hidden">맨끝</span></i></a>';

  $(wrapper).append(str_next);
  $(wrapper).append(str_end);
  //console.log(str_end);

  })();

  
  //$(wrapper2).append(str_delvdata);
  var wrapper2 = $("#deliverydata");
			
  let delvData;
  const getDelData = async () => {
    const response = await fetch('http://localhost:3000/api/shop/page/'+currPage);
    const data = await response.json();
    delvData = data;
    console.log(data);
    return data;
  };
  
  (async () => {
    await getDelData();
    //pglen = 5;
    //console.log(Object.keys(delvData["data"]).length);
    for (var i =0;i<Object.keys(delvData["data"]).length; i++){
      //console.log(delvData["data"][i]);
      var data = delvData["data"][i];
      var str_delvdata = '<tr> <td>'+data["id"]+'</td><td>'+data["name"]+'</td><td>'+data["address"]+'</td><td>'+data["phone"]+'</td><td>'+data["description"]+'</td><td><a href="'+data["url"]+'" target="_blank">지도보기</a></td>';
      str_delvdata += '<td>-</td></tr>';

      //console.log(str_delvdata)
      $(wrapper2).append(str_delvdata);

      
    }
   

  })();



  }
 
  
  
  




});
