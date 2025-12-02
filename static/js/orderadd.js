// 開啟與關閉Modal
function open_input_table() {
    document.getElementById("addModal").style.display = "block";
}
function close_input_table() {
    document.getElementById("addModal").style.display = "none";
}

function delete_data(value) {
    // 發送 DELETE 請求到後端
    fetch(`/product?order_id=${value}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("伺服器回傳錯誤");
        }
        return response.json(); // 假設後端回傳 JSON 格式資料
    })
    .then(result => {
        console.log(result); // 在這裡處理成功的回應
        close_input_table(); // 關閉 modal
        location.assign('/'); // 重新載入頁面
    })
    .catch(error => {
        console.error("發生錯誤：", error);
    });
}

// 1. 選取商品種類後的連動邏輯 (Fetch API)
        function selectCategory() {
        // TODO: Fetch product list by category
    }

    // 2. 選取商品後的價格更新邏輯 (Fetch API)
        function selectProduct() {
        // TODO: Fetch price by product name
    }

    // 3. 計算小計邏輯
        function countTotal() {
        // TODO: Calculate total price
    }

    // 其他輔助函式 (如重置欄位等) 可自由實作