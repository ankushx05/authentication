.PHONY: run build ent-gen ent-new

# Run the server
run:
	go run ./cmd/api

# Build the server binary
build:
	go build -o ./bin/server ./cmd/api

migrate:
	go run ./cmd/migration

# ---- Ent ORM ----
ENT_PATH=./internal/platform/database/ent

ent-gen:
	go run entgo.io/ent/cmd/ent generate $(ENT_PATH)/schema

ent-new:
	@if [ -z "$(name)" ]; then \
		echo "Usage: make ent-new name=User"; \
		exit 1; \
	fi
	go run entgo.io/ent/cmd/ent new $(name) --target $(ENT_PATH)/schema