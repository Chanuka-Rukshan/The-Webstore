

async function sideCart() {
    const response = await fetch("LoadCartItems");
    if (response.ok) {
        const json = await response.json();
//        console.log(json);
        if (json.status) {
            const cart_item_container = document.getElementById("cartsideDesign");
            cart_item_container.innerHTML = "";

            let total = 0;
            let totalQty = 0;
            let sShipping = 0, eShipping = 0, oShipping = 0;

            json.cartItems.forEach(cart => {
                let productSubTotal = cart.product.price * cart.qty;
                total += productSubTotal;
                totalQty += cart.qty;



                let tableData = `<div class="flex gap-2 mb-6 items-center">
                <img width="120" height="90" class="border border-[#ffb929] rounded-lg" src="products//${cart.product.id}//img_1.png"
                    alt="">
                <div>
                    <h3 class="w-[216px] text-[#191919] text-sm font-normal leading-[21px]">${cart.product.title}</h3>
                    <p class="mt-2">

                        <span class="text-[#B43F3F] text-sm font-semibold leading-[16.80px]">Rs. ${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(cart.product.price)}</span>
                    </p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="deleteCartSide(${cart.id});">
                    <g clip-path="url(#clip0_629_6652)">
                        <path
                            d="M12 23C18.0748 23 23 18.0748 23 12C23 5.92525 18.0748 1 12 1C5.92525 1 1 5.92525 1 12C1 18.0748 5.92525 23 12 23Z"
                            stroke="#CCCCCC" stroke-miterlimit="10" />
                        <path d="M16 8L8 16" stroke="#666666" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M16 16L8 8" stroke="#666666" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_629_6652">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>`;
                cart_item_container.innerHTML += tableData;

                sShipping += parseInt(cart.product.sShipping);
                eShipping += parseInt(cart.product.eShipping);
                oShipping += parseInt(cart.product.oShipping);
            });

            document.getElementById("order-totalSide").innerHTML = "Rs." + " " + new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(total);
            document.getElementById("total-qty").innerHTML = totalQty + " " + "Products";
            document.getElementById("cartIcone").innerHTML = totalQty;
            document.getElementById("cartIconeMd").innerHTML = totalQty;


            document.getElementById("headCart").innerHTML = `Shopping Cart (${totalQty})`;

            document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
                radio.addEventListener('change', () => {

                    const selected = radio.value;


                    const sShipping = document.getElementById("sShipping").textContent;
                    const eShipping = document.getElementById("eShipping").textContent;
                    const oShipping = document.getElementById("oShipping").textContent;

                    let shippingToShow = "0";

                    if (selected === "s") {
                        shippingToShow = sShipping;
                    } else if (selected === "e") {
                        shippingToShow = eShipping;
                    } else if (selected === "o") {
                        shippingToShow = oShipping;
                    }


                    document.getElementById("order-shipping").textContent = shippingToShow;
                    const shippingNum = Number(shippingToShow.replace(/,/g, '')); // remove commas if any
                    document.getElementById("order-subtotal").textContent = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(total + shippingNum);



                });
            });










        } else {
            const cart_item_container = document.getElementById("cartsideDesign");
            cart_item_container.innerHTML = "";
            document.getElementById("total-qty").innerHTML = 0 + " " + "Products";
            document.getElementById("cartIcone").innerHTML = 0;
            document.getElementById("cartIconeMd").innerHTML = 0;
            document.getElementById("paymentCartItems").innerHTML = 0;

            document.getElementById("headCart").innerHTML = `Shopping Cart (0)`;
        }
    } else {
        alert("Cart Items loading failed...");
    }
}

// your whole sideCart() function here...

// Call it on page load
window.addEventListener("DOMContentLoaded", () => {
    sideCart();
    sideWatchlist();
});
async function deleteCartSide(id) {
    const cartId = id;

    const cartObject = {
        cartId: cartId
    };

    const cartDataJson = JSON.stringify(cartObject);

    const response = await fetch("DeleteCartItem", {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: cartDataJson
    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            alert(json.message);
            sideCart();
        } else {
            alert("json.message");
        }
    } else {
        alert("Cart Item Delete Unsucssesfull!");
    }

}

async function sideWatchlist() {
    const response = await fetch("LoadWatchlistItem");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
//            console.log(json);
            const watchlist_item_container = document.getElementById("watchlistBarSide");
            watchlist_item_container.innerHTML = "";
            
            let watchlistQty = 0;

            json.watchlistItems.forEach(watchlist => {
                
                watchlistQty += watchlist.qty;
                
                let watchlistData = ` <div class="flex gap-2 mb-6 items-center">
                        <img width="120" height="100" class="border border-[#ffb929] rounded-lg" src="products//${watchlist.product.id}//img_1.png"
                             alt="">
                        <div>
                            <h3 class="w-[216px] text-[#191919] text-sm font-normal leading-[21px]">${watchlist.product.title}</h3>
                            
                        </div>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="deleteWatchlistSide(${watchlist.id});">
                        <g clip-path="url(#clip0_629_6652)">
                        <path
                            d="M12 23C18.0748 23 23 18.0748 23 12C23 5.92525 18.0748 1 12 1C5.92525 1 1 5.92525 1 12C1 18.0748 5.92525 23 12 23Z"
                            stroke="#CCCCCC" stroke-miterlimit="10" />
                        <path d="M16 8L8 16" stroke="#666666" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round" />
                        <path d="M16 16L8 8" stroke="#666666" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round" />
                        </g>
                        <defs>
                        <clipPath id="clip0_629_6652">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                        </defs>
                        </svg>
                    </div>`;

                watchlist_item_container.innerHTML += watchlistData;
            });
            
            document.getElementById("headWatchlist").innerHTML = `Watchlist (${watchlistQty})`;
            document.getElementById("watchlistIconeMd").innerHTML = watchlistQty;
            document.getElementById("watchlistIcone").innerHTML = watchlistQty;
            
        } else {
            const watchlist_item_container = document.getElementById("watchlistBarSide");
            watchlist_item_container.innerHTML = "";
            document.getElementById("watchlistIconeMd").innerHTML = 0;
            document.getElementById("watchlistIcone").innerHTML = 0;
        }
    } else {
        alert("Watchlist Items Loading Failed...");
    }
}

async function deleteWatchlistSide(id){
    const watchlistId = id;
    
    const watchlistObject = {
        watchlistId:watchlistId
    };
    
    const watchlistDataJson = JSON.stringify(watchlistObject);
    
    const response = await fetch("DeleteWatchlistItem",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:watchlistDataJson
    });
    
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            alert(json.message);
            sideWatchlist();
        }else{
            alert(json.message);
        }
    }else{
        alert("Watchlist Item Delete Unsucssesfull!");
    }
}

async function addWatchlist(id,qty) {
//    alert(id);

    const response = await fetch("AddToWatchlist?prId=" + id + "&qty=" + qty);
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            alert(json.message);
            sideWatchlist();
            
        } else {
            alert(json.message);
        }
    } else {
        alert("Something went wrong.Try again");
    }
}