# Certs Service

The certs service is a certificate authority used to issue certs related to CVMs service for mutual and mutual attested TLS purposes. The certs service provides the ability to issue, renew, revoke and download certificates.

## Issue a Certificate

This is the creation of a certificate associated with a specific backend.

This can be done on the UI on the specific backend page, by clicking on issue cert button.
![Issue Certificate](../static/img/ui/issue%20cert.png)

This can be done on curl using:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/certs/issue/backend/<backend_id> -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "ip_addresses": []
}
EOF
```

example:

```bash
curl -sSiX POST https://prism.ultraviolet.rs/certs/issue/backend/fde3263e-70b8-4ce9-9f3c-4a203a0dcdf5 -H "Content-Type: application/json" -H "Authorization: Bearer <user_token>" -d @- << EOF
{
  "ip_addresses": ["192.168.100.4"]
}
EOF
```

response:

```bash
HTTP/1.1 201 Created
Content-Type: application/json
Date: Thu, 02 May 2024 11:35:37 GMT
Content-Length: 59

{"serial_number":"75709155906162784911683514578929321876"}
```

## Download a Certificate

This is a two step process. First we'll obtain a short lived token. Then using this token we'll be able to download the zip file containing the associated cert.

First we'll request a download token:

```bash
curl -sSiX GET https://prism.ultraviolet.rs/certs/<serial_number>/download/token -H "Authorization: Bearer <user_token>"
```

response:

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Thu, 02 May 2024 11:46:11 GMT
Content-Length: 164

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTQ2NTA2NzEsImlzcyI6IlVsdHJhdmlvbGV0Iiwic3ViIjoiY2VydHMifQ.4njH2KAz-qxzuaFkVx3WLQNuRTUdoKBTvlbG11oM7Yg"}
```

With the token we can then download the cert. Please note that the token is short lived and must be used before expiry.

```bash
curl -L -X GET https://prism.ultraviolet.rs/certs/<serial_number>/download -G -d "token=<download_token>" --output <filename>.zip
```

example:

```bash
curl -L -X GET https://prism.ultraviolet.rs/certs/75709155906162784911683514578929321876/download -G -d "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTQ2NTIzMTYsImlzcyI6IlVsdHJhdmlvbGV0Iiwic3ViIjoiY2VydHMifQ.lvFgVSKAyn2UNeJg1OA4fGxDDZ6pylZTn9UZhrfWR9I" --output certs.zip
```

On the UI we'll click on request download button, followed by download certs to obtain the certs.

![Request Download](../static/img/ui/request_cert.png)

![Download Certificate](../static/img/ui/download_cert.png)

This results in three files `ca.pem`, `cert.pem` and `key.pem` which we'll use with CoCo's manager to bring the backend online.

## Renew Certificate

Certificates can be renewed before they expire. This will move their expiry date to a future one.

![Renew Certificate](../static/img/ui/renew.png)

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/certs/<serial_number>/renew -H "Authorization: Bearer <user_token>"
```

response:

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 03 May 2024 13:32:31 GMT
Content-Length: 0
```

## Revoke Certificate

Certificates can be revoked, which means they can no longer be used for connecting to CVMs service. Revoked certificates cannot be renewed.

![Renew Certificate](../static/img/ui/revoke.png)

```bash
curl -sSiX PATCH https://prism.ultraviolet.rs/certs/<serial_number>/revoke -H "Authorization: Bearer <user_token>"
```

response:

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 03 May 2024 13:33:29 GMT
Content-Length: 0
```

## List Certificates

```bash
curl -sSiX GET https://prism.ultraviolet.rs/certs -H "Authorization: Bearer <user_token>"
```

response:

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 03 May 2024 13:37:04 GMT
Content-Length: 269

{"certificates":[{"SerialNumber":"26722427430573939575087739124584835231","Certificate":null,"Key":null,"Revoked":true,"ExpiryDate":"2024-05-03T13:33:29.405109Z","EntityType":"","EntityID":"ca219243-0dd4-4e6e-94ad-54fbf3dd8b32","DownloadUrl":""}],"total":1,"limit":10}
```

## Online Certificate Status Protocal

The certs service also provides an endpoint on `prism.ultraviolet.rs/certs/ocsp` which allows verification of certificates issued by this service.
