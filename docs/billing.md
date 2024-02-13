# Billing service

The billing service allows the organization to pay for the services used in the CoCoS system such as total number of computations, total users, and the use rate. Once a billing customer is created, the billing service allows the user to select a plan out of the ones created by the admin and make payments for these plans based on the selected plan.

## Admin functions

### Create Plan

Only an admin can create a billing plan which will be viewed by the organizations permitted to view it. In order to create a billing plan, the following steps need to be followed:

```bash
curl -sSiX POST http://localhost/createplan -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
    "plan": {
        "id": <id>,
        "name": <name>,
        "amount": <amount>,
        "limits":{},
        "currency":<currency>
    },
    "public-plan":<public-plan>,
    "org-id":<org-id>
}
EOF
```

Example:

```bash
curl -sSiX POST http://localhost/createplan -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
    "plan": {
        "id": <id>,
        "name": "Bronze Plan",
        "amount": "30",
        "limits":{
            "max-computations":"100",
            "max-users":"200"
        },
        "currency": "eur"
    },
    "public-plan":"true",
    "org-id":"8b131663-058d-4e8f-8ccb-cc83c3f9e694"
}
EOF
```

Response:

```bash
HTTP/1.1 201 Created
Content-Length: 0
Content-Type: application/json
Date: Thu, 10 Aug 2023 07:29:22 GMT
Location: /computations/8b131663-058d-4e8f-8ccb-cc83c3f9e694
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
    "plan": {
        "id": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
        "name": "Bronze Plan",
        "amount": "30",
        "limits":{
            "max-computations":"100",
            "max-users":"200"
        },
        "currency": "eur"
    },
    "public_plan": "true",
    "allowed_organizations": ["8b131663-058d-4e8f-8ccb-cc83c3f9e694"],
    "disable": "false",
    "created_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08",
    "created_at": "2023-08-10T07:29:22Z",
    "updated_at": "2023-08-10T07:29:22Z",
    "updated_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08"
}
```

### Delete Plan

To delete a plan, the following information is needed:

```bash
curl -sSiX GET http://localhost/deleteplan/<plan-id> -H "Authorization: Bearer <user_token>"
``` 

Example:

```bash
curl -sSiX GET http://localhost/deleteplan/8b131663-058d-4e8f-8ccb-cc83c3f9e694 -H "Authorization: Bearer <user_token>"
``` 

Response:

```bash
HTTP/1.1 200 OK
Content-Length: 0
Content-Type: application/json
Date: Thu, 10 Aug 2023 07:29:22 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block
```

### Update Plan

To update a plan, the following information is needed:

```bash
curl -sSiX POST http://localhost/updateplan/<plan-id> -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
    "plan": {
        "name": <name>,
        "amount": <amount>,
        "limits":{},
        "currency":<currency>
    },
    "public-plan":<public-plan>,
    "org-id":<org-id>
}
EOF
```

Example:

```bash
curl -sSiX POST http://localhost/updateplan/8b131663-058d-4e8f-8ccb-cc83c3f9e694 -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
    "plan": {
        "name": "Updated Bronze Plan",
        "amount": "40",
        "limits":{
            "max-computations":"100",
            "max-users":"200"
        },
        "currency": "eur"
    },
    "public-plan":"true",
    "org-id":"8b131663-058d-4e8f-8ccb-cc83c3f9e694"
}
```

Response:

```bash
HTTP/1.1 201 Created
Content-Length: 0
Content-Type: application/json
Date: Thu, 10 Aug 2023 07:29:22 GMT
Location: /computations/8b131663-058d-4e8f-8ccb-cc83c3f9e694
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
    "plan": {
        "id": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
        "name": "Updated Bronze Plan",
        "amount": "40",
        "limits":{
            "max-computations":"100",
            "max-users":"200"
        },
        "currency": "eur"
    },
    "public_plan": "true",
    "allowed_organizations": ["8b131663-058d-4e8f-8ccb-cc83c3f9e694"],
    "disable": "false",
    "created_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08",
    "created_at": "2023-08-10T07:29:22Z",
    "updated_at": "2023-08-10T07:29:22Z",
    "updated_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08"
}
```

## Customer Functions

### Create Customer

This function allows for the creation of a new customer account with the billing service.

```bash
curl -sSiX POST http://localhost/<org-id>/createcustomer \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <user_token>" \
-d @- << EOF
{
    "organization_id": "<organization_id>",
    "name": "<name>",
    "email": "<email>",
    "line1": "<line1>",
    "line2": "<line2>",
    "state": "<state>",
    "city": "<city>",
    "country": "<country>",
    "postal_code": "<postal_code>",
    "phone": "<phone>"
}
EOF
```

Example:

```bash
curl -sSiX POST http://localhost/8b131663-058d-4e8f-8ccb-cc83c3f9e694/createcustomer \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <user_token>" \
-d '{
    "organization_id": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "line1": "123 Main St",
    "city": "Anytown",
    "country": "Country",
    "postal_code": "12345",
    "phone": "1234567890"
}'
```

