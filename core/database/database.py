import datetime
import os
import random

class Database():
    def __init__(self, db_filename="order_management.db"):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.db_path = os.path.join(base_dir, db_filename)

    @staticmethod
    def generate_order_id() -> str:
        now = datetime.datetime.now()
        timestamp = now.strftime("%Y%m%d%H%M%S")
        random_num = random.randint(1000, 9999)
        return f"OD{timestamp}{random_num}"

    def get_product_names_by_category(self, cur, category):
        pass
    def get_product_price(self, cur, product):
        pass
    def add_order(self, cur, order_data):
        pass
    def get_all_orders(self, cur):
        pass
    def delete_order(self, cur, order_id):
        pass