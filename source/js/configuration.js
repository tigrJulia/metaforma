$(document).ready(function () {
    $('#toconfiguration').click(function () {
        $('.webinars').hide();
        $('.configuration').show();
    });

    $('.back').click(function () {
        $('.configuration').hide();
        $('.webinars').show();
        $(`#towebinar`).addClass('tab-active');
    });

    function activateTab(activeButtonId, inactiveTabIds, activeTabId) {
        $('.tab').removeClass('tab-active');
        $(`#${activeButtonId}`).addClass('tab-active');
        inactiveTabIds.forEach(function(tabId) {
            $(`#${tabId}`).hide();
        });
        $(`#${activeTabId}`).show();
    }

    $('#configuration').click(function () {
        activateTab('configuration', ['Wfinish', 'Wschedules'], 'Wconfiguration');
    });

    $('#schedules').click(function () {
        activateTab('schedules', ['Wfinish', 'Wconfiguration'], 'Wschedules');
    });

    $('#finish').click(function () {
        activateTab('finish', ['Wschedules', 'Wconfiguration'], 'Wfinish');
    });
});

document.getElementById('uploadFile').addEventListener('change', function(event) {
    const fileList = document.getElementById('uploadList');
    fileList.innerHTML = '';

    for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const listItem = document.createElement('li');
        listItem.className = 'file__item bg-b';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'delete';
        removeBtn.innerHTML = '<img src="./img/webinars/icons/close.svg" alt="" class="delete">';
        removeBtn.addEventListener('click', function() {
            fileList.removeChild(listItem);
        });
        listItem.appendChild(removeBtn);
        
        const fileDetails = document.createElement('div');
        fileDetails.className = 'file__details';

        const fileName = document.createElement('p');
        fileName.className = 'file__name';
        fileName.textContent = file.name;
        fileDetails.appendChild(fileName);

        const fileSize = document.createElement('span');
        fileSize.textContent = (file.size / 1024).toFixed(2) + 'kb';
        fileName.appendChild(fileSize);
        
        listItem.appendChild(fileDetails);
        fileList.appendChild(listItem);
    }
});

$(document).ready(function () {
    function checkFields() {
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();

        if (name !== '' && email !== '') {
            $('#save').removeClass('disabled').addClass('hover');
        } else {
            $('#save').addClass('disabled').removeClass('hover');
        }
    }

    $('#name, #email').on('input', function () {
        checkFields();
    });

    $('#save').click(function () {
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const isChecked = $('#switch').is(':checked');
        
        if (name === '' || email === '') {
            alert('Please fill in both name and email fields.');
            return;
        }

        const role = isChecked ? 'Host & Presenter' : 'Host & Moderator';

        const newLi = `
            <li class="person">
                <img src="./img/configuration/icon/icn.svg" alt="" class="person__img">
                <div class="details">
                    <p class="details__name">${name}</p>
                    <p class="details__email">${email}</p>
                    <p class="details__role">${role}</p>
                </div>
                <div class="btns">
                    <button class="btn btn-edit" type="button" id="edit">
                        <img src="./img/configuration/icon/edit.svg" alt="">
                    </button>
                    <button type="button" class="btn btn-delete" id="close">
                        <img src="./img/configuration/icon/close-circle.svg" alt="">
                    </button>
                </div>
            </li>
        `;

        $('.list-presenters').append(newLi);
        $('#name').val('');
        $('#email').val('');
        $('#switch').prop('checked', false);
        checkFields();
    });

    $(document).on('click', '.btn-edit', function() {
        const $person = $(this).closest('.person');
        const name = $person.find('.details__name').text();
        const email = $person.find('.details__email').text();

        $('#name').val(name);
        $('#email').val(email);

        $person.remove();

        checkFields();
    });

    $('#null').click(function () {
        $('#name').val('');
        $('#email').val('');
        $('#switch').prop('checked', false);
        checkFields();
    });

    
    $(document).on('click', '#close', function() {
        $(this).closest('.person').remove();
    });
});

$(document).ready(function () {
    function checkFields() {
        const title = $('#title').val().trim();
        const descr = $('#descr').val().trim();

        if (title !== '' && descr !== '') {
            $('.btn-next').removeClass('disabled').addClass('hover');
        } else {
            $('.btn-next').addClass('disabled').removeClass('hover'); 
        }
    }
    $('#title, #descr').on('input', function () {
        checkFields();
    });
    $(document).on('click', '.btn-next', function () {
        const title = $('#title').val().trim();
        const descr = $('#descr').val().trim();
        if (title === '' || descr === '') {
            alert('Please fill in both title and description fields.');
            return;
        }

        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.classList.remove('tab-active');
        });
        $('#schedules').toggleClass('tab-active');

        $('#Wconfiguration').css('display', 'none');
        $('#Wschedules').css('display', 'block');
        
        $('#1').css('display', 'none');

        $('#2').css('display', 'block');

    });

    $(document).on('click', '.btn-next2', function () {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.classList.remove('tab-active');
        });
        $('#finish').toggleClass('tab-active');

        $('#Wschedules').css('display', 'none');
        $('#Wfinish').css('display', 'block');
    });
});