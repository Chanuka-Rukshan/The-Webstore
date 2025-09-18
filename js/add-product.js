document.getElementById("filterButton").addEventListener("click", () => {
    document.getElementById("filterDropdown").classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("filterDropdown");
    const button = document.getElementById("filterButton");
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
});
document.getElementById("filterButton_2").addEventListener("click", () => {
    document.getElementById("filterDropdown_2").classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("filterDropdown_2");
    const button = document.getElementById("filterButton_2");
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
});
document.getElementById("filterButton_3").addEventListener("click", () => {
    document.getElementById("filterDropdown_3").classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("filterDropdown_3");
    const button = document.getElementById("filterButton_3");
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
});
document.getElementById("filterButton_4").addEventListener("click", () => {
    document.getElementById("filterDropdown_4").classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("filterDropdown_4");
    const button = document.getElementById("filterButton_4");
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
});
fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-call").innerHTML = data;
        });
// Load header
fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            // After loading header, manually call JS logic
            initHeaderScripts(); // Custom function we'll define
        });
// Define all your header.js logic here
function initHeaderScripts() {
    // Profile dropdown toggle helper
    function setupDropdown(buttonId, menuId) {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        if (button && menu) {
            button.addEventListener("click", function (e) {
                e.stopPropagation();
                const isExpanded = this.getAttribute("aria-expanded") === "true";
                this.setAttribute("aria-expanded", !isExpanded);
                menu.classList.toggle("hidden");
            });
            document.addEventListener("click", function (e) {
                if (!menu.contains(e.target) && !button.contains(e.target)) {
                    menu.classList.add("hidden");
                    button.setAttribute("aria-expanded", "false");
                }
            });
        }
    }

    setupDropdown("user-menu-button", "user-menu");
    setupDropdown("user-menu-button-md", "user-menu-md");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const openSidebarButtonMobile = document.getElementById("open-sidebar");
    const openSidebarButtonMd = document.getElementById("open-sidebar-md");
    function openSidebar() {
        sidebar.classList.remove("-translate-x-full");
        overlay.classList.remove("hidden");
    }

    function closeSidebar() {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
    }

    openSidebarButtonMobile?.addEventListener("click", (e) => {
        e.stopPropagation();
        openSidebar();
    });
    openSidebarButtonMd?.addEventListener("click", (e) => {
        e.stopPropagation();
        openSidebar();
    });
    overlay.addEventListener("click", () => {
        closeSidebar();
    });
    document.addEventListener("click", (e) => {
        if (
                !sidebar.contains(e.target) &&
                !openSidebarButtonMobile?.contains(e.target) &&
                !openSidebarButtonMd?.contains(e.target)
                ) {
            closeSidebar();
        }
    });
    const cartbar = document.getElementById('cartbar');
    const opencartbarButton = document.getElementById('open-cartbar');
    const opencartbarMd = document.getElementById('open-cartbarMd');
    const closecartbarButton = document.getElementById('close-cartbar');
    opencartbarButton.addEventListener('click', (e) => {
        e.stopPropagation();
        cartbar.classList.remove('translate-x-full', 'opacity-0');
        cartbar.classList.add('translate-x-0', 'opacity-100');
    });
    opencartbarMd.addEventListener('click', (e) => {
        e.stopPropagation();
        cartbar.classList.remove('translate-x-full', 'opacity-0');
        cartbar.classList.add('translate-x-0', 'opacity-100');
    });
    closecartbarButton.addEventListener('click', (e) => {
        e.stopPropagation();
        cartbar.classList.add('translate-x-full', 'opacity-0');
        cartbar.classList.remove('translate-x-0', 'opacity-100');
    });
    document.addEventListener('click', (e) => {
        if (!cartbar.contains(e.target) && !opencartbarButton.contains(e.target)) {
            cartbar.classList.add('translate-x-full', 'opacity-0');
            cartbar.classList.remove('translate-x-0', 'opacity-100');
        }
    });
    document.addEventListener('click', (e) => {
        if (!cartbar.contains(e.target) && !opencartbarMd.contains(e.target)) {
            cartbar.classList.add('translate-x-full', 'opacity-0');
            cartbar.classList.remove('translate-x-0', 'opacity-100');
        }
    });
    // watch
    const watchbar = document.getElementById('watchbar');
    const watchbarOpenButton = document.getElementById('open-watchbar');
    const watchbarMd = document.getElementById('open-watchbarMd');
    const watchbarCloseButton = document.getElementById('close-watchbar');
    watchbarOpenButton.addEventListener('click', (e) => {
        e.stopPropagation();
        watchbar.classList.remove('translate-x-full', 'opacity-0');
        watchbar.classList.add('translate-x-0', 'opacity-100');
    });
    watchbarMd.addEventListener('click', (e) => {
        e.stopPropagation();
        watchbar.classList.remove('translate-x-full', 'opacity-0');
        watchbar.classList.add('translate-x-0', 'opacity-100');
    });
    watchbarCloseButton.addEventListener('click', (e) => {
        e.stopPropagation();
        watchbar.classList.add('translate-x-full', 'opacity-0');
        watchbar.classList.remove('translate-x-0', 'opacity-100');
    });
    document.addEventListener('click', (e) => {
        if (!watchbar.contains(e.target) && !watchbarOpenButton.contains(e.target)) {
            watchbar.classList.add('translate-x-full', 'opacity-0');
            watchbar.classList.remove('translate-x-0', 'opacity-100');
        }
    });
    document.addEventListener('click', (e) => {
        if (!watchbar.contains(e.target) && !watchbarMd.contains(e.target)) {
            watchbar.classList.add('translate-x-full', 'opacity-0');
            watchbar.classList.remove('translate-x-0', 'opacity-100');
        }
    });
}

