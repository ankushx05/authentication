package interceptors

import (
	"connectrpc.com/connect"
	"connectrpc.com/validate"
)

func GlobalInterceptors(interceptors ...connect.Interceptor) connect.Option {

	base := []connect.Interceptor{
		NewLoggingInterceptor(),
		NewErrorInterceptor(),
		validate.NewInterceptor(),
	}

	return connect.WithInterceptors(
		append(base, interceptors...)...,
	)
}
