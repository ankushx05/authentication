package bootstrap

import (
	"net/http"

	"github.com/ankushx05/authentication/internal/platform/config"
)

func NewHTTPServer(handler http.Handler, cfg *config.Config) *http.Server {
	p := new(http.Protocols)
	p.SetHTTP1(true)
	p.SetUnencryptedHTTP2(true)

	s := &http.Server{
		Addr:      ":" + cfg.Port,
		Handler:   handler,
		Protocols: p,
	}

	return s
}
