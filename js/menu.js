////////////////////////////////////////////////////////////
//////////////////////Start het spel////////////////////////
////////////////////////////////////////////////////////////
function start() {
    animation.classList.toggle("inactive");
    menu.classList.toggle("inactive");
    animationStart();
}

////////////////////////////////////////////////////////////
/////////////////////////Settings///////////////////////////
////////////////////////////////////////////////////////////
function settings() {
    //Verander volume
    if (volumeSlider.value != soundVolume) {
        soundVolume = volumeSlider.value;
        for (i = 0; i < music.length; i++) {
            music[i].volume = soundVolume / 10;
        }
        for (i = 0; i < sfx.length; i++) {
            sfx[i].volume = soundVolume / 10;
        }
    }
    //Verander difficulty
    if (difficultySlider.value != difficulty) {
        difficulty = difficultySlider.value;
    }
    //http://stackoverflow.com/questions/9887360/check-if-checkbox-is-checked-javascript/9887439
    //Muziek aan
    if (musicCheckBox.checked && !musicSwitch) {
        for (i = 0; i < music.length; i++) {
            music[i].volume = soundVolume / 15;
            music[i].currentTime = 0;
            menuMusic.play();
        }
        musicSwitch = true;
        musicCheckBox.checked = true;
    //Muziek uit
    } else if (!musicCheckBox.checked && musicSwitch) {
        for (i = 0; i < music.length; i++) {
            music[i].volume = 0.0;
            music[i].pause();
        }
        musicSwitch = false;
        musicCheckBox.checked = false;
    }
    //SFX geluid aan
    if (sfxCheckBox.checked && !sfxSwitch) {
        for (i = 0; i < sfx.length; i++) {
            sfx[i].volume = soundVolume / 30;
            sfx[i].currentTime = 0;
        }
        sfxSwitch = true;
        sfxCheckBox.checked = true;
    //SFX geluid uit
    } else if (!sfxCheckBox.checked && sfxSwitch) {
        for (i = 0; i < sfx.length; i++) {
            sfx[i].volume = 0.0;
            sfx[i].pause();
        }
        sfxSwitch = false;
        sfxCheckBox.checked = false;
    }
}

////////////////////////////////////////////////////////////
//////////////////////////Reset/////////////////////////////
////////////////////////////////////////////////////////////
function reset() {
    settings();
    musicDirector(endMusic, menuMusic, true);
    //http://stackoverflow.com/questions/7330023/gapless-looping-audio-html5 zorgt ervoor dat er een buffer wordt opgeslagen en de muziek zonder gaps blijft spelen.
    gameOver.classList.toggle("inactive");
    menu.classList.toggle("inactive");
}

////////////////////////////////////////////////////////////
////////////////Event handlers/listeners////////////////////
////////////////////////////////////////////////////////////
startButton.onclick = start; //Start button
restartButton.onclick = function() { //Restart button
    reset();
};
settingsContainer.onclick = settings;
volumeSlider.onblur = settings;
difficultySlider.onblur = settings;

////////////////////////////////////////////////////////////
//////////////////////Start het spel////////////////////////
////////////////////////////////////////////////////////////
window.onload = function() {
    reset();
};
