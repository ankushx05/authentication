package cookie

import (
	"net/http"
	"time"

	"connectrpc.com/connect"
)

type CookieManager struct {
	domain   string
	secure   bool
	sameSite http.SameSite
}

func NewCookieManager(domain string, secure bool) *CookieManager {
	return &CookieManager{
		domain:   domain,
		secure:   secure,
		sameSite: http.SameSiteLaxMode,
	}
}

func AddCookie(resp connect.AnyResponse, cookie *http.Cookie) {
	resp.Header().Add("Set-Cookie", cookie.String())
}

func (m *CookieManager) SetCookie(resp connect.AnyResponse, name, token string, expiry time.Duration) {
	cookie := &http.Cookie{
		Name:     name,
		Value:    token,
		Path:     "/",
		Expires:  time.Now().Add(expiry),
		Secure:   m.secure,
		SameSite: m.sameSite,
		HttpOnly: true,
		MaxAge:   int(expiry.Seconds()),
		Domain:   m.domain,
	}

	AddCookie(resp, cookie)
}

func (m *CookieManager) DeleteCookie(resp connect.AnyResponse, name string) {
	cookie := &http.Cookie{
		Name:     name,
		Value:    "",
		Path:     "/",
		Expires:  time.Now().Add(-24 * time.Hour),
		Secure:   m.secure,
		SameSite: m.sameSite,
		HttpOnly: true,
		MaxAge:   -1,
		Domain:   m.domain,
	}

	AddCookie(resp, cookie)
}
