gen-server:
	buf generate

gen-client:
	buf generate --template buf.gen.web.yaml

gen: gen-server gen-client
	@echo "✅ Generation complete."

dep-update:
	buf dep update

lint:
	buf lint

format:
	buf format -w
	