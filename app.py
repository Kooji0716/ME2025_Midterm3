from flask import Flask, render_template, request, jsonify, redirect, url_for
from core.database.database import Database

app = Flask(__name__)
db = Database()

@app.route('/', methods=['GET'])
def index():
    if request.method == 'GET':
        orders = db.get_all_orders()
        if request.args.get('warning'):
            warning = request.args.get('warning')
            return render_template('form.html', orders=orders, warning=warning)
        return render_template('form.html', orders=orders)

#Part2
@app.route('/product', methods=['GET', 'POST', 'DELETE'])
def product():
    # 1. GET：給前端 JS 查商品列表或價格
    if request.method == 'GET':
        category = request.args.get('category')
        product_name = request.args.get('product')

        # (1) 有 category：回傳該類別的商品名稱列表
        if category:
            product_list = db.get_product_names_by_category(category)
            # 題目要求回傳格式：{"product": [...]}
            return jsonify({"product": product_list})

        # (2) 有 product：回傳該商品的單價
        if product_name:
            price = db.get_product_price(product_name)
            return jsonify({"price": price})
        
        return jsonify({"error": "Missing category or product parameter"}), 400

    # 2. POST：新增訂單，接收前端表單
    elif request.method == 'POST':
        # 題目要求的欄位組成一個 dict：
        # product_date, customer_name, product_name,
        # product_amount, product_total, product_status, product_note
        order_data = {
            "product_date":   request.form.get("product_date"),
            "customer_name":  request.form.get("customer_name"),
            "product_name":   request.form.get("product_name"),
            "product_amount": int(request.form.get("product_amount", 0)),
            "product_total":  int(request.form.get("product_total", 0)),
            "product_status": request.form.get("product_status"),
            "product_note":   request.form.get("product_note", "")
        }

        # 寫入資料庫
        db.add_order(order_data)

        # 成功後導回首頁，並帶 warning 訊息
        # 題目指定要顯示 "Order placed successfully"
        return redirect(url_for('index', warning='Order placed successfully'))

    # 3. DELETE：刪除訂單，給前端 delete_data() 用
    elif request.method == 'DELETE':
        order_id = request.args.get('order_id')

        if not order_id:
            return jsonify({"error": "Missing order_id"}), 400

        # 依照 order_id 刪除資料
        db.delete_order(int(order_id))

        # 題目要求回傳這句 JSON，Status 200
        return jsonify({"message": "Order deleted successfully"}), 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5500, debug=True)
