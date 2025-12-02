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
    async function selectCategory() {
        const categorySelect = document.getElementById("category");
        const productSelect  = document.getElementById("product");
        const priceInput     = document.getElementById("price");
        const totalInput     = document.getElementById("total");

        if (!categorySelect || !productSelect) return;

        const category = categorySelect.value;

        // 沒選種類就清空
        if (!category) {
            productSelect.innerHTML = '<option value="">請先選擇商品種類</option>';
            if (priceInput) priceInput.value = "";
            if (totalInput) totalInput.value = "";
            return;
        }

        try {
            const res = await fetch(`/product?category=${encodeURIComponent(category)}`);
            if (!res.ok) {
                throw new Error("取得商品清單失敗");
            }

            const data = await res.json();
            const list = Array.isArray(data.product) ? data.product : [];

            // 清空原本選項
            productSelect.innerHTML = "";

            if (list.length === 0) {
                const opt = document.createElement("option");
                opt.value = "";
                opt.textContent = "沒有可選商品";
                productSelect.appendChild(opt);
                if (priceInput) priceInput.value = "";
                if (totalInput) totalInput.value = "";
                return;
            }

            // 填入新商品列表
            list.forEach(name => {
                const opt = document.createElement("option");
                opt.value = name;
                opt.textContent = name;
                productSelect.appendChild(opt);
            });

            // 種類一改，單價 & 小計先清掉，等選商品再抓價格
            if (priceInput) priceInput.value = "";
            if (totalInput) totalInput.value = "";
        } catch (err) {
            console.error(err);
            alert("取得商品清單時發生錯誤");
        }
    }

// 2. 選取商品後的價格更新邏輯 (Fetch API)
    async function selectProduct() {
        const productSelect = document.getElementById("product");
        const priceInput    = document.getElementById("price");

        if (!productSelect || !priceInput) return;

        const productName = productSelect.value;

        if (!productName) {
            priceInput.value = "";
            countTotal();
            return;
        }

        try {
            const res = await fetch(`/product?product=${encodeURIComponent(productName)}`);
            if (!res.ok) {
                throw new Error("取得商品價格失敗");
            }

            const data = await res.json();
            const price = (typeof data.price !== "undefined") ? data.price : 0;

            priceInput.value = price;
            countTotal(); // 單價變了就重算小計
        } catch (err) {
            console.error(err);
            alert("取得商品價格時發生錯誤");
        }
    }

// 3. 計算小計邏輯
        function countTotal() {
        const priceInput = document.getElementById("price");
        const qtyInput   = document.getElementById("quantity");
        const totalInput = document.getElementById("total");

        if (!priceInput || !qtyInput || !totalInput) return;

        const price = Number(priceInput.value) || 0;
        const qty   = Number(qtyInput.value) || 0;

        totalInput.value = price * qty;
    }

// 其他輔助函式 (如重置欄位等) 可自由實作
window.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    if (dateInput && !dateInput.value) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
});
