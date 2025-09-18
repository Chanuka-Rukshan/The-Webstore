async function loadWatchlistItems() {
    const response = await fetch("LoadWatchlistItem");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
            console.log(json);
            const watchlist_item_container = document.getElementById("watchlist_item_container");
            watchlist_item_container.innerHTML = "";

            let watchlistQty = 0;

            json.watchlistItems.forEach(watchlist => {

                watchlistQty += watchlist.qty;

                let watchlistData = `<tr class="text-center" id="watchlist-item-row">
                                    <td class="px-2 py-2 text-left align-top">
                                        <img src="products//${watchlist.product.id}//img_1.png" alt="test"
                                            class="w-[100px] mr-2 inline-block h-[100px]" /><span>${watchlist.product.title}</span>
                                    </td>
                                    
                                    
                                    <td class="px-2 py-2">
                                        <svg width="24" class="cursor-pointer" height="25" viewBox="0 0 24 25"
                                            fill="none" xmlns="http://www.w3.org/2000/svg" onclick="deleteWatchlistSide(${watchlist.id});">
                                            <path
                                                d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z"
                                                stroke="#CCCCCC" stroke-miterlimit="10"></path>
                                            <path d="M16 8.5L8 16.5" stroke="#666666" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M16 16.5L8 8.5" stroke="#666666" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </td>
                                </tr> `;

                watchlist_item_container.innerHTML += watchlistData;
            });

            document.getElementById("totalWatchlist").innerHTML = watchlistQty;
        } else {
            const watchlist_item_container = document.getElementById("watchlistBarSide");
            watchlist_item_container.innerHTML = "";
            document.getElementById("totalWatchlist").innerHTML = 0;
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
            loadWatchlistItems();
        }else{
            alert(json.message);
        }
    }else{
        alert("Watchlist Item Delete Unsucssesfull!");
    }
}