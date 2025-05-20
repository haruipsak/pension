
var nemu_Num;
var i;
var mbt_Num = 30;
var main_Num;
var sub_Num;

$('document').ready(function () {

    $('#s-gnb-container #s-gnb .depth-1').click(function () {
        var m_Num = $(this).index();
        nemu_Num = m_Num;
        gnb_controller();
    })//¸Þ´º
    position_Gnb_Checker();

})//ready



/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function gnb_controller() {
    for (i = 0; i <= mbt_Num;i++ ) {
        if (nemu_Num == i) {
            $('#s-gnb-container #s-gnb .depth-1').eq(i).find('.depth-1-a').addClass('on')
           // $('#gnb_container #gnb .depth_1 .depth_2#sub_bt_' + i).slideDown(300)
            $('#s-gnb-container #s-gnb .depth-1').eq(i).find('.depth-2').slideDown(300)
        } else {
           // $('#gnb_container #gnb .depth_1 .depth_2#sub_bt_' + i).slideUp(300)
            $('#s-gnb-container #s-gnb .depth-1').eq(i).find('.depth-1-a').removeClass('on')
            $('#s-gnb-container #s-gnb .depth-1').eq(i).find('.depth-2').slideUp(300)
        }
    }
}


function position_Gnb_Checker() {
    if (main_Num != null && sub_Num != null) {
    
        nemu_Num = main_Num
        gnb_controller();
        $('#s-gnb-container #s-gnb .depth-1 .depth-2 #sbt_'+nemu_Num+'_'+sub_Num+' a').addClass('on')

    } else {

        for (i = 0; i <= mbt_Num; i++) {
            
            $('#s-gnb-container #s-gnb .depth-1 .depth-2#sub_bt_' + i).slideUp(300)
            $('#s-gnb-container #s-gnb .depth-1').eq(i).find('.depth-1-a').removeClass('on')
        }
        //m_Mover();
    }
}





