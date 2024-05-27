# Computations Invitations

For a user to be able to run a computation, they need to be invited to the computation by the computation admin. To accept an invitation, the user needs to upload a certificate that will be used as a means of verification within the computation environment and will be passed to the agent.

## Send Invitation to User

To send an invitation to a user to join a computation, we need to provide the following:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/invitations -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
    "token": "<token>",
    "invited_by": {
        "id": "<user_id>",
        "name": "<user_name>"
    },
    "user_invited": {
        "id": "<user_id>",
        "name": "<user_name>"
    },
    "computation_details": {
        "id": "<computation_id>",
        "name": "<computation_name>"
    },
    "relation": "<role>",
    "resend": false
}
EOF
```

```bash
curl -sSiX POST https://prism.ultraviolet.rs/invitations -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJlYzdmNmI2Mi0zYjBiLTRmNmYtOTI1Zi1jMWYwOWFiMmY4ODMiLCJleHAiOjE3MTY3MTg3MjUsImlhdCI6MTcxNjcxNTEyNSwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYzI1NTM3ZmQtMzlhZC00YjM2LWIxODAtZTkwZGZiNDc3ZmNkIiwidHlwZSI6MCwidXNlciI6ImMyNTUzN2ZkLTM5YWQtNGIzNi1iMTgwLWU5MGRmYjQ3N2ZjZCJ9.z7Py3ZwDm0INxosANjIm1slxziUTzD4EcXO1nt26inmSXVdaKSEZd3tGiE-7UHwOkwITsEgFOWBVucMnCFRipQ" -d @- << EOF
{
    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJlYzdmNmI2Mi0zYjBiLTRmNmYtOTI1Zi1jMWYwOWFiMmY4ODMiLCJleHAiOjE3MTY3MTg3MjUsImlhdCI6MTcxNjcxNTEyNSwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYzI1NTM3ZmQtMzlhZC00YjM2LWIxODAtZTkwZGZiNDc3ZmNkIiwidHlwZSI6MCwidXNlciI6ImMyNTUzN2ZkLTM5YWQtNGIzNi1iMTgwLWU5MGRmYjQ3N2ZjZCJ9.z7Py3ZwDm0INxosANjIm1slxziUTzD4EcXO1nt26inmSXVdaKSEZd3tGiE-7UHwOkwITsEgFOWBVucMnCFRipQ",
    "invited_by": {
        "id": "c25537fd-39ad-4b36-b180-e90dfb477fcd",
        "name": "admin"
    },
    "user_invited": {
        "id": "986a04e5-be5b-4041-b649-f64346720219",
        "name": "John Doe"
    },
    "computation_details": {
        "id": "61dfbb0f-13ad-4182-acc3-e068de9eead4",
        "name": "C1"
    },
    "relation": "data-provider",
    "resend": false
}
EOF


HTTP/1.1 201 Created
Content-Type: application/json
Date: Sun, 26 May 2024 09:32:40 GMT
Content-Length: 0

```

On the UI the steps are as follows:
1. Click on 'Invitations' under Computations on the side navigation panel.
2. Click on 'Invite User' button on the top left.
![List Computation Invitations](img/ui/computation invitations.png)
3. Select the required details and click 'Invite' on the modal.
![Invite User](img/ui/invite user.png)


## View Invitation

To retrieve a specific invitation for a user to join a computation, identified by the user ID and computation ID:

```bash
curl -sSiX GET https://prism.ultraviolet.rs:9091/invitations/{user_id}/{computation_id} -H "Authorization: Bearer <user_token>"
```

### Example

```bash
curl -sSiX GET https://prism.ultraviolet.rs:9091/invitations/986a04e5-be5b-4041-b649-f64346720219/ecb4565e-5cc3-4fcf-845f-031a69d52cab -H "Authorization: Bearer <user_token>"
```

Expected Response:

```json
{
  "inviter": {
    "id": "c25537fd-39ad-4b36-b180-e90dfb477fcd",
    "name": "admin"
  },
  "user": {
    "id": "986a04e5-be5b-4041-b649-f64346720219",
    "name": "John Doe"
  },
  "computation_details": {
    "id": "ecb4565e-5cc3-4fcf-845f-031a69d52cab",
    "name": "John Doe"
  },
  "role": "algo-provider",
  "created_at": "2024-05-26T08:45:15.250321Z",
  "updated_at": "0001-01-01T00:00:00Z",
  "confirmed_at": "0001-01-01T00:00:00Z"
}
```

## Accept Invitation

To accept an invitation to a computation, a user uploads a certificate for verification:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/invitations/accept -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
    "policy": {
        "user_id": "f774c854-00f9-4774-b67c-248507c4f8fd",
        "computation_id": "3b273eed-155f-4b56-9408-a29a93cc47b6",
        "roles": [
            "algo-provider",
            "view",
            "edit"
        ]
    }
}
EOF
```

