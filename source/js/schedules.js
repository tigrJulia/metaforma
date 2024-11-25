const inputs = document.querySelectorAll('.on__input, .date__input, .zone__input');
const button = document.querySelector('.session__add');
const sessionContainer = document.querySelector('.session');

inputs.forEach(input => {
    input.addEventListener('input', checkInputs);
});

button.addEventListener('click', addTiming);

sessionContainer.addEventListener('click', function(event) {
    if (event.target.closest('.btn-edit2')) {
        const timingElement = event.target.closest('.timing');

        const timeElement = timingElement.querySelector('.timing__time p');
        const timeValue = timeElement.textContent.trim();
        const convertedTime = convertTo24Hour(timeValue);

        fillInputs(timingElement);

        document.getElementById('time').value = convertedTime;

        timingElement.remove();
    }

    if (event.target.closest('.btn-delete2')) {
        const timingElement = event.target.closest('.timing');

        timingElement.remove();
    }
});
    

function checkInputs() {
    let allFilled = true;

    inputs.forEach(input => {
        if (input.tagName === 'SELECT') {
            if (input.value === '') {
                allFilled = false;
            }
        } else {
            if (input.value === '') {
                allFilled = false;
            }
        }
    });

    if (allFilled) {
        button.classList.remove('disabled');
        button.classList.add('hover');
    } else {
        button.classList.add('disabled');
        button.classList.remove('hover');
    }
}

function convertTo12Hour(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}
    
function convertTo24Hour(time) {
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
    return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
    

function addTiming() {
    const chatValue = document.getElementById('on').value;
    const dateValue = document.getElementById('date').value;
    const timeValue = document.getElementById('time').value;
    const zoneValue = document.getElementById('zone').value;
    
    const date = new Date(dateValue);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    const convertedTime = convertTo12Hour(timeValue);
    
    const timingElement = document.createElement('div');
    timingElement.classList.add('timing');
    
    timingElement.innerHTML = `
        <p class="timing__chat bg-b" title="Chat">${chatValue}</p>
        <div class="timing__data added bg-b">
            <img src="./img/schedules/icons/calendar.svg" alt="">
            <p>${formattedDate}</p>
        </div>
        <div class="timing__time added bg-b">
            <img src="./img/schedules/icons/timer.svg" alt="">
            <p>${convertedTime}</p>
        </div>
        <div class="timing__time zone added bg-b">
            ${zoneValue}
        </div>
        <div class="btns d-flex align-self-center" style="gap: 8px;">
            <button class="btn btn-edit2 p-0" type="button" id="edit">
                <img src="./img/configuration/icon/edit.svg" alt="">
            </button>
            <button type="button" class="btn btn-delete2 p-0" id="close">
                <img src="./img/configuration/icon/close-circle.svg" alt="">
            </button>
        </div>
    `;
    
    sessionContainer.appendChild(timingElement);
    
    inputs.forEach(input => {
        input.value = '';
    });
    checkInputs();
}
    

function fillInputs(timingElement) {
    const chatValue = timingElement.querySelector('.timing__chat').textContent;
    const dateValue = timingElement.querySelector('.timing__data p').textContent;
    const timeValue = timingElement.querySelector('.timing__time p').textContent;
    const zoneValue = timingElement.querySelectorAll('.timing__time.zone').textContent;
        

    document.getElementById('on').value = chatValue;
    document.getElementById('date').value = new Date(dateValue).toISOString().split('T')[0];
    document.getElementById('time').value = timeValue;
    document.getElementById('zone').value = zoneValue;

    checkInputs(); 
}