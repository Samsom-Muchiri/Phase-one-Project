const menuBar = document.querySelector('.icon-tabler-align-left')
const sideBar = document.querySelector('.mobile-nav')
sideBar.classList.add('closed-menu')
const closeMenu = document.querySelector('.close')
    menuBar.addEventListener('click', _ =>{
        if(sideBar.classList.contains('closed-menu')){
            sideBar.classList.remove('closed-menu')
        }
    })
    closeMenu.addEventListener('click', _ =>{
        if(!sideBar.classList.contains('closed-menu')){
            sideBar.classList.add('closed-menu')
        }
    })