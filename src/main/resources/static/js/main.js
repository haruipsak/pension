/* ----------
js
---------- */


jQuery(function($){
	// 메인 비주얼 높이값
	//var w_height = $(window).height();
	var w_width = $(window).width();
	//if ( w_height > 700 && w_width >768) {
		//$("#mainVisual .visual-item > img").height(w_height);
	if ( w_width >768) {
		$("#mainVisual .visual-item > img");	
	}else if ( w_width < 768 ) {
		$("#mainVisual .visual-item > img").css("height","");
	}
	

	$(window).resize(function  () {
		//w_height = $(window).height();
		w_width = $(window).width();
		//if ( w_height > 700 &&  w_width >768) {
			//$("#mainVisual .visual-item > img").height(w_height);
		if ( w_width >768) {
			$("#mainVisual .visual-item > img");	
		}else if ( w_width < 768 ) {
			$("#mainVisual .visual-item > img").css("height","");
		}
	});
	
	// 스크롤아이콘모션
	var $moveTxt = $('.scroll-icon');
	var moveTEXT = setInterval(function() {
		$moveTxt.animate({opacity:'.5',"bottom":'+=20px'}).animate({opacity:'1',"bottom":'-=20px'})
	}, 1000);
	$moveTxt.click(function  () {
		$("html, body").animate({scrollTop: $("#productContent").offset().top + 50 },600,"swing");
		return false;
	});

	// 메인 왼쪽 메뉴

});
