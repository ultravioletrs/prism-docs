# Computations Invitations

For a user to be able to run a computation, they need to be invited to the computation by the computation admin. To accept an invitation, the user needs to upload a certificate that will be used as a means of verification within the computation environment and will be passed to the agent.

## Send Invitation to User

To send an invitation to a user to join a computation, we need to provide the following:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/invitations -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "<name>",
  "description": "<description>",
  "datasets": [
    "<dataset_1>", ..., "[dataset_N]"
  ],
  "algorithms": [
    "<algorithm_1>", ..., "[algorithm_N]"
  ],
  ],
  "owner": "<owner>",
  "datasetProviders": [
    "<dataset_provider_1>", ..., "[dataset_provider_N]"
  ],
  "algorithmProviders": [
    "<algorithm_provider_1>", ..., "[algorithm_provider_N]"
  ],
  "ttl": <ttl>,
  "metadata": {}
}
EOF
```

Example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/computations -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "Machine Diagnostics Analysis",
  "description": "Performing diagnostics analysis on machine data",
  "datasets": [
    "Sensor Data Logs", "Machine Health Records", "Maintenance Reports"
  ],
  "algorithms": [
    "Support Vector Machines"
  ],
  "dataset_providers": [
    "SensorTech Solutions", "Machinery Data Systems"
  ],
  "algorithm_providers": [
    "AlgoAI Research Labs", "TechBots Innovations", "IntelliCompute Technologies"
  ],
  "result_consumers": [
    "Machine Maintenance Department", "Predictive Analytics Team", "Industrial Automation Division"
  ],
  "ttl": 48,
  "metadata": {
    "machine_type": "Automated Assembly Line",
    "industry": "Manufacturing",
    "data_frequency": "Hourly",
    "analysis_purpose": "Optimize machine performance and prevent downtime"
  }
}
EOF
```

## View Invitation

To retrieve a specific invitation for a user to join a computation, identified by the user ID and computation ID:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/invitations/{user_id}/{computation_id} \
-H "Authorization: Bearer <user_token>"
```

### Example

```bash
curl -sSiX GET https://prism.ultraviolet.rs/invitations/bb7edb32-2eac-4aad-aebe-ed96fe073879/bb7edb32-2eac-4aad-aebe-ed96fe073879 \
-H "Authorization: Bearer <user_token>"
```

Expected Response:

```json
{
  "invited_by": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
  "user_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
  "computation_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
  "relation": "editor",
  "created_at": "2019-11-26T13:31:52Z",
  "confirmed_at": "2019-11-26T13:31:52Z"
}
```

## Accept Invitation

To accept an invitation to a computation, a user uploads a certificate for verification:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/invitations/accept \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <user_token>" \
-d '{"computation_id":"<computation_id>"}'
```

Example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/invitations/accept \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <user_token>" \
-d '{"computation_id":"bb7edb32-2eac-4aad-aebe-ed96fe073879"}'
```

Expected Response:

HTTP status code 200 OK with no content.

## List Invitations

To list all invitations:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/invitations \
-H "Authorization: Bearer <user_token>"
```

Example:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/invitations \
-H "Authorization: Bearer <user_token>"
```

Expected Response:

```json
{
  "invitations": [
    {
      "invited_by": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
      "user_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
      "computation_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
      "relation": "editor",
      "created_at": "2019-11-26T13:31:52Z"
    }
  ],
  "total": 1,
  "offset": 0,
  "limit": 10
}
```

## Delete Invitation

To delete a specific invitation:

```bash
curl -sSiX DELETE https://prism.ultraviolet.rs/invitations/{user_id}/{computation_id} \
-H "Authorization: Bearer <user_token>"
```

Example:

```bash
curl -sSiX DELETE https://prism.ultraviolet.rs/invitations/bb7edb32-2eac-4aad-aebe-ed96fe073879/bb7edb32-2eac-4aad-aebe-ed96fe073879 \
-H "Authorization: Bearer <user_token>"
```

Response:

HTTP status code 204 No Content.
