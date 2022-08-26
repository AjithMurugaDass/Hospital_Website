
let accLogo = document.getElementById("small-logo");
// let moreContainer = document.querySelector(".more_container");
let navs = document.querySelectorAll('.nav');
// let accUserid = document.getElementById("accUserid");
// let accUseremail = document.getElementById("accUseremail");
// let accVisible = document.querySelector(".accDet");

function getReguserdata() {
  let regUserData = JSON.parse(localStorage.getItem("patRegData"));
  for (const data of regUserData) {
    accUserid.textContent = data.userId;
    accUseremail.textContent = data.Email;
  }
}





// open Account
// function logo() {
//   accVisible.classList.toggle('accDetVisi');
//   getReguserdata();
// }
document.querySelector('.container').addEventListener('click', () => {
  accVisible.classList.remove("accDetVisi");
})
  // accVisible.classList.add("accDetVisi");

// Open View More
// const openView = function () {
//   moreContainer.classList.toggle("more_container-active");
// }

// Close view MOre
// function close_viewmore() {
//   moreContainer.classList.toggle("more_container-active");
// }
document.querySelector(".home").addEventListener('click', () => {
  //  document
  //    .querySelector(".container_2")
  //    .classList.remove("container_2_active");
   document.querySelector(".historycontainer").style.visibility = "hidden";

})
/////////////////////////////////////////////////////////////////////////
// OPen Form 
const openFormContainer = function () {
   document
    .querySelector(".container_2")
    .classList.toggle("container_2_active");
  document.querySelector(".historycontainer").style.visibility = "hidden";

};

function closeForm() {
  document
    .querySelector(".container_2")
    .classList.remove("container_2_active");

}
// /////////////////////////////////////////////////////////////////////////////


// Form Submit

let historyBox = document.getElementsByClassName("history_box1")[0];
let newAppoinmentFormArr = [];

const doSubmit = function (e) {
  // e.preventDefault();
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  let myformObj = {};
  for (const [key, value] of formdata) {
    myformObj[key] = value;
  }
  myformObj.status = "Booked";
  let dateofSubmit = new Date();
  console.log(dateofSubmit.toLocaleString());
  myformObj.submittedTime = dateofSubmit.toLocaleString();
  newAppoinmentFormArr.push(myformObj);
  localStorage.setItem("patientData", JSON.stringify(newAppoinmentFormArr));
  console.log("AppointMentArr" + newAppoinmentFormArr);
  // getPatientData(e);
  closeForm(); //Closing the Form
  document.querySelector(".historycontainer").style.visibility = "visible";
  window.location.href = 'appointment.html';
  let successMsg = document.querySelector(".successMsg");
  successMsg.style.opacity = "1";
  document.form.reset();
};