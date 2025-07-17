# Assets

:::note Base URL
`https://prism.ultraviolet.rs/computations`
:::

---

## Create Asset

### Endpoint

```http
POST /{domainID}/assets
```

### Body

```json
{
  "asset": {
    "file_name": "example.csv",
    "description": "Training data",
    "asset_type": "dataset",
    "mime_type": "text/csv",
    "asset": "base64-encoded-blob",
    "user_key": "base64-encoded-key"
  }
}
```

### cURL Example

```bash
curl -X POST "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/assets?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

### Response

```http
201 Created
```

---

## List Assets

### Endpoint

```http
GET /{domainID}/assets
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/assets?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&limit=10" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "assets": [
    {
      "id": "asset-123",
      "file_name": "example.csv",
      "description": "Training data",
      "asset_type": "dataset",
      "mime_type": "text/csv",
      "created_at": "2025-07-17T08:00:00Z"
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 1
}
```

---

## Retrieve Asset

### Endpoint

```http
GET /{domainID}/assets/{id}
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/assets/asset-123?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

---

## Update Asset

### Endpoint

```http
PUT /{domainID}/assets/{id}
```

### Body

```json
{
  "asset": {
    "file_name": "example.csv",
    "description": "Training data",
    "asset_type": "dataset",
    "mime_type": "text/csv",
    "asset": "base64-encoded-blob",
    "user_key": "base64-encoded-key"
  }
}
```

### cURL Example

```bash
curl -X PUT "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/assets/asset-123?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

---

## Delete Asset

### Endpoint

```http
DELETE /{domainID}/assets/{id}
```

### cURL Example

```bash
curl -X DELETE "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/assets/asset-123?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Response

```http
204 No Content
```

---

## Associate Asset to Computation

### Endpoint

```http
POST /{domainID}/assets/{assetID}/{computationID}
```

### cURL Example

```bash
curl -X POST "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/assets/asset-123/comp-456?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

---

## Retrieve Asset Computations

### Endpoint

```http
GET /{domainID}/assets/{assetID}/computations
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/assets/asset-123/computations?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

---

## Unlink Asset from Computation

### Endpoint

```http
PUT /{domainID}/assets/{assetID}/{computationID}
```

### cURL Example

```bash
curl -X PUT "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/assets/asset-123/comp-456?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```
