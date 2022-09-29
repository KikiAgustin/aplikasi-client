const skip = document.querySelector('.skip');
skip.addEventListener('click', function(){
    localStorage.tour = "1";
    window.location.href = "login.html";
});