Response:

```bash
HTTP/1.1 201 Created
Content-Length: 250
Content-Type: application/json
Date: Thu, 10 Aug 2023 07:29:22 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
    "id": "1b849a99-cef7-42f5-a7f4-e00b1f439e08",
    "organization_id": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "line1": "123 Main St",
    "line2": "",
    "state": "",
    "city": "Anytown",
    "country": "Country",
    "postal_code": "12345",
    "phone": "1234567890",
    "created_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08",
    "created_at": "2023-08-10T07:29:22Z",
    "updated_at": "",
    "updated_by": ""
}
```

### Update Billing Customer

This function updates the details of an existing customer account.

```bash
Copy code
curl -sSiX POST http://localhost/organization/<org-id>/updatecustomer \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <user_token>" \
-d @- << EOF
{
    "name": "<name>",
    "email": "<email>",
    "line1": "<line1>",
    "line2": "<line2>",
    "state": "<state>",
    "city": "<city>",
    "country": "<country>",
    "postal_code": "<postal_code>",
    "phone": "<phone>"
}
EOF
```

Example:

```bash
curl -sSiX POST http://localhost/organization/1b849a99-cef7-42f5-a7f4-e00b1f439e08/updatecustomer \
-H "Content-Type: application/json" \
-H "Authorization : Bearer <user_token>" \
-d @- << EOF
{
    "name": "John Dozen",
    "email": "john.dozen@example.com",
    "line1": "123 Main St",
    "city": "Anytown",
    "country": "Country",
    "postal_code": "12345",
    "phone": "1234567890",
    "state": "State",
}
EOF
```

Response:

```bash
HTTP/1.1 200 OK
Content-Length: 250
Content-Type: application/json
Date: Thu, 10 Aug 2023 07:29:22 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
    "id": "1b849a99-cef7-42f5-a7f4-e00b1f439e08",
    "organization_id": "org123",
    "name": "John Dozen",
    "email": "john.dozen@example.com",
    "line1": "123 Main St",
    "line2": "",
    "state": "State",
    "city": "Anytown",
    "country": "Country",
    "postal_code": "12345",
    "phone": "1234567890",
    "created_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08",
    "created_at": "2023-08-10T07:29:22Z",
    "updated_at": "2023-08-10T07:29:22Z",
    "updated_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08"
}
```

## Subscription Functions

### Create Subscription

Create a new subscription for a customer.

Command:

```bash
curl -sSiX POST http://localhost/organization/<org-id>/subscribe \
-H "Authorization: Bearer <user_token>" \
-d @- << EOF
{
    "planID": "<planID>",
    "orgID": "<orgID>",
    "customerID": "<customerID>"
}
EOF
```

Example:

```bash
curl -sSiX POST http://localhost/organization/1b849a99-cef7-42f5-a7f4-e00b1f439e08/subscribe \
-H "Authorization: Bearer <user_token>" \
-d @- << EOF
{
    "planID": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
    "orgID": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
    "customerID": "1b849a99-cef7-42f5-a7f4-e00b1f439e08"
}
EOF
```

Response:

```bash
HTTP/1.1 201 Created
Content-Length: 354
Content-Type: application/json
Date: Thu, 10 Aug 2023 07:29:22 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
    "id": "1b849a99-cef7-42f5-a7f4-e00b1f439e08",
    "organization_id": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
    "pa_customer_id": "cus_123",
    "details": {
        "name": "John Dozen",
        "email": "john.dozen@example.com",
        "line1": "123 Main St",
        "line2": "",
        "state": "State",
        "city": "Anytown",
        "country": "Country",
        "postal_code": "12345",
        "phone": "1234567890",
    },
    "sub_id": "sub_123",
    "sub_status": "active",
    "subscription": {
        "id": "sub_123",
        "plan_id": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
        "plan": {
            "id": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
            "name": "Updated Bronze Plan",
            "amount": "40",
            "limits": {
                "max-computations": "100",
                "max-users": "200"
            },
            "currency": "eur"
        },
        "created_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08",
        "created_at": "2023-08-10T07:29:22Z",
        "updated_at": "2023-08-10T07:29:22Z",
        "updated_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08"
    },
    "created_by": "1b849a99-cef7-42f5-a7f4-e00b1f439e08",
    "created_at": "2023-08-10T07:29:22Z"
}
```

### Checkout

This function allows the customer to checkout and make payment for the selected plan.

Command:

```bash
curl -sSiX GET http://localhost/organization/<org-id>/checkout \
-H "Authorization: Bearer <user_token>"
```

Example:

```bash
curl -sSiX GET http://localhost/organization/1b849a99-cef7-42f5-a7f4-e00b1f439e08/checkout \
-H "Authorization: Bearer <user_token>"
```

Response:

```bash
HTTP/1.1 200 OK
Content-Length: 0
Content-Type: application/json
Date: Thu, 10 Aug 2023 07:29:59 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block
```
