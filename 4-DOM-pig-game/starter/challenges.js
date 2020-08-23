/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
init();

var lastDice;

//Event

document.querySelector('.btn-roll').addEventListener('click', function() {
if (gamePlaying) {
    // 1. random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. update the round score IF the roller number was NOT a 1

    if (dice1 !== 1 && dice2 !== 1) {
        roundScore += dice1 + dice2; //roundscore = roundscore + dice
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        //add score
    } else {
        // next player  ternary operator
        nextPlayer();
    
    }
// if (dice === 6 && lastDice === 6) {
//     //player looses score
//     scores[activePlayer] = 0;
//     document.querySelector('#score-' + activePlayer).textContent = '0';
//     nextPlayer();
// } else if (dice !== 1) {
//     roundScore += dice; //roundscore = roundscore + dice
//     document.querySelector('#current-' + activePlayer).textContent = roundScore;
//     //add score
// } else {
//     // next player  ternary operator
//     nextPlayer();

// }

// lastDice = dice;
}
 
});

// Button HOLD

document.querySelector('.btn-hold').addEventListener('click', function() {
if (gamePlaying) {

     // add current score to global score
     scores[activePlayer] += roundScore;

     // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winnerScore;
       
        //Undefined, Null, '', are COERCED to false
        // Anything else is coerced to true

    if(input) {
        winnerScore = input; 
    }else {
        winnerScore = 100;
    }    

     // Check if player won the game
     if (scores[activePlayer] >= winnerScore) {
         document.querySelector('#name-' + activePlayer).textContent = 'winner!';
         document.getElementById('dice-1').style.display = 'none';
         document.getElementById('dice-2').style.display = 'none';
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
         gamePlaying = false;
     } else {
         // Next player 
         nextPlayer();
     }
}

   
    
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // The same:
    // if (activePlayer === 0) {
    //     activePlayer = 1;
    // } else {
    //     activePlayer = 0;
    // }

    // 4. Go back to 0
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //визуально выделяем активного чувака - серый фон и красная точка. 
    // document.querySelector('.player-0-panel').classList.remove('active');//remove
    // document.querySelector('.player-1-panel').classList.add('active'); //add class

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active'); 
    //toggle добавляет и убирает класс автоматически, если он не active

    // when a player rolls a one to hide dice again 
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}


// BTN NEW
document.querySelector('.btn-new').addEventListener('click', init); //не надо скобок после function, иначе он вызовет ее сразу, а не после клика

//back to the beggining of the game INIT

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none'; //убрать картинку костяшки
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}


//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; сделать текст курсивом

// var x = document.querySelector('#score-0').textContent;
// console.log(x);