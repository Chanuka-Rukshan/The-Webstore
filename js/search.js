const product_per_page = 6; // define how many products per page
let current_page = 0;

async function loadApply() {
    const response = await fetch("LoadData");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            console.log(json);
            loadOptions("category", json.categoryList, "name");
            loadOptions("brand", json.brandList, "name");
            loadOptions("color", json.colorList, "name");
            loadOptions("quality", json.qualityList, "name");
            loadOptions("storage", json.storageList, "value");

            loadProductCard(json);
        }
    }
}

function loadOptions(prefix, dataList, property) {
    let options = document.getElementById(prefix + "-options");
    let li = document.getElementById(prefix + "-li");
    options.innerHTML = "";

    dataList.forEach((item, index) => {
        let li_clone = li.cloneNode(true);

        const input = li_clone.querySelector("input");
        const label = li_clone.querySelector("label");

        const inputId = prefix + "-input-" + index;
        input.id = inputId;
        input.value = item[property];
        label.htmlFor = inputId;
        label.innerHTML = item[property];

        options.appendChild(li_clone);
    });

    const allInputs = options.querySelectorAll("input[type='checkbox']");
    allInputs.forEach(input => {
        input.addEventListener("change", function () {
            allInputs.forEach(i => {
                if (i !== this)
                    i.checked = false;
            });

            options.querySelectorAll("li").forEach(li => li.classList.remove("chosen"));
            if (this.checked) {
                this.closest("li").classList.add("chosen");
            }
        });
    });
}

async function applyFilter(firstResult) {

    const categoryName = document.getElementById("category-options").querySelector(".chosen")?.querySelector("label").innerHTML;
    const brandName = document.getElementById("brand-options").querySelector(".chosen")?.querySelector("label").innerHTML;
    const colorName = document.getElementById("color-options").querySelector(".chosen")?.querySelector("label").innerHTML;
    const qualityName = document.getElementById("quality-options").querySelector(".chosen")?.querySelector("label").innerHTML;
    const storageName = document.getElementById("storage-options").querySelector(".chosen")?.querySelector("label").innerHTML;

    const data = {
        firstResult: firstResult,
        categoryName: categoryName,
        brandName: brandName,
        colorName: colorName,
        qualityName: qualityName,
        storageName: storageName
    };

    const dataJSON = JSON.stringify(data);

    const response = await fetch("SearchProducts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: dataJSON
            });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            console.log(json);
            loadProductCard(json);
        } else {
            alert("Something went wrong. Please try again later");
        }
    } else {
        alert("Something went wrong. Please try again later");
    }
}

function loadProductCard(json) {
    let st_pagination_button = document.getElementById("st-pagination-button");

    const productCard = document.getElementById("productCard_1");
    productCard.innerHTML = "";

    json.productList.forEach(item => {
        let productCardDesign = `<div
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
        productCard.innerHTML += productCardDesign;
    });

    let st_pagination_container = document.getElementById("st-pagination-container");
    st_pagination_container.innerHTML = "";

    const totalProducts = json.allProductCount || json.totalProductCount || 0;
    const pages = Math.ceil(totalProducts / product_per_page);



    if (current_page > 0) {
        let prevBtn = createPaginationButton("Prev", () => {
            current_page--;
            applyFilter(current_page * product_per_page);
        });
        st_pagination_container.appendChild(prevBtn);
    }

// Numbered page buttons
    for (let i = 0; i < pages; i++) {
        let pageBtn = createPaginationButton(i + 1, () => {
            current_page = i;
            applyFilter(i * product_per_page);
        }, i === current_page);
        st_pagination_container.appendChild(pageBtn);
    }

// Next button
    if (current_page < pages - 1) {
        let nextBtn = createPaginationButton("Next", () => {
            current_page++;
            applyFilter(current_page * product_per_page);
        });
        st_pagination_container.appendChild(nextBtn);
    }

}
function createPaginationButton(text, clickHandler, isActive = false) {
    let btn = document.createElement("a");
    btn.href = "#";
    btn.classList.add(
            "inline-block", // so buttons line up horizontally
            "px-4", "py-2", // bigger padding (width & height)
            "mx-1", // horizontal margin between buttons
            "rounded-md", // smoother rounded corners
            "border",
            "border-gray-300",
            "text-black",
            "bg-white",
            "text-base", // slightly larger text
            "font-semibold", // bolder text
            "transition", "duration-200", "ease-in-out",
            "hover:text-white",
            "hover:bg-blue-600",
            "hover:border-blue-600"
            );

    if (isActive) {
        btn.classList.add("bg-blue-600", "text-white", "border-blue-600");
        btn.classList.remove("hover:bg-blue-600", "hover:text-white");
    }

    btn.innerText = text;
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        clickHandler();
    });
    return btn;
}

