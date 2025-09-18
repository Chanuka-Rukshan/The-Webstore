function IndexOnloadFunctions() {
    checkSignIn();
    loadProductData();

}
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

fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-call").innerHTML = data;

        });


let currentIndex = 0;
const slides = document.getElementById("carousel-slides");
const totalSlides = slides.children.length;


function updateSlide() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}


function updateDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (i === currentIndex) {
            dot.classList.add('bg-blue-600');
            dot.classList.remove('bg-gray-600');
        } else {
            dot.classList.add('bg-gray-600');
            dot.classList.remove('bg-blue-600');
        }
    }
}


function goToSlide(index) {
    currentIndex = index;
    updateSlide();
}


function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
}


function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
}


setInterval(nextSlide, 5000);

// second carosel
window.addEventListener('load', function () {
    window.HSCarousel?.autoInit?.();
});

document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dots = document.querySelectorAll('.indicator-dot');

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;
    const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const totalCards = cards.length;
    let autoSlideInterval;


    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;


        dots.forEach((dot, index) => {
            dot.classList.toggle('active-dot', index === currentIndex);
        });


        cards.forEach(card => {
            card.classList.remove('animate-fade');
            void card.offsetWidth; // Trigger reflow
            card.classList.add('animate-fade');
        });
    }


    function nextSlide() {
        currentIndex = (currentIndex + 1) % (totalCards - visibleCards + 1);
        updateCarousel();
    }


    function prevSlide() {
        currentIndex = (currentIndex - 1 + (totalCards - visibleCards + 1)) % (totalCards - visibleCards + 1);
        updateCarousel();
    }


    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }


    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        });
    });


    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }


    const carousel = document.getElementById('carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', startAutoSlide);


    window.addEventListener('resize', () => {
        const newVisibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        if (newVisibleCards !== visibleCards) {
            currentIndex = 0;
            updateCarousel();
        }
    });


    updateCarousel();
    startAutoSlide();
});


async function checkSignIn() {
    const response = await fetch("CheckSessionCart");
    if (response.ok) {

    } else {
        alert("Somthing went wrong! Try again shortly");
    }
}

async function loadProductData() {
    const response = await fetch("LoadHomeData");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            console.log(json);
            loadProductCard(json);
        } else {
            alert("Something went wrong! Try again shortly");
        }
    } else {
        alert("Something went wrong! Try again shortly");
    }
}

