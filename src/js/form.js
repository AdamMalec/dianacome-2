import emailjs from '@emailjs/browser';

const formEl = document.getElementById('form');
const inputListEl = Array.from(formEl.querySelectorAll('input'));
const textareaEl = formEl.querySelector('#message');
const formErrorEl = formEl.querySelector('.form-error-message');
const modalEl = document.querySelector('.modal');

const serviceID = 'service_fiwatjb';
const templateID = 'template_1ml7ldb';
const pubKey = 'Fy2E5fMFs7HbsJOvm';

function startInputValidation() {
  inputListEl.forEach((inputElement) => {
    addValidationEvents(inputElement)
  });
  addValidationEvents(textareaEl);
};

function addValidationEvents(inputElement) {
  inputElement.addEventListener('input', () => {
    checkInputValidity(inputElement);
  })
  inputElement.addEventListener('blur', () => {
    toggleInputError(inputElement);
  })
  inputElement.addEventListener('focus', () => {
    toggleErrorSpan(inputElement);
  })
}

function checkInputValidity(inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
};

function toggleInputError(inputElement) {
  if (!inputElement.validity.valid) {
    toggleErrorSpan(inputElement, inputElement.validationMessage);
  } else {
    toggleErrorSpan(inputElement);
  }
};

function toggleErrorSpan(inputElement, errorMessage) {
  const errorElement = inputElement.nextElementSibling;
  if (errorMessage) {
    inputElement.classList.add('input-error');
    errorElement.textContent = errorMessage;
  } else {
    inputElement.classList.remove('input-error');
    errorElement.textContent = '';
  }
};

function hasInvalidInput() {
  return (
    inputListEl.some(inputElement => !inputElement.validity.valid)
  )
}

function formError() {
  const errorMessage = 'Please fill in the required fields to submit.';
  formErrorEl.textContent = errorMessage;
  formEl.classList.add('form-error');
  setTimeout(() => {
    formErrorEl.textContent = '';
    formEl.classList.remove('form-error');
  }, 4000);
}

function toggleLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('loader--active');
};

function getData(formNode) {
  const data = new FormData(formNode);
  data.append('service_id', serviceID);
  data.append('template_id', templateID);
  data.append('user_id', pubKey);
  return data;
}

async function sendData(data) {
  return await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
    method: 'POST',
    body: data,
  })
}

async function handleFormSubmit(event) {
  event.preventDefault();

  if (hasInvalidInput()) {
    formError()
  } else {
    const data = getData(formEl)
    toggleLoader();
    const { status, error } = await sendData(data);
    toggleLoader();
    if (status === 200) {
      modalEl.showModal();
      inputListEl.forEach(input => input.value = '');
      textareaEl.value = '';
    } else {
      console.log(error.message);
    }
  }
};

// handle input, blur, focus events on inputs/textarea
startInputValidation();

// validate and send data
formEl.addEventListener('submit', handleFormSubmit);

// start emailjs service
(function () {
  emailjs.init({
    publicKey: pubKey,
    blockHeadless: true,
  });
})();
