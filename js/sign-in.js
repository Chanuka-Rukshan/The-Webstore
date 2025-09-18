function togglePassword() {
    const input = document.getElementById("passwordInput");
    const icon = document.getElementById("eyeIcon");

    if (input.type === "password") {
        input.type = "text";
        icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.944-9.544-7a9.965 9.965 0 012.172-3.284M15 12a3 3 0 00-3-3M3 3l18 18" />
            `;
    } else {
        input.type = "password";
        icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            `;
    }
}

function togglePassword_2() {
    const input = document.getElementById("passwordInput_2");
    const icon = document.getElementById("eyeIcon_2");

    if (input.type === "password") {
        input.type = "text";
        icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.944-9.544-7a9.965 9.965 0 012.172-3.284M15 12a3 3 0 00-3-3M3 3l18 18" />
            `;
    } else {
        input.type = "password";
        icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            `;
    }
}
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



async function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("passwordInput_2").value;

    const signInObject = {
        email: email,
        password: password
    };

    const signInJSON = JSON.stringify(signInObject);

    const response = await fetch("SignIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: signInJSON
    });


    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            if (json.message === "1") {// ===
                openModal("modelConfirm");
            } else {
                window.location = "index.html";
            }
        } else {
            alert(json.message);
        }
    } else {
        alert("Sign In Failed! Please try again");
    }

}

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

async function verifyOtp() {
    const otp_1 = document.getElementById("otp_1").value;
    const otp_2 = document.getElementById("otp_2").value;
    const otp_3 = document.getElementById("otp_3").value;
    const otp_4 = document.getElementById("otp_4").value;
    const otp_5 = document.getElementById("otp_5").value;
    const otp_6 = document.getElementById("otp_6").value;

    const fullOtp = otp_1 + otp_2 + otp_3 + otp_4 + otp_5 + otp_6;


    const otp = {
        fullOtp: fullOtp
    };

    const otpJSON = JSON.stringify(otp);

    const response = await fetch("UserVerification", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: otpJSON
    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            window.location = "index.html";
        } else {
            if (json.message === "1") { // Email not found
                window.location = "sign-in.html";
            } else {
                alert(json.message);
            }
        }
    } else {
        alert("Verification failed! Please try again");
    }

}