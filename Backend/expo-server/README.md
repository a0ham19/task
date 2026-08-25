# Expo mock server

Small in-memory Express API for an Expo client. Data resets whenever the server restarts.

## Run

```bash
npm install
npm start
```

The server listens on port `3003` and binds to `0.0.0.0`, which allows a physical Expo device on the same network to reach it.

## Routes

- `GET /health`
- `GET /api/todos`
- `GET /api/todos/:id`
- `POST /api/todos` with `{ "title": "..." }`
- `PATCH /api/todos/:id` with `title` and/or `is_completed`
- `DELETE /api/todos/:id`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users` with `{ "name": "...", "email": "..." }`

For a physical device, replace `localhost` in the Expo API URL with the computer's local network IP address.
