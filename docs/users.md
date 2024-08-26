# Users

## Create User

> Identity, which can be email-address (this must be unique as it identifies the user) and secret (password must contain at least 8 characters)

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users -H "Content-Type: application/json" [-H "Authorization: Bearer <user_token>"] -d @- <<EOF
{
  "name": "[name]",
  "credentials": {
    "identity": "<identity>",
    "secret": "<secret>"
  },
  "tags": [
    "[tag_1]", ..., "[tag_N]"
  ],
  "owner": "[owner_id]",
  "metadata": {},
  "status": "[status]",
  "role": "[role]"
}
EOF
```

For example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "[John Doe]",
  "credentials": {
    "identity": "john.doe@email.com",
    "secret": "12345678"
  }
}
EOF
HTTP/1.1 201 Created
Content-Type: application/json
Location: /users/e6c6b6dd-8fb0-4ea6-ae7d-118424ce0006
Date: Fri, 24 May 2024 07:28:32 GMT
Content-Length: 212

{
  "id":"e6c6b6dd-8fb0-4ea6-ae7d-118424ce0006",
  "name":"[John Doe]",
  "credentials": {"identity":"john.doe@email.com"},
  "created_at":"2024-05-24T07:28:32.449035Z",
  "updated_at":"0001-01-01T00:00:00Z",
  "status":"enabled"
}
```

You can also use `<user_token>` so that the owner of the new user is the one identified by the `<user_token>` for example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "name": "[John Doe]",
  "credentials": {
    "identity": "john.doe@email.com",
    "secret": "12345678"
  }
}
EOF

HTTP/1.1 201 Created
Content-Type: application/json
Location: /users/75db22d5-7925-4e90-8ffb-919c6fa2d8c2
Date: Fri, 24 May 2024 07:31:18 GMT
Content-Length: 215

{
  "id": "47887629-7b4c-4bf5-b414-35bb2a5f5f23",
  "name": "John Doe",
  "owner": "11a2a5ba-723a-4b6d-8a5d-0c679efbf283",
  "credentials": { "identity": "john.doe@email.com" },
  "created_at": "2023-08-10T07:55:08.056426Z",
  "updated_at": "0001-01-01T00:00:00Z",
  "status": "enabled"
}
```

## Create Token

To log in to the Mainflux system, you need to create a `user_token`.

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users/tokens/issue -H "Content-Type: application/json" -d @- <<EOF
{
  "identity": "<user_identity>",
  "secret": "<user_secret>"
}
EOF
```

For example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users/tokens/issue -H "Content-Type: application/json" -d @- <<EOF
{
  "identity": "johndoe@email.com",
  "secret": "12345678"
}
EOF

HTTP/1.1 201 Created
Content-Type: application/json
Date: Fri, 24 May 2024 07:36:20 GMT
Content-Length: 591

{
  "access_token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY1Mzk3ODAsImlhdCI6MTcxNjUzNjE4MCwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwidHlwZSI6MCwidXNlciI6ImU2YzZiNmRkLThmYjAtNGVhNi1hZTdkLTExODQyNGNlMDAwNiJ9.QWX7IBCWLOcWaerOkZ0XAQlOq-jLEgqXttP4S1qEooky-LWeAMHBHKszjR7LoaVoCBcmuqbuKL0vrgNV25OPfg",
  "refresh_token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTY2MjI1ODAsImlhdCI6MTcxNjUzNjE4MCwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwidHlwZSI6MSwidXNlciI6ImU2YzZiNmRkLThmYjAtNGVhNi1hZTdkLTExODQyNGNlMDAwNiJ9.Wl9lc5Mx9Tu-LVFoBg5StNi7s730r0vPSiSvapsW8IgL1jIEPRyvNxEaxbPSYxxK8xB61NNnkkPVxoPVhSKk_g"
}

```

## Refresh Token

To issue another `access_token` after getting expired, you need to use a `refresh_token`.

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users/tokens/refresh -H "Content-Type: application/json" -H "Authorization: Bearer <refresh_token>"
```

