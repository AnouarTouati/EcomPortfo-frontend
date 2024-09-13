FROM node:20
ARG NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5173
CMD  sh -c "npm run $(if [ "$NODE_ENV" = 'production' ] ; then echo 'build'; else echo 'dev';fi)"

# FROM nginx
# WORKDIR /usr/share/nginx/html
# COPY ./dist /usr/share/nginx/html
# EXPOSE 80