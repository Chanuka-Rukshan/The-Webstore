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




async function changePassword() {
    const newPassword = document.getElementById("newPassword").value;
    const conformPassword = document.getElementById("conformPassword").value;

    const change = {
        newPassword: newPassword,
        conformPassword: conformPassword
    };

    const changeJSON = JSON.stringify(change);

    const response = await fetch("ChangePassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: changeJSON
    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            if (json.message == "Please check your email for the verfication code") {
                openModal("modelConfirm");
            } else {
                alert(json.message);
            }
        } else {
            alert(json.message);
        }
    } else {
        alert("Change Password not change");
    }
}

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

    const response = await fetch("PasswordVerify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: otpJSON
    });
    
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            alert(json.message);
            window.location.reload();
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