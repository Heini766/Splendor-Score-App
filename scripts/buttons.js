const btnComps = [{
  ID: 'addPlayer',
  className: 'addBtn player',
  tag: 'button',
  innerHTML: `
  <svg id="addIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
    <g class="addIcon-group">
      <path class="line" d="M25 12.5 L25 37.5" stroke="white" />
      <path class="line" d="M12.5 25 L37.5 25" stroke="white" />
    </g>
  </svg>
  `,
}, {
  ID: 'addGame',
  className: 'addBtn game',
  tag: 'button',
  innerHTML: `
  <svg id="addIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
    <g class="addIcon-group">
      <path class="line" d="M25 12.5 L25 37.5" stroke="white" />
      <path class="line" d="M12.5 25 L37.5 25" stroke="white" />
    </g>
  </svg>
  `,
}, {
  ID: 'cancelBtn',
  className: 'cancel-btn',
  tag: 'button',
  innerHTML: `
  <svg id="cancelIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
    <g class="cancelIcon-group">
      <path class="line" d="M25 12.5 L25 37.5" stroke="white" />
      <path class="line" d="M12.5 25 L37.5 25" stroke="white" />
    </g>
  </svg>
  `,
}] // This array contains the data for every type of button in the webpage

function genBtn(btnType, display) {

  const element = document.createElement(btnType.tag);
  element.id = btnType.ID;
  element.className = btnType.className;
  element.innerHTML = btnType.innerHTML;

  if (btnType === btnComps[0]) {
    element.addEventListener('click', () => {
      genModul(mainDs, genPlayerContent().content);
      addPlayerFooter.addEventListener('click', submitNewPlayer);
      element.remove();
    })
  } else if (btnType === btnComps[1]) {
    element.addEventListener('click', () => {
      gameCardsSection.remove();
      element.remove();
      genModul(mainDs, addGameModul().content);
      addGameModul().footer.addEventListener('click', addNewGame);
    })
  }



  display.appendChild(element);

  return element;

} // This function can create and display the above defined button types. The function returns the created element itself with it's eventListener.
