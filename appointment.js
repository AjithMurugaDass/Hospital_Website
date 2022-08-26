let submitBtn = document.querySelector("#submit");
let accUsername = document.getElementById("accUserid");
let accUseremail = document.getElementById("accUseremail");
let accVisible = document.getElementsByClassName("accDet")[0];
let appointmentContainer = document.getElementsByClassName("appointment-container")[0];

// Form Data classes
let formFirstName = document.getElementById("fname");
let formEmail = document.getElementById("mail");
let formMobile = document.getElementById("phone");


// Form Submitting Classes
let historyBox = document.getElementsByClassName("history_box1")[0];

// Card Details Shown Classes
let detailsCard = document.getElementsByClassName("detailsCard")[0];


let appointmentDateTime;
  const currentDate = new Date();
  let day = currentDate.getDate()+1;
  let month = currentDate.getMonth()+1;
let year = currentDate.getUTCFullYear();
if (day < 10) {
  day = '0' + day;
}
if (month < 10) {
  month = '0' + month;
}
let tomorrow = year + "-" + month +"-"+ day; 

  document.getElementById("appointmentTime").min=`${tomorrow}T10:30`;






// getting user data
function getReguserdata() {
let regUserData = JSON.parse(localStorage.getItem("patRegData"));

  let dataArr = [];
  for (const data of regUserData) {
    accUsername.textContent = data.userName;
    accUseremail.textContent = data.Email;
    dataArr.push(data);
  }

  formFirstName.value = dataArr[0].userName;
  formEmail.value = dataArr[0].Email;
  formMobile.value = dataArr[0].mobile;
}


function openForm() {
  document
    .getElementsByClassName("container_2")[0]
    .classList.add("container_2_active");
  // appointmentContainer.classList.remove("appointment-container-active");
  document.querySelector(".historycontainer").style.visibility = "hidden";
  getReguserdata();
}

function closeForm() {
  document.querySelector(".container_2").classList.remove("container_2_active");

}


function logo() {
  accVisible.classList.toggle("accDetVisi");
  getReguserdata();
}
// document.querySelector(".accDet").blur();



// Form Submission
let newAppoinmentFormArr = [];
let userId = 1;

const doSubmit = function (e) {
  // e.preventDefault();
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  let myformObj = { userid: userId++ };
  for (const [key, value] of formdata) {
    myformObj[key] = value;
  }
  myformObj.bookingId = 1;
  myformObj.status = "Booked";
  let dateofSubmit = new Date();
  myformObj.submittedTime = dateofSubmit.toLocaleString();
  newAppoinmentFormArr.push(myformObj);
  // Storing formdata into localStorage with name of patientData
  localStorage.setItem("patientData", JSON.stringify(newAppoinmentFormArr));
  console.log("AppointMentArr" + newAppoinmentFormArr);
  getPatientData(e);
  closeForm(); //Closing the Form
    // window.location.href = "appointment.html";
  if (
    window.location.pathname !==
    "/home/ajith/Desktop/newWebsite/appointment.html"
  ) {
    window.location.href = "appointment.html";
    console.log("HI");
  }


  document.querySelector(".historycontainer").style.visibility = "visible";
  // document.form.reset();
};

// if (patientData) {
//   document.querySelector(".historycontainer").style.visibility = "visible";
//   appointmentContainer.classList.remove("appointment-container-active");
// } else if (patientData===null) {
//   document.querySelector(".historycontainer").style.visibility = "hidden";
//   appointmentContainer.classList.add("appointment-container-active");
// }

getPatientData();
var patientFormData;
function getPatientData(filterData) {
  if (filterData) {
    patientFormData = filterData;
  } else {
    // Get local storage
    patientFormData = JSON.parse(localStorage.getItem("patientData"));
    window.patientFormData = patientFormData;
  }
console.log(patientFormData);
  if (patientFormData) {
    console.log(patientFormData === true);
    // document
    //   .getElementsByClassName("historycontainer")[0]
    //   .classList.add("historyBoxActive");
    // appointmentContainer.classList.add("appointment-container-active");
    // historyBox.innerHTML = " ";
    // console.log(document.getElementsByClassName("historycontainer"));
    let historyContainer = document.querySelector(".historycontainer");
    if (historyContainer) {
      historyContainer.classList.add("historyBoxActive");
    }
    if (historyBox) {
      historyBox.innerHTML = " ";
    

      for (let [i, data] of patientFormData.entries()) {
        let appointmentDate = data.appointment_time.split("T")[0];
        let appointmentTime = data.appointment_time.split("T")[1];

        historyBox.innerHTML += `<div class="history"  >
          <div onclick="showDetails(${i})">
            <p id="dname" >Doctor<span>${data.doctor}</span></p>
          </div>
          <div onclick="showDetails(${i})">
          <p class="date"><i class="large material-icons today">today</i><span>${appointmentDate}</span></p>
          </div>
          <div onclick="showDetails(${i})">
            <p class="appointmentTime"><i class="large material-icons time">access_time</i><span>${
              appointmentTime === undefined ? "10:00" : appointmentTime
            }</span></p>
          </div>
          <div onclick="showDetails(${i})" >
            <p class="label_symptom">Symptom's<span>${data.symptom}</span></p>
          </div>
          <div onclick="showDetails(${i})">
            <p class="p-name">Name <span>${
              data.firstName + " " + data.lastName
            }</span></p>
          </div>
          <div onclick = "showDetails(${i})">
            <p class="p-name">Blood<span>${
              data.blood_group
            }</span></p>
          </div>
          <span class="close" onclick="cancelCard(${i})">&times;</span>
            <span class="${data.status}" onclick="showDetails(${i})">${
          data.status
        }</span>
        </div>`;
      }
    }
  } else if (patientFormData === null) {
    let historycontainer = document.querySelector(".historycontainer");
    if (historycontainer) {
      historycontainer.style.visibility = "hidden";
    appointmentContainer.classList.add("appointment-container-active");

    }
    
    // document
    //   .querySelector(".container_2")
    //   .classList.add("container_2_active");
  }
  // form.reset();
}
function openAppointment() {
  if (patientFormData) {
    document.querySelector(".historycontainer").style.visibility = "visible";
  } else if (patientFormData === null) {
    document.querySelector(".historycontainer").style.visibility = "hidden";
    appointmentContainer.classList.add("appointment-container-active");
    closeForm();
  }
}
// document.querySelector(".detailsCardContainer").style.visibility = "hidden";

