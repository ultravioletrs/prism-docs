# Policies

## Computations Policies

### Add Computation Policies

_Only_ admin or the owner of the computation can use `/policies` endpoint.

```bash
curl -sSiX POST https://prism.ultraviolet.rs/computations/policies -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
    "user": {
        "id": "<user_id>",
        "name": "<user_name>"
    },
    "computation": {
        "id": "<computation_id>"
    },
    "roles": ["<role>"]
}
EOF
```

For example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/computations/policies -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJlYzdmNmI2Mi0zYjBiLTRmNmYtOTI1Zi1jMWYwOWFiMmY4ODMiLCJleHAiOjE3MTY3MjI0NzgsImlhdCI6MTcxNjcxODg3OCwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYzI1NTM3ZmQtMzlhZC00YjM2LWIxODAtZTkwZGZiNDc3ZmNkIiwidHlwZSI6MCwidXNlciI6ImMyNTUzN2ZkLTM5YWQtNGIzNi1iMTgwLWU5MGRmYjQ3N2ZjZCJ9.ZTw4F3NlP2ziwRF9bgljDoj73ovRvgNHsbt607Z1vvogFd8yMCguKLhLEVbhPfQ_yIXQYQH8fZdRsxFw0QYKXQ" -d @- << EOF
{
    "user": {
        "id": "986a04e5-be5b-4041-b649-f64346720219",
        "name": "John Doe"
    },
    "computation": {
        "id": "3b273eed-155f-4b56-9408-a29a93cc47b6"
    },
    "roles": ["view"]
}
EOF

HTTP/1.1 201 Created
Content-Type: application/json
Date: Thu, 10 Aug 2023 08:20:34 GMT
Content-Length: 0
```

On the UI the steps are as follows:

1. Login as an administrator/computation owner and click on 'Computations' on the side navigation panel.
![List Computations](img/ui/computations%20list.png)
2. Select a computation and click on 'Computation Policies'
![List Policies](img/ui/to%20computation%20policies.png)
3. Click on 'New Computation Policy' button on the top left.
![List Policies](img/ui/computation%20policies.png)
4. Select the required details and click 'Create'
![New Policy](img/ui/new%20policy.png)

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
curl -sSiX PUT https://prism.ultraviolet.rs/computations/policies -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJlYzdmNmI2Mi0zYjBiLTRmNmYtOTI1Zi1jMWYwOWFiMmY4ODMiLCJleHAiOjE3MTY3MjI0NzgsImlhdCI6MTcxNjcxODg3OCwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYzI1NTM3ZmQtMzlhZC00YjM2LWIxODAtZTkwZGZiNDc3ZmNkIiwidHlwZSI6MCwidXNlciI6ImMyNTUzN2ZkLTM5YWQtNGIzNi1iMTgwLWU5MGRmYjQ3N2ZjZCJ9.ZTw4F3NlP2ziwRF9bgljDoj73ovRvgNHsbt607Z1vvogFd8yMCguKLhLEVbhPfQ_yIXQYQH8fZdRsxFw0QYKXQ" -d @- << EOF
{
    "user": {
        "id": "986a04e5-be5b-4041-b649-f64346720219",
        "name": "John Doe"
    },
    "computation": {
        "id": "3b273eed-155f-4b56-9408-a29a93cc47b6"
    },
    "roles": ["view", "edit", "run"]
}
EOF

HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 26 May 2024 10:56:58 GMT
Content-Length: 0
```

On the UI the steps are as follows:

1. Login as an administrator/computation owner and click on 'Computations' on the side navigation panel.
![List Computations](img/ui/computations%20list.png)
2. Select a computation and click on 'Computation Policies'
![List Policies](img/ui/to%20computation%20policies.png)
3. Click on the edit button on any of the policies to edit.
![List Policies](img/ui/computation%20policies.png)
4. Select required details and click on 'Update'.
![Update Policy Page](img/ui/update%20policy%20page.png)



### Lisiting Computation Policies

As an administrator/computation owner, you can list all the policies in a computation, while as a user you can only list your own policies in a computation.

```bash
curl -isSX GET https://prism.ultraviolet.rs/computations/policies/<computation_id> -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -isSX GET https://prism.ultraviolet.rs/computations/policies/3b273eed-155f-4b56-9408-a29a93cc47b6 -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 26 May 2024 10:58:24 GMT
Content-Length: 1785

{
  "limit": 10,
  "total": 6,
  "policies": [
    {
      "owner": "",
      "user": {
        "id": "f774c854-00f9-4774-b67c-248507c4f8fd",
        "name": "Jane Doe"
      },
      "computation": {
        "id": "3b273eed-155f-4b56-9408-a29a93cc47b6",
        "name": "C5"
      },
      "roles": ["edit","view"],
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "2024-05-26T10:48:49.111668Z",
      "updated_by": "c25537fd-39ad-4b36-b180-e90dfb477fcd"
    },       
    ...
  ]
}
```

On the UI the steps are as follows:

1. Login and click on 'Computations' on the side navigation panel.
![List Computations](img/ui/computations%20list.png)
2. Select a computation and click on 'Computation Policies'
![List Policies](img/ui/to%20computation%20policies.png)

### Delete Computation Policies

The admin or the owner of the computation can delete the policy.

```bash
curl -isSX DELETE https://prism.ultraviolet.rs/computations/policies/<user_id>/<computation_id> -H "Accept: application/json" -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -isSX DELETE https://prism.ultraviolet.rs/computations/policies/50569d27-060d-42aa-87a8-11b596ef0e68/306d5348-4865-42df-91e3-b292cc94387f -H "Accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJlYzdmNmI2Mi0zYjBiLTRmNmYtOTI1Zi1jMWYwOWFiMmY4ODMiLCJleHAiOjE3MTY3MjI0NzgsImlhdCI6MTcxNjcxODg3OCwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYzI1NTM3ZmQtMzlhZC00YjM2LWIxODAtZTkwZGZiNDc3ZmNkIiwidHlwZSI6MCwidXNlciI6ImMyNTUzN2ZkLTM5YWQtNGIzNi1iMTgwLWU5MGRmYjQ3N2ZjZCJ9.ZTw4F3NlP2ziwRF9bgljDoj73ovRvgNHsbt607Z1vvogFd8yMCguKLhLEVbhPfQ_yIXQYQH8fZdRsxFw0QYKXQ"

HTTP/1.1 204 No Content
Content-Type: application/json
Date: Sun, 26 May 2024 11:05:16 GMT
```

On the UI the steps are as follows:

1. Login as an administrator/computation owner and click on 'Computations' on the side navigation panel.
![List Computations](img/ui/computations%20list.png)
2. Select a computation and click on 'Computation Policies'
![List Policies](img/ui/to%20computation%20policies.png)
3. Click on the delete button on any of the policies to delete.
![List Policies](img/ui/computation%20policies.png)


If you delete policies, the policy will be removed from the policy storage. Further authorization checks related to that policy will fail.
