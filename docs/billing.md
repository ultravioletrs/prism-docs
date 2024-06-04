# Billing service

The billing service allows the project to pay for the services used in the CoCoS system such as total number of computations, total users, and the use rate. Once a billing customer is created, the billing service allows the user to select a plan out of the ones created by the admin and make payments for these plans based on the selected plan.

## Billing Metrics

Billing plans are designed for flexibility to accommodate different projects needs such as number of computations, usage and number of users. This allows choice for a plan that best fits current projects needs and can easily scale up as needed.
## Customer Functions

### List Plans
In order to list plans, the following steps need to be followed:

```bash
curl -isSX GET https://prism.ultraviolet.rs/billing/plans -H "Authorization: Bearer <user_token>"
```

For example:

```bash
curl -isSX GET https://prism.ultraviolet.rs/billing/plans -H "Authorization: Bearer <user_token>"

HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 26 May 2024 10:58:24 GMT
Content-Length: 1785

{
  "total": 4,
  "limit": 10,
  "offset": 0,
  "plans": [
    {
      "id": "f472599a-e77d-408c-885a-2b4ee57c5b1f",
      "name": "Plan2",
      "pa_plan_id": "prod_QEMhQtqmTEiJsl",
      "amount": "5",
      "currency": "EUR",
      "limits": {
          "MaxComputations": "13"
      },
      "metadata": {},
      "public_plan": true,
      "allowed_organizations": null,
      "disable": false,
      "created_by": "unknown user",
      "created_at": "2024-06-04T09:47:50.53794Z",
      "updated_at": "0001-01-01T00:00:00Z",
      "updated_by": ""
  },
  {
      "id": "71416ff3-2c74-4068-bacd-f88fa4c93f77",
      "name": "Plan4",
      "pa_plan_id": "prod_QEMt0cp0pQj8gq",
      "amount": "12",
      "currency": "EUR",
      "limits": {
          "MaxComputations": "12"
      },
      "metadata": {},
      "public_plan": true,
      "allowed_organizations": null,
      "disable": false,
      "created_by": "unknown user",
      "created_at": "2024-06-04T09:59:54.644938Z",
      "updated_at": "0001-01-01T00:00:00Z",
      "updated_by": ""
   },
   ...
  ]
}
```
On the UI the steps are as follows:

1. Click on 'Billing' on the side navigation to view the plans.
   ![Billing Plans Page](img/ui/plans%20list.png)

### Create Customer

This function allows for the creation of a new customer account with the billing service. A billing customer is required to perform all billing operations and is created from the billing settings page as shown below.

```bash
curl -sSiX POST https://prism.ultraviolet.rs/billing/customer \
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

![Create Billing Customer](img/create_customer.png)

Once you click the create billing customer, the customer details are required in order to successfully create the plan.
![Create Customer Modal](img/create_customer_modal.png)


```bash
curl -sSiX POST https://prism.ultraviolet.rs/billing/customer
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
Content-Type: application/json
X-Ratelimit-Limit: 1
X-Ratelimit-Remaining: 1
X-Ratelimit-Reset: 1717497570
Date: Tue, 04 Jun 2024 10:39:19 GMT
Content-Length: 1351

