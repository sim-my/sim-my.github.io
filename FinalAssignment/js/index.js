document.querySelector('.mobile-navigation-menu').addEventListener("click", openMobileNavigation);

function openMobileNavigation(){
    document.querySelector('.mobile-menu').style.display = 'block'
}

document.querySelector('.mobile-menu-header').addEventListener("click", closeMobileNavigation);

function closeMobileNavigation(){
    document.querySelector('.mobile-menu').style.display = 'none'
}