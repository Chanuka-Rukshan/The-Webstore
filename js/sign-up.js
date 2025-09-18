// Open Modal
window.openModal = function (modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.classList.add('overflow-y-hidden');
};

// Close Modal
window.closeModal = function (modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.classList.remove('overflow-y-hidden');
};

// ESC Key Closes Modal
document.onkeydown = function (event) {
    event = event || window.event;
    if (event.keyCode === 27) {
        document.body.classList.remove('overflow-y-hidden');
        let modals = document.getElementsByClassName('modal');
        Array.prototype.slice.call(modals).forEach(i => {
            i.style.display = 'none';
        });
    }
};

const otpInputs = document.querySelectorAll("#otp-container input");

otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            if (index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        } else {
            e.target.value = "";
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && e.target.value === "" && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});


async function signUp() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;
    const conformPassword = document.getElementById("conformPassword").value;
    const check = document.getElementById("check").checked;


    const user = {
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        password: password,
        conformPassword: conformPassword,
        check: check
    };

    const userJson = JSON.stringify(user);

    const response = await fetch("SignUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: userJson
    });


    if (response.ok) { // success
        const json = await response.json();
        if (json.status) { // if true
            if (json.message === "Registration success. Please check your email for the verfication code") {
                openModal("modelConfirm");
            } else {
                alert(json.message);
            }

        } else {// when status false
            alert(json.message);
        }
    } else {
        alert("Registration failed. Please try again");
    }
}

