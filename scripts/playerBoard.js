
genPlayerCard();

let cardIndex = null;

function genPlayerCard() {

  let playerList = getPlayerData() || [];

  const cardsSection = document.createElement('section');
  cardsSection.id = 'cardsSection';
  cardsSection.className = 'cards-section';
  mainDs.appendChild(cardsSection);

  let playersAvScore = [];

  playerList.forEach((player) => {
    playersAvScore.push(player.avScore());
  })

  highestAv = Math.max(...playersAvScore);

  playerList.forEach((player, index) => {
    
    const cardContainer = document.createElement('div');
    cardContainer.id = `player${index + 1}`;
    cardContainer.className = 'card-container';
    cardsSection.appendChild(cardContainer);

    const profileSection = document.createElement('div');
    profileSection.className = `card-profile ${player.profilePic}`;
    profileSection.innerHTML = `${player.avScore()}`;
    profileSection.style.backgroundImage = `url(img/${player.profilePic}.jpg)`;
    cardContainer.appendChild(profileSection);

    if (profileSection.innerHTML === `${highestAv}` && highestAv !== 0) {
      cardContainer.classList.add('number1');
      profileSection.classList.add('number1');
    }

    profileSection.addEventListener('click', () => {
      cardIndex = index;
      genModul(mainDs, genDeleteMeassage(player.name));
      cardsSection.remove();

      const footer = document.getElementById('deletePlayerFooter');
      footer.addEventListener('click', () => {
        playerList.splice(cardIndex, 1);
        localStorage.setItem('Players', JSON.stringify(playerList));
        gameHistory = [];
        localStorage.setItem('Game-History', JSON.stringify(gameHistory));
        modulContainer.remove();
        genPlayerCard();
      })
      
    })



    const cardFooter = document.createElement('footer');
    cardFooter.className = 'card-footer';

    const playerName = document.createElement('h2');
    playerName.className = 'player-name';
    playerName.innerHTML = `${player.name}`;

    cardFooter.appendChild(playerName);
    cardContainer.appendChild(cardFooter);
    
  })

  
}

