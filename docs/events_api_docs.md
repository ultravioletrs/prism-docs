# Computation Events

:::note Base URL
`https://prism.ultraviolet.rs/computations`
:::

---

## List Events for a Computation

### Endpoint

```http
GET /{domainID}/computations/{id}/events
```

### Query Parameters

- `limit`, `offset`, `from`, `to`, `status`, etc.

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/events?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&limit=10" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "events": [
    {
      "id": "evt-001",
      "event_type": "started",
      "details": "base64-encoded-details",
      "run_id": "run-001",
      "timestamp": "2025-07-17T10:00:00Z",
      "originator": "user-abc",
      "cvm_id": "cvm-123",
      "status": "success"
    }
  ],
  "limit": 10,
  "offset": 0,
  "total": 1
}
```

---

## View Latest Event for a Computation

### Endpoint

```http
GET /{domainID}/computations/{id}/status
```

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/status?domainID=c1adf32-3dac-4aad-bead-ae96fe071239" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "id": "evt-001",
  "event_type": "completed",
  "details": "base64-encoded-summary",
  "run_id": "run-001",
  "timestamp": "2025-07-17T11:00:00Z",
  "originator": "system",
  "cvm_id": "cvm-123",
  "status": "success"
}
```
