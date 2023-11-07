const canvas = document.getElementById('HALLOWEENGAME');

const DD = canvas.getContext('2d');

const ghost = new Image();

ghost.src = '../image/mini_ghost.png';

const ghostWidth = 25;
const ghostHeight = 25;

const ghostPosition = {
    x: 0,
    y: canvas.height / 2,
    speed: 3
};

const humans = [];
const humansImage = new Image();

humansImage.src = '../image/humans.png';

const humansWidth = 25;
const humansHeight = 25;

ghost.onload = function(){
    humansImage.onload = function(){
        gameLoop();
    };
};

function drawGhost() {
    DD.drawImage(ghost, ghostPosition.x, ghostPosition.y, ghostWidth, ghostHeight);
}

function drawHumans() {
    for (const human of humans) {
        DD.drawImage(humansImage, human.x, human.y, humansWidth, humansHeight);
    }
}

function update() {
    // Update humans position
    for (const human of humans) {
        human.x -= 2; // Adjust speed as needed
    }

    // Spawn new humans
    if (Math.random() < 0.03) {
        const newHuman = {
            x: canvas.width, //Depart de la limte droite de la zone de jeu
            y: Math.random() * (canvas.height - 20),
            width: 20,
            height: 20
        };
        humans.push(newHuman);
    }

    // Victoire
    if (ghostPosition.x >= canvas.width - ghostWidth){
        alert('Victoire  ! Tu as gagné ! ');
        resetGame();
    }

    // Check for collisions
    for (const human of humans) {
        if (
            ghostPosition.x < human.x + humansWidth &&
            ghostPosition.x + ghostWidth > human.x &&
            ghostPosition.y < human.y + humansHeight &&
            ghostPosition.y + ghostHeight > human.y
        ) {
            alert('Perdu ! Essaye encore');
            resetGame();
        }
    }
}

function resetGame() {
    ghostPosition.x = 0;
    ghostPosition.y = canvas.height / 2;
    humans.length = 0;
}

function gameLoop() {
    DD.clearRect(0, 0, canvas.width, canvas.height);

    DD.fillStyle = 'rgba(182, 94, 12)';
    DD.fillRect(0, 0, canvas.width, canvas.height);

    drawGhost();
    drawHumans();
    update();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && ghostPosition.y > 0) {
        ghostPosition.y -= ghostPosition.speed;
    } else if (event.key === 'ArrowDown' && ghostPosition.y < canvas.height - ghostHeight) {
        ghostPosition.y += ghostPosition.speed;
    } else if (event.key === 'ArrowRight' && ghostPosition.x < canvas.width - ghostWidth){
        ghostPosition.x += ghostPosition.speed;
    }else if (event.key === 'ArrowLeft' && ghostPosition.x < canvas.width - ghostWidth){
        ghostPosition.x -= ghostPosition.speed;
    }
});

