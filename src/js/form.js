const formEl = document.getElementById('form');
const inputListEl = Array.from(formEl.querySelectorAll('input'));
const textareaEl = formEl.querySelector('#message');
const buttonEl = formEl.querySelector('button');
const formErrorEl = formEl.querySelector('.form-error-message');
const modalEl = document.querySelector('.modal');

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
  console.log(errorElement);
  if (errorMessage) {
    inputElement.classList.add('input-error');
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('error-active');
  } else {
    inputElement.classList.remove('input-error');
    errorElement.textContent = '';
    // errorElement.classList.remove('error-active');
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
  setTimeout(() => {
    formErrorEl.textContent = '';
  }, 4000);
}

function serializeForm(formNode) {
  const { elements } = formNode;
  const formData = new FormData();
  Array.from(elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      const { name, value } = element;
      formData.append(name, value);
    })
  return formData;
};

function toggleLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('loader--active');
};

async function sendData(data) {
  return await fetch('/', {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data).toString(),
  })
}

async function handleFormSubmit(event) {
  event.preventDefault();

  if (hasInvalidInput()) {
    formError()
    inputListEl.forEach((inputElement) => {
      checkInputValidity(inputElement);
      toggleInputError(inputElement);
    })
    checkInputValidity(textareaEl);
    toggleInputError(textareaEl);
  } else {
    const data = serializeForm(formEl);
    toggleLoader();
    const { status, error } = await sendData(data);
    console.log(status || error);
    toggleLoader();
    if (status === 200) {
      modalEl.showModal();
      inputListEl.forEach(input => input.value = '');
      textareaEl.value = '';
    } else {
      alert(error.message);
    }
  }
};

// handle input, blur, focus events on inputs/textarea
startInputValidation();

// validate and send data
formEl.addEventListener('submit', handleFormSubmit);