For example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users/tokens/refresh -H "Content-Type: application/json" -H "Authorization: Bearer <refresh_token>"


HTTP/1.1 201 Created
Content-Length: 709
Content-Type: application/json
Date: Thu, 10 Aug 2023 07:55:20 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
  "access_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE2NTQ4NDAsImlhdCI6MTY5MTY1MzA0MCwiaWRlbnRpdHkiOiJqb2huLmRvZUBlbWFpbC5jb20iLCJpc3MiOiJjbGllbnRzLmF1dGgiLCJzdWIiOiIyNDZhY2VlOC0wYmM0LTRiMmUtOWYyYy0zZmRlZTM3NzZkNDUiLCJ0eXBlIjoiYWNjZXNzIn0.Sn4r41hl1pBFjm95UCr23hGabgq62cxNV882EiV8RMZqv92RJYMcm27KFCcR6fN07jMTXFVr_DDxc9be1HAXgw",
  "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE3Mzk0NDAsImlhdCI6MTY5MTY1MzA0MCwiaWRlbnRpdHkiOiJqb2huLmRvZUBlbWFpbC5jb20iLCJpc3MiOiJjbGllbnRzLmF1dGgiLCJzdWIiOiIyNDZhY2VlOC0wYmM0LTRiMmUtOWYyYy0zZmRlZTM3NzZkNDUiLCJ0eXBlIjoicmVmcmVzaCJ9.As2C8mCp2BaSdm5yp5OUMNiJ7gHJT472e-L7T80xVHhrqDMBvsom7o4_RfP1z7A2sHrkA4ozU4B-FUSaSeG32A",
  "access_type": "Bearer"
}
```

On the ui the steps are as follows:

1. Click 'Users' on the navigation panel to display Users page. Then click 'New User' at the top right.
   ![Users](img/ui/users.png)
2. Fill in the required fields on the Create User page. Once done click 'Create User'.
   ![Users](img/ui/create user.png)

## Get User Profile

```bash
curl -sSiX GET https://prism.ultraviolet.rs/users/profile -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/users/profile -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 07:43:00 GMT
Content-Length: 212

{
  "id":"e6c6b6dd-8fb0-4ea6-ae7d-118424ce0006",
  "name":"[John Doe]",
  "credentials":{"identity":"john.doe@email.com"},
  "created_at":"2024-05-24T07:28:32.449035Z",
  "updated_at":"0001-01-01T00:00:00Z",
  "status":"enabled"
}
```

On the ui the steps are as follows:

1. Click on user profile at the top right.
   ![User Profile](img/ui/profile.png)

## Get User

```bash
curl -sSiX GET https://prism.ultraviolet.rs/users/<user_id> -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/users -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 07:49:09 GMT
Content-Length: 1087

{
  "limit":10,
  "offset":0,
  "total":6,
  "users": [
    {
      "id":"71e3d691-08a4-49ad-9cdf-69fd87103ca1",
      "name":"John Doe",
      "credentials":{},
      "created_at":"0001-01-01T00:00:00Z",
      "updated_at":"0001-01-01T00:00:00Z",
      "status":"enabled"
    },
    {"id":"3b6461ff-17f2-4b4e-aff3-c3cde9542087",
    "name":"Jane Doe",
    "credentials":{},
    "created_at":"0001-01-01T00:00:00Z",
    "updated_at":"0001-01-01T00:00:00Z",
    "status":"enabled"
    },
    ...
  ]
}
```

On the ui the steps are as follows:

1. Click 'Users' on the navigation panel to display Users page. Then click a user name from the list of users. This navigates to User Details page.
   ![Users](img/ui/users list.png)
   ![Users Details](img/ui/user details.png)

## Get Users

You can get all users in the database by querying `/users` endpoint.

```bash
curl -sSiX GET https://prism.ultraviolet.rs/users -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/users -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 07:49:09 GMT
Content-Length: 1087

