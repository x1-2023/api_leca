#!/bin/bash

# Cài đặt 3proxy
apt update
apt install -y 3proxy

# Thư mục cấu hình 
CONFIG_DIR=/etc/3proxy

# Xóa cấu hình cũ, tạo mới
rm -f ${CONFIG_DIR}/3proxy.cfg  
touch ${CONFIG_DIR}/3proxy.cfg

# Lấy IP public 
HOST_IPV4=$(dig +short myip.opendns.com @resolver1.opendns.com)

# Thêm cấu hình cơ bản
echo "daemon
maxconn 3000
nserver 0.0.0.0
nserver ::0" > ${CONFIG_DIR}/3proxy.cfg 

# Cổng bắt đầu
PORT=1000  

# Tạo 2000 proxy 
for ((i=1;i<=2000;i++)); do
  echo "nserver $HOST_IPV4 $PORT" >> ${CONFIG_DIR}/3proxy.cfg
  let PORT=PORT+1
done

# Khởi động lại
systemctl restart 3proxy