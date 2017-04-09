////////////////////////////////////////////////////////////
/////////////Reset wanneer spel is afgelopen////////////////
////////////////////////////////////////////////////////////
function gameEnd(won) {
    game.classList.toggle("inactive");
    switch (won) {
        case true:
            musicDirector(phaseTwoMusic, endMusic, false);
            if (playerOne.lifes === 1) {
                endText.innerHTML = "You won with " + playerOne.lifes + " life!";
            } else {
                endText.innerHTML = "You won with " + playerOne.lifes + " lifes!";
            }
            break;
        case false:
            explosionTwo.currentTime = 0;
            explosionTwo.play();
            switch (phaseTwo) {
                case true:
                    musicDirector(phaseTwoMusic, endMusic, false);
                    break;

                case false:
                    musicDirector(gameMusic, endMusic, false);
                    endMusic.currentTime = 0.669;
                    break;
            }
            endText.innerHTML = "You lost!";
            break;
    }
    gameOver.classList.toggle("inactive");
    resetGame();
}

////////////////////////////////////////////////////////////
////////////////////Regelt de Muziek////////////////////////
////////////////////////////////////////////////////////////
function musicDirector(currentSong, nextSong, looping) {
    if (currentSong !== "") {
        currentSong.removeEventListener('timeupdate', currentSongListener);
        currentSong.pause();
        currentSong.currentTime = 0;
    }
    nextSong.play();
    switch (looping) {
        case true:
            //http://stackoverflow.com/questions/7330023/gapless-looping-audio-html5 zorgt ervoor dat er een buffer wordt opgeslagen en de muziek zonder gaps blijft spelen.
            currentSongListener = nextSong.addEventListener('timeupdate', function() {
                var buffer = 0.25;
                if (this.currentTime > this.duration - buffer) {
                    this.currentTime = 0;
                    this.play();
                }
            });
            break;
        default:
            break;
    }

}

////////////////////////////////////////////////////////////
/////////////Framework voor collision checking//////////////
////////////////////////////////////////////////////////////
function checkCollision(topObject, bottomObject, method) {
    switch (method) {
        //bottomObject heeft Edges
        case "one":
            if (topObject.offsetTop <= bottomObject.bottomEdge && topObject.offsetTop + topObject.offsetHeight >= bottomObject.topEdge && topObject.offsetLeft <= bottomObject.rightEdge && topObject.offsetLeft + topObject.offsetWidth >= bottomObject.leftEdge) {
                return true;
            }
            break;
            //Geen van beiden hebben Edges
        case "two":
            if (topObject.offsetTop <= bottomObject.offsetTop + bottomObject.offsetHeight && topObject.offsetTop + topObject.offsetHeight >= bottomObject.offsetTop && topObject.offsetLeft <= bottomObject.offsetLeft + bottomObject.offsetWidth && topObject.offsetLeft + topObject.offsetWidth >= bottomObject.offsetLeft) {
                return true;
            }
            break;
            //Top boundary collision checking
        case "top":
            if (topObject.top > bottomObject.offsetTop + bottomObject.offsetHeight) {
                return true;
            }
            break;
            //Bottom boundary collision checking
        case "bottom":
            if (topObject.bottom < bottomObject.offsetTop) {
                return true;
            }
            break;
            //individual enemy collision chechking
        case "enemy":
            if (topObject[0].offsetTop + topObject[1].offsetTop <= bottomObject.offsetTop + bottomObject.offsetHeight && topObject[0].offsetTop + topObject[1].offsetTop + topObject[1].offsetHeight >= bottomObject.offsetTop && topObject[0].offsetLeft + topObject[1].offsetLeft <= bottomObject.offsetLeft + bottomObject.offsetWidth && topObject[0].offsetLeft + topObject[1].offsetLeft + topObject[1].offsetWidth >= bottomObject.offsetLeft)
                return true;
            break;
    }
}

////////////////////////////////////////////////////////////
///////////Kiest die de schietende vijand random////////////
////////////////////////////////////////////////////////////
function selectEnemy() {
    var xPos, yPos;
    var selectedEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    xPos = enemyBlock.element.offsetLeft + selectedEnemy.offsetLeft + 10;
    yPos = enemyBlock.element.offsetTop + selectedEnemy.offsetTop;
    // http://stackoverflow.com/questions/2917175/return-multiple-values-in-javascript
    return [xPos, yPos];
}

////////////////////////////////////////////////////////////
////////////Functie die de speler laat schieten/////////////
////////////////////////////////////////////////////////////
function playerFire(xPos, yPos) {
    if (!document.getElementById("playerBullet")) {
        // https://www.w3schools.com/jsref/met_document_createelement.asp
        playerBullet = document.createElement("IMG");
        playerBullet.src = "./img/playerBullet.png";
        // http://stackoverflow.com/questions/19625646/javascript-adding-an-id-attribute-to-another-created-element
        playerBullet.setAttribute("id", "playerBullet");
        playerBullet.classList.add("bullet");
        game.appendChild(playerBullet);
        playerBullet.style.top = (yPos - 20) + "px";
        playerBullet.style.left = (xPos + 10) + "px";
        laserPlayer.currentTime = 0;
        laserPlayer.play();
    }
}

