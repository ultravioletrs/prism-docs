# Policies

## Computations Policies

### Add Computation Policies

_Only_ admin or the owner of the computation can use `/policies` endpoint.

```bash
curl -sSiX POST https://prism.ultraviolet.rs/computations/policies -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "user": "<user_id>",
  "computation": "<computation_id>",
  "role": ["<role_1>", ..., "<role_N>"]
}
EOF
```

For example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/computations/policies -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "user": "47887629-7b4c-4bf5-b414-35bb2a5f5f23",
  "computation": "306d5348-4865-42df-91e3-b292cc94387f",
  "role": ["view"]
}
EOF

HTTP/1.1 201 Created
Content-Length: 0
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:20:34 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block
```

### Updating Computation Policies

The admin or the owner of the computation can update the policy.

```bash
curl -sSiX PUT https://prism.ultraviolet.rs/computations/policies -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "user": "<user_id>",
  "computation": "<computation_id>",
  "role": ["<role_1>", ..., "<role_N>"]
}
EOF
```

For example:

```bash
curl -sSiX PUT https://prism.ultraviolet.rs/computations/policies -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "user": "47887629-7b4c-4bf5-b414-35bb2a5f5f23",
  "computation": "306d5348-4865-42df-91e3-b292cc94387f",
  "role": ["view", "run"]
}
EOF

HTTP/1.1 200 OK
Content-Length: 0
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:20:48 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block
```

### Lisiting Computation Policies

As an admin, you can list all the policies, while as a user you can only list your own policies.

```bash
curl -isSX GET https://prism.ultraviolet.rs/computations/policies -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -isSX GET https://prism.ultraviolet.rs/computations/policies -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Length: 344
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:20:59 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
  "limit": 10,
  "total": 1,
  "policies": [
    {
      "owner": "11a2a5ba-723a-4b6d-8a5d-0c679efbf283",
      "user": "47887629-7b4c-4bf5-b414-35bb2a5f5f23",
      "computation": "306d5348-4865-42df-91e3-b292cc94387f",
      "roles": ["view", "run"],
      "created_at": "2023-08-10T08:20:34.867615Z",
      "updated_at": "2023-08-10T08:20:48.09559Z",
      "updated_by": "11a2a5ba-723a-4b6d-8a5d-0c679efbf283"
    }
  ]
}
```

### Delete Computation Policies

The admin or the owner of the computation can delete the policy.

```bash
curl -isSX DELETE https://prism.ultraviolet.rs/computations/policies/<user_id>/<computation_id> -H "Accept: application/json" -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -isSX DELETE https://prism.ultraviolet.rs/computations/policies/50569d27-060d-42aa-87a8-11b596ef0e68/306d5348-4865-42df-91e3-b292cc94387f -H "Accept: application/json" -H "Authorization: Bearer <user_token>"

HTTP/1.1 204 No Content
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:21:13 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block
```

If you delete policies, the policy will be removed from the policy storage. Further authorization checks related to that policy will fail.