function showSection(sectionId) {
    const sections = ['addProduct', 'productList', 'pendingOders', 'completeOrders', 'returnOrders'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (sectionId === id) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
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
let brandList;
let modelList;
let colorList;
let storageList;

async function loadAddProductData() {
    const response = await fetch("LoadProductData");
    if (response.ok) {
        const json = await response.json();
        console.log(json);
        if (json.status) {
            loadSelect("selectCategory", json.categoryList, "name");
            brandList = json.brandList;
            modelList = json.modelList;
            colorList = json.colorList;
            storageList = json.storageList;
            loadSelect("selectQuality", json.qualityList, "name");
        }
    }
}

function loadSelect(selectId, items, property) {
    const select = document.getElementById(selectId);
    select.length = 1; // Clear existing except default
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.innerHTML = item[property];
        select.appendChild(option);
    });
}

function loadBrands() {
    const categoryId = parseInt(document.getElementById("selectCategory").value);
    const brandSelect = document.getElementById("selectBrand");
    brandSelect.length = 1;

    brandList.forEach(item => {
        if (item.category.id === categoryId) {
            const option = document.createElement("option");
            option.value = item.id;
            option.innerHTML = item.name;
            brandSelect.appendChild(option);
        }
    });
}

function loadModels() {
    const brandId = parseInt(document.getElementById("selectBrand").value);
    const modelSelect = document.getElementById("selectModel");
    modelSelect.length = 1;

    const addedModelNames = new Set();

    modelList.forEach(item => {
        if (item.brand.id === brandId) {
            const modelNameId = item.modelName.id;
            if (!addedModelNames.has(modelNameId)) {
                const option = document.createElement("option");
                option.value = modelNameId; // model_name_id
                option.innerHTML = item.modelName.name;
                modelSelect.appendChild(option);
                addedModelNames.add(modelNameId);
            }
        }
    });
}

function loadColors() {
    const selectedModelNameId = parseInt(document.getElementById("selectModel").value);
    const colorSelect = document.getElementById("selectColor");
    colorSelect.length = 1;

    const addedColorIds = new Set();

    modelList.forEach(item => {
        if (item.modelName.id === selectedModelNameId && !addedColorIds.has(item.color.id)) {
            const option = document.createElement("option");
            option.value = item.color.id;
            option.innerHTML = item.color.name;
            colorSelect.appendChild(option);
            addedColorIds.add(item.color.id);
        }
    });
}

function loadStorage() {
    const selectedModelNameId = parseInt(document.getElementById("selectModel").value);
    const storageSelect = document.getElementById("selectStorage");
    storageSelect.length = 1;

    const addedStorageIds = new Set();

    modelList.forEach(item => {
        console.log(item.storage);
        if (item.modelName.id === selectedModelNameId && !addedStorageIds.has(item.storage.id)) {
            const option = document.createElement("option");
            option.value = item.storage.id;
            option.innerHTML = item.storage.value; // Use .capacity if name not available
            storageSelect.appendChild(option);
            addedStorageIds.add(item.storage.id);
        }
    });
}

// Combo function if needed
function loadColorandStorage() {
    loadColors();
    loadStorage();
}



async function addProduct() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("selectCategory").value;
    const brand = document.getElementById("selectBrand").value;
    const model = document.getElementById("selectModel").value;
    const color = document.getElementById("selectColor").value;
    const storage = document.getElementById("selectStorage").value;
    const quality = document.getElementById("selectQuality").value;
    const price = document.getElementById("price").value;
    const qty = document.getElementById("qty").value;
    const sShipping = document.getElementById("sShipping").value;
    const eShipping = document.getElementById("eShipping").value;
    const oShipping = document.getElementById("oShipping").value;
    const img_1 = document.getElementById("img_1").files[0];
    const img_2 = document.getElementById("img_2").files[0];
    const img_3 = document.getElementById("img_3").files[0];
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("category", category);
    form.append("brand", brand);
    form.append("model", model);
    form.append("color", color);
    form.append("storage", storage);
    form.append("quality", quality);
    form.append("price", price);
    form.append("qty", qty);
    form.append("sShipping", sShipping);
    form.append("eShipping", eShipping);
    form.append("oShipping", oShipping);
    form.append("img_1", img_1);
    form.append("img_2", img_2);
    form.append("img_3", img_3);
    const response = await fetch("SaveProduct", {
        method: "POST",
        body: form
    });
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("selectCategory").value = 0;
            document.getElementById("selectBrand").value = 0;
            document.getElementById("selectModel").value = 0;
            document.getElementById("selectColor").value = 0;
            document.getElementById("selectStorage").value = 0;
            document.getElementById("selectQuality").value = 0;
            document.getElementById("price").value = "";
            document.getElementById("qty").value = "";
            document.getElementById("sShipping").value = "";
            document.getElementById("eShipping").value = "";
            document.getElementById("oShipping").value = "";
            document.getElementById("img_1").value = "";
            document.getElementById("img_2").value = "";
            document.getElementById("img_3").value = "";
            const preview1 = document.getElementById("preview_1");
            const placeholder1 = document.getElementById("placeholder_1");

            const preview2 = document.getElementById("preview_2");
            const placeholder2 = document.getElementById("placeholder_2");

            const preview3 = document.getElementById("preview_3");
            const placeholder3 = document.getElementById("placeholder_3");

            preview1.classList.add("hidden");
            placeholder1.classList.remove("hidden");
            
            preview2.classList.add("hidden");
            placeholder2.classList.remove("hidden");
            
            preview3.classList.add("hidden");
            placeholder3.classList.remove("hidden");

            alert(json.message);
        } else {
            alert(json.message);
        }
    }
}