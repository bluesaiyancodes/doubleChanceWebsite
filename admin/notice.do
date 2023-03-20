
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
	
		<script>
			$(function() {
			});
			var orders;
			function orderChange() {
				var form = portfolioOrder;
				$.ajax({
					type : "POST",
					url : form.action,
					data : $(form).serializeArray(),
					dataType : 'json',
					success : function(res) {
						if (res.result) {
							alert(res.msg);
							location.reload();
						} else {
							alert(res.msg);
						}
	
					},
					error : function(xhr) {
						if (xhr.status == 403) {
							alert("세션이 만료되었습니다. 다시 로그인해주시기 바랍니다.");
							location.href = "/account/login.do";
						} else {
							alert("오류가 발생하였습니다. 다시 시도해주시기 바랍니다.");
						}
					}
				});
			}
			
			function goPage(page){
				if(page==null) return false;
				search.page.value = page;
				search.submit();
			}
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
					<li class="active"><a href="/admin/notice/list.do"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 공지사항</a></li>
					<li><a href="/admin/shop/list.do"><i class="fa fa-industry" aria-hidden="true"></i> 매장관리</a></li>
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
			<h3 class="title">공지사항</h3>
			<!--검색-->
			<div class="sch_wrap">
				<form name="search" action="/admin/notice/list.do" method="get">
					<input type="hidden" name="page" value="1"/>
					<label for="keyword" class="hidden">검색어</label> 
					<input type="text" id="keyword" name="keyword" class="sch_input" maxlength="25" placeholder="검색어를 입력하세요." value="">
					<button type="submit" class="sch_btn"><i class="fa fa-search" aria-hidden="true"></i></button>
				</form>
			</div>
			</div>
			
			<!-- 테이블 목록 -->
			
				<table class="table" id="basic-table">
	<caption>notice ㅣ 번호, 내용(제목), 일자로 구성</caption>
	<thead>
		<tr>
			<th scope="col">번호</th>
			<th scope="col">내용</th>
			<th scope="col">등록일</th>
		</tr>
	</thead>
	<tbody>
		
	</tbody>
</table>
			
	
			<!-- 테이블 등록 버튼 , 페이지 -->
			<div class="card_bottom">
	
				<!--  등록 버튼  -->
				<div>
					 
						<a href="/admin/notice/register.do" class="btn btnSubmit">등록</a>
				</div>
	
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
						
					
						
						
					
					<a onclick="true ? goPage() : goPage([[2]])" class="pg_page pg_next"> 
<!-- 					<a th:href="${page?.last} ? '#' : @{|/admin/${path}/list.do|(page=${page?.number + 2})}" class="pg_page pg_next">  -->
						<i class="fa fa-angle-right" aria-hidden="true">
							<span class="hidden">다음</span>
						</i>
					</a> 
					<a onclick="goPage(0)" class="pg_page pg_end">
<!-- 					<a th:href="@{|/admin/${paths}/list.do|(page=${page?.totalPages})}" class="pg_page pg_end"> -->
						<i class="fa fa-angle-double-right" aria-hidden="true">
							<span class="hidden">맨끝</span>
						</i>
					</a>
				</nav>
			</div>
		</div>
	
			</div>
			<!-- EN:content_area -->
		</div>
		
		
		  
		<footer id="footer"> 
	<p>COPYRIGHT © 2021 이찌방쿠지 더블찬스. ALL RIGHTS RESERVED</p>
</footer>
	</body>
</html>