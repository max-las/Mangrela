$( document ).ready(function() {
    //Quand le document est chargé / prêt à être manipulé

    //Changement d'aspect des puces de slides au clic
    $(".puce_clic").click(function(e){
        e.preventDefault();
        $(".puce_clic img").attr("src", "images/slides/puce_blanche.png");
        $(e.target).attr("src", "images/slides/puce_pleine_blanche.png");
    });

    event_decal_base = -1000;
    $("#event_top").css("left", event_decal_base+"px");
    $("#event_bottom").css("right", event_decal_base+"px");
    event_decal = event_decal_base;
    reachedEvents = "no";
    scrollCran = navigator.userAgent.includes("Firefox") ? 100 : 30;
    $(window).scroll(function(){
        if(window.pageYOffset > 680 && reachedEvents=="no"){
            reachedEvents = "yes";
        }
        if(window.pageYOffset < 680 && reachedEvents=="crossed"){
            reachedEvents = "yes";
        }
        if(reachedEvents=="yes"){
            if(window.pageYOffset > 680){
                event_decal = event_decal + scrollCran;
            }
            if(window.pageYOffset < 680){
                event_decal = event_decal - scrollCran;
            }
            scrollTo(0,680);
            $("#event_top").css("left", event_decal+"px");
            $("#event_bottom").css("right", event_decal+"px");
        }
        if(event_decal < event_decal_base && reachedEvents=="yes"){
            reachedEvents = "no";
        }
        if(event_decal > (event_decal_base * -1) && reachedEvents=="yes"){
            reachedEvents = "crossed";
        }
    });    
});