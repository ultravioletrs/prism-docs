# Backends Service
The backends service provides a means to manage backends which is where computations run. The service allows the creation, update, viewing and deletion of a backend. The service also manages connections to different backends and monitors them as well as securing the connection with mutual TLS. The service also enables the termination of the manager service running on the backend.

A backend can be described as consisting on manager running on the host, along with agent in a virtual machine in a Trusted Execution Environment.

![Backend](img/backend.drawio.png)

## Creating a Backend
This can be done on the user interface as below:
![New backend](img/ui/new%20backend.png)

## Updating backend
This can be done on the user interface:
![Update Backend](img/ui/update%20backend.png)


## Listing Backends
List of backends is viewable on the ui:

![list_backends](img/backends_page.png)

## View Backend
An individual backend can be viewed on ui where it's details such as address, status, ID, certs and information can be acquired. Backend termination is also done on this page through cert revocation.

![backend](img/backend.png)

## View Backend Information
For a SEV enabled backend, the backend information can be viewed using prism. This information is measured by a rust script found [here](https://github.com/ultravioletrs/cocos/blob/main/scripts/backend_info/src/main.rs). Once compiled and the binary is stored in `/build`, the backend information can be measured by prism as shown below.

On the backend page, click the Backend Information button:
![backend_page](img/backend_page.png)

If the measurement binary is absent and no measurement is found, an empty measurement file is displayed:

![empty_info](img/empty_backend_info.png)

If the measurement is present or measurement is found in the db, the measurement file will be available for download.

![backend_info](img/backend_info.png)


## Terminate Backend
This is used to disconnect and close the associated backend connection. This is usually triggered when a certificate is revoked while the backend is connected using this certificate or user initiated for any reason.
Please note that this action will stop all ongoing computations and stop manager and any running agent.

Manual backend termination can not be done directly on ui, but can be done using the curl command below:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/backends/terminate/<backend_id>/<termination_type> -H "Authorization: Bearer <user_token>"
```

Termination trype is an integer:
- 0 - Certificate revokation
- 1 - User initiated termination

response:
```bash
HTTP/1.1 204 No Content
Content-Type: application/json
Date: Fri, 03 May 2024 20:41:29 GMT
```

On manager the logs will be as follows:
```bash
{"time":"2024-05-03T23:41:29.664410497+03:00","level":"ERROR","msg":"manager service terminated: server requested client termination\nBackend Closed"}
{"time":"2024-05-03T23:41:29.671347637+03:00","level":"ERROR","msg":"Error shutting down tracer provider: context canceled"}
```

## Delete Backend
This removes the backend from the database. This can be done by clicking the delete button on the backend's page as shown:

![delete_backend](img/delete_backend_1.png)

Alternatively, the backend can be deleted on the list backends page by clicking the trash icon:
![delete_backend_2](img/delete_backend_2.png)
