FROM node:20-alpine

WORKDIR /usr/src/app
ENV NODE_ENV=development
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

RUN apk add --no-cache git bash \
 && npm install -g nodemon --no-audit --no-fund

COPY dev-entrypoint.sh /usr/local/bin/dev-entrypoint.sh
RUN chmod +x /usr/local/bin/dev-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/dev-entrypoint.sh"]
