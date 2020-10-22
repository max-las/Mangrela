$( document ).ready(function() {
    //Quand le document est chargé / prêt à être manipulé

    //Changement d'aspect des puces de slides au clic
    $(".puce_clic").click(function(e){
        e.preventDefault();
        $(".puce_clic img").attr("src", "images/slides/puce_blanche.png");
        $(e.target).attr("src", "images/slides/puce_pleine_blanche.png");
    });


    blackSetNav = false;
    blackSetLogo = true;
    $("#event_roll").css({
        "position": "absolute",
        "top": "50vh",
        "bottom": "",
        "transform": "translate(0, -50%)"
    });
    eventDecalBase = -1000;
    setEventDecal(eventDecalBase);
    reachedEvents = "no";
    eventScrollMark = window.innerHeight;
    scrollCran = 50;
    lastScrollOff = 0;
    $(window).scroll(function(){
        if( superpose( document.getElementById("tete_page"), document.getElementById("evenements") ) || superpose( document.getElementById("tete_page"), document.getElementById("cercles") ) ){
            if(!blackSetNav){
                $("style").text(`
                    #tete_page li a, #tete_page li a:visited, #tete_page_prog li a, #tete_page_prog li a:visited {
                        color: #292929;
                    }
                    .anim:after {
                        background: #292929;
                    }
                `);
                blackSetNav = true;
            }
        }else{
            if(blackSetNav){
                $("style").text("");
                blackSetNav = false;
            }
        }
        if( superpose( document.getElementsByClassName("cinelogo")[0], document.getElementById("affiches") ) ){
            if(blackSetLogo){
                $(".cinelogo").attr("src","images/cinélogo_blanc.png")
                blackSetLogo = false;
            }
        }else{
            if(!blackSetLogo){
                $(".cinelogo").attr("src","images/cinélogo_noir.png")
                blackSetLogo = true;
            }
        }
        if(window.pageYOffset > eventScrollMark && reachedEvents=="no"){
            reachedEvents = "yes";
            $("#event_roll").css("position","fixed");
        }
        if(window.pageYOffset > $("#evenements").outerHeight() && reachedEvents=="yes"){
            reachedEvents = "crossed";
            $("#event_roll").css({
                "position": "absolute",
                "bottom": "50vh",
                "top": "",
                "transform": "translate(0, 50%)"
            });
        }
        if(window.pageYOffset < $("#evenements").outerHeight() && reachedEvents=="crossed"){
            reachedEvents = "yes";
            $("#event_roll").css("position","fixed");
        }
        if(window.pageYOffset < eventScrollMark && reachedEvents=="yes"){
            reachedEvents = "no";
            $("#event_roll").css({
                "position": "absolute",
                "top": "50vh",
                "bottom": "",
                "transform": "translate(0, -50%)"
            });
        }
        if(reachedEvents=="yes"){
            if(window.pageYOffset > lastScrollOff && eventDecal < eventDecalBase * -1){
                setEventDecal(eventDecal + scrollCran);
            }
            if(window.pageYOffset < lastScrollOff && eventDecal > eventDecalBase){
                setEventDecal(eventDecal - scrollCran);
            }
        }
        lastScrollOff = window.pageYOffset;
    });    
});

function setEventDecal(decal){
    eventDecal = decal;
    $("#event_top").css("left", eventDecal+"px");
    $("#event_bottom").css("right", eventDecal+"px");
}

function superpose(el1, el2) {
    rect1 = el1.getBoundingClientRect();
    rect2 = el2.getBoundingClientRect();
    return rect2.top <= rect1.top && rect2.bottom >= rect1.bottom;
};

/*var figure = $(".video").hover( hoverVideo, hideVideo );

function hoverVideo(e) {  
    $('video', this).get(0).play(); 
}

function hideVideo(e) {
    $('video', this).get(0).pause(); 
}*/
