const hamburger = document.querySelector("#ham-btn");
const navigation= document.querySelector("#nav-bar");

hamburger.addEventListener('click', ()=>{
    hamburger.classList.toggle('show')
    navigation.classList.toggle('show')

});