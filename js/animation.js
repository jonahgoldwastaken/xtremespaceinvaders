function animationStart() {
    var animateShip = document.getElementById("animateShip"); //animateShip wordt gedefiniëerd
    var animateEnemies = document.getElementById("animateEnemies"); //animateEnemies worden gedefiniëerd
    animateShip.classList.toggle("animatePlane"); //animateShip krijgt class animatePlane
    animateEnemies.classList.toggle("animateEnemies"); //animateEnemies krijgt class animateEnemies
    musicDirector(menuMusic, buildUp, false); //Verandert de muziek
    buildUp.onended = function() { //Wanneer buildUp is afgelopen
        animateShip.classList.toggle("animatePlane"); //Haalt de classes weer weg
        animateEnemies.classList.toggle("animateEnemies");
        animation.classList.toggle("inactive"); //Zet animation screen op inactive
        game.classList.toggle("inactive"); //Zet game screen op active
        play();
    };
}
