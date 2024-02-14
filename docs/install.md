# Install

## Pre-requisites

Before proceeding, install the following prerequisites:

- [Docker](https://docs.docker.com/install/) (version 20.10.17)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.9.0)

Once everything is installed, execute the following command from project root:

To run the backend, first download Cocos AI backend:

```bash
git clone git@github.com:ultravioletrs/cocos.git
cd cocos
make && make dockers_dev
```

Finaly - you can run the backned (within `cocos` directory):

```bash
make run
```

This enables manager which is used to communicate with the agent when a computation is run. The communication between manager and prism is done through gRPC which should be configured in the .env of prism project root (i.e., the PRISM_MANAGER_GRPC_URL env variable).

## Frontend

To deploy the user interface run the following commands:

```bash
git clone git@github.com:ultravioletrs/prism.git
cd prism
make -j5
make dockers_dev
make run
```

This will build and bring up the docker composition that is used to run the UI. 

The User Interface can now be accesible from [http://localhost:9095/ui](http://localhost:9095/ui).

> [http://localhost:9095/ui](http://localhost/9095/ui) is for internal use only, and is not intended to be used by the end-user.
> Only port `80` is exposed to the outside world via NginX proxy.
