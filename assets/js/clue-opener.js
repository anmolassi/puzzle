var clue_btn=document.getElementById("clue");
var close_clue=document.getElementById("svg-cross");
var clue_video=document.getElementsByClassName("clue-video")[0];
clue_video.style.display="none";
clue_btn.addEventListener('click',function(e){
    e.preventDefault();
    clue_video.style.display="flex";
});
close_clue.addEventListener('click',function(){
    clue_video.style.display="none";
    var iframe = document.querySelector( 'iframe');
	var video = document.querySelector( 'video' );
	if ( iframe ) {
		var iframeSrc = iframe.src;
		iframe.src = iframeSrc;
	}
	if ( video ) {
		video.pause();
	}
})