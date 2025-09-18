async function loadCartItems() {
    const response = await fetch("LoadCartItems");
    if (response.ok) {
        const json = await response.json();
        console.log(json);
        let totalQty = 0;
        if (json.status) {
            const cart_item_container = document.getElementById("cart_item_container");
            cart_item_container.innerHTML = "";
            let total = 0;

            let sShipping = 0, eShipping = 0, oShipping = 0;
            json.cartItems.forEach(cart => {
                let productSubTotal = cart.product.price * cart.qty;
                total += productSubTotal;
                totalQty += cart.qty;
                let tableData = `<tr class="text-center" id="cart-item-row">
                    <td class="px-2 py-2 text-left align-top">
                        <img src="products\\${cart.product.id}\\img_1.png" alt="test"
                             class="w-[100px] mr-2 inline-block h-[100px]" />
                        <span>${cart.product.title}</span>
                    </td>
                    <td class="px-2 py-2">${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(cart.product.price)}</td>
                    <td class="p-2 mt-9 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex">
                        <svg width="14" height="15" class="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.33398 7.5H11.6673" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <span class="w-10 text-center text-[#191919] text-base font-normal leading-normal">${cart.qty}</span>
                        <svg class="cursor-pointer relative" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </td>
                    <td class="px-2 py-2">${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(productSubTotal)}</td>
                    <td class="px-2 py-2">
                        <svg width="24" class="cursor-pointer" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="deleteCart(${cart.id});">
                            <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CCCCCC" stroke-miterlimit="10"></path>
                            <path d="M16 8.5L8 16.5" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M16 16.5L8 8.5" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </td>
                </tr>`;
                cart_item_container.innerHTML += tableData;
                sShipping += parseInt(cart.product.sShipping);
                eShipping += parseInt(cart.product.eShipping);
                oShipping += parseInt(cart.product.oShipping);
            });
            document.getElementById("order-total").innerHTML = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(total);
            document.getElementById("order-subtotal").innerHTML = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(total);
            document.getElementById("sShipping").innerHTML = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(sShipping);
            document.getElementById("eShipping").innerHTML = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(eShipping);
            document.getElementById("oShipping").innerHTML = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(oShipping);
            // sShipping is already a number sum of shipping costs from cart items
            console.log("Default shipping (sShipping):", sShipping);
            document.getElementById("cartIconeCartPage").innerHTML = totalQty;
            document.getElementById("order-shipping").textContent = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(sShipping);
            document.getElementById("order-subtotal").textContent = new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(total + sShipping);
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
            alert(json.message);
        }
    } else {
        alert("Cart Items loading failed...");
    }
}
// Assuming 'total' is the total of cart items without shipping (from your loadCartItems function)

async function payment() {
    const order_total = document.getElementById("order-total").textContent;
    const order_shipping = document.getElementById("order-shipping").textContent;
    const order_subtotal = document.getElementById("order-subtotal").textContent;
    const checkOut = {
        order_total: order_total,
        order_shipping: order_shipping,
        order_subtotal: order_subtotal
    };
    const checkoutJson = JSON.stringify(checkOut);
    const response = await fetch("checkoutSet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: checkoutJson

    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            window.location = "payment.html";
        }
    } else {
        alert("check out failed. Please try again");
    }
}


async function deleteCart(id) {
    const cartId = id;

    const cartObject = {
        cartId: cartId
    };

    const cartDataJson = JSON.stringify(cartObject);

    const response = await fetch("DeleteCartItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: cartDataJson
    });

    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            alert(json.message);
            loadCartItems();
        }else{
            alert(json.message);
        }
    } else {
        alert("Cart Iems delete faild...");
    }


}