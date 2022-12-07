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
    document.querySelector(`[data-step='1']`).classList.remove("first");
  }

  document
    .querySelectorAll("card__content-wrapper")
    .forEach((el) => el.classList.remove("active"));
}

function updateStepActiveClass() {
  clearStepsActiveClass();
  cardSteps[currentStep - 1].classList.add("active");
}

function updateActiveStep() {
  clearActiveStep();

  if (currentStep === 1) {
    document.querySelector(`[data-step='1']`).classList.add("first");
  }

  document
    .querySelector(`[data-step='${currentStep}']`)
    .classList.add("active");
}

function decreaseCurrentStep() {
  if (currentStep - 1 <= 0) {
    return;
  }

  currentStep--;
}

function increaseCurrentStep() {
  if (currentStep + 1 > cardSteps.length) {
    return;
  }

  currentStep++;
}

window.addEventListener("load", () => {
  updateStepActiveClass();
  updateActiveStep();
});

goBackButton.addEventListener("click", () => {
  decreaseCurrentStep();
});

nextStep.addEventListener("click", () => {
  increaseCurrentStep();
});

confirmButton.addEventListener("click", () => {
  alert("end");
});
