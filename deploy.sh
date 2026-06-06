#!/bin/bash
set -e

echo "=== 开始部署 canyu-portfolio ==="

# 1. 安装基础依赖
echo "[1/6] 安装 nginx、git..."
sudo apt update -qq
sudo apt install nginx git -y -qq

# 2. 安装 Node.js 20
echo "[2/6] 安装 Node.js 20..."
if ! command -v node &> /dev/null || [ "$(node -v | cut -d'v' -f2 | cut -d'.' -f1)" != "20" ]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - > /dev/null 2>&1
    sudo apt install -y nodejs -qq
fi

echo "    Node.js: $(node -v)"
echo "    npm: $(npm -v)"

# 3. 拉取/更新代码
echo "[3/6] 拉取代码..."
if [ -d "/var/www/canyu-portfolio/.git" ]; then
    cd /var/www/canyu-portfolio
    sudo git pull
else
    sudo mkdir -p /var/www/canyu-portfolio
    cd /var/www/canyu-portfolio
    sudo git clone https://github.com/chenxiyou-1314/canyu-portfolio.git .
fi

# 4. 构建
echo "[4/6] 构建站点..."
cd /var/www/canyu-portfolio
sudo npm install --silent
sudo npm run docs:build

# 5. Nginx 配置
echo "[5/6] 配置 Nginx..."
sudo cp /var/www/canyu-portfolio/nginx.conf /etc/nginx/sites-available/canyu-portfolio
if [ ! -L "/etc/nginx/sites-enabled/canyu-portfolio" ]; then
    sudo ln -s /etc/nginx/sites-available/canyu-portfolio /etc/nginx/sites-enabled/canyu-portfolio
fi
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx > /dev/null 2>&1

# 6. 防火墙
echo "[6/6] 放行防火墙..."
sudo ufw allow 80/tcp > /dev/null 2>&1 || true

echo ""
echo "=== 部署完成 ==="
echo "访问地址: http://$(curl -s ifconfig.me)/"
