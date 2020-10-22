$( document ).ready(function() {
    //Quand le document est chargé / prêt à être manipulé

    var puce = "1";

    //Changement d'aspect des puces de slides au clic
    $(".puce_clic").click(function(e){
        e.preventDefault();
        $(".puce_clic img").attr("src", "images/slides/puce_blanche.png");
        $(e.target).attr("src", "images/slides/puce_pleine_blanche.png");
        slideUpdate($(e.target).attr("id").slice(-1));
    });

    $("#fleche_gauche").click(function(e){
        e.preventDefault();
        switch(puce){
            case "1":
                puce = "3";
            break;
            case "2":
                puce = "1";
            break;
            case "3":
                puce = "2";
            break;
        }
        $(".puce_clic img").attr("src", "images/slides/puce_blanche.png");
        $("#puce_" + puce).attr("src", "images/slides/puce_pleine_blanche.png");
        slideUpdate(puce);
    });

    $("#fleche_droite").click(function(e){
        e.preventDefault();
        switch(puce){
            case "1":
                puce = "2";
            break;
            case "2":
                puce = "3";
            break;
            case "3":
                puce = "1";
            break;
        }
        $(".puce_clic img").attr("src", "images/slides/puce_blanche.png");
        $("#puce_" + puce).attr("src", "images/slides/puce_pleine_blanche.png");
        slideUpdate(puce);
    });

    setInterval(function(){
        $("#fleche_droite").click();
    }, 5000);

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
            $(".scroll_nav p, .souris").css("display", "none");
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
    
    $(".vignette").hover(function(){
        $(this).children("img").css("filter", "brightness(100%)");
        $(this).children("p").fadeOut();
    }, function(e){
        $(this).children("img").css("filter", "brightness(50%)");
        $(this).children("p").fadeIn();
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
}

function slideUpdate(puce){
    switch(puce){
        case "1":
            $("#slideshow").css("left", "0vw");
            $(".titre h1").text("CINÉMA LE FESTIVAL");
            $(".titre p").text("un cinéma pour tous")
            $("#aside_text").html(`Le seul cinéma dont la programmation est<br/>
            exclusivement consacrée au cinéma d'animation ainsi<br/>
            qu'aux films à effets spéciaux.`);
            $("#aside_subtext").text("Séances à partir de 5€.");
            puce = "1";
        break;
        case "2":
            $("#slideshow").css("left", "-40vw");
            $(".titre h1").text("NOTRE COUP DE COEUR");
            $(".titre p").text("du 4 au 15 novembre")
            $("#aside_text").html(`Venez découvrir notre coup de coeur du moment: Mon Voisin Totoro.<br />
            Un classique de Hayao Miyazaki pour toute la famille.`);
            $("#aside_subtext").text("");
            puce = "2";
        break;
        case "3":
            $("#slideshow").css("left", "-80vw");
            $(".titre h1").html("UNE RÉDUCTION<br/>HALLOWEENESQUE");
            $(".titre p").html("du 17 octobre au 2 novembre<br/>À partir de 16h")
            $("#aside_text").html(`Pour des vacances frissonantes venez profiter de notre offre spéciale:<br/>
            à partir de 16h toutes nos séances sont à 4€ !`);
            $("#aside_subtext").text("");
            puce = "3";
        break;
        default:
            $("#slideshow").css("left", "0vw");
            $(".titre h1").text("CINÉMA LE FESTIVAL");
            $(".titre p").text("un cinéma pour tous")
            $("#aside_text").html(`Le seul cinéma dont la programmation est<br/>
            exclusivement consacrée au cinéma d'animation ainsi<br/>
            qu'aux films à effets spéciaux.`);
            $("#aside_subtext").text("Séances à partir de 5€.");
            puce = "1";
        break;
    }
}

/*var figure = $(".video").hover( hoverVideo, hideVideo );

function hoverVideo(e) {  
    $('video', this).get(0).play(); 
}

function hideVideo(e) {
    $('video', this).get(0).pause(); 
}*/
