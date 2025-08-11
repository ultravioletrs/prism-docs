# Architecture

Prism is a comprehensive multi-party computation platform that provides a computation management service for confidential computing using Trusted Execution Environments (TEEs). It integrates with [CocosAI](https://docs.cocos.ultraviolet.rs/) to enable secure, private computations across multiple parties while maintaining data confidentiality and computation integrity.

## Overall System Architecture

Prism operates as a cloud-native platform that orchestrates confidential computations across distributed TEE-enabled infrastructure. The system is designed with a modular, microservices architecture that provides scalability, security, and multi-tenancy support.

![Prism Architecture Overview](../static/img/arch.drawio.png)

### Key Architectural Principles

- **Zero-Trust Security**: All communications are encrypted and authenticated using mTLS
- **Multi-Tenancy**: Workspaces provide isolated environments for different organizations
- **TEE-Agnostic**: Supports multiple TEE technologies (AMD SEV-SNP, Intel TDX) through the CocosAI backend
- **Attestation-First**: All computations require cryptographic proof of TEE integrity
- **Bring Your Own CVM**: Flexible infrastructure deployment options

## System Components

### Prism Cloud Services

| Service            | Description                                 | Key Responsibilities                                                                                                                                                                 |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Auth**           | Authentication and authorization management | - Policy enforcement for backends, certs, and computations<br />- Role-based access control<br />- API token management                                                              |
| **Users**          | User identity and workspace membership      | - User registration and authentication<br />- Workspace association and roles<br />- Integration with [SuperMQ users](https://docs.supermq.abstractmachines.fr/architecture) service |
| **Computations**   | Computation lifecycle management            | - Computation definition and metadata<br />- Participant coordination<br />- Execution orchestration and monitoring                                                                  |
| **Backends**       | TEE infrastructure management               | - CVM provisioning and lifecycle<br />- Connection to CocosAI agents<br />- Multi-cloud and on-premise support                                                                       |
| **Certs**          | Certificate Authority services              | - mTLS certificate issuance and management<br />- Certificate revocation and renewal<br />- OCSP endpoint for certificate validation                                                 |
| **Billing**        | Resource usage and payment management       | - Usage tracking and billing<br />- Resource access control based on plans<br />- Multi-tenant cost allocation                                                                       |
| **Workspaces**     | Tenant isolation and resource organization  | - Domain separation and access control<br />- Resource grouping and management                                                                                                       |
| **User Interface** | Web-based platform access                   | - Visual interface for all platform operations                                                                                                                                       |

### CocosAI TEE Runtime Components

Prism integrates with CocosAI components that run on TEE-enabled hardware:

| Component   | Location       | Description                                                                                                                                                 |
| ----------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Manager** | TEE Host       | - CVM provisioning and lifecycle management<br />- IGVM/OVMF firmware configuration<br />- TEE monitoring and secure destruction                            |
| **Agent**   | Inside CVM/TEE | - Computation execution coordination<br />- Secure data and algorithm ingestion<br />- Remote attestation report generation<br />- Secure result extraction |
| **EOS**     | Inside CVM/TEE | - Lightweight Linux distribution (Buildroot-based)<br />- Minimal attack surface<br />- Container runtime for workloads                                     |
| **CLI**     | Client/Admin   | - Administrative interface to TEE operations<br />- Attestation verification<br />- Algorithm and data provisioning                                         |

## Data Flow and Interaction Patterns

### Computation Lifecycle

1. **Computation Definition**
   - User defines computation via Prism UI or API
   - Specifies participants, data providers, algorithm providers
   - Sets privacy policies and result distribution rules
   - Participants provide public keys to be used for identification by agent

2. **Backend Provisioning**
   - Prism Backends service selects appropriate TEE infrastructure
   - Requests CVM creation from CocosAI Manager or public cloud CVM
   - Establishes secure communication channels

3. **TEE Initialization**
   - Prism Certs service issues mTLS certificates for secure communication between agent and prism.
   - Manager provisions CVM with IGVM/OVMF firmware. Alternatively CVM is provisioned on the public cloud
   - EOS boots inside TEE with Agent
   - Agent establishes secure channel with Prism

4. **Participant Onboarding**
   - Agent starts and prepares to receive assets
   - Attestation reports verified before participation

5. **Secure Data Ingestion**
   - Algorithm providers submit algorithms
   - Data providers upload datasets
   - All transfers use end-to-end encryption (using mutual attested TLS)

6. **Computation Execution**
   - Agent coordinates execution inside TEE
   - Workloads run within EOS
   - Progress monitored by Prism Computations service

7. **Result Distribution**
   - Results extracted from TEE
   - Distributed to authorized recipients only
   - Audit trail maintained for compliance through computation logs and events

8. **Secure Cleanup**
   - TEE securely destroyed after computation
   - All intermediate data wiped
   - Certificates revoked and resources deallocated

### Communication Protocols

- **Prism ↔ CocosAI Manager**: gRPC over mTLS
- **Agent ↔ Prism**: gRPC over mTLS
- **Agent ↔ CLI**: gRPC over mTLS with attestation
- **Client ↔ Prism**: HTTPS with OAuth2/JWT
- **Prism Internal**: Service mesh with mTLS

## Security Architecture

### Trust Model

- **Hardware Root of Trust**: TEE hardware provides foundational security
- **Attestation Chain**: Cryptographic proof of TEE integrity from hardware to application
- **Zero-Knowledge Coordination**: Prism coordinates computations without accessing data
- **Certificate-Based Identity**: All entities authenticated via PKI

### Attestation Flow

1. **TEE Measurement**: Hardware generates cryptographic measurements of CVM state
2. **Report Generation**: Agent produces signed attestation report
3. **Verification**: CLI validates report against expected measurements
4. **Policy Enforcement**: Only verified TEEs allowed to participate

### Data Protection

- **Data in Transit**: End-to-end encryption using mTLS
- **Data at Rest**: Encrypted storage with key management
- **Data in Use**: Protected by TEE hardware encryption
- **Key Management**: Distributed key derivation without central key storage

## Deployment Architectures

### Cloud Deployment

- Prism services deployed on major cloud providers (GCP, Azure)
- CocosAI backends on TEE-enabled cloud instances
- Managed certificates and load balancing

### On-Premise Deployment

- Self-hosted Prism services in customer infrastructure
- Direct control over TEE hardware
- Air-gapped environments supported

### Hybrid Deployment

- Prism control plane in cloud
- TEE compute resources on-premise
- Secure tunneling for coordination

## Scalability and Performance

### Horizontal Scaling

- Microservices architecture enables independent scaling
- Load balancing across multiple TEE backends
- Database sharding for multi-tenant workloads

### Limitations

- **TEE Resource Constraints**: Memory and CPU limitations within enclaves
- **I/O Overhead**: Encryption/decryption costs for large datasets
- **Hardware Dependencies**: Requires specific TEE-capable processors
- **Network Latency**: Multi-party coordination introduces communication delays

## Monitoring and Observability

### System Metrics

- CVM health and resource utilization
- Computation execution progress and performance
- Certificate lifecycle and validity status
- Backend connectivity and availability

### Security Monitoring

- Attestation verification
- Certificate validation events
- Unauthorized access attempts
- Anomalous computation patterns

### Audit Trail

- Complete computation lifecycle logging
- Participant actions and data access
- Security events and policy violations
- Compliance reporting capabilities

## Integration Points

### APIs and SDKs

- **REST APIs**: Comprehensive API coverage for all platform operations
- **CLI Tools**: Command-line interface for automation and scripting

This architecture enables Prism to provide a comprehensive, secure, and scalable platform for confidential multi-party computation while maintaining the highest standards of data privacy and security through TEE technology.
