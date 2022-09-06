$(function () {
    $( "#sectionTest" ).mousemove(function( e ) {
        width = $( "#testintt" ).width() / 2
        height = $( "#testintt" ).height() / 2
        $( "#testintt" ).css({top: (e.pageY - height) + "px", left: (e.pageX - width) + "px", position: "absolute"});
    });
})




