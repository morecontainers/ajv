FROM    node:16-slim AS production
EXPOSE  80
COPY    .       /app/
WORKDIR /app
RUN     npm ci
CMD     ["npm","start"]

FROM    node:16-alpine AS development
EXPOSE  80
RUN     apk add bash fish zsh zsh-vcs util-linux git-lfs
CMD     ["sleep","inf"]
