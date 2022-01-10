.PHONY: build clean push

IMAGE_TAG:=$(shell git rev-parse --short HEAD)
ENV:=$(shell git branch --show-current)

build-prod: Dockerfile.prod
	docker build -f Dockerfile.prod . -t ${COMPONENT}:${IMAGE_TAG}


build-dev: Dockerfile.dev
	docker build -f Dockerfile.dev . -t ${COMPONENT}:${IMAGE_TAG}


build-stage: Dockerfile.stage
	docker build -f Dockerfile.stage . -t ${COMPONENT}:${IMAGE_TAG}
