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


