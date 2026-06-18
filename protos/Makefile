gen-server:
	buf generate

gen-client-web:
	buf generate --template buf.gen.web.yaml

gen-client-admin:
	buf generate --template buf.gen.admin.yaml

gen: gen-server gen-client-web gen-client-admin
	@echo "✅ Generation complete."

dep-update:
	buf dep update

lint:
	buf lint

format:
	buf format -w
	