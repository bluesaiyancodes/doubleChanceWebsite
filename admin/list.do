
<!DOCTYPE html>
<html>
<head>
	
	<title>이찌방쿠지 관리자 페이지</title>
	
		<meta charset="UTF-8">
		<meta charset="UTF-8" http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta property="og:type" content="website">
		<meta property="og:url" content="">
		<meta property="og:title" content="이찌방쿠지 더블찬스">
		<meta property="og:image" content="">
		<meta property="og:description" content="이찌방쿠지 더블찬스">
		<meta property="og:site_name" content="이찌방쿠지 더블찬스">
		<meta property="og:locale" content="ko_KR"> 
		
		<!-- 공통으로 쓰는 css/js 파일을 넣는 영역 th:href(src)=@{/css/..} << 는 src/main/resources/static 이 생략된 형태 -->
		<!-- <script th:src="@{/js/common.js}"></script> -->
		<!-- <link rel="stylesheet" th:href="@{/css/admin.css}" /> -->
		 
		<!-- <link rel="shortcut icon" href="/img/common/favicon.ico"> -->
		<link rel="canonical" href="">
		<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link type="text/css" rel="stylesheet" href="../styles/admin-default.css"/>
		<link type="text/css" rel="stylesheet" href="../styles/admin-layout.css"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"></script>
		<script src="https://unpkg.com/filepond-polyfill/dist/filepond-polyfill.js"></script>
		<script src='http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.js'></script>
		 
		<!-- 개별 content(eg. main.html) 화면에 적용된 css/js를 가져와 아래 영역에 적용시킨다.
		다른 영역에 적용시키고 싶으면 아래 두 줄을 다른 곳에 넣으면 됨 -->
		
	
		
		<!--     <script th:src="@{/js/page/home.js}"></script> -->
		<style>
			.sidebar_menu li.active a {
			background-color:#df1323
		}
		</style>
		
				
			<script>
			var isLoading;
			
			$(function(){	
					/* 시,도 설정 */
					/*<![CDATA[*/
					 var cityOrg = 0;
					/*]]>*/
					/*<![CDATA[*/
					var countyOrg = 0;
					/*]]>*/
					console.log(cityOrg);
					console.log(countyOrg);
					
					if(cityOrg != null && cityOrg != ""){
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
					} 
					
					/* 시,군,구 설정 */
					$("#city").on('change',function(){
							 var city = $("#city").val();
							 
							 if(city == ""){
								 $("#county").children().remove();
								var countySelectBox = '<option value="">시/군/구</option>';
								$('#county').append(countySelectBox);
								return false;
							 }
							 
		//			 		location.href= '/admin/shop/list.do?city=' + city;
							 $.ajax({
								 type : "POST",
								url : "/admin/map/category.do",
								data : {city : city},
								 success : function(res) {
									if(res.result){
										$("#county").children().remove();
										var countySelectBox = '<option value="">시/군/구</option>';
										countySelectBox += '<option value="99">전체</option>';
										for(var i=0; i<res.county.length; i++){
											countySelectBox += '<option value="'+ res.county[i].addressCode +'">' + res.county[i].name + '</option>'
										}
										$('#county').append(countySelectBox);
										
										
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
				 });
				function goPage(page){
					if(page==null) return false;
					search.page.value = page;
					search.submit();
				}
			</script>
		<script>
		$(document).ready(function(){
			$('#county').on('change', function(){
				var city = $('#city').val();
				var county = $('#county').val();
				if(county == ""){
					return false;
				}
				location.href= '/admin/shop/list.do?city=' + city + '&county=' + county;
			});
		});
		</script>
		
			
			</head>
			<body>
				<div id="adm_wrapper">
					<!-- ST:sidebar -->
					<div class="sidebar">
						<div class="sidebar_top">
							<h1 class="logo"><a href="/admin"><span>이찌방쿠지</span></a></h1>
						</div>
						<ul class="sidebar_menu">
							<li><a href="/admin/notice/list.do"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 공지사항</a></li>
							<li class="active"><a href="/admin/shop/list.do"><i class="fa fa-industry" aria-hidden="true"></i> 매장관리</a></li>
							<!-- <li th:classappend="${#strings.contains(#httpServletRequest.requestURI, '/admin/banner.do')} ? active"><a href="/admin/banner.do"><i class="fa fa-picture-o" aria-hidden="true"></i> 배너관리</a></li>
							<li th:classappend="${#strings.contains(#httpServletRequest.requestURI, '/admin/popup.do')} ? active"><a href="/admin/popup.do"><i class="fa fa-object-group" aria-hidden="true"></i> 팝업관리</a></li> -->	
							<li><a href="/admin/survey/list.do"><i class="fa fa-clipboard" aria-hidden="true"></i> 설문결과</a></li>			
							
							<!-- classappend path 에 있는 .do 다 삭제하기 (sidemenu의 링크 누르면 '/경로' 가 a href 링크로 넘어감 -->
							<li><a href="/admin/prize/number.do"><i class="fa fa-barcode" aria-hidden="true"></i> 일련번호관리</a></li>
							<li><a href="/admin/product.do"><i class="fa fa-cubes" aria-hidden="true"></i> 상품관리</a></li>
							<li><a href="/admin/prize/round.do"><i class="fa fa-wpforms" aria-hidden="true"></i> 당첨회차관리</a></li>
							<li><a href="/admin/delivery.do"><i class="fa fa-truck" aria-hidden="true"></i> 배송정보</a></li>
						</ul>
					</div>
					<!-- EN:sidebar -->
					
					<!-- ST:content_area -->
					<div class="content_area" data-aos-delay="300">
						<!-- ST:navbar -->
						<div class="navbar">
							<a href="/admin/adminInfo.do" class="user"><i class="fa fa-user" aria-hidden="true"></i> admin</a>
							<a href="/admin/logout.do" class="ic" title="로그아웃"><i class="fa fa-unlock-alt" aria-hidden="true"></i></a>
						</div>
						<!-- EN:navbar -->
						
						
			<!-- 게시판 전체 폼 -->
			<div class="card">
				<!-- 테이블 제목 -->
				<div class="card_top">
					<h3 class="title">매장관리</h3>
					<div class="write_div" style="margin-left:-850px; width:250px;">
						<label for="city" class="hidden">시/도</label>
						<select id="city"  name="city" required class="frm_input required"> 
							<option value="">시/도</option>
							<option value="99">전체</option>
							<option value="1">서울특별시</option> 
							<option value="2">경기도</option>
							<option value="3">인천광역시</option>
							<option value="4">경상북도</option>
							<option value="5">경상남도</option>
							<option value="6">강원도</option> 
							<option value="7">광주광역시</option>
							<option value="8">대구광역시</option> 
							<option value="9">대전광역시</option>
							<option value="10">부산광역시</option>
							<option value="11">울산광역시</option>
							<option value="12">전라북도</option>
							<option value="13">전라남도</option>
							<option value="14">제주도</option> 
							<option value="15">충청남도</option>
							<option value="16">충청북도</option>
							<option value="17">세종시</option>
						</select>		
						<label for="county" class="hidden" >시/군/구</label>
						<select id="county"  name="county" required class="frm_input required"> 
							<option value="">시/군/구</option>
						</select>		
					</div>
					<div class="sch_wrap">
						<form name="search" action="/admin/shop/list.do" method="get">
							<input type="hidden" name="page" value="1"/>
							<input type="hidden" name="city" value="">
							<input type="hidden" name="county" value="">
							<label for="keyword" class="hidden">검색어</label> <input type="text" value="" id="keyword" name="keyword" class="sch_input" maxlength="25" placeholder="검색어를 입력하세요.">
							<button type="submit" class="sch_btn">
								<i class="fa fa-search" aria-hidden="true"></i>
							</button>
						</form>
					</div>
				</div>
				<table class="table">
					<caption>매장관리 ㅣ 매장번호,매장명,주소,연락처,상세내용,지도,수정으로구성</caption>
					<thead>
						<tr>
							<th scope="col">번호</th>
							<th scope="col">매장명</th>
							<th scope="col">주소</th>
							<th scope="col">연락처</th>
							<th scope="col">상세내용</th>
							<th scope="col">지도</th>
							<th scope="col">수정</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>83</td>
							<td>박서방 동탄점</td>
							<td>경기 화성시 동탄대로5길 21 A동 4층 E410호</td>
							<td>070-4833-0083</td>
							<td>동탄호수공원 앞 라크몽 A동 4층 디스커버리 옆</td>
							<td><a href="https://map.naver.com/v5/entry/place/1205944563?c=14149262.5637090,4462411.0453250,19,0,0,0,dh&amp;isCor" target="_blank">지도보기</a></td>
							<td><a href="/admin/shop/register.do?shopId=91">수정</a></td>
						</tr>
						<tr>
							<td>82</td>
							<td>박서방 대구지점</td>
							<td>대구 중구 달구벌대로414길 6 광장빌딩 2층</td>
							<td>053-202-7083</td>
							<td>대구지역 제일복권 최다보유! 건담, 프라모델, 도료, 공구등 모델링 용품 전문점</td>
							<td><a href="https://map.naver.com/v5/entry/place/37085759?c=14314518.5407856,4282166.7894072,13,0,0,0,dh&amp;placePa" target="_blank">지도보기</a></td>
							<td><a href="/admin/shop/register.do?shopId=90">수정</a></td>
						</tr>
						<tr>
							<td>81</td>
							<td>하비팩토리 창원점</td>
							<td>경남 창원시 마산합포구 불종거리로 24</td>
							<td>055-222-8881 </td>
							<td>오동동 문화광장과 코아양과 사이, 투썸플레이스 마산창동점 옆</td>
							<td><a href="https://map.naver.com/v5/search/%ED%95%98%EB%B9%84%ED%8C%A9%ED%86%A0%EB%A6%AC%20%EC%B0%BD%EC%9B%90%E" target="_blank">지도보기</a></td>
							<td><a href="/admin/shop/register.do?shopId=89">수정</a></td>
						</tr>
						<tr>
							<td>80</td>
							<td>더 쿠 (The KU)</td>
							<td>서울특별시 마포구 홍익로6길 38 지하1층</td>
							<td>010-8950-8869</td>
							<td>뽑기와 피규어가 하나로! 꽝 없는 캐릭터 뽑기 ‘제일복권’의 모든 것이 여기 있다! </td>
							<td><a href="https://map.naver.com/v5/entry/place/1815584166?c=14127454.1292469,4515900.2895080,15,0,0,0,dh" target="_blank">지도보기</a></td>
							<td><a href="/admin/shop/register.do?shopId=88">수정</a></td>
						</tr>
						<tr>
							<td>79</td>
							<td>인티메이트 역삼점</td>
							<td>서울 강남구 역삼로 106 103호</td>
							<td>02-575-7160</td>
							<td>강남역에서 4번출구에서 도보로 10분거리입니다.</td>
							<td><a href="https://map.naver.com/v5/search/%EC%9D%B8%ED%8B%B0%EB%A9%94%EC%9D%B4%ED%8A%B8/place/12278873?c=14140" target="_blank">지도보기</a></td>
							<td><a href="/admin/shop/register.do?shopId=87">수정</a></td>
						</tr>
						<tr>
							<td>78</td>
							<td>피규어프레소 에프피점</td>
							<td>서울 마포구 서교동 330-6 지하1층 피규어 프레소</td>
							<td>트위터(@fp_enter)</td>
							<td>공항철도 7번출고 &lt;-&gt; 매장이 제일 가깝습니다. 매장 근처 이마트24앞 공영주차장이 있으며 평일 유료 / 주말 무료로 이용이 가능합니다.</td>
							<td><a href="https://map.naver.com/v5/entry/place/1030394193?c=14129517.5028005,4516894.9253540,13,0,0,0,dh&amp;place" target="_blank">지도보기</a></td>
							<td><a href="/admin/shop/register.do?shopId=86">수정</a></td>
						</tr>
						<tr>
							<td>77</td>
							<td>오케이 상사</td>
							<td>서울 서초구 신반포로 176 센트럴시티내 1번 승강장 앞</td>
							<td>02-6282-2312</td>
							<td>코속버스터미널 안 1번 승강장 앞</td>
							<td><a href="https://map.naver.com/v5/search/%EC%98%A4%EC%BC%80%EC%9D%B4%20%EC%83%81%EC%82%AC/place/36889119?plac" target="_blank">지도보기</a></td>
							<td><a href="/admin/shop/register.do?shopId=85">수정</a></td>
						</tr>
						<tr>
							<td>76</td>
							<td>씽스피규어</td>
							<td>서울시 성동구 왕십리광장로17 비트플렉스 2층 씽스피규어</td>
							<td>010-8739-3811</td>
							<td>2호선,5호선,분당선,중앙선이 있는 교통의 중심 &#39;왕십리&#39; 한가운데 위치한 애니 굿즈, 피규어, 뽑기를 할 수 있는 &#39;씽스피규어&#39; 지하철과 연결되어 있어 무더위에 나갈 필요가 없어요~</td>
							<td><a href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%B1%EB%8F%99%E" target="_blank">지도보기</a></td>
							<td><a href="/admin/shop/register.do?shopId=84">수정</a></td>
						</tr>
					</tbody>
				</table>
		
				<!-- 테이블 등록 버튼 , 페이지 -->
				<div class="card_bottom">
					<!-- 등록 버튼  -->
					<a href="/admin/shop/register.do" class="btn btnSubmit">매장등록</a>
		
					<!-- 페이지 -->
					<nav class="pagination">
						<a onclick="goPage(1)" class="pg_page pg_start"> 
		<!-- 					<a th:href="@{|/admin/${paths}/list.do|(page=1)}" class="pg_page pg_start">  -->
							<i class="fa fa-angle-double-left" aria-hidden="true">
								<span class="hidden">처음</span>
							</i>
						</a> 
						<a onclick="true ? goPage() : goPage([[0]])" class="pg_page pg_prev"> 
		<!-- 					<a th:href="${page?.first} ? '#' : @{|/admin/${paths}/list.do|(page=${page?.number})}" class="pg_page pg_prev">  -->
							<i class="fa fa-angle-left" aria-hidden="true">
								<span class="hidden">이전</span>
							</i>
						</a>
						
							<strong class="pg_page pg_current">1</strong>
							
						
							
							<a onclick="goPage(2)" class="pg_page">2</a>
						
							
							<a onclick="goPage(3)" class="pg_page">3</a>
						
							
							<a onclick="goPage(4)" class="pg_page">4</a>
						
							
							<a onclick="goPage(5)" class="pg_page">5</a>
						
							
							<a onclick="goPage(6)" class="pg_page">6</a>
						
							
							<a onclick="goPage(7)" class="pg_page">7</a>
						
							
							<a onclick="goPage(8)" class="pg_page">8</a>
						
							
							<a onclick="goPage(9)" class="pg_page">9</a>
						
							
							<a onclick="goPage(10)" class="pg_page">10</a>
						
						<a onclick="false ? goPage() : goPage([[2]])" class="pg_page pg_next"> 
		<!-- 					<a th:href="${page?.last} ? '#' : @{|/admin/${path}/list.do|(page=${page?.number + 2})}" class="pg_page pg_next">  -->
							<i class="fa fa-angle-right" aria-hidden="true">
								<span class="hidden">다음</span>
							</i>
						</a> 
						<a onclick="goPage(11)" class="pg_page pg_end">
		<!-- 					<a th:href="@{|/admin/${paths}/list.do|(page=${page?.totalPages})}" class="pg_page pg_end"> -->
							<i class="fa fa-angle-double-right" aria-hidden="true">
								<span class="hidden">맨끝</span>
							</i>
						</a>
					</nav>
				</div>
		
				 <input type="hidden" id="path" name="path" value="shop">
				<!-- </div>   -->
			</div>
		
					</div>
					<!-- EN:content_area -->
				</div>
				
				
				  
				<footer id="footer"> 
			<p>COPYRIGHT © 2021 이찌방쿠지 더블찬스. ALL RIGHTS RESERVED</p>
		</footer>
			</body>
		</html>