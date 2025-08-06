# Access Control

Prism implements a comprehensive role-based access control system that provides fine-grained permissions across the platform. The system is built around two main entities: **Workspaces**, and **Computations**.

## Workspaces

Workspaces are organizational units that contain computations and users. Each workspace has its own set of roles and permissions:

### Workspace Roles

| Role               | Key Permissions                                           |
| ------------------ | -------------------------------------------------------- |
| **Administrator**  | Full workspace control, user management, computation creation |
| **Manager**        | Role management, user assignment                         |
| **Member**         | Read/update workspace resources                          |
| **Computation Creator** | Create and manage computations                      |
| **CVM Manager**    | Create and remove CVMs (Compute Virtual Machines)       |

### Workspace Permissions Explained

- **Read**: View workspace details and resources
- **Update**: Modify workspace settings and configurations
- **Delete**: Remove the workspace entirely
- **Enable/Disable**: Control workspace availability
- **Manage Roles**: Create, modify, and delete custom roles
- **User Management**: Add, remove, and view workspace users
- **Create Computations**: Launch new computational tasks
- **CVM Management**: Provision and manage compute resources

## Computations

Computations have the most granular access control system, designed to support complex multi-party computational scenarios:

### Computation Roles

| Role                | Permissions                           | Use Case                    |
| ------------------- | ------------------------------------- | --------------------------- |
| **Administrator**   | Owner, View, Edit, Run               | Full computation control    |
| **Editor**          | View, Edit                           | Modify computation settings |
| **Runner**          | View, Run                            | Execute computations        |
| **Viewer**          | View                                 | Monitor computation status  |
| **Dataset Provider** | View, Edit, Provide Data            | Supply input datasets       |
| **Algorithm Provider** | View, Edit, Provide Algorithm     | Contribute algorithms       |
| **Result Consumer** | View, Edit, Consume Results          | Access computation outputs  |

### Computation Permissions Explained

- **View**: See computation details, status, and metadata
- **Edit**: Modify computation parameters and configurations
- **Run**: Execute the computation
- **Stop**: Halt running computations
- **Owner**: Complete control over the computation lifecycle
- **Provide Data**: Upload and manage input datasets
- **Provide Algorithm**: Contribute computational algorithms
- **Consume Results**: Access and download computation outputs

## Permission Inheritance

The access control system follows a hierarchical permission model:

1. **Workspace Administrators** have admin permissions for all computations within their workspace
2. **Workspace Members** inherit basic access to workspace resources
3. Users can have multiple roles across different entities

## Role Management

### Custom Roles

Workspaces can create custom roles with specific permission combinations. Custom roles:

- Can be created, modified, and deleted by workspace administrators
- Allow fine-tuning of access permissions
- Support complex organizational structures

### Role Assignment

- Workspace administrators can manage roles within their workspace
- Role managers can add/remove users from specific roles
- Users can view their assigned roles and permissions

## Security Features

### Role Validation

- Built-in roles cannot be modified or deleted
- Permission changes are validated against the entity hierarchy
- Role assignments respect workspace boundaries

### Audit and Monitoring

- All role changes are tracked
- Permission checks are logged
- User access patterns can be monitored

## Best Practices

### Workspace Organization

- Use workspace administrators for department heads
- Assign computation creators to users who need to launch tasks
- Grant dataset provider roles to data owners
- Provide result consumer access to stakeholders who need outputs

### Security Guidelines

- Follow the principle of least privilege
- Regularly review and audit role assignments
- Use custom roles for specific organizational needs
- Monitor cross-workspace access patterns

### Multi-Party Computations

For collaborative computations involving multiple organizations:

- Assign dataset provider roles to data contributors
- Grant algorithm provider roles to algorithm developers
- Provide result consumer access to all authorized parties
- Use viewer roles for observers and auditors
