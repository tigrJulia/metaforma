function toggleActiveClass(elementId) {
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const imgElement = item.querySelector('.item__img');
        const imgActiveElement = item.querySelector('.item__img-active');
        item.classList.remove('item-active');
        if (imgElement) imgElement.style.display = 'block';
        if (imgActiveElement) imgActiveElement.style.display = 'none';
    });

    const activeElement = document.getElementById(elementId);
    if (activeElement) {
        activeElement.classList.add('item-active');
        const imgElement = activeElement.querySelector('.item__img');
        const imgActiveElement = activeElement.querySelector('.item__img-active');
        if (imgElement) imgElement.style.display = 'none';
        if (imgActiveElement) imgActiveElement.style.display = 'block';
    }
}

const elementIds = ['paper', 'contacts', 'bord', 'users', 'session', 'rapport', 'star', 'upload', 'web', 'filter', 'roadmap'];

elementIds.forEach(id => {
    document.getElementById(id).addEventListener('click', () => toggleActiveClass(id));
});

$(document).ready(function () {
    $('#menu').click(function (e) {
        e.stopPropagation();
        $('.sidebar').toggleClass('show');
    });
    $(document).click(function () {
        $('.sidebar').removeClass('show');
    });
});