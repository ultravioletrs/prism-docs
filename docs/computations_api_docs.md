# Computations

:::note Base URL
`https://prism.ultraviolet.rs/computations`
:::

---

## Create Computation

### Endpoint

```http
POST /{domainID}/computations
```

### Body

```json
{
  "name": "experiment-001",
  "description": "Testing new algorithm",
  "owner": "user-abc",
  "agent_config": {
    "log_level": "info",
    "cert_file": "cert.pem",
    "server_key": "key.pem",
    "server_ca_file": "ca.pem",
    "client_ca_file": "client-ca.pem",
    "attested_tls": true
  }
}
```

### cURL Example

```bash
curl -X POST "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

### Response

```http
201 Created
HX-Location: /computations/{id}
```

---

## List Computations

### Endpoint

```http
GET /{domainID}/computations
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&limit=10" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "computations": [
    {
      "id": "comp-123",
      "name": "experiment-001",
      "description": "Test run",
      "owner": "user-abc",
      "status": "completed",
      "created_at": "2025-07-17T08:00:00Z"
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 1
}
```

---

## Get Computation

### Endpoint

```http
GET /{domainID}/computations/{id}?peek={true|false}
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&peek=true" \
  -H "Authorization: Bearer <token>"
```

---

## Update Computation

### Endpoint

```http
PUT /{domainID}/computations/{id}
```

### Body

```json
{
  "name": "experiment-001",
  "description": "Testing new algorithm",
  "owner": "user-abc",
  "agent_config": {
    "log_level": "info",
    "cert_file": "cert.pem",
    "server_key": "key.pem",
    "server_ca_file": "ca.pem",
    "client_ca_file": "client-ca.pem",
    "attested_tls": true
  }
}
```

### cURL Example

```bash
curl -X PUT "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

---

## Delete Computation

### Endpoint

```http
DELETE /{domainID}/computations/{id}
```

### cURL Example

```bash
curl -X DELETE "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Response

```http
204 No Content
```

---

## Run Computation

### Endpoint

```http
POST /{domainID}/computations/{id}/run?cvm={cvmID}
```

### cURL Example

```bash
curl -X POST "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/run?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&cvm=cvm-123" \
  -H "Authorization: Bearer <token>"
```

### Response

```json
"run-id-string"
```

---

## View Computation Run

### Endpoint

```http
GET /{domainID}/computations/{id}/run
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/run?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

---

## Retrieve All Runs

### Endpoint

```http
GET /{domainID}/computations/runs
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/runs?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

---

## Computation Stats

### Endpoint

```http
GET /{domainID}/computations/statistics?days=7
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/statistics?days=7&domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "comp_stats": [
    { "day": "2025-07-16", "status": "completed", "count": 4 },
    { "day": "2025-07-17", "status": "failed", "count": 1 }
  ]
}
```

---

## Add User Key

### Endpoint

```http
POST /{domainID}/computations/{id}/key
```

### Body

```json
{ "key": "base64-encoded-ssh-key" }
```

### cURL Example

```bash
curl -X POST "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/key?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ "key": "base64..." }'
```

---

## Check Key Uploaded

### Endpoint

```http
GET /{domainID}/computations/{id}/key
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/key?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

---

## Dry Run

### Endpoint

```http
POST /{domainID}/computations/{id}/dryrun
```

### cURL Example

```bash
curl -X POST "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/dryrun?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "missing_items": {
    "keys": ["key1"],
    "hashes": ["hash1"],
    "info": ["Missing algorithm"]
  }
}
```

---

## Stop Computation

### Endpoint

```http
GET /{domainID}/computations/{id}/stop
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/stop?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

---

## View Manifest

### Endpoint

```http
GET /{domainID}/computations/{id}/manifest
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/manifest?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```
