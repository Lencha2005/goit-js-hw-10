// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const btnStart = document.querySelector('button[data-start]');
const dateTime = document.querySelector('#datetime-picker');

btnStart.setAttribute('disabled', true)

let userSelectedDate;
let intervalId;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0]
        const currentDate = new Date();

        if(userSelectedDate < currentDate){

btnStart.setAttribute('disabled', true);

iziToast.show({
    title: 'Please choose a date in the future',
    titleColor: 'white',
    backgroundColor: 'red',
    position: 'topCenter',
    titleSize: '20'
})
        } else {
            btnStart.removeAttribute('disabled');
        }
        // userSelectedDate = selectedDates[0]
    //   console.log(userSelectedDate);
    },
  };

flatpickr("#datetime-picker", options);

btnStart.addEventListener('click', onBtnStart);

function onBtnStart(){
const endTime = new Date(dateTime.value).getTime();
btnStart.setAttribute('disabled', true);
dateTime.setAttribute('disabled', true);

intervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    const deltaTime = endTime - currentTime;

    if(deltaTime <= 0){
        clearInterval(intervalId);
        dateTime.removeAttribute('disabled');
        return;
    }

    const time = convertMs(deltaTime);
    updateTimeDisplay(time);
}, 1000);
// console.log(endDate);
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function updateTimeDisplay({ days, hours, minutes, seconds }){
document.querySelector('[data-days]').textContent = addLeadingZero(days);
document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  };
  
  function addLeadingZero(value){
return String(value).padStart(2, '0');
  };

  