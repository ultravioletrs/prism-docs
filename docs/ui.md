# UI

The Prism UI gives is the easiest way to use the CoCoS system, giving the ability to use the entire prism system without interacting with the command line. It provides a convenient way to log in to the CoCoS system, creation of users, projects, computations, computation policies, computation invitations, certs, backends, project billing and updating of all this information.

## Getting Started

The UI can be found at [https://prism.ultraviolet.rs](https://prism.ultraviolet.rs). The UI is a web application and can be accessed from any modern web browser. Currently, the source code is not available for the UI, but it is planned to be open sourced in the future.

## Login and Registration

A default user is created when the CoCoS system is installed. The default user is `admin`, with email `admin@example.com` and the password is `12345678`. This user can be used to log in to the UI. Once logged in, the user can change their password and create new users. The next layer of security is the project, which is a collection of users. The user can create a new project and invite other users to join the project. Prior to accessing the CoCoS system, the user must be a part of an project.

A user can also register an account by clicking the Register button which prompts the user for a username, email, and password. After which, the user is free to create projects and manage their created sysem.

The projects page gives the user the ability to either create an entirely new project or join an existing project. The user can also view the projects they are a part of and the projects they have created.

![Login Page](img/login.png)

## Projects

The projects page gives the user the ability to create new projects. The user can also view the projects they are a part of and the projects they have created. The user can also update the information of the projects they have created. The project page also includes a members tab, which shows the users that are a part of the project. On this tab, the project owner can also invite new users to join the project and assign different roles to the different users that have been assigned to the project.

![Project Login](img/proj-login.png)

## Users

The users page gives the user the ability to create new users. The user can also view the users they have created and the users that are a part of the project they are in. The user can also update the information of the users they have created.

![Users Page](img/users-page.png)

## Computations

The computations page gives the user the ability to create new computations. The user can also view the computations they have created and the computations that are a part of the project they are in. The user can also update the information of the computations they have created. On the computations page, the computation admin has the ability to invite other users into the computation. Once a user is invited to the computation, they are required to provide their public certificate for them to be able to run the computation.

![Computations Page](img/ui/computation.png)

On the computations page, the user has the ability to view invitations that have been sent to them and either accept or reject the invitation. The computation admin also has the ability to view the users that are a part of the computation and the roles that have been assigned to the different users.

## Computation Policies

The computation policies page gives the user the ability to create new computation policies. The user can also view the computation policies they have created and the computation policies that are a part of the project they are in. The user can also update the information of the computation policies they have created. A computation policy is used to determine the roles that are assigned to the different users that are a part of the computation, such as editor, viewer, or admin.

![Computation Policy](img/computation-policies.png)

## Billing

Billing service allows the project and users to pay for the services they use. The first step in billing is to create a billing customer, which you create as the first step when you access the project settings page.

![Billing Customer](img/billing-customer.png)

Once the customer is created, the user can select one of the plans created by the admin and subscribe to it. This leads the user to the payment page, where the user can enter their credit card details and subscribe to the plan.

![Subscription Select](img/subscriptions.png)

Once selected, the user will be prompted to make the payment. Once the payment is successful, the user will be subscribed to the plan and the billing will be active.

![Payment Page](img/payment.png)