{
  "limit":10,
  "offset":0,
  "total":6,
  "users": [
    {
      "id":"71e3d691-08a4-49ad-9cdf-69fd87103ca1",
      "name":"John Doe",
      "credentials":{},
      "created_at":"0001-01-01T00:00:00Z",
      "updated_at":"0001-01-01T00:00:00Z",
      "status":"enabled"
    },
    {"id":"3b6461ff-17f2-4b4e-aff3-c3cde9542087",
    "name":"Jane Doe",
    "credentials":{},
    "created_at":"0001-01-01T00:00:00Z",
    "updated_at":"0001-01-01T00:00:00Z",
    "status":"enabled"
    },
    ...
  ]
}
```

To paginate the results, use `offset`, `limit`, `metadata`, `name`, `identity`, `tag`, `status` and `visbility` as query parameters.

```bash
curl -sSiX GET -H "Authorization: Bearer <user_token>" https://prism.ultraviolet.rs/users?offset=[offset]&limit=[limit]&identity=[identity]
```

For example:

```bash
curl -sSiX GET -H "Authorization: Bearer <user_token>" https://prism.ultraviolet.rs/users\?offset\=0\&limit\=5\&identity\=john.doe2@email.com

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 07:53:33 GMT
Content-Length: 44

{"limit":5,"offset":0,"total":0,"users":[]}
```

On the ui the steps are as follows:

1. Click 'Users' on the navigation panel to display Users page. Then click a user name from the list of users. This navigates to User Details page.
   ![Users](img/ui/users list.png)

## Update User

Updating user's name and/or metadata

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/<user_id> -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "name": "[name]",
  "metadata": {}
}
EOF
```

For example:

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/5364b2fb-12f9-41dc-b6ac-fa08bb556897 -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "name": "new name",
  "metadata": {
    "department": "confidential-computing"
  }
}
EOF

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 12:15:07 GMT
Content-Length: 391

{
  "id":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "name":"new name",
  "credentials":{"identity":"johndoe@email.com","secret":"$2a$10$B8aAupFDq7gPFcv4LCrv/e2ZrFsURD4aZgC0cWSCsdVAbB.Zj9FD6"},
  "metadata":{"department":"confidential-computing"},
  "created_at":"2024-05-24T09:28:44.418931Z",
  "updated_at":"2024-05-24T12:15:07.806592Z",
  "updated_by":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "status":"enabled"
}
```

On the ui the steps are as follows:

1. Click 'Users' on the navigation panel to display Users page. Then click a user name from the list of users. This navigates to User Details page.
   ![Users](img/ui/users list.png)
2. Click 'Update User'.
   ![User Details](img/ui/user details.png)
3. Update the required fields and click 'Update' to submit the details.
   ![Update User](img/ui/update user.png)

## Update User Tags

Updating user's tags

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/<user_id>/tags -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "tags": ["<tag_1>", ..., "tag_N"]
}
EOF
```

For example:

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/5364b2fb-12f9-41dc-b6ac-fa08bb556897/tags -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "tags": ["manager", "developer"]
}
EOF

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 12:17:01 GMT
Content-Length: 350

{
  "id":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "name":"new name",
  "tags":["manager","developer"],
  "credentials":{"identity":"johndoe@email.com"},
  "metadata":{"department":"confidential-computing"},
  "created_at":"2024-05-24T09:28:44.418931Z",
  "updated_at":"2024-05-24T12:17:01.607854Z",
  "updated_by":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "status":"enabled"
}
```

## Update User Owner

Updating user's owner

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/<user_id>/owner -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "owner": "<owner_id>"
}
EOF
```

For example:

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/secret -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "owner": "532311a4-c13b-4061-b991-98dcae7a934e"
}
EOF

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 12:41:06 GMT
Content-Length: 353

{
  "id":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "name":"new name",
  "tags":["manager","developer"],
  "credentials":{"identity":"jane.doe@example.com"},
  "metadata":{"department":"confidential-computing"},
  "created_at":"2024-05-24T09:28:44.418931Z",
  "updated_at":"2024-05-24T12:41:06.062947Z",
  "updated_by":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "status":"enabled"
}
```

## Update User Identity

Updating user's identity

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/<user_id>/identity -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "identity": "<identity>"
}
EOF
```

