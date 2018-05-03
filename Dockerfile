#
# Ubuntu Node.js Dockerfile
# https://gist.github.com/RinatMullayanov/89687a102e696b1d4cab#file-dockerfile-L17
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
#

# Pull base image.
FROM node:carbon

# Defines environment variables
ENV SERVER_PORT 7890
ENV PRJ_DIR /home/SorryPress

# 复制项目文件
COPY . $PRJ_DIR

# 使用国内中科大镜像源加快apt速度
COPY ./sources.list /etc/apt/sources.list

# 安装ffmpeg相关
RUN apt-get update
RUN apt-get install -y locales locales-all ttf-wqy-microhei ffmpeg

# Binds to port
EXPOSE $SERVER_PORT

# Define working directory.
WORKDIR $PRJ_DIR

# Install app dependencies
RUN npm i -g pm2 npm-run-all
RUN npm run all:install

# Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD npm start && pm2 log 0
