package errors

import "fmt"

type (
	// NotFoundError indicates a requested resource does not exist.
	NotFoundError struct {
		Resource string
		ID       string
	}

	// AlreadyExistsError indicates a resource with the given identifier already exists.
	AlreadyExistsError struct {
		Resource string
		Field    string
		Value    string
	}

	// ValidationError indicates the input failed validation.
	ValidationError struct {
		Field   string
		Message string
	}

	// UnauthorizedError indicates the caller is not authenticated.
	UnauthorizedError struct {
		Message string
	}

	// ForbiddenError indicates the caller lacks permission.
	ForbiddenError struct {
		Message string
	}

	// InternalError wraps an unexpected internal failure.
	InternalError struct {
		Err error
	}
)

// --- Error() implementations ---

func (e *NotFoundError) Error() string {
	return fmt.Sprintf("%s not found: %s", e.Resource, e.ID)
}

func (e *AlreadyExistsError) Error() string {
	return fmt.Sprintf("%s already exists with %s: %s", e.Resource, e.Field, e.Value)
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error on field %s: %s", e.Field, e.Message)
}

func (e *UnauthorizedError) Error() string {
	if e.Message != "" {
		return e.Message
	}
	return "unauthorized"
}

func (e *ForbiddenError) Error() string {
	if e.Message != "" {
		return e.Message
	}
	return "forbidden"
}

func (e *InternalError) Error() string {
	return fmt.Sprintf("internal error: %v", e.Err)
}

func (e *InternalError) Unwrap() error {
	return e.Err
}

// --- Constructors ---

func NewNotFound(resource, id string) *NotFoundError {
	return &NotFoundError{Resource: resource, ID: id}
}

func NewAlreadyExists(resource, field, value string) *AlreadyExistsError {
	return &AlreadyExistsError{Resource: resource, Field: field, Value: value}
}

func NewValidation(field, message string) *ValidationError {
	return &ValidationError{Field: field, Message: message}
}

func NewUnauthorized(message string) *UnauthorizedError {
	return &UnauthorizedError{Message: message}
}

func NewForbidden(message string) *ForbiddenError {
	return &ForbiddenError{Message: message}
}

func NewInternal(err error) *InternalError {
	return &InternalError{Err: err}
}
