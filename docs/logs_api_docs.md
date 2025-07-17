# Computation Logs

:::note Base URL
`https://prism.ultraviolet.rs/computations`
:::

---

## List Logs for a Computation

### Endpoint

```http
GET /{domainID}/computations/{id}/logs
```

### Query Parameters

- `limit`, `offset`, `from`, `to`, `level`, `message`, etc.

### cURL Example

```bash
curl -X GET "https://prism.ultraviolet.rs/computations/c1adf32-3dac-4aad-bead-ae96fe071239/computations/comp-123/logs?domainID=c1adf32-3dac-4aad-bead-ae96fe071239&limit=20&level=error" \
  -H "Authorization: Bearer <token>"
```

### Sample Response

```json
{
  "logs": [
    {
      "run_id": "run-001",
      "level": "error",
      "message": "Computation failed due to timeout.",
      "timestamp": "2025-07-17T10:20:00Z"
    },
    {
      "run_id": "run-001",
      "level": "info",
      "message": "Computation started.",
      "timestamp": "2025-07-17T10:00:00Z"
    }
  ],
  "limit": 20,
  "offset": 0,
  "total": 2
}
```
