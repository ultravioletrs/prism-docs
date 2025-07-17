# Authentication & Workspaces

**Base URL**

```
https://prism.ultraviolet.rs
```

---

## Register a New User

**Endpoint**

```
POST /users
```

**Body**

```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "janedoe@example.com",
  "tags": ["developer", "backend"],
  "credentials": {
    "username": "janedoe",
    "secret": "securepassword"
  },
  "metadata": {
    "location": "Paris"
  },
  "profile_picture": "https://example.com/janedoe.jpg",
  "status": "enabled"
}
```

**cURL Example**

```bash
curl -X POST https://prism.ultraviolet.rs/users \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

**Sample Response**

```json
{
  "id": "b7edb32-2eac-4aad-aebe-ed96fe073879",
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "janedoe@example.com",
  "credentials": {
    "username": "janedoe"
  },
  "tags": ["developer", "backend"],
  "metadata": {
    "location": "Paris"
  },
  "profile_picture": "https://example.com/janedoe.jpg",
  "status": "enabled",
  "created_at": "2025-02-11T16:15:12Z",
  "updated_at": "2025-02-11T16:15:12Z"
}
```

---

## Login and Get Access Token

**Endpoint**

```
POST /users/tokens/issue
```

**cURL Example**

```bash
curl -X POST https://prism.ultraviolet.rs/users/tokens/issue \
  -H "Content-Type: application/json" \
  -d '{
    "username": "<username>",
    "password": "<password>"
  }'
```

**Sample Response**

```json
{
  "access_token": "<jwt-access-token>",
  "refresh_token": "<jwt-refresh-token>"
}
```

---

## Refresh Access Token

**Endpoint**

```
POST /users/tokens/refresh
```

**cURL Example**

```bash
curl -X POST https://prism.ultraviolet.rs/users/tokens/refresh \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <refresh_token>"
```

**Sample Response**

```json
{
  "access_token": "<new-access-token>",
  "refresh_token": "<new-refresh-token>",
  "access_type": "Bearer"
}
```

---

## List All Users

**Endpoint**

```
GET /users
```

**cURL Example**

```bash
curl -X GET https://prism.ultraviolet.rs/users \
  -H "Authorization: Bearer <access_token>"
```

**Sample Response**

```json
{
  "limit": 5,
  "offset": 0,
  "total": 2,
  "users": [
    {
      "id": "b7edb32-2eac-4aad-aebe-ed96fe073879",
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "janedoe@example.com",
      "credentials": { "username": "janedoe" },
      "status": "enabled"
    },
    {
      "id": "c1adf32-3dac-4aad-bead-ae96fe071239",
      "first_name": "John",
      "last_name": "Smith",
      "email": "johnsmith@example.com",
      "credentials": { "username": "johnsmith" },
      "status": "disabled"
    }
  ]
}
```

---

# 🏢 Workspace API

## Create Workspace

**Endpoint**

```
POST /auth/domains
```

**Body**

```json
{
  "name": "workspace 1",
  "alias": "proj1"
}
```

**cURL Example**

```bash
curl -X POST https://prism.ultraviolet.rs/auth/domains/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <user_token>" \
  -d '{ "name": "workspace 1", "alias": "proj1" }'
```

**Sample Response**

```json
{
  "id": "fda88db8-97e1-4560-8db1-29e8a40b5d0c",
  "name": "workspace 1",
  "alias": "org1",
  "status": "enabled",
  "created_by": "0dce22c6-1a94-4a8e-a701-185a4c37df58",
  "created_at": "2024-04-30T13:17:32.884558Z",
  "updated_at": "0001-01-01T00:00:00Z"
}
```

> Use the `id` field from the response as the domain ID for all future API calls scoped to this workspace.
