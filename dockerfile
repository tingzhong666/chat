# 使用官方的 Node.js 镜像作为基础镜像
FROM node:18.17.1

# 设置工作目录
WORKDIR /home/chat

# 复制应用程序的源代码到镜像中 
COPY db .
COPY fronted/dist fronted/dist
COPY http_server http_server
COPY socket_server socket_server
COPY config.js .
COPY package.json .

# 安装应用程序的依赖
RUN npm install

# 暴露应用程序运行的端口
EXPOSE 8080


# 设置工作目录
WORKDIR /home/chat/http_server
# 定义应用程序启动命令
CMD [ "node", "app.js" ]
