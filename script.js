let register = document.querySelector(".signup-content");
let openModal = document.querySelector(".openmodal");
let closeModal = document.querySelector(".close");
let navActive = document.querySelectorAll(".nav");

// Docto Info
let doctorBtn = document.getElementById("doctorBtn");
let doctorReg = document.querySelector(".doctorReg");
let doctorLogIn = document.querySelector(".doctorLogIn");

// Patient Info
// 1.Register Patient
let signUpBtn = document.querySelector(".register");

let email = document.querySelector("#email");
let password = document.getElementById("password");
let userName = document.getElementById("username");
let mobile = document.getElementById("phone");
let agree = document.getElementById("terms");
// 2.Patient Log in
let patientLogIn = document.querySelector(".patientLogIn");
let submitPatLogin = document.querySelector("#submitPatLogin");
let patEmail = document.getElementById("p-email");
let patPass = document.getElementById("p-pass");
let patName = document.getElementById("p-name");
let signinBtn = document.querySelector(".login");
patEmail.value = "dassajith1@gmail.com";
patPass.value = "123";

// email.value = "example@gmail.com";
// password.value = '1111';
// confirmPassword.value = '1111';
// patName.value = 'Ajith';
// patEmail.value = 'example@gmail.com';
// patPass.value = '1111';

// doctorBtn.addEventListener("click", () => {
//   doctorReg.classList.add("openmodal");
//   doctorBtn.classList.add("active");
//   doctorLogIn.classList.add("openmodal");
// });

const openLogin = function () {
  patientLogIn.classList.add("openmodal");
};
signUpBtn.addEventListener("click", () => {
  patientLogIn.classList.add("openmodal");
  userName.focus();
});
function openSignUp() {
  register.classList.add("openmodal");
  patientLogIn.classList.remove("openmodal");
  email.value = "";
  password.value = "";
  userName.value = "";
  mobile.value = "";
  userName.focus();
}
const closeMod = function () {
  register.classList.remove("openmodal");
  doctorReg.classList.remove("openmodal");
  doctorBtn.classList.remove("active");
  doctorLogIn.classList.remove("openmodal");
  patientLogIn.classList.remove("openmodal");
};
let errorClose = document.getElementsByClassName("errClose");
function closeError() {
  error.style.opacity = "0";
  patName.focus();
}
let signupError = document.getElementById("signUpError");
let errSignUpClose = document.getElementsByClassName("errSignUpClose");
function closeSignUpErrorFun() {
  signupError.style.opacity = "0";
  userName.focus();
}
let passwordEye = document.querySelector(".passwordEye");

let patRegDataArr = [];
let patLoginDataArr = [];
//When Patient Submits info
let userId = 1;
let submitSignUp = document.querySelector("#submitsignup");
let signUpSuccess = document.getElementsByClassName(
  "signUpSuccessContainer"
)[0];
submitSignUp.addEventListener("click", (e) => {
  let patLoginForm = document.getElementById("patientLoginForm");
  let patRegForm = document.getElementById("patientRegisterForm");
  let patRegFormData = new FormData(patRegForm);

  // let patLoginFormData = new FormData(patLoginForm);

  if (
    email.value === "" ||
    password.value === "" ||
    userName.value === "" ||
    mobile.value === ""
  ) {
    // e.preventDefault();
    console.log("value is empty");
    signupError.style.opacity = "1";
  } else {
    e.preventDefault();
    if (
      e &&
      email.value !== "" &&
      password.value !== "" &&
      userName.value !== "" &&
      mobile.value !== "" &&
      agree.checked !== false
    ) {
      // register.classList.remove("openmodal");
      let patRegObj = {};
      patRegObj.userId = userId;
      for (const [key, value] of patRegFormData) {
        patRegObj[key] = value;
      }
      patRegDataArr.push(patRegObj);
      localStorage.setItem("patRegData", JSON.stringify(patRegDataArr));
      userId++;
      console.log(patRegDataArr);
      openSuccess();
    } else {
    }
  }

  // if (regData) {
  //   openSuccess();
  // }
  // signUpSuccess.style.visibility = "visible";

  function openSuccess() {
    signUpSuccess.style.visibility = "visible";
    document
      .querySelector(".signUpSuccessContainer")
      .classList.add(".signUpSuccessContainer_Active");
  }
  // openSuccess();
  // signUpSuccess.style.visibility = "hidden";

  passwordEye.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password";
    if (type) {
      passwordEye.innerHTML = "Visibility_off";
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
      passwordEye.innerHTML = "Visibility";
    }
  });
});
function loginBox() {
  patientLogIn.classList.add("openmodal");
  document.getElementsByClassName(
    "signUpSuccessContainer"
  )[0].style.visibility = "hidden";
}

let error = document.getElementById("error");

let pEye = document.querySelector(".pEye");

submitPatLogin.addEventListener("click", () => {
  regData = JSON.parse(localStorage.getItem("patRegData"));
  if (regData === null || regData === undefined) {
    error.textContent = `Invalid Email and password. Signup Again`;
    // error.appendChild('errorClose');
  }
  error.style.opacity = "1";
  // error.style.opacity = "0";

  if (regData !== null) {
    regData.filter(function (data) {
      if (data.Email == patEmail.value && data.password == patPass.value) {
        error.style.opacity = 0;
        console.log("go to");
        window.location.href = "home.html";
      } else {
        if (patEmail.value === "" || patPass.value === "") {
          error.textContent = `Incorrect Email and password.Try Again`;
          error.style.opacity = "1";
        }
      }
    });
  }
});
pEye.addEventListener("click", () => {
  const type = patPass.getAttribute("type") === "password";
  if (type) {
    console.log("Click");
    pEye.innerHTML = "Visibility_Off";
    patPass.setAttribute("type", "text");
  } else {
    patPass.setAttribute("type", "password");
    pEye.innerHTML = "Visibility";
  }
});
