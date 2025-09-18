async function loadPurchaseHistory() {
    const response = await fetch("LoadPurchaseHistory");
    if (response.ok) {
        const json = await response.json();
        console.log(json);
        const history_item_container = document.getElementById("history_item_container");
        history_item_container.innerHTML = "";

        json.data.orderItems.forEach(history => {
            let historyData = `<tr class="hover:bg-gray-700" id="history-item-row">
                                                <td class="px-4 py-3">${history.order.id}</td>
                                               <td class="px-8 py-3">${history.product.category.name}</td>
                                                
                                                <td class="px-4 py-3">${history.product.brand.name}</td>
                                                <td class="px-4 py-3">${history.product.model.modelName.name}</td>
                                                <td class="px-4 py-3">${history.product.color.name}</td>
                                                <td class="px-4 py-3">${history.product.storage.value}</td>
                                                <td class="px-4 py-3">${history.product.quality.name}</td>
                                                <td class="px-4 py-3">${history.qty}</td>
                                                <td class="px-4 py-3">Rs. ${history.order.amount}</td>
                                                <td class="px-4 py-3 text-center text-sm text-gray-300">${history.order.orderDate}</td>
                                                

                                            </tr>`;

            history_item_container.innerHTML += historyData;
        });
    } else {
        alert("Purchase Hiistory Loading Failed!");
    }
}


function printHistory() {
   const report = document.body.innerHTML;
   const page = document.getElementById("historyReport").innerHTML;
   document.body.innerHTML = page;
   window.print();
   document.body.innerHTML = report;
}