function showDetails(i) {
  document.querySelector(".detailsCardContainer").style.visibility = "visible";
  console.log(patientFormData[i]);
  console.log(patientFormData[i].doctor);

  detailsCard.innerHTML = `<ul><li>Doctor name <span>${
    patientFormData[i].doctor
  }</span></li>
                  <li>Patient name<span>${
                    patientFormData[i].firstName
                  }</span></li>
                  <li>Symptom<span>${patientFormData[i].symptom}</span></li>
                  <li>Appointment Date<span>${
                    patientFormData[i].appointment_time.split("T")[0]
                  }</span></li>
                  <li>Appointment Time<span>${
                    patientFormData[i].appointment_time.split("T")[1]
                  }</span></li>
                  <li>Email<span>${patientFormData[i].mail}</span></li>
                  <li>Mobile<span>${patientFormData[i].phone}</span></li></ul>
          <span class="closeDetCard" onclick="closeDetCard()">
            &times;
          </span>;

        `;
  console.log(detailsCard);
}
function closeDetCard() {
  document.querySelector(".detailsCardContainer").style.visibility = "hidden";
}

function cancelCard(i) {
  if (window.confirm("Do you want to cancel?")) {
    let temp = JSON.parse(localStorage.getItem("patientData"));
    temp[i].status = "Cancelled";
    localStorage.setItem("patientData", JSON.stringify(temp));
    getPatientData();
  }
}

function cancelTag() {
  let tagActive = document.getElementsByClassName("tagActive")[0];
  let cancel = document.getElementsByClassName("cancel")[0];
  cancel.classList.toggle("tagActive");
}


function doSort(condition) {
  let tempSort = JSON.parse(localStorage.getItem("patientData"));
  if (condition == "all") {
    document.getElementsByClassName("all")[0].classList.add("tagActive");
    document.getElementsByClassName("cancel")[0].classList.remove("tagActive");
    document.getElementsByClassName("booked")[0].classList.remove("tagActive");
    document.querySelector(".emptyCancel").style.visibility = "hidden";
    document.querySelector(".bookedEmpty").style.visibility = "hidden";
    
    getPatientData();
  } else if (condition == "cancel") {
    document.getElementsByClassName("cancel")[0].classList.add("tagActive");
    document.getElementsByClassName("all")[0].classList.remove("tagActive");
    document.getElementsByClassName("booked")[0].classList.remove("tagActive");

    let sortedCancel = tempSort.filter((data) => {
      return data.status === "Cancelled";
    });
    getPatientData(sortedCancel);
    if (sortedCancel.length == 0) {
      document.querySelector(".emptyCancel").style.visibility = "visible";
    }
    document.querySelector(".bookedEmpty").style.visibility = "hidden";

  } else if (condition == "booked") {
    document.getElementsByClassName("booked")[0].classList.add("tagActive");
    document.getElementsByClassName("cancel")[0].classList.remove("tagActive");
    document.getElementsByClassName("all")[0].classList.remove("tagActive");
    let sortedBooked = tempSort.filter((data) => {
      return data.status === "Booked";
    });
    document.querySelector(".emptyCancel").style.visibility = "hidden";
    document.querySelector(".bookedEmpty").style.visibility = "hidden";
    
      if (sortedBooked.length == 0) {
        document.querySelector(".bookedEmpty").style.visibility = "visible";
      }
    getPatientData(sortedBooked);
  }
}

// Home js

function openView() {
  document
    .getElementsByClassName("more_container")[0]
    .classList.toggle("more_container-active");
}
function close_viewmore() {
  document
    .getElementsByClassName("more_container")[0]
    .classList.toggle("more_container-active");
}
// document.querySelector('main').addEventListener('click', function(){


// })

// function doBlur() {
//   document.querySelector(".accDet").style.visibility = ' hidden';
//   document.getElementsByClassName("more_container")[0].style.visibility = 'hidden'
// }