package jwt

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// TokenService handles JWT token generation and validation.
type TokenService[T any] struct {
	secretKey []byte
	issuer    string
	expiry    time.Duration
}

type Claims[T any] struct {
	Payload T `json:"payload"`
	jwt.RegisteredClaims
}

func NewTokenService[T any](secretKey string, issuer string, expiryHours int) *TokenService[T] {
	return &TokenService[T]{
		secretKey: []byte(secretKey),
		issuer:    issuer,
		expiry:    time.Duration(expiryHours) * time.Hour,
	}
}

func (s *TokenService[T]) Expiry() time.Duration {
	return s.expiry
}

func (s *TokenService[T]) GenerateToken(payload T) (string, error) {
	now := time.Now()
	claims := &Claims[T]{
		Payload: payload,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    s.issuer,
			ExpiresAt: jwt.NewNumericDate(now.Add(s.expiry)),
			IssuedAt:  jwt.NewNumericDate(now),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.secretKey)
}

func (s *TokenService[T]) ValidateToken(tokenString string) (*Claims[T], error) {
	token, err := jwt.ParseWithClaims(
		tokenString, &Claims[T]{},
		func(token *jwt.Token) (any, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("invalid signing method")
			}
			return s.secretKey, nil
		},
	)

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*Claims[T])
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
