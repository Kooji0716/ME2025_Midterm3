#!/bin/bash

# === 設定專案資料 ===
REPO_URL="https://github.com/Kooji0716/ME2025_Midterm3.git"   # 你之後要改成老師要求的那個
PROJECT_DIR="ME2025_Midterm3"
VENV_DIR=".venv"

echo "[INFO] 啟動部署流程..."

# === 判斷是否第一次執行 ===
if [ ! -d "$PROJECT_DIR" ]; then
    echo "[INFO] 專案不存在，執行第一次部署流程..."

    # 1. clone 專案
    git clone "$REPO_URL"

    # 2. 建立虛擬環境
    cd "$PROJECT_DIR"
    python3 -m venv "$VENV_DIR"

    # 3. 啟用虛擬環境並安裝套件
    source "$VENV_DIR/bin/activate"
    pip install -r requirements.txt

    # 4. 啟動 app.py
    echo "[INFO] 啟動 app.py ..."
    nohup python3 app.py > app.log 2>&1 &

else
    echo "[INFO] 專案已存在，執行更新流程..."

    cd "$PROJECT_DIR"

    # 1. 更新版本
    git pull

    # 2. 啟用虛擬環境
    source "$VENV_DIR/bin/activate"

    # 3. 裝缺少套件
    pip install -r requirements.txt

    # 4. 重啟 app.py
    echo "[INFO] 重啟 app.py ..."
    pkill -f "python3 app.py"
    nohup python3 app.py > app.log 2>&1 &
fi

echo "[INFO] 部署完成 🎉"