////////////////////////////////////////////////////////////
//////Functie die random gekozen vijand laat schieten///////
////////////////////////////////////////////////////////////
function enemyFire() {
    // http://stackoverflow.com/questions/2917175/return-multiple-values-in-javascript
    var pos = selectEnemy(); //Returned een x en y positie in de array
    var newBullet = document.createElement("IMG"); //Maakt een niew img element aan
    newBullet.src = "./img/enemyBullet.png"; //Geeft de afbeelding enemyBullet.png als source
    newBullet.classList.add("bullet"); //Voegt de class bullet toe
    enemyBulletContainer.appendChild(newBullet); //Zet de bullet in de container
    newBullet.style.left = pos[0] + "px"; //X positie wordt gedefiniëerd naar de return van selectEnemy();
    newBullet.style.top = pos[1] + "px"; //Y positie wordt gedefiniëerd naar de return van selectEnemy();
    laserEnemy.currentTime = 0; //laserEnemy sound wordt gereset
    laserEnemy.play(); //laserEnemy sound wordt afgespeeld
}

////////////////////////////////////////////////////////////
///////////Laat de kogels vliegen door de ruimte////////////
////////////////////////////////////////////////////////////
function bulletMovement() {
    if (playerBullet !== null) { //Movement voor de player bullet
        playerBullet.style.top = (playerBullet.offsetTop - 2) + "px"; //2px per interval
    }
    for (i = 0; i < enemyBulletArray.length; i++) { //Movement voor de enemy bullet
        enemyBulletArray[i].style.top = (enemyBulletArray[i].offsetTop + 1) + "px"; //1px per interval
    }
}

////////////////////////////////////////////////////////////
//////////Checked of er een overlap is met kogels///////////
////////////////////////////////////////////////////////////
function bulletCollision() {
    //Enemy bullet Collision checking
    for (i = 0; i < enemyBulletArray.length; i++) {
        if (playerBullet !== null && checkCollision(enemyBulletArray[i], playerBullet, "two")) { //Checkt collision met elke enemy bullet
            enemyBulletContainer.removeChild(enemyBulletArray[i]); //Verwijderd enemy bullet uit spel
            playerBullet.parentNode.removeChild(playerBullet); //Verwijderd playerbullet uit spel
            playerBullet = null; //Voorkomt garbage collection
        } else if (checkCollision(enemyBulletArray[i], playerOne, "one")) { //Checkt collision met de speler
            explosionOne.currentTime = 0; //Reset de explosion sound
            explosionOne.play(); //Speelt m af
            enemyBulletContainer.removeChild(enemyBulletArray[i]); //Verwijderd enemy bullet uit het spel
            playerOne.lifes--; //Haalt 1 leven weg
            lifeCounter.innerHTML = playerOne.lifes; //Output de verandering in levens naar de counter
        } else if (checkCollision(playArea, enemyBulletArray[i], "bottom")) { // Checkt collision met onderrand
            enemyBulletContainer.removeChild(enemyBulletArray[i]); //Verwijderd enemy bullet uit het spel
        }
    }
    //Checkt alleen wanneer playerbullet is afgeschoten.
    if (playerBullet !== null) {
        for (i = 0; i < enemies.length; i++) { //Check collision met elke enemy
            if (checkCollision([enemyBlock.element, enemies[i]], playerBullet, "enemy")) {
                //http://stackoverflow.com/questions/13389751/change-tag-using-javascript
                explosionOne.currentTime = 0;
                explosionOne.play();
                var deadEnemy = document.createElement("DIV"); // Maakt een nieuwe div element aan in de HTML
                deadEnemy.classList.add("deadEnemy");
                enemyBlock.element.insertBefore(deadEnemy, enemies[i]); // Zet deadEnemy div 1 lijn boven de enemy die uit de array is gehaald in de HTML
                enemyBlock.element.removeChild(enemies[i]); // Verwijderd de enemy uit de HTML
                enemyCounter.innerHTML = enemies.length; // Update de enemy counter
                playerBullet.parentNode.removeChild(playerBullet); // Verwijdert de playerBullet
                playerBullet = null;
                return;
            }
        }
        //Check collision met bovenrand
        if (checkCollision(enemyArea, playerBullet, "top")) {
            playerBullet.parentNode.removeChild(playerBullet);
            playerBullet = null;
        }
    }
}

////////////////////////////////////////////////////////////
//////////////////////Begin Phase Two///////////////////////
////////////////////////////////////////////////////////////
function startPhaseTwo() {
    phaseTwoHeading.innerHTML = "Phase 2 start!"; //Zet de tekst neer
    phaseTwoHeading.classList.toggle("phaseTwoStart"); //Voegt fade out toe
    musicDirector(gameMusic, phaseTwoMusic, true); //Verandert de mzuiek
    gameSpeed(2, true); //Zet de gameSpeed op 2
    phaseTwo = true; //Geeft aan dat phaseTwo begonnen is
}

