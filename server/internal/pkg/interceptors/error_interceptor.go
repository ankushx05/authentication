package interceptors

import (
	"context"
	"errors"
	"fmt"

	"connectrpc.com/connect"
	domainerrors "github.com/ankushx05/authentication/internal/pkg/errors"
)

func NewErrorInterceptor() connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			resp, err := next(ctx, req)
			if err == nil {
				return resp, nil
			}

			// If it's already a *connect.Error (e.g. from protovalidate interceptor),
			// let it pass through unchanged.
			var connectErr *connect.Error
			if errors.As(err, &connectErr) {
				return nil, connectErr
			}

			// Map each domain error type to its Connect status code.
			return nil, toConnectError(err)
		}
	}
}

func toConnectError(err error) *connect.Error {
	var (
		notFoundErr      *domainerrors.NotFoundError
		alreadyExistsErr *domainerrors.AlreadyExistsError
		validationErr    *domainerrors.ValidationError
		unauthorizedErr  *domainerrors.UnauthorizedError
		forbiddenErr     *domainerrors.ForbiddenError
		internalErr      *domainerrors.InternalError
	)

	switch {
	case errors.As(err, &notFoundErr):
		return connect.NewError(connect.CodeNotFound, err)

	case errors.As(err, &alreadyExistsErr):
		return connect.NewError(connect.CodeAlreadyExists, err)

	case errors.As(err, &validationErr):
		return connect.NewError(connect.CodeInvalidArgument, err)

	case errors.As(err, &unauthorizedErr):
		return connect.NewError(connect.CodeUnauthenticated, err)

	case errors.As(err, &forbiddenErr):
		return connect.NewError(connect.CodePermissionDenied, err)

	case errors.As(err, &internalErr):
		return connect.NewError(connect.CodeInternal, fmt.Errorf("internal server error"))

	default:
		return connect.NewError(connect.CodeInternal, fmt.Errorf("an unexpected error occurred"))
	}
}
