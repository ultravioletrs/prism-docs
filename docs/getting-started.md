# Getting Started

The Prism UI gives is the easiest way to use the CoCoS system, giving the ability to use the entire prism system without interacting with the command line.
It provides a convenient way to log in to the CoCoS system, creation of users, workspaces, computations, computation policies, computation invitations, certs, backends, workspace billing and updating of all this information.
The UI can be found at [https://prism.ultraviolet.rs](https://prism.ultraviolet.rs). The UI is a web application and can be accessed from any modern web browser.

## Sign Up

Create a user on the ui as shown below:

or using curl as below:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users -H "Content-Type: application/json" -d @- <<EOF
{
  "name": "John Doe",
  "credentials": {
    "identity": "john.doe@example.com",
    "secret": "12345678"
  }
}
EOF
```

the response is follows:

```bash
HTTP/1.1 201 Created
Content-Type: application/json
Location: /users/b88b42b3-b4a4-4003-a777-6bab443385c9
Date: Tue, 30 Apr 2024 12:40:32 GMT
Content-Length: 213

{"id":"b88b42b3-b4a4-4003-a777-6bab443385c9","name":"John Doe","credentials":{"identity":"john.doe@example.com"},"created_at":"2024-04-30T12:40:32.116252Z","updated_at":"0001-01-01T00:00:00Z","status":"enabled"}
```

For more user related actions see: [magistrala users](https://docs.magistrala.abstractmachines.fr/api/#users)

## Login User

In order to login user we need to provide username and password:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users/tokens/issue -H "Content-Type: application/json" -d @- <<EOF
{
  "identity": "john.doe@example.com",
  "secret": "12345678"
}
EOF
```

response:

```bash
HTTP/1.1 201 Created
Content-Type: application/json
Date: Tue, 30 Apr 2024 12:48:18 GMT
Content-Length: 647

{"access_token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiIiLCJleHAiOjE3MTQ0ODQ4OTgsImlhdCI6MTcxNDQ4MTI5OCwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiIiwidHlwZSI6MCwidXNlciI6IjBkY2UyMmM2LTFhOTQtNGE4ZS1hNzAxLTE4NWE0YzM3ZGY1OCJ9.osXITQXqGHV_aewrnz0bmFzfwIjxMuPZnsSkcYxmJJrNlO9JYEVXrZHLZuS8wejGNUzHur33desq_X3REISBaA","refresh_token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiIiLCJleHAiOjE3MTQ1Njc2OTgsImlhdCI6MTcxNDQ4MTI5OCwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiIiwidHlwZSI6MSwidXNlciI6IjBkY2UyMmM2LTFhOTQtNGE4ZS1hNzAxLTE4NWE0YzM3ZGY1OCJ9.KRWH0TTfrORMrjCsfxKw4P6TO4z0Pr3DXilLttwQCiMF6kKy-8sbNz5n2VNjkAIonm-LgIN-qz64l6--a78NjQ"}
```

A user can also register/create an account using the UI by clicking the Register button which prompts the user for a username, email, and password. After which, the user is free to create workspaces and manage their created system.
![UI login](../static/img/ui/login.png)

### Create a workspace

```bash
curl -sSiX POST https://prism.ultraviolet.rs/auth/domains/ -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "workspace 1",
  "alias": "proj1"
}
EOF

HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 30 Apr 2024 13:17:33 GMT
Content-Length: 235

{"id":"fda88db8-97e1-4560-8db1-29e8a40b5d0c","name":"workspace 1","alias":"org1","status":"enabled","created_by":"0dce22c6-1a94-4a8e-a701-185a4c37df58","created_at":"2024-04-30T13:17:32.884558Z","updated_at":"0001-01-01T00:00:00Z"}
```

The workspaces page gives the user the ability to either create an entirely new workspace or join an existing workspace. The user can also view the workspace they are a part of and the workspace they have created.

On the ui the steps are as follows:
![Project page](../static/img/ui/newproj.png)
![Project Creation](../static/img/ui/projcreate.png)

### Project Login

To log in to a Workspace:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users/tokens/refresh -H "Content-Type: application/json" -H "Authorization: Bearer <user_refresh_token>" -d @- << EOF
{
  "domain_id": "<workspace_id>"
}
EOF
```

Example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/users/tokens/refresh -H "Content-Type: application/json" -H "Authorization: Bearer <user_refresh_token>" -d @- << EOF
{
  "domain_id": "b19c8738-0efa-400e-aaf0-610ef42f1ee1"
}
EOF
```

Resopnse:

```bash
HTTP/1.1 201 Created
Content-Length: 715
Content-Type: application/json
Date: Thu, 10 Aug 2023 07:25:06 GMT
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block

{
  "access_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE2NTQxMDYsImlhdCI6MTY5MTY1MjMwNiwiaWRlbnRpdHkiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjFiODQ5YTk5LWNlZjctNDJmNS1hN2Y0LWUwMGIxZjQzOWUwOCIsInR5cGUiOiJhY2Nlc3MifQ.FRaSjJT7wZVPSW6w-O3jyQa9WekLUzp6WcdakrZuvFgTsPvo29tbCNsX71ktJkwKeQUK1CPwRQrWrEu8tAOKFg",
  "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE3Mzg3MDYsImlhdCI6MTY5MTY1MjMwNiwiaWRlbnRpdHkiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjFiODQ5YTk5LWNlZjctNDJmNS1hN2Y0LWUwMGIxZjQzOWUwOCIsInR5cGUiOiJyZWZyZXNoIn0.iGpKn5FrTknYeuxqIxMd8x40MnExgaUJ1iWJ9Vg5szoShM-M6hu-Q1bNMcZQJoS4wxswGc50JzOjd7JSIYnucg",
  "access_type": "Bearer"
}
```

For the UI click enter to log in to workspace with will bring you to the dashboard.
![Project login](../static/img/ui/wkslogin.png)

## CVMs

### Creating a CVM

CVMs are used to run computations. We need to create one before we are able to run a computation. Backend providers are available based on current subscription.

![Create CVM](../static/img/ui/new_cvm.png)

Please wait as the cvm is being created.
![CVM_Creating](../static/img/ui/cvm_creating.png)

```bash
curl -sSiX POST https://prism.ultraviolet.rs/backends/backend -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "test cvm",
  "backend": "manager",
  "agent_log_level": "info"
}
EOF
```

response

```bash
HTTP/1.1 201 Created
Content-Type: application/json
Location: /backends/fde3263e-70b8-4ce9-9f3c-4a203a0dcdf5
Date: Thu, 02 May 2024 10:15:35 GMT
Content-Length: 0
```

The cvm will come online in a few minutes.
![Online CVM](../static/img/cvms/online-cvm.png)

## Computations

Once the cvm comes online, we can proceed to creating a computation. For computation management, we use Computations micorservice.

### Create Computation

In order to create computation, we can to provide the following content:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/computations -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "[name]",
  "description": "[description]",
  "datasets": [
    "<dataset_1>", ..., "[dataset_n]"
  ],
  "algorithm": {"id":<id>, "provider":<provider>, "hash":<hash>}
}
EOF
```

Example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/computations -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "name": "Machine Diagnostics Analysis",
  "description": "Performing diagnostics analysis on machine data",
  "backend_id": "fde3263e-70b8-4ce9-9f3c-4a203a0dcdf5",
  "agent_config": {
    "log_level": "debug"
  }
}
EOF
```

