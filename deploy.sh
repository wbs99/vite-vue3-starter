#!/bin/bash
set -euo pipefail  # 增强脚本健壮性：遇到错误立即退出，未定义变量报错

readonly SERVER_USER="root"                           # 服务器用户名
readonly SERVER_IP="10.56.192.101"                    # 服务器IP地址
readonly SSH_PORT="2202"                              # SSH端口号
readonly DEPLOY_DIR="/usr/local/software/front_end"   # 部署目录
readonly FRONTEND_DIR="zhengwu"                       # 前端打包目录名称
readonly SSH_KEY_PATH="$HOME/.ssh/id_rsa"             # 密钥路径

function title {
  echo 
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################" 
  echo 
}

title '检查服务器 SSH 密钥认证'
if ! ssh -p "$SSH_PORT" -o PasswordAuthentication=no "${SERVER_USER}@${SERVER_IP}" exit &>/dev/null; then
  title '配置服务器 SSH 密钥认证'
  
  # 自动生成密钥对（如果不存在）
  if [ ! -f "$SSH_KEY_PATH" ] || [ ! -f "${SSH_KEY_PATH}.pub" ]; then
    title '生成 SSH 密钥对'
    ssh-keygen -t rsa -b 4096 -f "$SSH_KEY_PATH" -N "" -q || { 
      echo "密钥生成失败！"; exit 1 
    }
  fi
  
  # 设置密钥权限
  chmod 600 "$SSH_KEY_PATH"
  
  # 部署公钥到服务器
  ssh-copy-id -i "${SSH_KEY_PATH}.pub" -p "$SSH_PORT" "${SERVER_USER}@${SERVER_IP}" || { 
    echo "密钥配置失败！请确认：\n1.服务器SSH服务正常\n2.端口号正确\n3.密码正确"; 
    exit 1 
  }
else
  echo "SSH 密钥认证已配置 ✅"
fi

title '清理旧构建文件'
rm -rf "./${FRONTEND_DIR}" || { echo "清理旧文件失败！"; exit 1; }

title '打包前端代码'
pnpm build || { echo "构建失败！"; exit 1; }

title '清理服务器旧文件'
ssh -p "$SSH_PORT" "${SERVER_USER}@${SERVER_IP}" "rm -rf ${DEPLOY_DIR}/${FRONTEND_DIR}" || {
  echo "清理服务器旧文件失败！"; exit 1
}

title '部署到服务器'
scp -P "$SSH_PORT" -r "./${FRONTEND_DIR}" "${SERVER_USER}@${SERVER_IP}:${DEPLOY_DIR}" || {
  echo "部署失败！"; exit 1
}

title '部署完成 🎉'
