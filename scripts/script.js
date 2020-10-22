$( document ).ready(function() {
    //Quand le document est chargé / prêt à être manipulé

    //Changement d'aspect des puces de slides au clic
    $(".puce_clic").click(function(e){
        e.preventDefault();
        $(".puce_clic img").attr("src", "images/slides/puce_blanche.png");
        $(e.target).attr("src", "images/slides/puce_pleine_blanche.png");
        switch($(e.target).attr("id")){
            case "puce_1":
                $("#img_cine").attr("src", "images/cinema.jpg");
                $(".titre h1").text("CINÉMA LE FESTIVAL");
                $(".titre p").text("un cinéma pour tous")
                $("#aside_text").html("Le seul cinéma dont la programmation est<br/>exclusivement consacrée au cinéma d'animation ainsi<br/>qu'aux films à effets spéciaux.");
                $("#aside_subtext").text("Séances à partir de 5€.");
            break;
            case "puce_2":
                $("#img_cine").attr("src", "images/coupdecoeur.jpg");
                $(".titre h1").text("NOTRE COUP DE COEUR");
                $(".titre p").text("du 4 au 15 novembre")
                $("#aside_text").html("Venez découvrir notre coup de coeur du moment: Mon Voisin Totoro.<br /> Un classique de Hayao Miyazaki pour toute la famille.");
                $("#aside_subtext").text("");
            break;
            case "puce_3":
                $("#img_cine").attr("src", "images/news.jpg");
                $(".titre h1").html("UNE RÉDUCTION<br/>HALLOWEENESQUE");
                $(".titre p").html("du 17 octobre au 2 novembre<br/>À partir de 16h")
                $("#aside_text").html("Pour des vacances frissonantes venez profiter de notre offre spéciale: à partir de 16h toutes nos séances sont à 4€ !");
                $("#aside_subtext").text("");
            break;
            default:
                $("#img_cine").attr("src", "images/cinema.jpg");
                $(".titre h1").text("CINÉMA LE FESTIVAL");
                $(".titre p").text("un cinéma pour tous")
                $("#aside_text").html("Le seul cinéma dont la programmation est<br/>exclusivement consacrée au cinéma d'animation ainsi<br/>qu'aux films à effets spéciaux.");
                $("#aside_subtext").text("Séances à partir de 5€.");
            break;
        }
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