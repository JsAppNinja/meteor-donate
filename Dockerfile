FROM node:6.10
LABEL maintainer="Anisuzzaman Khan <aniskhan001@gmail.com>"

RUN curl https://install.meteor.com/ | sh
RUN npm install -g forever

RUN mkdir /meteorapp
ADD . /meteorapp/app
WORKDIR /meteorapp/app

RUN cd /meteorapp/app && meteor npm install
RUN cd /meteorapp/app && meteor build --directory ../build --allow-superuser
RUN cd /meteorapp/build/bundle/programs/server && npm install

EXPOSE 80
ENV PORT 80

CMD ["forever", "--minUptime", "1000", "--spinSleepTime", "1000", "-o","/dev/stdout","-e", "/dev/stderr", "/meteorapp/build/bundle/main.js"]
