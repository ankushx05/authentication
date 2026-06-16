package config

import (
	"fmt"
	"log"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
)

type Config struct {
	Port        string `env:"PORT" envDefault:"8080"`
	DatabaseURL string `env:"DATABASE_URL" required:"true"`
}

func Load() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error reading it, falling back to environment variables")
	}

	cfg := &Config{}

	if err := env.Parse(cfg); err != nil {
		return nil, fmt.Errorf("❌ failed to parse environment variables: %w", err)
	}

	return cfg, nil

}
