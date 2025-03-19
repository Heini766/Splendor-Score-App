const gameCardsSection = document.createElement('section');
gameCardsSection.className = 'game-card-section';
gameCardsSection.id = 'gameCardSection';

//mainDs.appendChild(gameCardsSection);

let gameHistory = JSON.parse(localStorage.getItem('Game-History')) || [];

if (gameHistory[0]) {
  mainDs.appendChild(gameCardsSection);
  renderGames();
} else if (playerList.length > 1) {
  genBtn(btnComps[1], mainDs);
}

function addGameModul() {

  const playerScoresWrapper = document.createElement('div');
  playerScoresWrapper.className = 'player-score-wrapper';

  playerList.forEach((player, index) => {

    const playerContainer = document.createElement('div');
    playerContainer.className = 'player-container';

    const playerIcon = document.createElement('div');
    playerIcon.className = 'player-icon';
    playerIcon.style.backgroundImage = `url(img/${player.profilePic}.jpg)`;

    playerContainer.appendChild(playerIcon);

    const scoreInp = document.createElement('input');
    scoreInp.id = `input${index}`;
    scoreInp.className = 'name-inp scores';
    scoreInp.placeholder = `${player.name}`;

    playerContainer.appendChild(scoreInp);
    playerScoresWrapper.appendChild(playerContainer);
    
  })

  baseModulComps[3] = {
    ID: 'addGameFooter',
    className: 'modul-footer game',
    tag: 'footer',
    innerHTML: 'Submit'
  };

  const addGameFooter = document.getElementById('addGameFooter');

  return {
    content: playerScoresWrapper,
    footer: addGameFooter
  };
  
}

function addNewGame() {

  validInp = true;
  
  playerList.forEach((player, index) => {

    if (!document.getElementById(`input${index}`)) {
      return
    };
    
    let inp = Number(document.getElementById(`input${index}`).value);
    if (!inp) {
      document.getElementById(`input${index}`).value = '';
      document.getElementById(`input${index}`).placeholder = `!`;
      setTimeout(() => {
      document.getElementById(`input${index}`).placeholder = `${player.name}`;
      }, 1000);
      return validInp = false;
    };

    player.scoreHis.push(inp);
    document.getElementById(`input${index}`).remove();
  })

  if (validInp) {
    localStorage.setItem('Players', JSON.stringify(playerList))
    updateGameHistory();
    modulContainer.remove();
    renderGames();
  }
  
}

function updateGameHistory() {

  let gameData = [];

  playerList.forEach((player) => {

    gameData.push({avatar:player.profilePic, score: player.scoreHis[player.scoreHis.length - 1]});
    
  })

  gameHistory.push(gameData);

  localStorage.setItem('Game-History', JSON.stringify(gameHistory));
  
}

function renderGames() {

  gameCardsSection.innerHTML = '';
  mainDs.appendChild(gameCardsSection);

  gameHistory.forEach((game, index) => {

    const gameCardContainer = document.createElement('div');
    gameCardContainer.className = 'game-container';

    const gameHeader = document.createElement('div');
    gameHeader.className = 'game-header';
    gameHeader.innerHTML = `<h2>Game ${index + 1}`;
    gameCardContainer.appendChild(gameHeader);
    gameHeader.addEventListener('click', () => {
      gameHistory.splice(index, 1);
      localStorage.setItem('Game-History', JSON.stringify(gameHistory));
        playerList.forEach((player) => {
        player.scoreHis.splice(index, 1);
      });
      localStorage.setItem('Players', JSON.stringify(playerList));
      if (gameHistory[0]) {
        mainDs.appendChild(gameCardsSection);
        renderGames();
      } else {
        //genBtn(btnComps[1], mainDs);
      }
      gameCardContainer.remove();
    })

    const resultsSection = document.createElement('div');
    resultsSection.className = 'results-section';
    gameCardContainer.appendChild(resultsSection);

    game.forEach((results) => {

      const playerContainer = document.createElement('section');
      playerContainer.className = 'player-result-container';
      resultsSection.appendChild(playerContainer);

      const playerIcon = document.createElement('div');
      playerIcon.className = 'player-result-icon';
      playerIcon.style.backgroundImage = `url(img/${results.avatar}.jpg)`;
      playerContainer.appendChild(playerIcon);

      const playerResult = document.createElement('h3');
      playerResult.className = 'player-result';
      playerResult.innerHTML = `${results.score}`;

      
      playerContainer.appendChild(playerResult);
    })
    
    gameCardsSection.appendChild(gameCardContainer);
  
  })
  
  if (playerList.length > 1) {
    genBtn(btnComps[1], gameCardsSection);
  };
  
}