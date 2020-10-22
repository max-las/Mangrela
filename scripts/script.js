$( document ).ready(function() {
    //Quand le document est chargé / prêt à être manipulé

    //Changement d'aspect des puces de slides au clic
    $(".puce_clic").click(function(e){
        e.preventDefault();
        $(".puce_clic img").attr("src", "images/slides/puce_blanche.png");
        $(e.target).attr("src", "images/slides/puce_pleine_blanche.png");
    });


    $("#event_roll").css({
        "position": "absolute",
        "top": "50vh",
        "bottom": "",
        "transform": "translate(0, -50%)"
    });
    event_decal_base = -1000;
    event_decal = event_decal_base;
    setEventDecal(event_decal);
    reachedEvents = "no";
    event_scroll_mark = window.innerHeight;
    scrollCran = 50;
    lastScrollOff = 0;
    $(window).scroll(function(){
        if(window.pageYOffset > event_scroll_mark && reachedEvents=="no"){
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
        if(window.pageYOffset < event_scroll_mark && reachedEvents=="yes"){
            reachedEvents = "no";
            $("#event_roll").css({
                "position": "absolute",
                "top": "50vh",
                "bottom": "",
                "transform": "translate(0, -50%)"
            });
        }
        if(reachedEvents=="yes"){
            if(window.pageYOffset > lastScrollOff){
                event_decal = event_decal + scrollCran;
            }
            if(window.pageYOffset < lastScrollOff){
                event_decal = event_decal - scrollCran;
            }
            setEventDecal(event_decal);
        }
        lastScrollOff = window.pageYOffset;
    });    
});

function setEventDecal(decal){
    $("#event_top").css("left", decal+"px");
    $("#event_bottom").css("right", decal+"px");
}