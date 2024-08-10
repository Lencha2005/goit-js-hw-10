// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event){
    event.preventDefault();

    const form = event.target;
    // console.log(form);
    const delay = Number(form.elements.delay.value);
    // console.log(delay);
    const state = form.elements.state.value;
    // console.log(state);

    createPromise(delay, state)
    .then(value => {
        iziToast.show({
            title: `✅ Fulfilled promise in ${delay} ms`,
            titleColor: 'white',
            backgroundColor: 'green',
            position: 'topCenter',
            titleSize: '16'
        })
    })
    .catch(error => {
        iziToast.show({
            title: `❌ Rejected promise in ${delay} ms`,
            titleColor: 'white',
            backgroundColor: 'red',
            position: 'topCenter',
            titleSize: '16'
        });
    });

formEl.reset();
};

function createPromise(delay, state){
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if(state === 'fulfilled'){
            resolve();
        } else {
            reject();
        }
    }, delay);
    });
};
