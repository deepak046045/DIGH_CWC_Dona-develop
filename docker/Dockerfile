# =============================================================================
# Build a base image
FROM node:18-alpine3.17 AS build-base
RUN apk add --no-cache build-base ca-certificates bash

# =============================================================================
# Image for installing node modules - to be copied over by other stages
FROM build-base AS all-node-modules

WORKDIR /usr/src/app
ARG ARTIFACTORY_ACCESS_TOKEN
COPY .npmrc package*.json ./
RUN npm ci && rm .npmrc

# =============================================================================
# Image for building the NextJS application (provides files that can be copied later)
FROM build-base as appbuilder

# Build the Next app
WORKDIR /usr/src/app
COPY --from=all-node-modules /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY ./public ./public
COPY ./src ./src
COPY *.ts *.js *.json ./
RUN npm run build

# =============================================================================
# Image Copying over the Required Folders to Test the Application

# !Tests need to be added to the image to be able to run them

# FROM appbuilder as test
# WORKDIR /usr/src/app
# CMD npm run test

# =============================================================================
# Build a base image of the production dependencies only
# Production image that only includes the source code for the Node server and the pre-build NextJS application
FROM node:18-alpine3.17 as prod
WORKDIR /usr/src/app

RUN apk add --no-cache ca-certificates bash
RUN wget https://github.com/Droplr/aws-env/raw/master/bin/aws-env-linux-amd64 -O /bin/aws-env -q && chmod +x /bin/aws-env

COPY --from=all-node-modules /usr/src/app/node_modules ./node_modules
COPY --from=appbuilder /usr/src/app/.next ./.next

COPY ./public ./public
COPY *.js *.json ./

RUN mkdir -p .next/cache/images
RUN chmod -R 777 .next

# Required for NPM 8 to run on a read-only FileSystem
RUN echo -e "offline\nlogs-max=0" > .npmrc

CMD npm start
