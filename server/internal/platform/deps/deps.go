package deps

import (
	"github.com/ankushx05/authentication/internal/platform/config"
	"github.com/ankushx05/authentication/internal/platform/cookie"
	"github.com/ankushx05/authentication/internal/platform/database/ent"
)

type Deps struct {
	DB     *ent.Client
	Config *config.Config
	Cookie *cookie.CookieManager
}
