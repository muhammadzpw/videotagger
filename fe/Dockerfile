FROM registry.gitlab.com/unilever-jarvis/jarvis-app/infra/ci-base-img:0.0.1

COPY . .

RUN npm i && \
  npm run build

CMD [ "npm", "run", "start:docker" ]
