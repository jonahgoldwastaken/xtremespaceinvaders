// Constructor notation van pagina 106 uit JavaScript & Jquery door John Duckett

//Players
function PlayerShip(player, xPos, yPos, up, down, left, right, fire) {
    this.element = document.getElementById("player" + player);
    this.player = player;
    this.lifes = 3;
    this.yPos = yPos;
    this.xPos = xPos;
    //Edges voor collision check
    this.topEdge = yPos;
    this.bottomEdge = yPos + this.element.offsetHeight;
    this.leftEdge = xPos;
    this.rightEdge = xPos + this.element.offsetWidth;
    //Controls
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.fire = fire;
    //Naar feedback van mijn apen opdracht van Laura Benvenuti en
    //https://www.w3schools.com/js/js_object_methods.asp
    this.controls = function(key) {
        if (key === this.up && this.topEdge > playArea.top) {
            this.yPos -= 20;
        } else if (key === this.down && this.bottomEdge < playArea.bottom) {
            this.yPos += 20;
        } else if (key === this.left && this.leftEdge > playArea.left) {
            this.xPos -= 20;
        } else if (key === this.right && this.rightEdge < playArea.right) {
            this.xPos += 20;
        } else if (key === this.fire) {
            playerFire(this.xPos, this.yPos);
        }
        //Verandert de positie nadat de x en y-waardes zijn aangepast.
        this.element.style.top = this.yPos + "px";
        this.element.style.left = this.xPos + "px";
        //Verandert de positie van de randen.
        this.topEdge = this.yPos;
        this.bottomEdge = this.yPos + this.element.offsetHeight;
        this.leftEdge = this.xPos;
        this.rightEdge = this.xPos + this.element.offsetWidth;
    };
}

//Enemy parent node block object
function EnemyBlockObject(element, xPos, yPos) {
    this.element = document.getElementById(element);
    this.xPos = xPos;
    this.yPos = yPos;
    this.topEdge = this.yPos;
    this.bottomEdge = this.yPos + this.element.offsetHeight;
    this.leftEdge = this.xPos;
    this.rightEdge = this.xPos + this.element.offsetWidth;
    this.lastDirection = "right";
    this.positioning = function() {
        switch (this.checkDirection()) {
            case "down":
                this.yPos += 40;
                break;

            case "left":
                this.xPos -= 20;
                break;

            case "right":
                this.xPos += 20;
                break;
        }
        this.lastDirection = this.checkDirection();
        this.element.style.top = this.yPos + "px";
        this.element.style.left = this.xPos + "px";
        this.topEdge = this.yPos;
        this.bottomEdge = this.yPos + this.element.offsetHeight;
        this.leftEdge = this.xPos;
        this.rightEdge = this.xPos + this.element.offsetWidth;
    };
    this.checkDirection = function() {
        var result;
        if (this.leftEdge <= enemyArea.left && this.lastDirection == "left") {
            result = "down";
        } else if (this.leftEdge <= enemyArea.left && this.lastDirection == "down") {
            result = "right";
        } else if (this.rightEdge >= enemyArea.right && this.lastDirection == "right") {
            result = "down";
        } else if (this.rightEdge >= enemyArea.right && this.lastDirection == "down") {
            result = "left";
        } else if (this.lastDirection == "left") {
            result = "left";
        } else if (this.lastDirection == "right") {
            result = "right";
        } else {
            result = "right";
        }
        return result;
    };
    this.createEnemies = function() {
        for (i = enemyBlock.element.children.length - 1; i >= 0; i--) {
            enemyBlock.element.children[i].parentNode.removeChild(enemyBlock.element.children[i]);
        }
        for (i = 3; i > 0; i--) {
            for (var s = 0; s < 12; s++) {
                var newEnemy = document.createElement("IMG");
                newEnemy.src = "img/enemy_" + i + ".png";
                newEnemy.classList.add("enemy");
                enemyBlock.element.appendChild(newEnemy);
            }
        }
    };
}

//Boundaries
function Bounds(element, top, bottom, left, right) {
    this.element = document.getElementById(element);
    this.top = top;
    // de tweede berekening is ter compensatie voor de eventuele border: https://www.w3schools.com/jsref/prop_style_borderwidth.asp
    this.bottom = bottom;
    this.left = left;
    this.right = right;
}
