const getElem = (selector) => document.querySelector(selector);

const goodIconUrl = './images/good.svg',
    badIconUrl = './images/bad.svg',
    signUpBlock = getElem('.sign-up-block'),
    signInBlock = getElem('.sign-in-block'),
    accountBlock = getElem('.account-block');

let savePlaceholderValue;

// ALL GENERAL FUNCTIONS START
const focusInput = (label, input) => {
    label.style.display = 'block';
    input.style.padding = '12px 45px 0 5px';
    savePlaceholderValue = input.getAttribute("placeholder");
    input.placeholder = '';
    input.style.fontSize = '1rem';
}

const blurInput = (label, input, placeholderValue, valid_check, errMess) => {
    if (valid_check !== undefined && errMess !== undefined) {
        label.style.display = 'none';
        input.style.padding = '2px 45px 0 5px';
        input.placeholder = placeholderValue;
        input.style.fontSize = '1.5rem';
        if (input.value === "") {
            input.style.borderColor = 'rgb(160, 160, 160)';
            valid_check.style.display = 'none';
            errMess.style.display = 'none';
        }
    }
    else {
        label.style.display = 'none';
        input.style.padding = '2px 45px 0 5px';
        input.placeholder = placeholderValue;
        input.style.fontSize = '1.5rem';
    }
}

const enterInput = (regExp, input, valid_check, errMess) => {
    if (regExp.test(input.value)) {
        input.style.borderColor = 'green';
        valid_check.style.backgroundImage = `url('${goodIconUrl}')`;
        valid_check.style.display = 'block';
        errMess.style.display = 'none';
    }
    else {
        input.style.borderColor = 'red';
        valid_check.style.backgroundImage = `url('${badIconUrl}')`;
        valid_check.style.display = 'block';
        errMess.style.display = 'block';
    }
}

const changeInput = (fName, lName, email, pass, signUpBtn) => {
    if (fNameRegExp.test(fName.value) &&
        lNameRegExp.test(lName.value) &&
        emailRegExp.test(email.value) &&
        passwordRegExp.test(pass.value)) {
        signUpBtn.disabled = false;
        signUpBtn.style.outlineWidth = '4px';
    }
    else signUpBtn.disabled = true;
}
const clearInputs = () => {
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    passInput.value = '';
    firstNameInput.style.borderColor = 'rgb(160, 160, 160)';
    lastNameInput.style.borderColor = 'rgb(160, 160, 160)';
    emailInput.style.borderColor = 'rgb(160, 160, 160)';
    passInput.style.borderColor = 'rgb(160, 160, 160)';
    firstNameValid.style.display = 'none';
    lastNameValid.style.display = 'none';
    emailValid.style.display = 'none';
    passValid.style.display = 'none';
}
// ALL GENERAL FUNCTIONS END

// SING UP SECTION START
// first name input start
let fNameRegExp = /^[A-Za-z]{1,10}$/;
const firstNameLabel = getElem('#l_fName'),
    firstNameInput = getElem('#signUpFirstName'),
    firstNameValid = getElem('#signUpValid_fName'),
    firstNameErrMess = getElem('#signUpErr_fName');

firstNameInput.onfocus = () => focusInput(firstNameLabel, firstNameInput)
firstNameInput.oninput = () => enterInput(fNameRegExp, firstNameInput, firstNameValid, firstNameErrMess)
firstNameInput.onblur = () => blurInput(firstNameLabel, firstNameInput, savePlaceholderValue, firstNameValid, firstNameErrMess)
firstNameInput.onchange = () => changeInput(firstNameLabel, lastNameInput, emailInput, passInput, signUpBtn)
// first name input end

// last name input start
let lNameRegExp = /^[A-Za-z]{1,20}$/;
const lastNameLabel = getElem('#l_lName'),
    lastNameInput = getElem('#signUpLastName'),
    lastNameValid = getElem('#signUpValid_lName'),
    lastNameErrMess = getElem('#signUpErr_lName');

lastNameInput.onfocus = () => focusInput(lastNameLabel, lastNameInput)
lastNameInput.oninput = () => enterInput(lNameRegExp, lastNameInput, lastNameValid, lastNameErrMess)
lastNameInput.onblur = () => blurInput(lastNameLabel, lastNameInput, savePlaceholderValue, lastNameValid, lastNameErrMess)
lastNameInput.onchange = () => changeInput(firstNameLabel, lastNameInput, emailInput, passInput, signUpBtn)
// last name input end

// email input start
let emailRegExp = /^[\w\-\.]+\w*@[a-z]+\.[a-z]+$/;
const emailLabel = getElem('#l_email'),
    emailInput = getElem('#signUpEmail'),
    emailValid = getElem('#signUpValid_email'),
    emailErrMess = getElem('#signInErr_email');

emailInput.onfocus = () => focusInput(emailLabel, emailInput);
emailInput.oninput = () => enterInput(emailRegExp, emailInput, emailValid, emailErrMess);
emailInput.onblur = () => blurInput(emailLabel, emailInput, savePlaceholderValue, emailValid, emailErrMess);
emailInput.onchange = () => changeInput(firstNameLabel, lastNameInput, emailInput, passInput, signUpBtn);
// email input end

