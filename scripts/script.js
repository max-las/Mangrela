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
        console.log(window.pageYOffset);
        if(window.pageYOffset > 900 && window.pageYOffset < 3800){
            if(!blackSetNav){
                $("style").text(`
                    tete_page li a, #tete_page li a:visited, #tete_page_prog li a, #tete_page_prog li a:visited {
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
        if(window.pageYOffset > 3800){
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

/*var figure = $(".video").hover( hoverVideo, hideVideo );

function hoverVideo(e) {  
    $('video', this).get(0).play(); 
}

function hideVideo(e) {
    $('video', this).get(0).pause(); 
}*/