////////////////////////////////////////////////////////////
////////////////////Wanneer vorder je?//////////////////////
////////////////////////////////////////////////////////////
function gameProgressConditions() {
    if (enemies.length === 19) { //Geeft aan dat phase two zo begint
        phaseTwoHeading.innerHTML = "Phase 2 incoming!"; //Verandert de tekst
    }
    if (enemies.length < 16 && phaseTwo === false) { //Zet phase two aan wanneer er 15 vijanden over zijn
        startPhaseTwo(); //Start phase two
    }
    if (playerOne.lifes <= 0 || enemyBlock.bottomEdge >= enemyArea.bottom) { //Verliest wanneer de vijanden te dichtbij zijn of wanneer je levens op zijn
        gameEnd(false);
    }
    if (enemies.length === 0) { //Wint wanneer er geen vijanden over zijn
        gameEnd(true);
    }
}

////////////////////////////////////////////////////////////
/////////Bepaald de speelsnelheid d.m.v. intervals//////////
////////////////////////////////////////////////////////////
function gameSpeed(phase, reset) {
    //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
    if (reset) { //Reset intervals wanneer reset op true staat
        //http://stackoverflow.com/questions/15995178/clearinterval-not-working
        window.clearInterval(fireInterval);
        window.clearInterval(gameInterval);
        window.clearInterval(moveInterval);
    }
    fireInterval = setInterval(function() { //Interval voor enemy fire
        enemyFire();
    }, (600 / difficulty) * phase);
    gameInterval = setInterval(function() { //Interval voor bullets en progress checking
        bulletMovement();
        bulletCollision();
        gameProgressConditions();
    }, 1);
    moveInterval = setInterval(function() { //Interval voor enemy movement
        enemyBlock.positioning();
    }, (1200 / difficulty) / phase);
}

////////////////////////////////////////////////////////////
//////////////////////Reset vijanden////////////////////////
////////////////////////////////////////////////////////////
function resetGame() {
    //Voert dit uit nadat voor de eerste keer is gespeeld
    if (run !== 1) {
        //Verwijder alle intervals
        window.clearInterval(fireInterval);
        window.clearInterval(gameInterval);
        window.clearInterval(moveInterval);

        //Zet de variabelen op de juiste waardes
        enemyBlock.yPos = 0;
        enemyBlock.xPos = 160;
        playerOne.yPos = 600;
        playerOne.xPos = 380;

        //Zet alle counters op de juiste aantallen.
        lifeCounter.innerHTML = 0;
        enemyCounter.innerHTML = 0;
        playerOne.lifes = 3;

        //Reset phase 2
        phaseTwo = false;
        phaseTwoHeading.innerHTML = "";
        phaseTwoHeading.classList.remove("phaseTwoStart");

        //Verwijderd de event handler
        //http://stackoverflow.com/questions/17672850/how-to-remove-an-eventhandler-document-onkeydown
        document.onkeydown = null;
    }
    //Zet de players en enemies op z'n plek
    playerOne.element.style.top = playerOne.yPos + "px";
    playerOne.element.style.left = playerOne.xPos + "px";
    enemyBlock.element.style.top = enemyBlock.yPos + "px";
    enemyBlock.element.style.left = enemyBlock.xPos + "px";
    //Creëert de enemies
    enemyBlock.createEnemies();
    //Verwijdert de bullets
    if (enemyBulletArray.length > 0) {
        for (i = enemyBulletArray.length - 1; i >= 0; i--) {
            enemyBulletContainer.removeChild(enemyBulletArray[i]);
        }
    }
    if (playerBullet !== null) {
        playerBullet.parentNode.removeChild(playerBullet);
        playerBullet = null;
    }
    //run + 1
    run++;
}

////////////////////////////////////////////////////////////
///////////////////Reset voor spelscherm////////////////////
////////////////////////////////////////////////////////////
function play() {
    if (run === 1) {
        resetGame();
    }
    //Life & enemy counter wordt geïnitialiseerd
    lifeCounter.innerHTML = playerOne.lifes;
    enemyCounter.innerHTML = enemies.length;
    musicDirector(buildUp, gameMusic, true); //Start de muziek & muziekloop
    gameSpeed(1); //Snelheid wordt gedefiniëerd
    //Keydown ipv keypress http://stackoverflow.com/questions/24550621/event-keycode-is-different-in-keydown-keyup-and-keypress
    //Gebruik van event als parameter omdat Firefox anders moeilijk ging doen http://stackoverflow.com/questions/20522887/referenceerror-event-is-not-defined-error-in-firefox
    document.onkeydown = function(event) {
        playerOne.controls(event.keyCode);
    }; //Keydown listener voor player controls
}

////////////////////////////////////////////////////////////
//////////Maakt speler, vijanden en boundaries aan//////////
////////////////////////////////////////////////////////////
//https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes voor de keyCodes
var playerOne = new PlayerShip(1, 380, 600, 87, 83, 65, 68, 32); //De xPos is halverwege de "playArea"
var enemyBlock = new EnemyBlockObject("enemies", 160, 0);
var playArea = new Bounds("bounds", 500, 800, 0, 800);
var enemyArea = new Bounds("bounds", 0, 500, 0, 800);

//Credtis naar Kimberly voor de comments style.