{
    "id": "c384217c-1431-4a3a-a6d2-90737845056d",
    "organization_id": "333570bf-3f22-4685-bc35-6f02ecfe72f6",
    "pa_customer_id": "cus_QENWHyV1Tqh53S",
    "details": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "line1": "123 Main St",
        "line2": "",
        "state": "",
        "city": "Anytown",
        "country": "Country",
        "postal_code": "12345",
        "phone": "1234567890"
    },
    "sub_id": "",
    "sub_status": "",
    "subscription": {
        "ID": "",
        "PASubID": "",
        "Name": "",
        "Status": "",
        "Plan": {
            "id": "",
            "name": "",
            "pa_plan_id": "",
            "amount": "",
            "currency": "",
            "limits": null,
            "metadata": null
        },
        "CreatedAt": "0001-01-01T00:00:00Z",
        "Currency": "",
        "CurrentPeriodEnd": "0001-01-01T00:00:00Z",
        "CurrentPeriodStart": "0001-01-01T00:00:00Z",
        "CancelAt": "0001-01-01T00:00:00Z",
        "CancelAtPeriodEnd": false,
        "CanceledAt": "0001-01-01T00:00:00Z",
        "BillingCycleAnchor": "0001-01-01T00:00:00Z",
        "TrailStart": "0001-01-01T00:00:00Z",
        "TrailEnd": "0001-01-01T00:00:00Z",
        "LatestInvoice": {
            "id": "",
            "status": "",
            "hosted_invoice_url": "",
            "pdf": "",
            "amount_due": 0,
            "amount_paid": 0,
            "amount_remaining": 0,
            "paid": false,
            "total": 0
        },
        "PaymentIndent": {
            "id": "",
            "amount": 0,
            "amount_capturable": 0,
            "amount_received": 0,
            "client_secret": "",
            "status": ""
        }
    },
    "plan_id": "",
    "plan": {
        "id": "",
        "name": "",
        "pa_plan_id": "",
        "amount": "",
        "currency": "",
        "limits": null,
        "metadata": null
    },
    "created_by": "unknown user",
    "created_at": "2024-06-04T10:39:19.31369231Z",
    "updated_by": "",
    "updated_at": "0001-01-01T00:00:00Z"
}
```

On the UI the steps are as follows:

1. Click on 'Billing' on the side navigation, then click 'Create'
   ![Billing Page](img/ui/billing%20customer.png)
2. On the dialog that pops up, fill in the required details.
   ![Create Customer Dialog](img/ui/create%20plan%20dialog.png)

### Update Billing Customer

This function updates the details of an existing customer account.
![Create Customer Modal](img/create_customer_modal.png)


```bash
Copy code
curl -sSiX PATCH https://prism.ultraviolet.rs/billing/organization/customer/c384217c-1431-4a3a-a6d2-90737845056d \
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
curl -sSiX PATCH https://prism.ultraviolet.rs/billing/customer/c384217c-1431-4a3a-a6d2-90737845056d \
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
Content-Type: application/json
X-Ratelimit-Limit: 1
X-Ratelimit-Remaining: 1
X-Ratelimit-Reset: 1717498110
Date: Tue, 04 Jun 2024 10:48:05 GMT
Content-Length: 1349

{
    "id": "c384217c-1431-4a3a-a6d2-90737845056d",
    "organization_id": "333570bf-3f22-4685-bc35-6f02ecfe72f6",
    "pa_customer_id": "cus_QENWHyV1Tqh53S",
    "details": {
        "name": "John D.",
        "email": "john.doe@example.com",
        "line1": "1236 Main St",
        "line2": "",
        "state": "",
        "city": "Anytown",
        "country": "Country",
        "postal_code": "12345",
        "phone": "1234567890"
    },
    "sub_id": "",
    "sub_status": "",
    "subscription": {
        "ID": "",
        "PASubID": "",
        "Name": "",
        "Status": "",
        "Plan": {
            "id": "",
            "name": "",
            "pa_plan_id": "",
            "amount": "",
            "currency": "",
            "limits": null,
            "metadata": null
        },
        "CreatedAt": "0001-01-01T00:00:00Z",
        "Currency": "",
        "CurrentPeriodEnd": "0001-01-01T00:00:00Z",
        "CurrentPeriodStart": "0001-01-01T00:00:00Z",
        "CancelAt": "0001-01-01T00:00:00Z",
        "CancelAtPeriodEnd": false,
        "CanceledAt": "0001-01-01T00:00:00Z",
        "BillingCycleAnchor": "0001-01-01T00:00:00Z",
        "TrailStart": "0001-01-01T00:00:00Z",
        "TrailEnd": "0001-01-01T00:00:00Z",
        "LatestInvoice": {
            "id": "",
            "status": "",
            "hosted_invoice_url": "",
            "pdf": "",
            "amount_due": 0,
            "amount_paid": 0,
            "amount_remaining": 0,
            "paid": false,
            "total": 0
        },
        "PaymentIndent": {
            "id": "",
            "amount": 0,
            "amount_capturable": 0,
            "amount_received": 0,
            "client_secret": "",
            "status": ""
        }
    },
    "plan_id": "",
    "plan": {
        "id": "",
        "name": "",
        "pa_plan_id": "",
        "amount": "",
        "currency": "",
        "limits": null,
        "metadata": null
    },
    "created_by": "unknown user",
    "created_at": "2024-06-04T10:39:19.313692Z",
    "updated_by": "",
    "updated_at": "0001-01-01T00:00:00Z"
}
```

On the UI the steps are as follows:

1. Click on 'Billing' on the side navigation, then click 'Update Customer Details'
   ![Billing Page](img/ui/billing%20customer%20plans.png)
2. On the dialog that pops up, fill in the required details and click 'Update'.
   ![Update Customer Dialog](img/ui/update%20customer%20dialog.png)

## Subscription Functions

### Create Subscription

Once a billing customer has been created, the plans creted will be visible. On the projects settings page, the plan cards will be visible as shown below:

![Plans Page](img/plans_page.png)

To subscribe to a plan, click the select subscription button which will create a subscription to the selected plan.

![Select Subscription](img/select_subscription.png)


Command:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/billing/customer/<org_id>/subscription \
-H "Authorization: Bearer <user_token>" \
-d @- << EOF
{
  "plan_id": "<plan_id>",
}
EOF
```

