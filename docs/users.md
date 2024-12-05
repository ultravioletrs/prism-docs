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

On ui this can be done as follows;

Navigate to the landing page and click the **Register** button:  
 ![Registration](img/ui/user_register.png)

On the registration form, provide the following required details:

- **Username**
- **Email Address**
- **First and Last Names**
- **Password**  
  ![Register Form](img/ui/self_register.png)

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

On the UI this can be done as follows:

- Once logged in, click on your **User Profile** icon located at the top-right corner of the page:  
  ![User Profile](img/ui/user_profile.png)

- From the dropdown menu, select the **My Account** option. This will redirect you to your **Profile Page**:  
  ![Account Page](img/ui/my_account.png)

## Steps to View and Update User Information

### 1. Profile Page Overview

- On the profile page, you can:
  - View a summary of your account details.
  - Access options to **update** your information or **deactivate** your account.

### 2. Updating User Details

To modify your information, click the **Update** icon on the profile page:  
 ![Update Details](img/ui/update_details.png)

On the resulting update page, you can edit any of the following fields as needed:

- Username
- Email Address
- First and Last Names
- Password  
  ![Update Page](img/ui/update_user_page.png)

### 3. Disabling a User

- To deactivate your account, you must first manage any associated entities:
  - Delete all associated entities, OR
  - Transfer ownership of these entities to another registered user.

> **Note:** Once all associated entities are resolved, you can proceed with account deactivation through the options provided on the profile page.
