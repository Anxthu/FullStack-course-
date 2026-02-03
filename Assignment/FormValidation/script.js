document.addEventListener('DOMContentLoaded', () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctCaptcha = num1 + num2;

    document.getElementById('captchaQuestion').textContent = `What is ${num1} + ${num2}?`;

    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateForm();
    });

    document.getElementById('password').addEventListener('input', checkStrength);

    function validateForm() {
        let isValid = true;

        if (!validateName()) isValid = false;
        if (!validateAddress()) isValid = false;
        if (!validatePhone()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateDOB()) isValid = false;
        if (!validateMessage()) isValid = false;
        if (!validatePassword()) isValid = false;
        if (!validateCaptcha()) isValid = false;

        const msg = document.getElementById('formMessage');
        if (isValid) {
            msg.textContent = "Form Submitted Successfully!";
            msg.style.color = "green";
        } else {
            msg.textContent = "Please fix errors.";
            msg.style.color = "red";
        }
    }

    function checkStrength() {
        const val = this.value;
        const bar = document.getElementById('strengthBar');
        const text = document.getElementById('strengthText');
        const fName = document.getElementById('firstName').value.toLowerCase();
        const lName = document.getElementById('lastName').value.toLowerCase();

        bar.className = '';
        text.textContent = '';

        if (!val) return;

        let strength = 0;
        if (val.match(/[a-z]/)) strength++;
        if (val.match(/[A-Z]/)) strength++;
        if (val.match(/\d/)) strength++;
        if (val.match(/[^a-zA-Z0-9.]/)) strength++;
        if (val.length >= 8) strength++;

        if (fName && val.toLowerCase().includes(fName) || lName && val.toLowerCase().includes(lName)) {
            bar.className = 'weak';
            text.textContent = 'Weak (Contains Name)';
            return;
        }

        if (strength >= 5) {
            bar.className = 'strong';
            text.textContent = 'Strong';
        } else if (strength >= 3 && val.length >= 6) {
            bar.className = 'medium';
            text.textContent = 'Medium';
        } else {
            bar.className = 'weak';
            text.textContent = 'Weak';
        }
    }

    function validateName() {
        const f = document.getElementById('firstName').value;
        const l = document.getElementById('lastName').value;
        const err = document.getElementById('nameError');
        if (!f || !l) {
            err.textContent = "First and Last Name required";
            return false;
        }
        err.textContent = "";
        return true;
    }

    function validateAddress() {
        const a = document.getElementById('addressLine').value;
        const c = document.getElementById('city').value;
        const s = document.getElementById('state').value;
        const z = document.getElementById('zipCode').value;
        const err = document.getElementById('addressError');
        if (!a || !c || !s || !z) {
            err.textContent = "All address fields required";
            return false;
        }
        err.textContent = "";
        return true;
    }

    function validatePhone() {
        const p = document.getElementById('phone').value;
        const err = document.getElementById('phoneError');
        const regex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
        if (!p.match(regex)) {
            err.textContent = "Invalid Indian Number";
            return false;
        }
        err.textContent = "";
        return true;
    }

    function validateEmail() {
        const e = document.getElementById('email').value;
        const err = document.getElementById('emailError');
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!e.match(regex)) {
            err.textContent = "Invalid Email";
            return false;
        }
        err.textContent = "";
        return true;
    }

    function validateDOB() {
        const d = document.getElementById('dob').value;
        const err = document.getElementById('dobError');
        if (!d) {
            err.textContent = "Date required";
            return false;
        }
        if (new Date(d) > new Date()) {
            err.textContent = "Date cannot be in future";
            return false;
        }
        err.textContent = "";
        return true;
    }

    function validateMessage() {
        const m = document.getElementById('message').value;
        const err = document.getElementById('messageError');
        if (!m) {
            err.textContent = "Message required";
            return false;
        }
        err.textContent = "";
        return true;
    }

    function validatePassword() {
        const p = document.getElementById('password').value;
        const err = document.getElementById('passwordError');
        const bar = document.getElementById('strengthBar');

        if (!p) {
            err.textContent = "Password required";
            return false;
        }
        if (bar.className === 'weak' || bar.className === '') {
            err.textContent = "Password too weak";
            return false;
        }
        err.textContent = "";
        return true;
    }

    function validateCaptcha() {
        const ans = document.getElementById('captchaAnswer').value;
        const err = document.getElementById('captchaError');
        if (parseInt(ans) !== correctCaptcha) {
            err.textContent = "Incorrect Math Answer";
            return false;
        }
        err.textContent = "";
        return true;
    }
});
