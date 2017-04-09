// Screens
var menu = document.getElementById("menu");
var animation = document.getElementById("animation");
var game = document.getElementById("game");
var gameOver = document.getElementById("gameOver");
//EndText
var endText = document.getElementById("endText");
//Menu
//Settings buttons & sliders
var sfxCheckBox = document.getElementsByName("sfx")[0];
var musicCheckBox = document.getElementsByName("music")[0];
var volumeSlider = document.getElementsByName("volume")[0];
var difficultySlider = document.getElementsByName("difficulty")[0];
//start, reset buttons and settings container
var settingsContainer = document.getElementById("settings");
var startButton = document.getElementById("start");
var restartButton = document.getElementById("restart");
//Settings variables
var sfxSwitch = false;
var musicSwitch = false;
var soundVolume = 6;
var difficulty = 2;
// Music
var menuMusic = new Audio("./sfx/menu.mp3");
var buildUp = new Audio("./sfx/buildUp.mp3");
var gameMusic = new Audio("./sfx/game.mp3");
var phaseTwoMusic = new Audio("./sfx/phase2.mp3");
var endMusic = new Audio("./sfx/endMusic.mp3");
//SFX
var laserEnemy = new Audio("./sfx/laser1.mp3");
var laserPlayer = new Audio("./sfx/laser2.mp3");
var explosionOne = new Audio("./sfx/explosion1.mp3");
var explosionTwo = new Audio("./sfx/explosion2.mp3");
//Sound arrays & listener
var music = [menuMusic, buildUp, gameMusic, phaseTwoMusic, endMusic];
var sfx = [laserEnemy, laserPlayer, explosionOne, explosionTwo];
var currentSongListener;
// Game
var i;
var run = 1;
var phaseTwo = false;
var phaseTwoHeading = document.getElementById("phaseTwoHeading");
var lifeCounter = document.getElementById("lifes");
var enemyCounter = document.getElementById("enemyCount");
var enemies = document.getElementsByClassName("enemy");
var moveInterval;
var fireInterval;
var enemyMovementFreq;
var playerBullet = null;
var enemyBulletContainer = document.getElementById("enemyBullets");
var enemyBulletArray = enemyBulletContainer.children;
