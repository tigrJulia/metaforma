$(document).ready(function () {
    $('.profile').hover(function () {
        $(this).addClass('show');
        $(this).find('.dropdown-menu').addClass('show');        
    }, 
    function () {
        $(this).removeClass('show');
        $(this).find('.dropdown-menu').removeClass('show');
    });
});