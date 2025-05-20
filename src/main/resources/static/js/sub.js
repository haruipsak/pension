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
		$("#subVisual .visual-item > img");	
	}else if ( w_width < 768 ) {
		$("#subVisual .visual-item > img").css("height","");
	}
	

	$(window).resize(function  () {
		//w_height = $(window).height();
		w_width = $(window).width();
		//if ( w_height > 700 &&  w_width >768) {
			//$("#mainVisual .visual-item > img").height(w_height);
		if ( w_width >768) {
			$("#subVisual .visual-item > img");	
		}else if ( w_width < 768 ) {
			$("#subVisual .visual-item > img").css("height","");
		}
	});

});
