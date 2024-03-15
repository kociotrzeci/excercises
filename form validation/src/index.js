import "./styles.scss";
const passwordLengthMin = 8;
const zipCodelength = 5;
const form = document.querySelector(".form");
const email = document.querySelector("#email");
const zip = document.querySelector("#zip");
const password = document.querySelector("#password");
const password2 = document.querySelector("#repeat-password");

validate();

function validate() {
  validateEmail();
  validateZip();
  validatePassword();
  validatePasswordMatch();
}
function validateEmail() {
  email.addEventListener("focusout", (event) => {
    if (email.validity.typeMismatch) {
      email.setCustomValidity("I am expecting an email address!");
    } else {
      email.setCustomValidity("");
    }
    email.reportValidity();
    email.addEventListener("input", (event) => {
      if (email.validity.typeMismatch) {
        email.setCustomValidity("I am expecting an email address!");
      } else {
        email.setCustomValidity("");
      }
      email.reportValidity();
    });
  });
}
function validateZip() {
  zip.addEventListener("focusout", (event) => {
    if (zip.value.length !== zipCodelength) {
      zip.setCustomValidity(
        `Zip code must be ${zipCodelength} characters long`
      );
    } else {
      zip.setCustomValidity("");
    }
    zip.reportValidity();

    zip.addEventListener("input", (event) => {
      if (zip.value.length !== zipCodelength) {
        zip.setCustomValidity(
          `Zip code must be ${zipCodelength} characters long`
        );
      } else {
        zip.setCustomValidity("");
      }
      zip.reportValidity();
    });
  });
}
function validatePassword() {
  password.addEventListener("focusout", (event) => {
    if (password.value.length <= passwordLengthMin - 1) {
      password.setCustomValidity(
        `Password must be longer than ${passwordLengthMin} characters`
      );
    } else {
      password.setCustomValidity("");
    }
    password.reportValidity();
    password.addEventListener("input", (event) => {
      if (password.value.length <= passwordLengthMin) {
        password.setCustomValidity(
          `Password must be longer than ${passwordLengthMin} characters`
        );
      } else {
        password.setCustomValidity("");
        password.reportValidity();
      }
    });
  });
}
function validatePasswordMatch() {
  password2.addEventListener("focusout", (event) => {
    if (password.value !== password2.value) {
      password2.setCustomValidity("Passwords do not match");
    } else {
      password2.setCustomValidity("");
    }
    password2.reportValidity();

    password2.addEventListener("input", (event) => {
      if (password.value !== password2.value) {
        password2.setCustomValidity("Passwords do not match");
      } else {
        password2.setCustomValidity("");
      }
      password2.reportValidity();
    });
  });
}
