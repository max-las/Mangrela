$( document ).ready(function() {
    //Quand le document est chargé / prêt à être manipulé

    //Changement d'aspect des puces de slides au clic
    $(".puce_clic").click(function(e){
        e.preventDefault();
        $(".puce_clic img").attr("src", "images/slides/puce_blanche.png");
        $(e.target).attr("src", "images/slides/puce_pleine_blanche.png");
    });

    
});