For example:

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/secret -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "identity": "jane.doe2@email.com"
}
EOF

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 12:41:06 GMT
Content-Length: 353

{
  "id":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "name":"new name",
  "tags":["manager","developer"],
  "credentials":{"identity":"jane.doe2@email.com"},
  "metadata":{"department":"confidential-computing"},
  "created_at":"2024-05-24T09:28:44.418931Z",
  "updated_at":"2024-05-24T12:41:06.062947Z",
  "updated_by":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "status":"enabled"
}
```

## Change Secret

Changing the user secret can be done by calling the update secret function

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/secret -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "old_secret": "<old_secret>",
  "new_secret": "<new_secret>"
}
EOF
```

For example:

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/users/secret -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- <<EOF
{
  "old_secret": "12345678",
  "new_secret": "123456789"
}
EOF

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 12:41:06 GMT
Content-Length: 353

{
  "id":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "name":"new name",
  "tags":["manager","developer"],
  "credentials":{"identity":"jane.doe@example.com"},
  "metadata":{"department":"confidential-computing"},
  "created_at":"2024-05-24T09:28:44.418931Z",
  "updated_at":"2024-05-24T12:41:06.062947Z",
  "updated_by":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "status":"enabled"
}
```

## Enable User

Changing the user status to enabled can be done by calling the enable user function

```bash
curl -sSiX GET https://prism.ultraviolet.rs/users/<user_id>/enable -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users/11a2a5ba-723a-4b6d-8a5d-0c679efbf283/enable -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 12:47:06 GMT
Content-Length: 353

{
  "id":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "name":"new name",
  "tags":["manager","developer"],
  "credentials": {"identity":"jane.doe@example.com"},
  "metadata": {"department":"confidential-computing"},
  "created_at":"2024-05-24T09:28:44.418931Z",
  "updated_at":"2024-05-24T12:47:06.062947Z",
  "updated_by":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "status":"enabled"
}
```

## Disable User

Changing the user status to disabled can be done by calling the disable user function

```bash
curl -sSiX GET https://prism.ultraviolet.rs/users/<user_id>/disable -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users/11a2a5ba-723a-4b6d-8a5d-0c679efbf283/disable -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 24 May 2024 12:58:02 GMT
Content-Length: 353

{
  "id":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "name":"new name",
  "tags":["manager","developer"],
  "credentials":{"identity":"jane.doe@example.com"},
  "metadata":{"department":"confidential-computing"},
  "created_at":"2024-05-24T09:28:44.418931Z",
  "updated_at":"2024-05-24T12:58:02.062947Z",
  "updated_by":"5364b2fb-12f9-41dc-b6ac-fa08bb556897",
  "status":"disabled"
}
```

## Get User Memberships

You can get all groups a user is assigned to by calling the get user memberships function.

To paginate the results, use `offset`, `limit`, `metadata`, `name`, `status`, `parentID`, `ownerID`, `tree` and `dir` as query parameters.

> Must take into consideration the user identified by the `user_token` needs to be assigned to the same group with `c_list` action or is the owner of the user identified by the `user_id`.

```bash
curl -sSiX GET GET https://prism.ultraviolet.rs/domains  -H "Authorization: Bearer <user_token>"
```

For example:

```bash
 curl -sSiX GET https://prism.ultraviolet.rs/domains  -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Type: application/json
Date: Sat, 25 May 2024 09:09:58 GMT
Content-Length: 304

{
  "total":1,"offset":0,
  "limit":10,
  "domains": [
    {
      "id":"ec7f6b62-3b0b-4f6f-925f-c1f09ab2f883",
      "name":"Test Org",
      "alias":"Desc",
      "status":"enabled",
      "permission":"viewer",
      "created_by":"c25537fd-39ad-4b36-b180-e90dfb477fcd",
      "created_at":"2024-05-24T14:35:30.891544Z",
      "updated_at":"0001-01-01T00:00:00Z"
    }
  ]
}
```
