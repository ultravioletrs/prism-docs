# CVMs

:::note Base URL
`https://prism.ultraviolet.rs/backends`
:::

---

## Create CVM

### Endpoint

```http
POST /{domainID}/cvms/{provider}/{vcpu}/{cc_platform}
```

The url parameters are as follows:

- `<workspace_id>`: The ID of the workspace where the CVM will be created.
- `<provider>`: The backend provider to use for the CVM (supported are `azure`, `gcp`, `external` and `ultraviolet`).
- `<vcpu>`: The number of virtual CPUs to allocate for the CVM.
- `<ccPlatform>`: The cloud platform to use for the CVM, currently supported values are `Intel TDX` and `SEV SNP

### Body

```json
{
  "name": "example-cvm",
  "agent_log_level": "info"
}
```

### cURL Example

```bash
curl -X POST "https://prism.ultraviolet.rs/backends/c1adf32-3dac-4aad-bead-ae96fe071239/cvms/aws/2/sev-snp?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"example-cvm", "agent_log_level":"info"}'
```

### Response

```http
201 Created
```

---

## List CVMs

### Endpoint

```http
GET /{domainID}/cvms
```

#### Optional Query Parameters

- `limit`, `offset`, `name`, `status`, `days`, `cc_platform`

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/backends/c1adf32-3dac-4aad-bead-ae96fe071239/cvms?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&limit=10" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "cvms": [
    {
      "id": "cvm-123",
      "name": "example-cvm",
      "cvm_id": "cvm-123",
      "agent_url": "https://agent.example.com",
      "status": "running",
      "state": "provisioned",
      "created_at": "2025-07-17T09:00:00Z",
      "deleted_at": "0001-01-01T00:00:00Z",
      "provider": "aws",
      "vcpus": 2,
      "attestation": "base64-blob",
      "attestation_token": "base64-token",
      "agent_log_level": "info",
      "monthly_cost_estimate": "$12.34",
      "cc_platform": "sev-snp"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

---

## View CVM

### Endpoint

```http
GET /{domainID}/cvms/{id}
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/backends/c1adf32-3dac-4aad-bead-ae96fe071239/cvms/cvm-123?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "id": "cvm-123",
  "name": "example-cvm",
  "cvm_id": "cvm-123",
  "agent_url": "https://agent.example.com",
  "status": "running",
  "state": "provisioned",
  "created_at": "2025-07-17T09:00:00Z",
  "deleted_at": "0001-01-01T00:00:00Z",
  "provider": "aws",
  "vcpus": 2,
  "attestation": "base64-blob",
  "attestation_token": "base64-token",
  "agent_log_level": "info",
  "monthly_cost_estimate": "$12.34",
  "cc_platform": "sev-snp"
}
```

---

## Delete CVM

### Endpoint

```http
DELETE /{domainID}/cvms/{id}
```

### cURL Example

```bash
curl -X DELETE "https://prism.ultraviolet.rs/backends/c1adf32-3dac-4aad-bead-ae96fe071239/cvms/cvm-123?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Response

```http
204 No Content
```

---

## View CVM Statistics

### Endpoint

```http
GET /{domainID}/cvms/{id}/statistics
```

### Query Parameters

- `days`: duration window to retrieve stats

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/backends/c1adf32-3dac-4aad-bead-ae96fe071239/cvms/cvm-123/statistics?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&days=7" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "cvm_stats": [
    {
      "id": "stat-1",
      "cvm_id": "cvm-123",
      "timestamp": "2025-07-17T08:00:00Z",
      "status": true
    },
    {
      "id": "stat-2",
      "cvm_id": "cvm-123",
      "timestamp": "2025-07-16T08:00:00Z",
      "status": false
    }
  ]
}
```

---

## Fetch Attestation Policy

### Endpoint

```http
GET /{domainID}/cvms/{id}/attestation_policy
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/backends/c1adf32-3dac-4aad-bead-ae96fe071239/cvms/cvm-123/attestation_policy?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "attestation_policy": "base64-policy-blob"
}
```
