package middleware

import (
	"net/http"
	"strings"

	connectcors "connectrpc.com/cors"
	"github.com/rs/cors"
)

func WithCORS(allowedOriginsStr string) func(http.Handler) http.Handler {

	var allowedOrigins []string
	for o := range strings.SplitSeq(allowedOriginsStr, ",") {
		trimmed := strings.TrimSpace(o)
		if trimmed != "" {
			allowedOrigins = append(allowedOrigins, trimmed)
		}
	}

	return func(next http.Handler) http.Handler {
		c := cors.New(cors.Options{
			AllowedOrigins:   allowedOrigins,
			AllowedMethods:   connectcors.AllowedMethods(),
			AllowedHeaders:   connectcors.AllowedHeaders(),
			ExposedHeaders:   connectcors.ExposedHeaders(),
			AllowCredentials: true,
		})
		return c.Handler(next)
	}
}