Example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/invitations/accept -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJlYzdmNmI2Mi0zYjBiLTRmNmYtOTI1Zi1jMWYwOWFiMmY4ODMiLCJleHAiOjE3MTY3MTg3MjUsImlhdCI6MTcxNjcxNTEyNSwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYzI1NTM3ZmQtMzlhZC00YjM2LWIxODAtZTkwZGZiNDc3ZmNkIiwidHlwZSI6MCwidXNlciI6ImMyNTUzN2ZkLTM5YWQtNGIzNi1iMTgwLWU5MGRmYjQ3N2ZjZCJ9.z7Py3ZwDm0INxosANjIm1slxziUTzD4EcXO1nt26inmSXVdaKSEZd3tGiE-7UHwOkwITsEgFOWBVucMnCFRipQ" -d @- << EOF
{
    "policy": {
        "user_id": "f774c854-00f9-4774-b67c-248507c4f8fd",
        "computation_id": "3b273eed-155f-4b56-9408-a29a93cc47b6",
        "roles": [
            "algo-provider",
            "view",
            "edit"
        ]
    }
}
EOF

HTTP/1.1 201 OK
Content-Type: application/json
Date: Sun, 26 May 2024 09:32:40 GMT
Content-Length: 0
```

Expected Response:
HTTP status code 200 OK with no content.


On the UI the steps are as follows:
1. Click on 'Invitations' under Computations on the side navigation panel.
2. Click on accept button on the invitation.
![List Computation Invitations](img/ui/accept computation invitation.png)
3. On the modal that appears, select 'Choose File' to select a certificate. Finally click on 'Upload' to upload the certificate and accept the invitation.
![Upload Certificate](img/ui/upload certificate.png)

## List Invitations

To list all invitations:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/invitations -H "Authorization: Bearer <user_token>"
```

Example:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/invitations -H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJlYzdmNmI2Mi0zYjBiLTRmNmYtOTI1Zi1jMWYwOWFiMmY4ODMiLCJleHAiOjE3MTY3MTU4MjksImlhdCI6MTcxNjcxMjIyOSwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYzI1NTM3ZmQtMzlhZC00YjM2LWIxODAtZTkwZGZiNDc3ZmNkIiwidHlwZSI6MCwidXNlciI6ImMyNTUzN2ZkLTM5YWQtNGIzNi1iMTgwLWU5MGRmYjQ3N2ZjZCJ9.qTUPeKdyplEv80eL7DPZUCH7o-UeJeHQSPrk1qYp-0E-WCXfPA7nFjBv759AAuJP82gWqPahNnxuFZ_3HGVB9Q"
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 26 May 2024 09:17:04 GMT
Content-Length: 434

{
  "total": 1,
  "offset": 0,
  "limit": 10,
  "invitations": [
    {
      "inviter": {
        "id": "c25537fd-39ad-4b36-b180-e90dfb477fcd",
        "name": "admin"
      },
      "user": {
        "id": "986a04e5-be5b-4041-b649-f64346720219",
        "name": "John Doe"
      },
      "computation_details": {
        "id": "ecb4565e-5cc3-4fcf-845f-031a69d52cab",
        "name": "John Doe"
      },
      "role": "algo-provider",
      "created_at": "2024-05-26T08:45:15.250321Z",
      "updated_at": "2024-05-26T09:13:44.565381Z",
      "confirmed_at": "2024-05-26T09:13:44.565381Z"
    }
  ]
}
```

On the UI the steps are as follows:
1. Click on 'Invitations' under Computations on the side navigation panel.
![List Computation Invitations](img/ui/computation invitations.png)

## Delete Invitation

To delete a specific invitation:

```bash
curl -sSiX DELETE https://prism.ultraviolet.rs/invitations/{user_id}/{computation_id} \
-H "Authorization: Bearer <user_token>"
```

Example:

```bash
curl -sSiX DELETE https://prism.ultraviolet.rs/invitations/986a04e5-be5b-4041-b649-f64346720219/61dfbb0f-13ad-4182-acc3-e068de9eead4 -H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJlYzdmNmI2Mi0zYjBiLTRmNmYtOTI1Zi1jMWYwOWFiMmY4ODMiLCJleHAiOjE3MTY3MTU4MjksImlhdCI6MTcxNjcxMjIyOSwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYzI1NTM3ZmQtMzlhZC00YjM2LWIxODAtZTkwZGZiNDc3ZmNkIiwidHlwZSI6MCwidXNlciI6ImMyNTUzN2ZkLTM5YWQtNGIzNi1iMTgwLWU5MGRmYjQ3N2ZjZCJ9.qTUPeKdyplEv80eL7DPZUCH7o-UeJeHQSPrk1qYp-0E-WCXfPA7nFjBv759AAuJP82gWqPahNnxuFZ_3HGVB9Q"

HTTP/1.1 204 No Content
Content-Type: application/json
Date: Sun, 26 May 2024 09:24:28 GMT

```

On the UI the steps are as follows:
1. Click on the delete button on any of the invitations to delete.
![Delete Computation Invitation](img/ui/delete computation invitation.png)