function loadProductCard(json) {

    const productCard1 = document.getElementById("productCard_1");
    const productCard2 = document.getElementById("productCard_2");
    const productCard3 = document.getElementById("productCard_3");
    productCard1.innerHTML = "";
    productCard2.innerHTML = "";
    productCard3.innerHTML = "";


    json.productFreeList.forEach(item => {

        let productCardDesign1 = `<div
    class="relative group bg-[#eaeaea] rounded-xl p-4 shadow-sm transition duration-500 transform hover:scale-105 hover:shadow-2xl min-h-[420px] border flex flex-col">

    <!-- Product image section -->
    <div
        class="w-full h-36 mb-4 bg-white rounded-lg flex justify-center items-center overflow-hidden relative group">
        <div onclick="addWatchlist(${item.id},1)"
            class="h-10 w-10 bg-[#eaeaea] absolute top-1 right-1 rounded-full z-10 justify-center items-center hidden group-hover:flex transition duration-500 cursor-pointer">
            <img src="resources/header_icon/icons8-heart-25.png" alt="heart"  />
        </div>
        <a href="single-product-view.html?id=${item.id}">
            <img src="products//${item.id}//img_1.png" alt="Wireless Earbuds" class="h-28 object-contain" />
        </a>
    </div>

    <!-- Product title -->
    <h3 class="text-lg font-semibold text-gray-800 leading-snug mb-1">
        ${item.title}
    </h3>

    <!-- Rating -->
    <div class="flex items-center text-[#ffb929] text-lg mt-3 mb-1">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current text-[#ffb929]" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2" />
            <path d="M12 2v15.27L5.82 21 7.46 13.97 2 9.24l7.19-.61L12 2z"
                class="text-gray-300 fill-current" />
        </svg>
        <span class="text-gray-500 text-sm ml-2">(4700)</span>
    </div>

    <!-- Price -->
    <p class="text-[#B43F3F] font-bold text-lg mt-2">
        Rs. ${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(item.price)}
    </p>

    <!-- Stock -->
    <p class="text-sm text-gray-600 mt-2">
        <span class="text-green-600">In Stock</span> ${item.qty} Items
    </p>

    <!-- Shipping Fee -->
    <p class="text-sm text-gray-600 mt-1">
        Shipping Fee: Rs. ${item.sShipping}
    </p>

    <!-- Add to cart button stays at bottom -->
    <a href="" onclick="addToCart(${item.id},1);"
        class="flex items-center justify-center rounded-md mt-auto bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 0 014 0z" />
        </svg>
        Add to cart
    </a>
</div>
`;
        productCard1.innerHTML += productCardDesign1;
    });

    json.productList.forEach(item => {

        let productCardDesign2 = `<div
    class="relative group bg-[#eaeaea] rounded-xl p-4 shadow-sm transition duration-500 transform hover:scale-105 hover:shadow-2xl min-h-[420px] border flex flex-col">

    <!-- Product image section -->
    <div
        class="w-full h-36 mb-4 bg-white rounded-lg flex justify-center items-center overflow-hidden relative group">
        <div
            class="h-10 w-10 bg-[#eaeaea] absolute top-1 right-1 rounded-full z-10 justify-center items-center hidden group-hover:flex transition duration-500 cursor-pointer">
            <img src="resources/header_icon/icons8-heart-25.png" alt="heart" />
        </div>
        <a href="single-product-view.html?id=${item.id}">
            <img src="products//${item.id}//img_1.png" alt="Wireless Earbuds" class="h-28 object-contain" />
        </a>
    </div>

    <!-- Product title -->
    <h3 class="text-lg font-semibold text-gray-800 leading-snug mb-1">
        ${item.title}
    </h3>

    <!-- Rating -->
    <div class="flex items-center text-[#ffb929] text-lg mt-3 mb-1">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current text-[#ffb929]" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2" />
            <path d="M12 2v15.27L5.82 21 7.46 13.97 2 9.24l7.19-.61L12 2z"
                class="text-gray-300 fill-current" />
        </svg>
        <span class="text-gray-500 text-sm ml-2">(4700)</span>
    </div>

    <!-- Price -->
    <p class="text-[#B43F3F] font-bold text-lg mt-2">
        Rs. ${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(item.price)}
    </p>

    <!-- Stock -->
    <p class="text-sm text-gray-600 mt-2">
        <span class="text-green-600">In Stock</span> ${item.qty} Items
    </p>

    <!-- Shipping Fee -->
    <p class="text-sm text-gray-600 mt-1">
        Shipping Fee: Rs. ${item.sShipping}
    </p>

    <!-- Add to cart button stays at bottom -->
    <a href="" onclick="addToCart(${item.id},1);"
        class="flex items-center justify-center rounded-md mt-auto bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 0 014 0z" />
        </svg>
        Add to cart
    </a>
</div>
`;
        productCard2.innerHTML += productCardDesign2;
    });


    json.productAllList.forEach(item => {

        let productCardDesign3 = `<div
    class="relative group bg-[#eaeaea] rounded-xl p-4 shadow-sm transition duration-500 transform hover:scale-105 hover:shadow-2xl min-h-[420px] border flex flex-col">

    <!-- Product image section -->
    <div
        class="w-full h-36 mb-4 bg-white rounded-lg flex justify-center items-center overflow-hidden relative group">
        <div
            class="h-10 w-10 bg-[#eaeaea] absolute top-1 right-1 rounded-full z-10 justify-center items-center hidden group-hover:flex transition duration-500 cursor-pointer">
            <img src="resources/header_icon/icons8-heart-25.png" alt="heart" />
        </div>
        <a href="single-product-view.html?id=${item.id}">
            <img src="products//${item.id}//img_1.png" alt="Wireless Earbuds" class="h-28 object-contain" />
        </a>
    </div>

    <!-- Product title -->
    <h3 class="text-lg font-semibold text-gray-800 leading-snug mb-1">
        ${item.title}
    </h3>

    <!-- Rating -->
    <div class="flex items-center text-[#ffb929] text-lg mt-3 mb-1">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path
                d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
        <svg class="w-5 h-5 fill-current text-[#ffb929]" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2" />
            <path d="M12 2v15.27L5.82 21 7.46 13.97 2 9.24l7.19-.61L12 2z"
                class="text-gray-300 fill-current" />
        </svg>
        <span class="text-gray-500 text-sm ml-2">(4700)</span>
    </div>

    <!-- Price -->
    <p class="text-[#B43F3F] font-bold text-lg mt-2">
        Rs. ${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(item.price)}
    </p>

    <!-- Stock -->
    <p class="text-sm text-gray-600 mt-2">
        <span class="text-green-600">In Stock</span> ${item.qty} Items
    </p>

    <!-- Shipping Fee -->
    <p class="text-sm text-gray-600 mt-1">
        Shipping Fee: Rs. ${item.sShipping}
    </p>

    <!-- Add to cart button stays at bottom -->
    <a href="" onclick="addToCart(${item.id},1);"
        class="flex items-center justify-center rounded-md mt-auto bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 0 014 0z" />
        </svg>
        Add to cart
    </a>
</div>
`;
        productCard3.innerHTML += productCardDesign3;
    });

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


















