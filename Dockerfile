FROM node:10.15.0

RUN apt-get update && apt-get install -y rsync

RUN echo 'PS1="\u@${PROJECT_NAME:-noProject}/${SERVICE_NAME:-noService}:\w# "' >> ~/.bashrc

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . /usr/src/app/

#RUN npm run build:production

#CMD [ "npm", "run", "start:production" ]
CMD [ "npm", "run", "start:dev" ]
