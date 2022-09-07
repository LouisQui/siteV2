$(function () {
    var position;

    $( "#sectionTest" ).mouseenter(function( e ) {
        $( "#testintt" ).finish()
        position = $( "#testintt" ).position()
      });

    $( "#sectionTest" ).mousemove(function( e ) {
        width = $( "#testintt" ).width() * 1,5
        height = $( "#testintt" ).height() * 1,5
        $( "#testintt" ).css({position: "absolute", top: (e.pageY - height) + "px", left: (e.pageX - width) + "px"});
    });

    $( "#sectionTest" ).mouseleave(function( e ) {
        $( "#testintt" ).animate(position, function() {
            $( "#testintt" ).css({position: "relative", top: "", left: ""});
          });
      });
})




