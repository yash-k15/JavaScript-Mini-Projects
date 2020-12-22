let minV = 1,
    maxV = 10,
    winNum = getNum(minV, maxV),
    guesses = 3;

const game = document.getElementById('game');
const minN = document.querySelector('.min-num');
const maxN = document.querySelector('.max-num');
const guessValue = document.getElementById('guess-input');
const submitBtn = document.getElementById('guess-btn');
const messageBox = document.querySelector('.message');

minN.textContent = minV;
maxN.textContent = maxV;

game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

submitBtn.addEventListener('click', function(){
    let guess = parseInt(guessValue.value);
    
    if(isNaN(guess) || guess < minV || guess > maxV) {
        setMessage(`Please enter a number between ${minV} and ${maxV}`, 'red');
    }
    else {
        if(guess === winNum) {
            gameOver(true, `${guess} is the correct number! You Win`);
        }
        else{
            guesses -= 1;
            if(guesses === 0) {
                gameOver(false, `${guess} is the not correct number! Game Over, The correct number was ${winNum}`);
            }
            else{
                
                guessValue.style.borderColor = 'red';
                setMessage(`${guess} is the not correct number! You have ${guesses} guess left`, 'red');
                
            }
            guessValue.value = '';
        }
    }
});

function setMessage(message, color){
    messageBox.style.color = color;
    guessValue.style.borderColor = color;
    messageBox.textContent = message;
}

function gameOver(won, message){
    guessValue.disabled = true;
    let color;
    won ? color = 'green' : 'red';
    setMessage(message, color);
    
    submitBtn.value = 'Play Again?';
    submitBtn.className += 'play-again';
}

function getNum(min, max){
     return Math.floor(Math.random() * (max - min + 1) + min);
}