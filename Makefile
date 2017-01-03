NODE_BIN 		 = node_modules/.bin
TEST         = ./test/unit/*.test.jsx
PROD_ENV		 = production
MOCHA_OPTS   = --require test/setup.js --compilers jsx:./test/compiler.js -b --timeout 20000 --reporter spec
WEBPACK_OPTS = --config ./webpack.production.config.js --progress --profile --colors

lint:
	@echo Linting...
	@$(NODE_BIN)/eslint --debug ./app/**/*.js*

test: lint
	@echo Running tests...
	@$(NODE_BIN)/istanbul cover $(NODE_BIN)/mocha $(MOCHA_OPTS) $(TEST)

build: lint
	@echo Building app...
	@$(NODE_BIN)/rimraf dist && cross-env NODE_ENV=$(PROD_ENV) webpack $(WEBPACK_OPTS)

start:
	@echo Starting...
	@node server.js
