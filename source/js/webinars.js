$(document).ready(function () {
    function activateTab(activeButtonId, inactiveTabId, activeTabId) {
        $('.tab').removeClass('tab-active');
        $(`#${activeButtonId}`).addClass('tab-active');

        $(`#${inactiveTabId}`).css('display', 'none');
        $(`#${activeTabId}`).css('display', 'block');
    }

    $('#toanalytic').click(function () {
        activateTab('toanalytic', 'webinars', 'analytics');
    });

    $('#towebinar').click(function () {
        activateTab('towebinar', 'analytics', 'webinars');
    });
});

$(document).ready(function () {
    $('.more').click(function (e) {
        e.stopPropagation();
        $(this).toggleClass('show');
        $(this).find('.dropdown-menu').toggleClass('show');
    });
    $(document).click(function () {
        $('.more').removeClass('show');
        $('.dropdown-menu').removeClass('show');
    });
});

function setupDeleteButtons() {
    document.querySelectorAll('#delete').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.card').remove();
        });
    });
}

function setupCloneButtons() {
    document.querySelectorAll('#clone').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const clonedCard = card.cloneNode(true);
            card.parentNode.appendChild(clonedCard);
        });
    });
}

setupDeleteButtons();
setupCloneButtons();

const MODAL_ACTIVE = 'modal-active';
const Modal = document.querySelector('#modal');
const openModalBtns = document.querySelectorAll('.links'); 
const closeBtns = document.querySelectorAll('.close-btn');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        Modal.classList.add(MODAL_ACTIVE);
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        Modal.classList.remove(MODAL_ACTIVE);
    });
});