const form = document.querySelector('form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const submitBtn = document.querySelector('.submit-btn');

function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.classList.add('error');
    small.innerText = message;
}

function showSucces(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.classList.remove('error');
    small.innerText = '';
}

function checkEmptyError(listInput) {
    let isEmpty = false;
    listInput.forEach(input => {
        input.value = input.value.trim();
        if (input.value === '') {
            showError(input, `${input.name} is required`);
            isEmpty = true;
        }
    })
    return isEmpty;
}

function checkEmptyInputError(input) {
    if (input.value === '') {
        showError(input, `${input.name} is required`);
        return true;
    } else {
        showSucces(input);
        return false;
    }
}

function checkEmailError(input) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(input.value.trim())) {
        showError(input, 'Email is not valid');
        return true;
    } else {
        showSucces(input);
        return false;
    }
}

function checkLengthError(input, min, max) {
    input.value = input.value.trim();

    if (input.value.length < min || input.value.length > max) {
        showError(input, `${input.name} has length at least ${min} and at most ${max}`)
        return true;
    } else {
        showSucces(input);
        return false;
    }
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value.trim() !== input2.value.trim()) {
        showError(input2, 'Passwords do not match');
        return true;
    } else {
        showSucces(input2);
        return false;
    }
}

let listInput = [username, email, password, confirmPassword];

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!checkEmptyError(listInput)) {
        checkEmailError(email);
        checkLengthError(username, 3, 15);
        checkLengthError(password, 6, 12);
        checkPasswordsMatch(password, confirmPassword)
    }
})

function checkBlurInput(listInput) {
    listInput.forEach(input => {
        input.onblur = function () {
            if (!checkEmptyInputError(this) && this.id === 'email') {
                checkEmailError(this);
            } else if (!checkEmptyInputError(this) && this.id === 'username') {
                checkLengthError(this, 3, 15)
            } else if (!checkEmptyInputError(this) && this.id === 'password') {
                checkLengthError(this, 6, 12);
            } else if (!checkEmptyInputError(this) && this.id === 'confirm-password') {
                checkPasswordsMatch(password, this);
            }
        }
    })
}
checkBlurInput(listInput);


