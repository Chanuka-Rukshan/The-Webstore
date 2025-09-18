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
    const sections = ['profileDetails', 'shippingAddress', 'changePassword'];

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



