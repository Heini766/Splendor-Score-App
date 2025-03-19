const baseModulComps = [{
  ID: 'modulContainer',
  className: 'modul-container',
  tag: 'div',
}, {
  ID: 'modulHeader',
  className: 'modul-header',
  tag: 'header',
}, {
  ID: 'modulContent',
  className: 'modul-content',
  tag: 'section',
}, {
  ID: 'modulFooter',
  className: 'modul-footer',
  tag: 'footer',
  innerHTML: 'Default'
}];

const addPlayerComps = [{
  ID: 'nameInp',
  className: 'name-inp',
  tag: 'input',
  placeHolder: 'Player name'
}, {
  ID: 'avatarTitle',
  className: 'avatar-title',
  tag: 'h2',
  innerHTML: 'Avatar',
}, {
  avatarList: []
}];

function getPlayerData() {

  if (localStorage.getItem('Players')) {
    let playerList = JSON.parse(localStorage.getItem('Players'));
  playerList.forEach((player) => {
    player.avScore = () => {
      if (player.scoreHis.length === 0) return 0;
      const calcAv = player.scoreHis.reduce((sum, score) => sum + score, 0) / player.scoreHis.length;
      return Math.round(calcAv*10)/10;
    } 
  })

  return playerList;
  }
}

let playerList = getPlayerData() || [];
let selection = null;

// MODUL FUNCTIONS

function genPlayerContent() {
  
  addPlayerComps[addPlayerComps.length - 1].avatarList = [];
  
  for (let i = 1; i <= 4; i++) {
  const avatar = document.createElement('div');
  avatar.id = `icon${i}`;
  avatar.className = 'avatar-icon';
  avatar.style.backgroundImage = `url(img/icon${i}.jpg)`;

  avatar.addEventListener('click', () => {

    let previousSelected = document.querySelector('.selected');

    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }
    
    avatar.classList.add('selected');
    selection = `icon${i}`;
  })

  addPlayerComps[addPlayerComps.length - 1].avatarList.push(avatar);
};
  
  const wrapper = document.createElement('div');
  wrapper.id = 'addPlayerWrapper';
  wrapper.className = 'add-player-wrapper';

  const nameInp = document.createElement(addPlayerComps[0].tag);
  nameInp.id = addPlayerComps[0].ID;
  nameInp.className = addPlayerComps[0].className;
  nameInp.placeholder = addPlayerComps[0].placeHolder;
  wrapper.appendChild(nameInp);

  const avatarListSection = document.createElement('section');
  avatarListSection.id = 'avatarList';
  avatarListSection.className = 'avatar-list';
  wrapper.appendChild(avatarListSection);

  const avatarListTitle = document.createElement(addPlayerComps[1].tag);
  avatarListTitle.id = addPlayerComps[1].ID;
  avatarListTitle.className = addPlayerComps[1].className;
  avatarListTitle.innerHTML = addPlayerComps[1].innerHTML;
  avatarListSection.appendChild(avatarListTitle);

  const iconContainer = document.createElement('div');
  iconContainer.className = 'icon-container';
  avatarListSection.appendChild(iconContainer);

  addPlayerComps[2].avatarList.forEach(icon => iconContainer.appendChild(icon));

  baseModulComps[3] = {
    ID: 'addPlayerFooter',
    className: 'modul-footer player',
    tag: 'footer',
    innerHTML: 'Submit'
  };

  let addPlayerFooter = document.getElementById('addPlayerFooter');

  return {
    content: wrapper,
    footer: addPlayerFooter
  }
};

function genDeleteMeassage(name) {

  baseModulComps[3] = {
    ID: 'deletePlayerFooter',
    className: 'modul-footer delete',
    tag: 'footer',
    innerHTML: 'Delete'
  };
  
  const deleteMes = document.createElement('h2');
  deleteMes.className = 'delete-mes';
  deleteMes.innerHTML = `Do you want to remove <span class="highlight">${name}</span>? <h2>This will also clear the game history.</h2>`;

  return deleteMes;
}

function genModul(display, modulType) {
  const modulContainer = document.createElement(baseModulComps[0].tag);
  modulContainer.id = baseModulComps[0].ID;
  modulContainer.className = baseModulComps[0].className;

  display.appendChild(modulContainer);

  const modulHeader = document.createElement(baseModulComps[1].tag);
  modulHeader.id = baseModulComps[1].ID;
  modulHeader.className = baseModulComps[1].className;

  const cancelBtn = genBtn(btnComps[2], modulHeader);

  if (currentPage === 'index.html') {
    cancelBtn.addEventListener('click', () => {
      if (document.querySelector('.selected')) {
        document.querySelector('.selected').classList.remove('selected')
      };
      selection = null;
      modulContainer.remove();
      genBtn(btnComps[0], mainDs);
    })
  } else if (currentPage === 'playerboard.html') {
    cancelBtn.addEventListener('click', () => {
      modulContainer.remove();
      genPlayerCard();
    })
  } else if (currentPage === 'gamehistory.html') {
   cancelBtn.addEventListener('click', () => {
    modulContainer.remove();
    if (gameHistory[0]) {
      mainDs.appendChild(gameCardsSection);
      renderGames();
    } else {
      genBtn(btnComps[1], mainDs);
    }
   })
  }

  modulContainer.appendChild(modulHeader);

  const content = document.createElement(baseModulComps[2].tag);
  content.id = baseModulComps[2].ID;
  content.className = baseModulComps[2].className;
  content.appendChild(modulType);

  modulContainer.appendChild(content);

  const modulFooter = document.createElement(baseModulComps[3].tag);
  modulFooter.id = baseModulComps[3].ID;
  modulFooter.className = baseModulComps[3].className;
  modulFooter.innerHTML = baseModulComps[3].innerHTML;

  modulContainer.appendChild(modulFooter);

};

function submitNewPlayer() {

  const nameInpBox = document.getElementById('nameInp');
  const name = nameInpBox.value.trim();

  if (/\s/.test(name) || name === '') {
    nameInpBox.value = '';
    nameInpBox.placeholder = 'Input a one word name';
  } else if (!selection) {
    document.querySelectorAll('.avatar-icon').forEach((item) => {
      const animationDelay = 500;
        
      item.style.animation = `fade ${animationDelay/1000}s linear forwards`;

      let timedID = null;

      function executeWithDelay()  {
        if (timedID !== null) {
          clearTimeout(timedID);
        }

        timedID = setTimeout(() => {
          item.style.removeProperty('animation');
        }, animationDelay);
      }

      executeWithDelay();
      
    })
  } else {
    
    const newPlayer = {
      name: nameInpBox.value,
      profilePic: selection,
      scoreHis: [],
      get avScore() {
        if (this.scoreHis.length === 0) return 0;
        return this.scoreHis.reduce((sum, score) => sum + score, 0) / this.scoreHis.length;
      }
    }

    playerList.push(newPlayer);

    localStorage.setItem('Players', JSON.stringify(playerList));

    document.getElementById('modulContainer').remove();
    if (playerList.length < 4) {
      genBtn(btnComps[0], mainDs);
    }
    isSelected = null;
  };
  
};