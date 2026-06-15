package bootstrap

import (
	"net/http"

	"github.com/ankushx05/authentication/internal/platform/config"
)

func NewHTTPServer(mux *http.ServeMux, cfg *config.Config) *http.Server {
	p := new(http.Protocols)
	p.SetHTTP1(true)
	p.SetUnencryptedHTTP2(true)

	s := &http.Server{
		Addr:      ":" + cfg.Port,
		Handler:   mux,
		Protocols: p,
	}

	return s
}
