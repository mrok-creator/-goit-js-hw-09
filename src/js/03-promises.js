import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(result => {
      Notify.success(result);
    })
    .catch(result => {
      Notify.failure(result);
    });
}

function onSubmitInit(e) {
  e.preventDefault();

  const formData = new FormData(ref.form);
  let delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay);
    delay += step;
  }
}

ref.form.addEventListener('submit', onSubmitInit);
