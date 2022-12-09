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

let currentStep = 2;

const formState = {
  name: "",
  email: "",
  phone: "",
  plan: "",
  period: "",
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

function clearSelectedPlans() {
  document.querySelectorAll(".card__plan").forEach((plan) => {
    plan.classList.remove("selected");
  });
}

function changePriceOfPlans(period) {
  if (period == "monthly") {
    document
      .querySelectorAll(".card__plan")
      .forEach((plan) => plan.classList.remove("yearly"));

    document.querySelector(
      ".card__plan[data-plan='arcade'] .card__plan-price"
    ).innerHTML = "$9/mo";
    document.querySelector(
      ".card__plan[data-plan='advanced'] .card__plan-price"
    ).innerHTML = "$12/mo";
    document.querySelector(
      ".card__plan[data-plan='pro'] .card__plan-price"
    ).innerHTML = "$15/mo";
  } else {
    document
      .querySelectorAll(".card__plan")
      .forEach((plan) => plan.classList.add("yearly"));

    document.querySelector(
      ".card__plan[data-plan='arcade'] .card__plan-price"
    ).innerHTML = "$90/yr";
    document.querySelector(
      ".card__plan[data-plan='advanced'] .card__plan-price"
    ).innerHTML = "$120/yr";
    document.querySelector(
      ".card__plan[data-plan='pro'] .card__plan-price"
    ).innerHTML = "$150/yr";
  }
}

function createPlanEventListeners() {
  document.querySelectorAll(".card__plan").forEach((plan) => {
    plan.addEventListener("click", (currentPlan) => {
      clearSelectedPlans();

      currentPlan.target.classList.add("selected");

      formState.plan = currentPlan.target.dataset["plan"];
    });
  });

  const planToggler = document.querySelector(".monthly__toggler-wrapper");

  planToggler.classList.add("monthly");
  formState.period = "monthly";

  planToggler.addEventListener("click", () => {
    if (planToggler.classList.contains("monthly")) {
      planToggler.classList.replace("monthly", "yearly");
      formState.period = "yearly";
    } else {
      planToggler.classList.replace("yearly", "monthly");
      formState.period = "monthly";
    }

    changePriceOfPlans(formState.period);
  });
}

window.addEventListener("load", () => {
  createFormInputEventListeners();
  createPlanEventListeners();
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

const availablePlans = ["arcade", "advanced", "pro"];

nextStep.addEventListener("click", () => {
  if (currentStep == 1) {
    let hasErrors = false;

    clearInputErrors();

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");

    if (nameInput.value.trim().length == 0) {
      hasErrors = true;
      document.querySelector("#name").classList.add("error");
      document.querySelector(
        ".input__field:has(.input__box.error):has(#name) .input__error"
      ).innerHTML = "This field is required.";
    }

    if (emailInput.value.trim().length == 0) {
      hasErrors = true;
      document.querySelector("#email").classList.add("error");
      document.querySelector(
        ".input__field:has(.input__box.error):has(#email) .input__error"
      ).innerHTML = "This field is required.";
    } else if (!validateEmail(emailInput.value)) {
      hasErrors = true;
      document.querySelector("#email").classList.add("error");
      document.querySelector(
        ".input__field:has(.input__box.error):has(#email) .input__error"
      ).innerHTML = "Invalid email format.";
    }

    if (phoneInput.value.trim().length == 0) {
      hasErrors = true;
      document.querySelector("#phone").classList.add("error");
      document.querySelector(
        ".input__field:has(.input__box.error):has(#phone) .input__error"
      ).innerHTML = "This field is required.";
    }

    if (hasErrors) {
      return;
    }

    formState.name = nameInput.value;
    formState.email = emailInput.value;
    formState.phone = phoneInput.value;
  }

  if (currentStep == 2) {
    let hasPlan = false;

    for (let plan of availablePlans) {
      if (formState.plan == plan) {
        hasPlan = true;
      }
    }

    if (!hasPlan) {
      return;
    }
  }

  increaseCurrentStep();
  updateActiveStep();
  updateStepActiveClass();
});

confirmButton.addEventListener("click", () => {
  const stepsArray = document.querySelectorAll(".card__content-wrapper");

  if (currentStep == stepsArray.length) {
    alert("auauau");
  }
});
