const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const nationality = document.getElementById('nationality');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const genderMale = document.getElementById('genderMale');
const genderFemale = document.getElementById('genderFemale');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const warning = document.querySelector('.warning')

const uncorrect = 'Password must contain at least 8 characters, uppercase and lowercase letters, and numbers';
const wrongEmail = 'wrong e-mail address';
const wrongFirstName = 'enter a first name';
const mismatch = 'passwords do not match';
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegEx = /^\w+@\w+\.\w+$/;


function removeError(input) {
	input.parentElement.classList.remove('error')
}

function addError(input) {
	input.parentElement.classList.add('error')
}

function testEmail(input) {
	return !emailRegEx.test(input.value);
}

function testPassword(input) {
	return !passwordRegEx.test(input.value);
}

function compare(array) {
	let r = (array[0] === array[1]);
	return !r;
}



function validationForm(form) {
	let isValid = true;
	let passwords = [];
	let passwordElements = [];
	const allInputs = form.querySelectorAll('input')
	for (let i = 0; i < allInputs.length; i++) {
		let input = allInputs[i];
		removeError(input);
		if (input.id === 'firstName') {
			if (input.value.trim() === '') {
				addError(input)
				isValid = false;
			} else {
				removeError(input)
				isValid = true;
			}
		}
		if (input.id === 'lastName') {
			if (input.value.trim() === '') {
				addError(input)
				isValid = false;
			} else {
				removeError(input)
				isValid = true;
			}
		}
		if (input.id === 'nationality') {
			if (input.value.trim() === '') {
				addError(input)
				isValid = false;
			} else {
				removeError(input)
				isValid = true;
			}
		}
		if (input.id === 'email') {
			if (testEmail(input)) {
				addError(input);
				isValid = false;
			} else {
				removeError(input)
				isValid = true;
			}
		}else if (input.id === 'password' || input.id === 'confirmPassword') {
			passwordElements.push(input);
			passwords.push(input.value);
			if(testPassword(input)){
				addError(input);
				isValid = false;
			}else{
				removeError(input)
				if(passwords.length === 2){
					if(compare(passwords)){
						passwordElements.forEach(input => {
							removeError(input);
							isValid = false;
						});
					}
				}
			}
		}
	}
	return isValid
}

form.addEventListener("submit", function (event) {
	event.preventDefault();
	if (validationForm(this) === true) {
	console.log('ok')
	}
})