Response:

```bash
HTTP/1.1 201 Created
Content-Type: application/json
Location: /computations/240be921-5758-4ffa-9ed3-97e6e72e97ea
Date: Thu, 02 May 2024 14:29:22 GMT
Content-Length: 0
```

![New computation](../static/img/ui/new_computation.png)
Running a computation requires the following items:

| Item            | User     | User Role          | Computation Asset | Public Key | Additional Information                                                                                               |
| :-------------- | :------- | :----------------- | :---------------- | :--------- | :------------------------------------------------------------------------------------------------------------------- |
| Algorithm       | Required | Algorithm Provider | Algorithm         | Required   | Algorithms are required because they will be executed in TEE.                                                        |
| Dataset         | Optional | Dataset Provider   | Dataset           | Required   | Datasets are optional because some algorithms do not require training datasets.                                      |
| Result Consumer | Required | Result Consumer    | -                 | Required   | Result consumers are required because they are the users that can retrieve results after successful computation run. |

Public keys are mandatory because they are needed for user identification when uploading algorithm and datasets and when retrieving results. Therefore, users need to generate public/private key pairs and upload their public keys.

Users invited to a workspace:

1. need to be assigned user roles in the computation by the computation owner or admin.
2. need to create computation assets respective to their roles i.e. an algorithm provider needs to create an algorithm asset.
3. need to link all the required assets to the computation.
4. need to their private key for uploading assets and retrieving results.

These steps have been explained in the sections below.

### Assigning Computation Roles and Permissions

1. Navigate to the roles page from the computation details page.
![Roles](../static/img/ui/roles.png)

2. Select a role to which you would like to add a user.
   Please note that this user needs to be invited to a workspace and to have accepted the invitation.
   ![Roles](../static/img/ui/view_role.png)

3. Switch to the members tab and click on the Add Members button.
   ![Roles](../static/img/ui/role_details.png)

4. Search for the user you'd like to assign a role.

5. Select the user from the list and click on Add Selected Members button.
   ![Roles](../static/img/ui/add_user_to_role.png)

6. Upon successful role assignment, the user will appear on the role details page.
   ![Roles](../static/img/ui/assigned_user_role.png)

### Linking Computation Assets

The assigned users from the previous step need to create and link their respective assets to the computation that they are assigned.
This can be done as follows:

1. Navigate to assets page and create a new asset.
   ![Roles](../static/img/ui/new_asset.png)

2. A successfully created asset will appear in the assets page.
   ![Roles](../static/img/ui/user_assets.png)

3. Search for the computation by name and link the asset.
   ![Roles](../static/img/ui/associate_user_asset.png)

4. Repeat the steps for all the assets that are needed to run the computation.

### Run Computation

Next we'll run the computation:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/computations/<computation_id>/run -H "Authorization: Bearer <user_token>"
```

response:

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 03 May 2024 08:37:24 GMT
Content-Length: 0
```

Notice the run button is disabled until all the requirements are met:
![Run computation Disabled](../static/img/ui/run_computation_disabled.png)

Once the requirements are satisfied, run computation button is enabled.
![Run computation](../static/img/ui/run_computation.png)

Once you click run computation, you will be required to select a CVM on which to run the computation:
![Select CVM](../static/img/ui/select_cvm.png)

This will result in events and logs from agent and manager visible on the ui.
![Events and Logs](../static/img/ui/logsEvents.png)

### Stop Computation Run

To stop a computation run at any point, click the **Stop** button on the event's card. The card contains the details and list of events related to the current computation run. Once the run is stopped, the button will be hidden.

![Stop Computation Run](../static/img/ui/stop_computation.png)

The **Stop** button can also be found in the Logs tab, on each card.

![Stop Run](../static/img/ui/stop_computation_run.png)
