const mainDs = document.getElementById('mainDs');

// This array contains all the info for the navigation links.
const navLinks = [{
  tag: 'a',
  innerHTML: 'Add player',
  link: 'index.html'
  }, {
  tag: 'a',
  innerHTML: 'Player board',
  link: 'playerboard.html'
  }, {
  tag: 'a',
  innerHTML: 'Games',
  link: 'gamehistory.html'
  }];
  
const fullPath = window.location.pathname;
const cleanPath = fullPath.endsWith('/') ? fullPath.slice(0, -1) : fullPath;
const lastDirectory = cleanPath.split('/').pop();
const currentPage = lastDirectory || 'home';

// This function will generate the navigation html and put it on the page.
const navBar = () => {
  const navContainer = document.createElement('nav');
  navContainer.className = 'nav-container';

  const navLinksContainer = document.createElement('div');
  navLinksContainer.className = 'links-container';
  navContainer.appendChild(navLinksContainer);

  navLinks.forEach((link) =>{

    const htmlTag = document.createElement(link.tag);
    htmlTag.innerHTML = link.innerHTML;

    if (link.link === currentPage) {
      htmlTag.classList.add('active-page');
    };

    htmlTag.addEventListener('click', () => {
      window.location.href = link.link;
    });
    
    navLinksContainer.appendChild(htmlTag);
  })

  return navContainer

}

document.body.insertBefore(navBar(), document.body.firstChild);