Example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/billing/customer/c384217c-1431-4a3a-a6d2-90737845056d/subscription \
-H "Authorization: Bearer <user_token>" \
-d @- << EOF
{
    "plan_id": "8b131663-058d-4e8f-8ccb-cc83c3f9e694",
}
EOF
```

Response:

```bash
HTTP/1.1 201 Created
Content-Type: application/json
X-Ratelimit-Limit: 1
X-Ratelimit-Remaining: 1
X-Ratelimit-Reset: 1717498770
Date: Tue, 04 Jun 2024 10:59:18 GMT
Content-Length: 1984

{
    "id": "c384217c-1431-4a3a-a6d2-90737845056d",
    "organization_id": "333570bf-3f22-4685-bc35-6f02ecfe72f6",
    "pa_customer_id": "cus_QENWHyV1Tqh53S",
    "details": {
        "name": "John D.",
        "email": "john.doe@example.com",
        "line1": "1236 Main St",
        "line2": "",
        "state": "",
        "city": "Anytown",
        "country": "Country",
        "postal_code": "12345",
        "phone": "1234567890"
    },
    "sub_id": "sub_1PNv5FKJ4T6nhCLX8xUeb1ou",
    "sub_status": "active",
    "subscription": {
        "ID": "sub_1PNv5FKJ4T6nhCLX8xUeb1ou",
        "PASubID": "sub_1PNv5FKJ4T6nhCLX8xUeb1ou",
        "Name": "",
        "Status": "active",
        "Plan": {
            "id": "f472599a-e77d-408c-885a-2b4ee57c5b1f",
            "name": "Plan2",
            "pa_plan_id": "prod_QEMhQtqmTEiJsl",
            "amount": "5",
            "currency": "eur",
            "limits": null,
            "metadata": null
        },
        "CreatedAt": "2024-06-04T10:59:17Z",
        "Currency": "eur",
        "CurrentPeriodEnd": "2024-07-04T10:59:17Z",
        "CurrentPeriodStart": "2024-06-04T10:59:17Z",
        "CancelAt": "1970-01-01T00:00:00Z",
        "CancelAtPeriodEnd": false,
        "CanceledAt": "1970-01-01T00:00:00Z",
        "BillingCycleAnchor": "2024-06-04T10:59:17Z",
        "TrailStart": "1970-01-01T00:00:00Z",
        "TrailEnd": "1970-01-01T00:00:00Z",
        "LatestInvoice": {
            "id": "in_1PNv5FKJ4T6nhCLXZeseni7b",
            "status": "paid",
            "hosted_invoice_url": "https://invoice.stripe.com/i/acct_1OP5fhKJ4T6nhCLX/test_YWNjdF8xT1A1ZmhLSjRUNm5oQ0xYLF9RRU5xdHlCVWtSbzMwTGdWUW1pZDVhWVhIbFlibURlLDEwODAzOTU1Nw0200RxjqzUNo?s=ap",
            "pdf": "https://pay.stripe.com/invoice/acct_1OP5fhKJ4T6nhCLX/test_YWNjdF8xT1A1ZmhLSjRUNm5oQ0xYLF9RRU5xdHlCVWtSbzMwTGdWUW1pZDVhWVhIbFlibURlLDEwODAzOTU1Nw0200RxjqzUNo/pdf?s=ap",
            "amount_due": 0,
            "amount_paid": 0,
            "amount_remaining": 0,
            "paid": true,
            "total": 5
        },
        "PaymentIndent": {
            "id": "",
            "amount": 0,
            "amount_capturable": 0,
            "amount_received": 0,
            "client_secret": "",
            "status": ""
        }
    },
    "plan_id": "f472599a-e77d-408c-885a-2b4ee57c5b1f",
    "plan": {
        "id": "f472599a-e77d-408c-885a-2b4ee57c5b1f",
        "name": "Plan2",
        "pa_plan_id": "prod_QEMhQtqmTEiJsl",
        "amount": "5",
        "currency": "EUR",
        "limits": {
            "MaxComputations": "13"
        },
        "metadata": {}
    },
    "created_by": "unknown user",
    "created_at": "2024-06-04T10:39:19.313692Z",
    "updated_by": "",
    "updated_at": "0001-01-01T00:00:00Z"
}
```

On the UI the steps are as follows:

1. Click on 'Billing' on the side navigation, then click 'Select Subscription' on any of plans to subscribe.
   ![Billing Plans Page](img/ui/billing%20plans.png)

### Checkout

When the select subscription button is clicked, you will be redirected to the checkout page where your payment details will be required for the payment to be made.
![Checkout Page](img/checkout_page.png)


Command:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/billing/organization/<org-id> \
-H "Authorization: Bearer <user_token>"
```

