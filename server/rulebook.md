# Server Rulebook

## General Principles
- Use Go standard library where possible to minimize dependencies.
- Handle errors gracefully and always use the custom logger for consistent output.
- Keep routes clean and modular.

## Logging
- Use the provided logger package for all logging (`logger.Info`, `logger.Warn`, `logger.Error`, `logger.Success`).
- Never use raw `fmt.Print` for application logs in production routes.

## Routing
- All API routes should be prefixed with `/api/v1/`.
- Ensure CORS is handled correctly for the extension.
