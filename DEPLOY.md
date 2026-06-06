# 部署指南

## 方式一：手动部署（最简单）

### 1. 服务器准备

登录阿里云服务器，安装依赖：

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx git nodejs npm -y

# 或 CentOS
sudo yum install nginx git nodejs npm -y

# 检查版本
node -v   # 需要 >= 18
npm -v
```

### 2. 上传代码

```bash
# 在服务器上
sudo mkdir -p /var/www/blog
cd /var/www/blog
sudo git clone https://github.com/chenxiyou-1314/你的仓库名.git .
```

### 3. 构建

```bash
cd /var/www/blog
npm install
npm run docs:build
```

### 4. 配置 Nginx

```bash
sudo cp nginx.conf /etc/nginx/sites-available/blog
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/blog
sudo rm -f /etc/nginx/sites-enabled/default  # 删掉默认配置
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 5. 防火墙

阿里云安全组放行 **80** 端口（和 **443** 如果用 HTTPS）。

### 6. 访问

浏览器输入服务器公网 IP 即可访问。

---

## 方式二：GitHub Actions 自动部署（推荐）

配置后，每次 `git push` 到 `main` 分支，自动构建并推送到服务器。

### 1. 服务器配置 SSH

在服务器上创建部署用户：

```bash
sudo useradd -m -s /bin/bash deploy
sudo passwd deploy
sudo usermod -aG sudo deploy
su - deploy
ssh-keygen -t ed25519 -C "deploy"
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
```

把 **私钥** `~/.ssh/id_ed25519` 的内容复制下来，添加到 GitHub 仓库的 `Settings → Secrets and variables → Actions → New repository secret`：

- Name: `SERVER_SSH_KEY`
- Value: 私钥内容

再加两个 Secrets：
- `SERVER_HOST`: 你的服务器公网 IP
- `SERVER_USER`: deploy
- `SERVER_PATH`: `/var/www/blog`

### 2. 配置 GitHub Actions

仓库根目录创建 `.github/workflows/deploy.yml`（文件在下方提供）。

### 3. 首次手动部署

第一次需要在服务器上手动 clone：

```bash
cd /var/www/blog
sudo git clone https://github.com/chenxiyou-1314/你的仓库名.git .
```

之后每次 push 都会自动部署。

---

## 常见问题

### Q: `cleanUrls` 导致 404？
Nginx 必须配置 `try_files $uri $uri.html $uri/ =404;`，已包含在 `nginx.conf` 中。

### Q: 刷新页面 404？
同上，是 Nginx 的 `try_files` 没有配置好。

### Q: 想部署到子路径如 `/blog/`？
修改 `docs/.vitepress/config.mts` 中的 `base: '/blog/'`，Nginx 的 `root` 保持不变（仍指向 dist 根目录）。

### Q: 有域名怎么配？
1. 域名 DNS 解析 A 记录指向服务器 IP
2. `nginx.conf` 中 `server_name` 改成你的域名
3. 推荐用 Certbot 申请免费 HTTPS 证书：
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```
