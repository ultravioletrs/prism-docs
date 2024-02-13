# Organizations

Organizations represent a consortium of users, computations, and resources that provides a single way to allow maangement of resources in the system. The organizations / organizations simplify access control by allowing only users who are in a particular organization to access resources which they have been assigned to.

Within organizations, different users have different roles that allow them to only perform certain operations within the organization, such as creation of other users and other admin related tasks. A single user can belong to multiple organizations, with which they can have different roles based on the policy assigned.

For any user to access the CoCoS system, they must be part of an organization, and have to be signed in to the organization.

## Create an organization

```bash
curl -sSiX POST http://localhost/organizations/ -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "<domain_name>",
  "metadata": {
    "key": "value"
  },
  "tags": ["tag1", "tag2"],
  "alias": "<alias>",
  "status": "<status>",
  "permission": "<permission>",
  "created_by": "<created_by_id>",
  "permissions": ["permission1", "permission2"]
}
EOF
```

For example:

```bash
curl -sSiX POST http://localhost/organizations/ -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "organization 1",
  "description": "organization providing data",
  "metadata": {
    "meeting": "every monday",
    "location": "room 101"
  }
  "tags": ["data", "algo"],
  "alias": "org1",
  "status": "active",
}
EOF

HTTP/1.1 200 Ok
Content-Length: 331
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:03:34 GMT
Location: /organizations/b19c8738-0efa-400e-aaf0-610ef42f1ee1
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
  "id": "b19c8738-0efa-400e-aaf0-610ef42f1ee1",
  "name": "organization 1",
  "description": "organization providing data",
  "metadata": { 
    "location": "room 101", 
    "meeting": "every monday" 
  },
  "tags": ["data", "algo"],
  "alias": "org1",
  "created_at": "2023-08-10T08:03:34.204862Z",
  "updated_at": "0001-01-01T00:00:00Z",  
  "status": "active",
}

```

## Update organization

Update organization

```bash
curl -sSiX PUT http://localhost/organizations/<organization_id> -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "<organization_name>",
  "metadata": {
    "key": "value"
  },
  "tags": ["tag1", "tag2"],
  "alias": "<alias>",
  "status": "<status>",
  "permission": "<permission>",
  "created_by": "<created_by_id>",
  "permissions": ["permission1", "permission2"]
}
EOF
```

For example:

```bash
curl -sSiX POST http://localhost/organizations/b19c8738-0efa-400e-aaf0-610ef42f1ee1 -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "updated confidential computing",
  "description": "updated confidential computing organization",
  "metadata": { 
    "location": "room 809", 
    "meeting": "every friday" 
  },
  "created_at": "2023-08-10T08:03:34.204862Z",
  "updated_at": "2023-08-10T08:06:09.289907Z",
  "updated_by": "11a2a5ba-723a-4b6d-8a5d-0c679efbf283",
  "status": "enabled"
}
EOF

HTTP/1.1 200 OK
Content-Length: 406
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:06:09 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
  "id": "b19c8738-0efa-400e-aaf0-610ef42f1ee1",
  "owner_id": "11a2a5ba-723a-4b6d-8a5d-0c679efbf283",
  "name": "updated confidential computing",
  "description": "updated confidential computing organization",
  "metadata": { "location": "room 809", "meeting": "every friday" },
  "created_at": "2023-08-10T08:03:34.204862Z",
  "updated_at": "2023-08-10T08:06:09.289907Z",
  "updated_by": "11a2a5ba-723a-4b6d-8a5d-0c679efbf283",
  "status": "enabled"
}
```

## Get organization

```bash
curl -isSX GET http://localhost/organizations/<organization_id> -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -isSX GET http://localhost/organizations/b19c8738-0efa-400e-aaf0-610ef42f1ee1 -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Length: 331
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:04:32 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
  "id": "b19c8738-0efa-400e-aaf0-610ef42f1ee1",
  "owner_id": "11a2a5ba-723a-4b6d-8a5d-0c679efbf283",
  "name": "confidential computing",
  "description": "confidential computing organization",
  "metadata": { 
    "location": "room 101", 
    "meeting": "every monday" 
  },
  "created_at": "2023-08-10T08:03:34.204862Z",
  "updated_at": "0001-01-01T00:00:00Z",
  "status": "enabled"
}
```

## Get organizations

To paginate the results, use `offset`, `limit`, `metadata`, `name`, `status`, `parentID`, `ownerID`, `tree` and `dir` as query parameters.

```bash
curl -isSX GET http://localhost/organizations/ -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -isSX GET http://localhost/organizations -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Length: 768
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:04:47 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
  "limit": 0,
  "offset": 0,
  "total": 2,
  "organizations": [
    {
      "id": "b19c8738-0efa-400e-aaf0-610ef42f1ee1",
      "owner_id": "11a2a5ba-723a-4b6d-8a5d-0c679efbf283",
      "name": "confidential computing",
      "description": "confidential computing organization",
      "metadata": { "location": "room 101", "meeting": "every monday" },
      "created_at": "2023-08-10T08:03:34.204862Z",
      "updated_at": "0001-01-01T00:00:00Z",
      "status": "enabled"
    },
    {
      "id": "e2aba2d7-1f82-4b13-b010-dc0aa3a228a0",
      "owner_id": "11a2a5ba-723a-4b6d-8a5d-0c679efbf283",
      "parent_id": "b19c8738-0efa-400e-aaf0-610ef42f1ee1",
      "name": "EU confidential computing",
      "description": "confidential computing organization for EU",
      "metadata": { "location": "room 102", "meeting": "every tuesday" },
      "created_at": "2023-08-10T08:03:57.994226Z",
      "updated_at": "0001-01-01T00:00:00Z",
      "status": "enabled"
    }
  ]
}
```

## Assign

Assign user to an organization

```bash
curl -sSiX POST http://localhost/<organization_id>/members -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "subject": "<user_id>",
  "object": "<organization_id>",
  "relation": ["<relations>"]
}
EOF
```

For example:

```bash
curl -sSiX POST http://localhost/b19c8738-0efa-400e-aaf0-610ef42f1ee1/members -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "subject": "47887629-7b4c-4bf5-b414-35bb2a5f5f23",
  "object": "b19c8738-0efa-400e-aaf0-610ef42f1ee1",
  "actions": ["admin", "view"]
}
EOF

HTTP/1.1 200 Ok
Content-Length: 0
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:07:26 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block
```

## Members

To paginate the results, use `offset`, `limit`, `metadata`, `name`, `status`, `parentID`, `ownerID`, `tree` and `dir` as query parameters.

> Must take into consideration the user identified by the `user_token` needs to be assigned to the same organization identified by `group_id` with `g_list` action or be the owner of the organization identified by `group_id`.

```bash
curl -isSX GET http://localhost/organizations/<organization_id>/members -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -isSX GET http://localhost/organizations/b19c8738-0efa-400e-aaf0-610ef42f1ee1/members -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Length: 246
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:11:12 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
  "limit": 10,
  "total": 1,
  "members": [
    {
      "id": "47887629-7b4c-4bf5-b414-35bb2a5f5f23",
      "name": "John Doe",
      "credentials": { "identity": "john.doe2@email.com" },
      "created_at": "2023-08-10T07:55:08.056426Z",
      "updated_at": "0001-01-01T00:00:00Z",
      "status": "enabled"
    }
  ]
}
```

