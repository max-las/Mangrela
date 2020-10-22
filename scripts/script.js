$( document ).ready(function() {
    //Quand le document est chargé / prêt à être manipulé

    //Changement d'aspect des puces de slides au clic
    $(".puce_clic").click(function(e){
        e.preventDefault();
        $(".puce_clic img").attr("src", "images/slides/puce_blanche.png");
        $(e.target).attr("src", "images/slides/puce_pleine_blanche.png");
    });

    shortcut_triggered = false;
    $(".shortcut").click(function(e){
        shortcut_triggered = true;
    });

    event_decal_base = -1000;
    event_decal = event_decal_base;
    setEventDecal(event_decal);
    reachedEvents = "no";
    event_scroll_mark = 680;
    scrollCran = navigator.userAgent.includes("Firefox") ? 100 : 30;
    $(window).scroll(function(){
        if(!shortcut_triggered){
            if(window.pageYOffset > event_scroll_mark && reachedEvents=="no"){
                reachedEvents = "yes";
            }
            if(window.pageYOffset < event_scroll_mark && reachedEvents=="crossed"){
                reachedEvents = "yes";
            }
            if(reachedEvents=="yes"){
                if(window.pageYOffset > event_scroll_mark){
                    event_decal = event_decal + scrollCran;
                }
                if(window.pageYOffset < event_scroll_mark){
                    event_decal = event_decal - scrollCran;
                }
                scrollTo(0, event_scroll_mark);
                setEventDecal(event_decal);
            }
            if(event_decal < event_decal_base && reachedEvents=="yes"){
                reachedEvents = "no";
            }
            if(event_decal > (event_decal_base * -1) && reachedEvents=="yes"){
                reachedEvents = "crossed";
            }
        }else{
            shortcut_triggered = false;
            event_decal = event_decal_base;
            setEventDecal(event_decal);
            if(window.pageYOffset > event_scroll_mark){
                reachedEvents = "crossed";
                event_decal = event_decal_base * -1;
                setEventDecal(event_decal);
            }else{
                reachedEvents = "no";
                event_decal = event_decal_base;
                setEventDecal(event_decal);
            }
        }
    });    
});

function setEventDecal(decal){
    $("#event_top").css("left", decal+"px");
    $("#event_bottom").css("right", decal+"px");
}