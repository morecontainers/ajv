FROM    node:16 AS production
EXPOSE  80
WORKDIR /app
COPY    package.json package-lock.json app config schemas ./
RUN     npm ci
CMD     ["npm","start"]

FROM    node:16-alpine AS development
EXPOSE  80
RUN     apk add bash fish zsh zsh-vcs util-linux git-lfs
CMD     ["sleep","inf"]
