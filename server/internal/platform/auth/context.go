package auth

import (
	"context"
	"errors"
)

type contextKey string

const userClaimsKey contextKey = "user_claims"
const adminClaimsKey contextKey = "admin_claims"

type UserClaims struct {
	ID       string
	Email    string
	Username string
}

func WithUserClaims(ctx context.Context, claims *UserClaims) context.Context {
	return context.WithValue(ctx, userClaimsKey, claims)
}

func UserClaimsFrom(ctx context.Context) (*UserClaims, error) {
	claims, ok := ctx.Value(userClaimsKey).(*UserClaims)
	if !ok || claims == nil {
		return nil, errors.New("unauthenticated: no user claims in context")
	}
	return claims, nil
}

func WithAdminClaims(ctx context.Context, claims *UserClaims) context.Context {
	return context.WithValue(ctx, adminClaimsKey, claims)
}

func AdminClaimsFrom(ctx context.Context) (*UserClaims, error) {
	claims, ok := ctx.Value(adminClaimsKey).(*UserClaims)
	if !ok || claims == nil {
		return nil, errors.New("unauthenticated: no admin claims in context")
	}
	return claims, nil
}
