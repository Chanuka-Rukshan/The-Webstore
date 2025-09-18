

// Color box selection logic
const colorBoxes = document.querySelectorAll('.color-box');
colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        colorBoxes.forEach(b => b.classList.remove('ring', 'ring-offset-2', 'ring-gray-700'));
        box.classList.add('ring', 'ring-offset-2', 'ring-gray-700');
    });
});

// Load header
fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            initHeaderScripts();
        });

// Define all header.js logic
function initHeaderScripts() {
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


fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-call").innerHTML = data;
        });

const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const qtyInput = document.getElementById('qtyInput');

let min = 1;
let qty = 1;
let productPrice = 0;
let productShipping = 0;
let totalPrice = 0;

decreaseBtn.addEventListener('click', () => {
    let current = parseInt(qtyInput.value);
    if (current > min) {
        qtyInput.value = current - 1;
        qtyInput.dispatchEvent(new Event('input'));
    }
});

increaseBtn.addEventListener('click', () => {
    let current = parseInt(qtyInput.value);
    if (current < qty) {
        qtyInput.value = current + 1;
        qtyInput.dispatchEvent(new Event('input'));
    } else {
        alert("Maximum stock reached");
    }
});


qtyInput.addEventListener('input', () => {
    let val = parseInt(qtyInput.value);
    if (isNaN(val) || val < min) {
        val = min;
    } else if (val > qty) {
        val = qty;
    }
    qtyInput.value = val;

    totalPrice = (Number(productPrice) * val) + Number(productShipping);
    document.getElementById("total_price").innerHTML = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(totalPrice);
});



async function loadData() {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("id")) {
        const productId = searchParams.get("id");
        console.log(productId);
        const response = await fetch("LoadSingleProduct?id=" + productId);

        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                document.getElementById("mainImage").src = "products\\" + json.product.id + "\\img_1.png";
                document.getElementById("image_1").src = "products\\" + json.product.id + "\\img_1.png";
                document.getElementById("image_2").src = "products\\" + json.product.id + "\\img_2.png";
                document.getElementById("image_3").src = "products\\" + json.product.id + "\\img_3.png";
                qty = json.product.qty;
                productPrice = json.product.price;
                productShipping = json.product.sShipping;

                console.log(json.product.id);

                document.getElementById("product_title").innerHTML = json.product.title;
                document.getElementById("product_price").innerHTML = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(productPrice);
                document.getElementById("product_category").innerHTML = json.product.category.name;
                document.getElementById("product_brand").innerHTML = json.product.brand.name;
                document.getElementById("product_model").innerHTML = json.product.model.modelName.name;
                document.getElementById("product_quality").innerHTML = json.product.quality.name;
                document.getElementById("product_qty").innerHTML = qty;
                document.getElementById("product_storage").innerHTML = json.product.storage.value;

                qtyInput.setAttribute("max", qty);
                qtyInput.value = min;
                qtyInput.dispatchEvent(new Event('input'));

                if (productShipping == 0) {
                    document.getElementById("product_shipping").innerHTML = "Free Shipping";
                } else {
                    document.getElementById("product_shipping").innerHTML = "Rs " + new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(productShipping);
                }


                document.getElementById("color_background").style.backgroundColor = json.product.color.name;

                //add-to-cart

                const addToCartMain = document.getElementById("add-to-cart-main");
                addToCartMain.addEventListener("click", (e) => {
                    addToCart(json.product.id, document.getElementById("qtyInput").value);
                });

                //add-to-cart

            } else {

            }
        } else {

        }
    }
}

async function addToCart(productId, qty) {
    const response = await fetch("AddToCart?prId=" + productId + "&qty=" + qty);
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            alert(json.message);
        } else {
            alert("Something went wrong.Try again");
        }
    } else {
        alert("Something went wrong.Try again");
    }
}



