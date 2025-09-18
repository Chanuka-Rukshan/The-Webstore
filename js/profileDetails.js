function loadData() {
    loadGender();
    getUserData();
    loadCountry();
}

async function getUserData() {
    const response = await fetch("MyProfileDetails");
    if (response.ok) {
        const json = await response.json();

        // Populate text fields
        document.getElementById("fname").value = json.fname;
        document.getElementById("lname").value = json.lname;
        document.getElementById("email").value = json.email;
        document.getElementById("mobile").value = json.mobile;

        // Get gender dropdown
        const genderSelect = document.getElementById("genderSelect");


        genderSelect.value = json.selectedGenderId;


    } else {
        console.error("Failed to fetch user data");
    }
}

async function loadGender() {
    const response = await fetch("loadGender");
    if (response.ok) {
        const json = await response.json();
        const citySelect = document.getElementById("genderSelect");
        json.forEach(city => {
            let option = document.createElement("option");
            option.innerHTML = city.name;
            option.value = city.id;
            citySelect.appendChild(option);
        });

    }
}

async  function updateDetails() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const gender = document.getElementById("genderSelect").value;

    const userDataObject = {
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        gender: gender
    };

    const userDataJson = JSON.stringify(userDataObject);

    const response = await fetch("MyProfileDetails", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: userDataJson
    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            getUserData();
            window.location.reload();
        } else {
            alert(json.message);
        }
    } else {
        alert("Profile details update failed!");
    }
}

let cityList;

async function loadCountry() {
    const response = await fetch("LoadCountry");
    if (response.ok) {
        const json = await response.json();
        loadSelect("selectCountry", json.countryList, "name");
        cityList = json.cityList;
    }
}


function loadSelect(selectId, items, property) {
    const select = document.getElementById(selectId);
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.innerHTML = item[property];
        select.appendChild(option);
    });
}

function loadCity() {
    const countryId = document.getElementById("selectCountry").value;
    const selectCity = document.getElementById("selectCity");

    selectCity.length = 1;
    cityList.forEach(item => {
        if (item.country.id === parseInt(countryId)) {
            const option = document.createElement("option");
            option.value = item.id;
            option.innerHTML = item.name;
            selectCity.appendChild(option);
        }
    });
}

async function saveAddress() {
    const address = document.getElementById("address").value;
    const postalCode = document.getElementById("postalCode").value;
    const country = document.getElementById("selectCountry").value;
    const city = document.getElementById("selectCity").value;

    const addAddress = {
        address: address,
        postalCode: postalCode,
        country: country,
        city: city
    };

    const addressJson = JSON.stringify(addAddress);

    const response = await fetch("MyAddress", {
        method: "POST",
        headers: {
            "Content-Type": "applicationjson"
        },
        body: addressJson
    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            alert(json.message);
            window.location.reload();
        } else {
            alert(json.message);
        }
    } else {
        alert(json.message);
    }
}


async function loadShippingAddress() {
    const response = await fetch("LoadShippingAddress");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            const addressPanel = document.getElementById("addressPanel");
            addressPanel.innerHTML = "Add your Shiping Address";

            console.log(json);

            json.addressItems.forEach(address => {
                let addressItem = ` <div class="space-y-2 mt-5">

                                <div class="flex items-end justify-end">
                                    <img src="resources/icons8-delete-23.png" class="cursor-pointer" onclick="deleteAddress(${address.id});">
                                </div>

                                <p class="text-gray-500">Name : <span>${address.user.fname} ${address.user.lname}</span></p>
                                <p class="text-gray-500">Email : <span>${address.user.email}</span></p>
                                <p class="text-gray-500">Mobile : <span>${address.user.mobile}</span></p>
                                <p class="text-gray-500">Gender : <span>${address.user.gender.name}</span></p>
                                <p class="text-gray-500">Country : <span>${address.country.name}</span></p>
                                <p class="text-gray-500">City : <span>${address.city.name}</span></p>
                                <p class="text-gray-500">Postal Code : <span>${address.postalCode}</span></p>
                                <p class="text-gray-500">Address : <span>${address.address}</span></p>
                            </div>
                            <hr class="my-6 border-t border-gray-300">`;
                addressPanel.innerHTML += addressItem;
            });
        }
    }
}

async function deleteAddress(id) {
    const addressId = id;

    const addressData = {
        addressId: addressId
    };

    const addressDataJson = JSON.stringify(addressData);

    const response = await fetch("DeleteAddress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: addressDataJson
    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            alert(json.message);
            window.location.reload();
        } else {
            alert(json.message);
        }
    } else {
        alert("Address Delete Unsuccessfull. Please Try again!");
    }
}