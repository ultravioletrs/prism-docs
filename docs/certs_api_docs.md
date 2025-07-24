# Certs

:::note Base URL
`https://prism.ultraviolet.rs/certs`
:::

---

## Issue Certificate

### Endpoint

```http
POST /{domainID}/certs/issue/cvm/{entityID}
```

### Body

```json
{
  "ip_addresses": ["10.0.0.1"]
}
```

### cURL Example

```bash
curl -X POST "https://prism.ultraviolet.rs/certs/c1adf32-3dac-4aad-bead-ae96fe071239/certs/issue/computation/comp-123?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ "ip_addresses": ["10.0.0.1"] }'
```

### Response

```http
201 Created
```

---

## Renew Certificate

### Endpoint

```http
PATCH /{domainID}/certs/{serialNumber}/renew
```

### cURL Example

```bash
curl -X PATCH "https://prism.ultraviolet.rs/certs/c1adf32-3dac-4aad-bead-ae96fe071239/certs/serial-abc/renew?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

---

## Revoke Certificate

### Endpoint

```http
PATCH /{domainID}/certs/{serialNumber}/revoke
```

### cURL Example

```bash
curl -X PATCH "https://prism.ultraviolet.rs/certs/c1adf32-3dac-4aad-bead-ae96fe071239/certs/serial-abc/revoke?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

---

## List Certificates

### Endpoint

```http
GET /{domainID}/certs
```

### Query Parameters

- `limit`, `offset`, `entity_id`

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/certs/c1adf32-3dac-4aad-bead-ae96fe071239/certs?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&limit=10" \
  -H "Authorization: Bearer <token>"
```

---

## Delete Certificates

### Endpoint

```http
DELETE /{domainID}/certs
```

### Query Parameters

- `entity_id`, `domainID`

### cURL Example

```bash
curl -X DELETE "https://prism.ultraviolet.rs/certs/c1adf32-3dac-4aad-bead-ae96fe071239/certs?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&entity_id=comp-123" \
  -H "Authorization: Bearer <token>"
```

### Response

```http
204 No Content
```

---

## Retrieve Certificate Download Token

### Endpoint

```http
GET /{domainID}/certs/{serialNumber}/download/token
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/certs/c1adf32-3dac-4aad-bead-ae96fe071239/certs/serial-abc/download/token?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{ "token": "cert-download-token" }
```

---

## Download Certificate Files

### Endpoint

```http
GET /{domainID}/certs/{entityID}/download?downloadToken={token}
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/certs/c1adf32-3dac-4aad-bead-ae96fe071239/certs/comp-123/download?downloadToken=cert-download-token&domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "certificate": "base64-cert",
  "private_key": "base64-key",
  "ca": "base64-ca"
}
```

---

## Download CA Certificates

### Step 1: Retrieve CA Token

```bash
curl -X GET "https://prism.ultraviolet.rs/certs/certs/get-ca/token" \
  -H "Authorization: Bearer <token>"
```

### Step 2: Download CA File

```bash
curl -X GET "https://prism.ultraviolet.rs/certs/certs/download-ca?token=ca-token" \
  -H "Authorization: Bearer <token>"
```

### Response

```http
(binary .zip or .pem file content)
```