Example:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/billing/organization/1b849a99-cef7-42f5-a7f4-e00b1f439e08 \
-H "Authorization: Bearer <user_token>"
```

Response:

```bash
HTTP/1.1 302 Found
Content-Type: application/json
Date: Tue, 04 Jun 2024 11:10:10 GMT
Content-Length: 1984


{
    "id": "c384217c-1431-4a3a-a6d2-90737845056d",
    "organization_id": "333570bf-3f22-4685-bc35-6f02ecfe72f6",
    "pa_customer_id": "cus_QENWHyV1Tqh53S",
    "details": {
        "name": "John D.",
        "email": "john.doe@example.com",
        "line1": "1236 Main St",
        "line2": "",
        "state": "",
        "city": "Anytown",
        "country": "Country",
        "postal_code": "12345",
        "phone": "1234567890"
    },
    "sub_id": "sub_1PNv5FKJ4T6nhCLX8xUeb1ou",
    "sub_status": "active",
    "subscription": {
        "ID": "sub_1PNv5FKJ4T6nhCLX8xUeb1ou",
        "PASubID": "sub_1PNv5FKJ4T6nhCLX8xUeb1ou",
        "Name": "",
        "Status": "active",
        "Plan": {
            "id": "f472599a-e77d-408c-885a-2b4ee57c5b1f",
            "name": "Plan2",
            "pa_plan_id": "prod_QEMhQtqmTEiJsl",
            "amount": "5",
            "currency": "eur",
            "limits": null,
            "metadata": null
        },
        "CreatedAt": "2024-06-04T10:59:17Z",
        "Currency": "eur",
        "CurrentPeriodEnd": "2024-07-04T10:59:17Z",
        "CurrentPeriodStart": "2024-06-04T10:59:17Z",
        "CancelAt": "1970-01-01T00:00:00Z",
        "CancelAtPeriodEnd": false,
        "CanceledAt": "1970-01-01T00:00:00Z",
        "BillingCycleAnchor": "2024-06-04T10:59:17Z",
        "TrailStart": "1970-01-01T00:00:00Z",
        "TrailEnd": "1970-01-01T00:00:00Z",
        "LatestInvoice": {
            "id": "in_1PNv5FKJ4T6nhCLXZeseni7b",
            "status": "paid",
            "hosted_invoice_url": "https://invoice.stripe.com/i/acct_1OP5fhKJ4T6nhCLX/test_YWNjdF8xT1A1ZmhLSjRUNm5oQ0xYLF9RRU5xdHlCVWtSbzMwTGdWUW1pZDVhWVhIbFlibURlLDEwODA0MDIxMA0200nr4dMyST?s=ap",
            "pdf": "https://pay.stripe.com/invoice/acct_1OP5fhKJ4T6nhCLX/test_YWNjdF8xT1A1ZmhLSjRUNm5oQ0xYLF9RRU5xdHlCVWtSbzMwTGdWUW1pZDVhWVhIbFlibURlLDEwODA0MDIxMA0200nr4dMyST/pdf?s=ap",
            "amount_due": 0,
            "amount_paid": 0,
            "amount_remaining": 0,
            "paid": true,
            "total": 5
        },
        "PaymentIndent": {
            "id": "",
            "amount": 0,
            "amount_capturable": 0,
            "amount_received": 0,
            "client_secret": "",
            "status": ""
        }
    },
    "plan_id": "f472599a-e77d-408c-885a-2b4ee57c5b1f",
    "plan": {
        "id": "f472599a-e77d-408c-885a-2b4ee57c5b1f",
        "name": "Plan2",
        "pa_plan_id": "prod_QEMhQtqmTEiJsl",
        "amount": "5",
        "currency": "EUR",
        "limits": {
            "MaxComputations": "13"
        },
        "metadata": {}
    },
    "created_by": "unknown user",
    "created_at": "2024-06-04T10:39:19.313692Z",
    "updated_by": "",
    "updated_at": "0001-01-01T00:00:00Z"
}
```

On the UI the steps are as follows:

1. Click on 'Billing' on the side navigation, then click 'Select Subscription' on any of plans
   ![Billing Plans Page](img/ui/billing%20plans.png)
2. On the checkout page, fill in your information and submit to check out.
   ![Checkout Page](img/ui/checkout%20page.png)

### Update Payment Details

The payment details of the current session are stored, and these can be changed by clicking the update payment details button as shown below:

![Update Payment Details](img/update_payment_details.png)
