//
console.log(process.env)


//  get all of the box elements by ID
const box_first = document.getElementById("first");
const box_last = document.getElementById("last");
const box_email = document.getElementById("email");
const box_phone = document.getElementById("phone");
const box_company = document.getElementById("company");
const box_zip = document.getElementById("zip");
const box_assets = document.getElementById("assets");
const box_interests = document.getElementById("interests");

//  get all of the line elements by ID
const line_first = document.getElementById("line_first");
const line_last = document.getElementById("line_last");
const line_email = document.getElementById("line_email");
const line_phone = document.getElementById("line_phone");
const line_company = document.getElementById("line_company");
const line_zip = document.getElementById("line_zip");

//  get the form by ID
const client_form = document.getElementById("client_form");

//  set the default value for Investable Assets:
let investable_assets = false;


//regex functions to check if the input is valid
//check to make sure that the name only has: letters, spaces, and hyphens
function checkName(name) {
  let regex = /^[a-zA-Z\s-]+$/;
  return regex.test(name);
}

//check to make sure that the email is valid
function checkEmail(email) {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

//check to make sure that the phone number is valid
function checkPhone(phone) {
  //let regex = a regex value that displays the phone number in (xxx) xxx-xxxx format:
  let regex = /\(?\d{3}\) \d{3}-\d{4}/;
  return regex.test(phone);
}

//check to make sure that the zip code is valid
function checkZip(zip) {
  let regex = /^\d{5}$/;
  return regex.test(zip);
}

function checkCompany(company) {
  let regex = /\b[A-Za-z0-9\s-]+\b/;
  return regex.test(company);
}

//  checks to see if all input strings are valid
function isValid() {
  if (
    checkName(box_first.value) &&
    checkName(box_last.value) &&
    checkEmail(box_email.value) &&
    ((checkPhone(box_phone.value) || (box_phone.value == "Phone Number")) &&
      checkCompany(box_company.value) &&
      checkZip(box_zip.value))) {
    return true;
  }
  return false;
}

//  changes the unnecessary variables to blank if they are unentered.
function sanitizeNull() {
  if (box_phone.value == "Phone Number") {
    box_phone.value = '';
  }
  if (box_company.value == "Company") {
    box_company.value = '';
  }
}

//  convert the investable assets dropdown to a boolean
//  assumes false if the user did not select anything
function assetBoolean() {
  if (box_assets.value == "Investable Assets" || box_assets.value == "Under 5 Million") {
    investable_assets = false;
  } else if (box_assets.value == "Over 5 Million") {
    investable_assets = true;
  }
}


//  make it so that when the user focuses on a textbox it empties the default value
//  make it so that it *DOES NOT* emty values that the user has typed in themselves

box_first.addEventListener("focus", () => {
  if (box_first.value == "First Name *") {
    box_first.value = '';
  }
});

box_last.addEventListener("focus", () => {
  if (box_last.value == "Last Name *") {
    box_last.value = '';
  }
});

box_email.addEventListener("focus", () => {
  if (box_email.value == "Email Address *") {
    box_email.value = '';
  }
});

box_company.addEventListener("focus", () => {
  if (box_company.value == "Company") {
    box_company.value = '';
  }
});

box_zip.addEventListener("focus", () => {
  if (box_zip.value == "Zip Code *") {
    box_zip.value = '';
  }
});

//  phone number uniquely must be cleared on selection every time to make the data validation work properly!
box_phone.addEventListener("focus", () => {
  box_phone.value = '';
});


//
//
//  THESE INPUT EVENT LISTENERS ARE IN PLACE TO HELP VALIDATE DATA AS USER ENTERS IT 

//  indicate when first name has been corrected
box_first.addEventListener("input", () => {
  if (checkName(box_first.value)) {
    line_first.textContent = "";
    line_first.style.backgroundColor = "#FFF8EE";
  }
});

//  indicate when last name has been corrected
box_last.addEventListener("input", () => {
  if (checkName(box_last.value)) {
    line_last.textContent = "";
    line_last.style.backgroundColor = "#FFF8EE";
  }
});

//  indicate when email has been corrected
box_email.addEventListener("input", () => {
  if (checkEmail(box_email.value)) {
    line_email.textContent = "";
    line_email.style.backgroundColor = "#FFF8EE";
  }
});

//  format the phone number as the user enters it
function phoneFormat(input) {
  input = input.replace(/\D/g, '').substring(0, 10); //Strip everything but 1st 10 digits
  var size = input.length;
  if (size > 0) { input = "(" + input }
  if (size > 3) { input = input.slice(0, 4) + ") " + input.slice(4) }
  if (size > 6) { input = input.slice(0, 9) + "-" + input.slice(9) }
  return input;
}
//  call the function to format the phone number whenever the user enters input
//  indicate when improper values have been corrected
box_phone.addEventListener("input", () => {
  box_phone.value = phoneFormat(box_phone.value);
  if (checkPhone(box_phone.value)) {
    line_phone.textContent = "";
    line_phone.style.backgroundColor = "#FFF8EE";
  }
});

//  format the zip code as the user enters it
function zipFormat(input) {
  input = input.replace(/\D/g, '').substring(0, 5); //Strip everything but 1st 5 digits
  return input;
}
//  call the function to format the zip code whenever the user enters input
//  indicate when improper values have been corrected
box_zip.addEventListener("input", () => {
  box_zip.value = zipFormat(box_zip.value);
  if (checkZip(box_zip.value)) {
    line_zip.textContent = "";
    line_zip.style.backgroundColor = "#FFF8EE";
  }
});

//  add event listeners so that when no values are given they revert back to their original labels
//  without this the ui gets confusing
//  also add failsafes in case the input given is invalid
box_first.addEventListener("blur", () => {
  if (box_first.value == '') {
    box_first.value = "First Name *";
    line_first.textContent = "* First Name is Required";
    line_first.style.backgroundColor = "#dd604f";
  }
  if (checkName(box_first.value) == false && box_first.value != "First Name *") {
    line_first.textContent = "* First Name may contain A-Z, space, and - only";
    line_first.style.backgroundColor = "#dd604f";
  }
  if (checkName(box_first.value)) {
    line_first.textContent = "";
    line_first.style.backgroundColor = "#FFF8EE";
  }
});

box_last.addEventListener("blur", () => {
  if (box_last.value == '') {
    box_last.value = "Last Name *";
    line_last.textContent = "* Last Name is Required";
    line_last.style.backgroundColor = "#dd604f";
  }
  if (checkName(box_last.value) == false && box_last.value != "Last Name *") {
    line_last.textContent = "* Last Name may contain A-Z, space, and - only";
    line_last.style.backgroundColor = "#dd604f";
  }
  if (checkName(box_last.value)) {
    line_last.textContent = "";
    line_last.style.backgroundColor = "#FFF8EE";
  }
});

box_email.addEventListener("blur", () => {
  if (box_email.value == '') {
    box_email.value = "Email Address *";
    line_email.textContent = "* Email is Required";
    line_email.style.backgroundColor = "#dd604f";
  }
  if (checkEmail(box_email.value) == false && box_email.value != "Email Address *") {
    line_email.textContent = "* Email is not valid";
    line_email.style.backgroundColor = "#dd604f";
  }
  if (checkEmail(box_email.value)) {
    line_email.textContent = "";
    line_email.style.backgroundColor = "#FFF8EE";
  }
});

box_phone.addEventListener("blur", () => {
  if (box_phone.value == '') {
    box_phone.value = "Phone Number";
  }
  if (checkPhone(box_phone.value) == false && box_phone.value != "Phone Number") {
    line_phone.textContent = "* Phone Number not valid";
    line_phone.style.backgroundColor = "#dd604f";
  }
  if (checkPhone(box_phone.value)) {
    line_phone.textContent = "";
    line_phone.style.backgroundColor = "#FFF8EE";
  }
});

box_company.addEventListener("blur", () => {
  if (box_company.value == '') {
    box_company.value = "Company";
  }
  if (checkCompany(box_company.value) == false && box_company.value != "Company") {
    line_company.textContent = "* Company may contain A-Z, 0-9, space, and - only";
    line_company.style.backgroundColor = "#dd604f";
  }
  if (checkCompany(box_company.value)) {
    line_company.textContent = "";
    line_company.style.backgroundColor = "#FFF8EE";
  }
});

box_zip.addEventListener("blur", () => {
  if (box_zip.value == '') {
    box_zip.value = "Zip Code *";
    line_zip.textContent = "* Zip Code is Required";
    line_zip.style.backgroundColor = "#dd604f";
  }
  if (checkZip(box_zip.value) == false && box_zip.value != "Zip Code *") {
    line_zip.textContent = "* Zip Code must be 5 digits";
    line_zip.style.backgroundColor = "#dd604f";
  }
});

box_assets.addEventListener("blur", () => {
  if (box_assets.value == '') {
    box_assets.value = "Investable Assets";
  }
});

box_interests.addEventListener("blur", () => {
  if (box_interests.value == '') {
    box_interests.value = "Interests";
  }
});


client_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isValid()) {
    sanitizeNull();
    assetBoolean();
    const myData = {
      first_name: box_first.value,
      last_name: box_last.value,
      email: box_email.value,
      phone: box_phone.value,
      company: box_company.value,
      zipcode: box_zip.value,
      over_five_million: investable_assets,
      interested_in: box_interests.value,
    }
    console.log(myData);
    // send a POST request to server which is defined by environment variable API_FORM_REQUEST
    // this is the endpoint that will receive the form data
    fetch(process.env.API_FORM_SDBA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        //  redirect the user to the success page
        window.location.href = "success.html";
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  else {
    e.preventDefault();
    return false;
  }
});


