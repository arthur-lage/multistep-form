const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const cardSteps = document.querySelectorAll(".card__step");
const goBackButton = document.querySelector(".go__back");
const nextStep = document.querySelector(".next__step");
const confirmButton = document.querySelector(".confirm");

let currentStep = 1;

const formState = {
  name: "",
  email: "",
  phone: "",
  plan: "",
  addons: [],
};

function clearStepsActiveClass() {
  cardSteps.forEach((card) => {
    card.classList.remove("active");
  });
}

function clearActiveStep() {
  if (currentStep != 1) {
    document.querySelector(`.card__content`).classList.remove("first");
  }

  document.querySelectorAll(".card__content-wrapper").forEach((el) => {
    el.classList.remove("active");
  });
}

function updateStepActiveClass() {
  clearStepsActiveClass();

  cardSteps[currentStep - 1].classList.add("active");
}

function updateActiveStep() {
  clearActiveStep();

  if (currentStep === 1) {
    document.querySelector(`.card__content`).classList.add("first");
  }

  document
    .querySelector(`[data-step='${currentStep}']`)
    .classList.add("active");
}

function decreaseCurrentStep() {
  if (currentStep - 1 <= 0) {
    return;
  }

  if (currentStep - 1 == 1) {
    document.querySelector(`.card__content`).classList.add("first");
  }

  currentStep--;
}

function increaseCurrentStep() {
  if (currentStep + 1 > cardSteps.length) {
    return;
  }

  currentStep++;
}

function createFormInputEventListeners() {
  document
    .querySelector("#name")
    .addEventListener("input", (e) => (formState.name = e));
  document
    .querySelector("#email")
    .addEventListener("input", (e) => (formState.email = e));
  document
    .querySelector("#phone")
    .addEventListener("input", (e) => (formState.phone = e));
}

window.addEventListener("load", () => {
  createFormInputEventListeners();
  updateStepActiveClass();
  updateActiveStep();
});

goBackButton.addEventListener("click", () => {
  decreaseCurrentStep();
  updateActiveStep();
  updateStepActiveClass();
});

function clearInputErrors() {
  document.querySelector("#name").classList.remove("error");
  document.querySelector("#email").classList.remove("error");
  document.querySelector("#phone").classList.remove("error");
}

function showErrors(errors) {
  const errorsTextEl = document.querySelectorAll(".input__error");

  errors.forEach((error) => {
    const errorEl = document.querySelector(`#${error.id}`);
    errorEl.classList.add("error");
  });

  for (let i = 0; i < errors.length; i++) {
    errorsTextEl[i].innerHTML = errors[i].error;
  }
}

nextStep.addEventListener("click", () => {
  if (currentStep == 1) {
    clearInputErrors();

    let errors = [];

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");

    if (nameInput.value.trim().length == 0) {
      document.querySelector("#name").classList.add("error");
      errors.push({ id: "name", error: "This field is required." });
    }

    if (emailInput.value.trim().length == 0) {
      document.querySelector("#email").classList.add("error");
      errors.push({ id: "email", error: "This field is required." });
    } else if (!validateEmail(emailInput.value)) {
      document.querySelector("#email").classList.add("error");
      errors.push({ id: "email", error: "Invalid email." });
    }

    if (phoneInput.value.trim().length == 0) {
      document.querySelector("#phone").classList.add("error");
      errors.push({ id: "phone", error: "This field is required." });
    }

    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    formState.name = nameInput.value;
    formState.email = emailInput.value;
    formState.phone = phoneInput.value;
  }

  increaseCurrentStep();
  updateActiveStep();
  updateStepActiveClass();
});

confirmButton.addEventListener("click", () => {
  const stepsArray = document.querySelectorAll(".card__content-wrapper")
  
  if(currentStep == stepsArray.length) {
    alert("auauau")
  }
});
