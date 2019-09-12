# Auth

## The login logic with auth guard

- Client POST `/auth/login` with username and password
- If it passes the `AuthGuard` implmented with `LocalStrategy` supported by `AuthService`
- It proceed to the `AuthController`, which will trigger `JwtStrategy` supported by `AuthService`
- `accessToken` returned to the client
- It can be used to pass the `AuthGuard` implmented with `JwtStrategy`
- If `Authorization` record in headers like `bearer theVery.10ng@ceesst0ken`.
