package interceptors

import (
	"context"
	"errors"

	"connectrpc.com/connect"
	"github.com/ankushx05/authentication/internal/modules/identity/domain"
	"github.com/ankushx05/authentication/internal/platform/auth"
	"github.com/ankushx05/authentication/internal/platform/cookie"
	"github.com/ankushx05/authentication/internal/platform/jwt"
)

func NewAdminAuthInterceptor(tokenService *jwt.TokenService[domain.TokenPayload]) connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			// Extract token from the cookie header
			token := extractTokenFromCookie(req.Header(), cookie.AdminAccessTokenCookie)

			if token == "" {
				return nil, connect.NewError(connect.CodeUnauthenticated, errors.New("authorization token is required"))
			}

			// Validate the JWT
			claims, err := tokenService.ValidateToken(token)
			if err != nil {
				return nil, connect.NewError(connect.CodeUnauthenticated, err)
			}

			// Inject user claims into the context
			ctx = auth.WithAdminClaims(ctx, &auth.UserClaims{
				ID:       claims.Payload.ID,
				Email:    claims.Payload.Email,
				Username: claims.Payload.Username,
			})

			return next(ctx, req)
		}
	}
}

func AdminInterceptors(tokenService *jwt.TokenService[domain.TokenPayload]) connect.Option {
	return GlobalInterceptors(
		NewAdminAuthInterceptor(tokenService),
	)
}
