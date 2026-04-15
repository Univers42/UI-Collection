typecheck:
	npm run typecheck

lint:
	npm run lint

build:
	npm run build

pack-check:
	npm run pack:check

smoke:
	npm run smoke:package

quality: typecheck lint pack-check smoke
