.phony: install
install:
	- pnpm install

.phony: dev
dev:
	- pnpm run dev

.phony: build
build:
	- pnpm run build

.phony: preview
preview:
	- pnpm run preview