// password input start
let passwordRegExp = /^\w{6,16}$/;
const passLabel = getElem('#l_password'),
    passInput = getElem('#signUpPassword'),
    passValid = getElem('#signUpValid_pass'),
    passErrMess = getElem('#signInErr_pass');

passInput.onfocus = () => focusInput(passLabel, passInput);
passInput.oninput = () => enterInput(passwordRegExp, passInput, passValid, passErrMess);
passInput.onblur = () => blurInput(passLabel, passInput, savePlaceholderValue, passValid, passErrMess);
passInput.onchange = () => changeInput(firstNameLabel, lastNameInput, emailInput, passInput, signUpBtn);
// password input end

// sing up button start
const signUpBtn = getElem('#signUpBtn');

signUpBtn.onclick = function () {
    let allUsers = [];
    let newUser = {
        fname: firstNameInput.value,
        lname: lastNameInput.value,
        email: emailInput.value,
        pass: passInput.value,
    }
    if (localStorage.length > 0 && localStorage.getItem("Users")) {
        allUsers = JSON.parse(localStorage.getItem("Users"));
        if (!allUsers.some(name => name.email === newUser.email)) {
            allUsers.push(newUser);
            localStorage.setItem('Users', JSON.stringify(allUsers))
            clearInputs();
            signUpBtn.disabled = true;
        }
        else {
            emailInput.style.borderColor = 'red';
            emailValid.style.display = 'none';
            emailErrMess.innerHTML = 'This email already exist';
            emailErrMess.style.display = 'block';
            emailInput.value = '';
            signUpBtn.disabled = true;
        }
    }
    else {
        allUsers.push(newUser);
        localStorage.setItem('Users', JSON.stringify(allUsers))
    }
}
// sing up button end

// link start
const signUpLink = getElem('#signUpLink');

signUpLink.onclick = function () {
    signUpBlock.classList.add('hide');
    clearInputs();
    signInBlock.classList.remove('hide');
}
// link end
// SING UP SECTION END

// SIGN IN SECTION START
// email input start
const snEmailLabel = getElem('#signIn_l_Email'),
    snEmailInput = getElem('#signInEmail'),
    snErrMess = getElem('#signInErr');

snEmailInput.onfocus = () => focusInput(snEmailLabel, snEmailInput);
snEmailInput.oninput = () => {
    if (snEmailInput.value !== "" && snPassInput.value !== "") { signInBtn.disabled = false; }
    snErrMess.style.display = 'none';
}
snEmailInput.onblur = () => blurInput(snEmailLabel, snEmailInput, savePlaceholderValue);
snEmailInput.onchange = () => { if (snEmailInput.value === "") { signInBtn.disabled = true; } }
// email input end

// password input start
const snPassLabel = getElem('#signIn_l_Pass'),
    snPassInput = getElem('#signInPassword');

snPassInput.onfocus = () => focusInput(snPassLabel, snPassInput)
snPassInput.oninput = () => {
    if (snEmailInput.value !== "" && snPassInput.value !== "") { signInBtn.disabled = false }
    snErrMess.style.display = 'none';
}
snPassInput.onblur = () => blurInput(snPassLabel, snPassInput, savePlaceholderValue);
snPassInput.onchange = () => { if (snPassInput.value === "") { signInBtn.disabled = true; } }
// password input end

// sign in button start
const signInBtn = getElem('#signInBtn');
signInBtn.onclick = function () {
    let allUsers = [];
    if (localStorage.length > 0 && localStorage.getItem("Users")) {
        allUsers = JSON.parse(localStorage.getItem("Users"));
        if (allUsers.some(emailKey => emailKey.email === snEmailInput.value) && allUsers.some(passKey => passKey.pass === snPassInput.value)) {
            signInBlock.classList.add('hide');
            snErrMess.style.display = "none";
            for (let i = 0; i < allUsers.length; i++) {
                if (allUsers[i].email === snEmailInput.value) {
                    getElem("#accName").innerHTML = `${allUsers[i].fname} ${allUsers[i].lname}`;
                    getElem("#accEmail").innerHTML = `${allUsers[i].email}`;
                }
            }
            snEmailInput.value = "";
            snPassInput.value = "";
            accountBlock.classList.remove('hide');
        }
        else {
            snErrMess.style.display = 'block';
            signInBtn.disabled = true;
        }
    }
    else {
        snErrMess.style.display = 'block';
        snErrMess.innerHTML = 'localStorage is empty';
    }
}
// sign in button end

// link start
const signInLink = getElem('#signInLink');

signInLink.onclick = function () {
    signInBlock.classList.add('hide');
    snEmailInput.value = "";
    snPassInput.value = "";
    snErrMess.style.display = "none";
    signUpBlock.classList.remove('hide');
}
// link end
// SIGN IN SECTION END

// ACCOUNT SECTION START
const accSignUpBtn = getElem('#signUpBtn_acc');

accSignUpBtn.onclick = function () {
    accountBlock.classList.add('hide');
    snEmailInput.value = "";
    snPassInput.value = "";
    snErrMess.style.display = "none";
    signInBlock.classList.remove('hide');
}
// ACCOUNT SECTION END
