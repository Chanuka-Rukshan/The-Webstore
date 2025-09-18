
payhere.onCompleted = function onCompleted(orderId) {
    alert("Payment completed. OrderID:" + orderId);
    window.location = "index.html";

};

// Payment window closed
payhere.onDismissed = function onDismissed() {

    alert("Payment dismissed");
};

// Error occurred
payhere.onError = function onError(error) {

    alert("Error:" + error);
};


function loadCheckoutData() {
    addressDetails();
    loadOrderPrice();
}

async function addressDetails() {
    const response = await fetch("LoadShippingAddress");
    if (response.ok) {
        const json = await response.json();
        console.log(json);
        if (json.status) {
            const addressPanel = document.getElementById("addressPanel");
            addressPanel.innerHTML = "";
            json.addressItems.forEach((address, index) => {
                // Serialize object as JSON string
                const addressData = JSON.stringify({
                    fname: address.user.fname,
                    lname: address.user.lname,
                    email: address.user.email,
                    mobile: address.user.mobile,
                    gender: address.user.gender.name,
                    country: address.country.name,
                    city: address.city.name,
                    postalCode: address.postalCode,
                    address: address.id
                });

                let addressItem = `
        <label class="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
            <input type="radio" 
                   name="shippingMethod" 
                   value="${index}" 
                   data-address='${addressData.replace(/'/g, "&apos;")}' 
                   class="mr-3" ${index === 0 ? 'checked' : ''}>
            <div>
                <p class="text-gray-500">Name : ${address.user.fname} ${address.user.lname}</p>
                <p class="text-gray-500">Email : ${address.user.email}</p>
                <p class="text-gray-500">Mobile : ${address.user.mobile}</p>
                <p class="text-gray-500">Gender : ${address.user.gender.name}</p>
                <p class="text-gray-500">Country : ${address.country.name}</p>
                <p class="text-gray-500">City : ${address.city.name}</p>
                <p class="text-gray-500">Postal Code : ${address.postalCode}</p>
                <p class="text-gray-500">Address : ${address.address}</p>
            </div>
        </label>`;
                addressPanel.innerHTML += addressItem;
            });
            //cart details

        } else {
            if (json.message === "empty-cart") {
                alert("Empty cart. Please add some product");
                window.location = "index.html";
            }
        }
    } else {

    }
}


async function loadOrderPrice() {
    const response = await fetch("setOrderPrice");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            document.getElementById("total").textContent = json.order_total;
            document.getElementById("shipping").textContent = json.order_shipping;
            document.getElementById("subTotal").textContent = json.order_subtotal;
        } else {
            console.warn("Not logged in, message:", json.message);
        }
    } else {
        alert("Failed to load order price");
    }
}

async function pay() {
    const selectedRadio = document.querySelector('input[name="shippingMethod"]:checked');
    if (selectedRadio) {
        const addressObj = JSON.parse(selectedRadio.dataset.address);
        const addressId = selectedRadio.value;
        const subTotal = document.getElementById("subTotal").textContent.replace(/,/g, "");



        const payload = {

            fname: addressObj.fname,
            lname: addressObj.lname,
            mobile: addressObj.mobile,
            city: addressObj.city,
            postalCode: addressObj.postalCode,
            address: addressObj.address,
            subTotal: subTotal
        };

        let dataJson = JSON.stringify(payload);

        const response = await fetch("CheckOutProcess", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: dataJson
        });


        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                console.log(json);
                //payhere
//                window.location = "cart.html";
                payhere.startPayment(json.payhereJson);
            } else {
                alert("Somthing went wrong.Please try again!");

            }

        } else {
            alert("Somthing went wrong.Please try again!");

        }

    } else {
        alert("Please select a shipping address.");
    }
}


