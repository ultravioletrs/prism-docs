# Confidential Virtual Machines (CVMs)

## Overview

Confidential Virtual Machines (CVMs) provide a secure environment for running computations while ensuring data confidentiality. CVMs are available in multiple configurations, allowing users to select a flavor that best suits their needs. The currently supported flavors include:

- **GCP**: Confidential Virtual Machines hosted on Google Cloud Platform.
- **Azure**: Confidential Virtual Machines deployed on Microsoft Azure.
- **Manager**: Confidential Virtual Machines running on our dedicated cloud infrastructure.

Before computations can be executed, a CVM must be created and properly configured. Once set up, it can be selected for running workloads securely.

## **Confidential Computing Virtual Machines (CVM) Configurations**  

- **GCP CVMs** run on the **N2D machine series**, powered by **AMD EPYC Milan and Rome processors**. These machines support up to **224 vCPUs and 896 GB RAM**, offering high-bandwidth networking and flexible pricing options. They use **SEV-SNP** for memory encryption, ensuring data remains confidential even from the hypervisor. N2D instances support persistent and local SSD storage but do not support GPUs or nested virtualization.  

- **Azure CVMs** utilize the **DCasv5 series**, featuring **AMD EPYC 7763v (Milan) processors** with **up to 96 vCPUs and 384 GB RAM**. These machines incorporate **SEV-SNP** for full memory encryption and hardware-isolated execution. They support premium remote storage but lack local disks, making them ideal for workloads requiring strict security without temporary storage dependencies.  

- **Manager** runs on an **AMD EPYC 7443P (Milan) processor** with **24 cores and 30 GB RAM**, providing a secure and efficient environment for coordination tasks. It leverages **SEV-SNP** for full memory encryption, ensuring strong confidential computing capabilities. The system operates on **Ubuntu 24.04.1 LTS** and features **446.6 GB of storage**, with a **1 GB EFI partition and 445.6 GB root partition**. It supports virtualization via **AMD-V** and includes mitigations against speculative execution vulnerabilities, making it a reliable control node in confidential computing infrastructures.  

All configurations ensure robust **confidential computing capabilities**, with varying performance tiers to optimize security, cost, and workload efficiency.

---

## Creating a CVM

To create a CVM, follow these steps:

1. **Navigate to the CVMs Section:**

   - From the dashboard, click on the **CVMs** tab to access the CVM management page.

   ![Dashboard](img/cvms/dashboard.png)

2. **Initiate CVM Creation:**

   - Click the **Create CVM** button to begin the setup process.

   ![Create Button](img/cvms/create_button.png)

3. **Select Configuration Options:**

   - From the dropdown menu, choose the desired CVM flavor (GCP, Azure, or Manager).
   - Specify the amount of RAM (required for Azure and GCP CVMs).
   - Define the vCPU count (configurable for Azure and GCP CVMs only).

   ![Create Modal](img/cvms/create_modal.png)

4. **CVM Provisioning:**

   - After submitting the configuration, the CVM creation process will begin. This may take a few minutes.
   - Once created, the CVM will appear in the list with its unique **ID, URL, and status**.

   ![CVM List](img/cvms/cvms_list.png)

---

## Viewing CVM Details & Managing Certificates

Each CVM is initialized with default certificates that are used to verify secure communication between the CVM agent and Prism. To view or manage a CVM’s certificates:

1. **Access the CVM Details Page:**

   - Navigate to the CVM list.
   - Click on the **CVM ID** to open its details page.

   ![CVM Details](img/cvms/cvm_details_page.png)

2. **Manage Certificates:**

   - **Download Certificates:** Retrieve the default certificates for verification and secure connections.
   - **Revoke Certificates:** Invalidate compromised or outdated certificates.
   - **Renew Certificates:** Extend the validity of existing certificates.
   - **Issue New Certificates:** Generate additional certificates as needed.

   > **Note:** Default certificates are automatically loaded into the CVM during creation. Any newly issued certificates must be manually transferred to the CVM for use.

---

## Removing a CVM

If a CVM is no longer needed, it can be removed using the following steps:

1. **Navigate to the CVM List:**

   - Open the CVMs page.

2. **Initiate Removal:**

   - Click the **Delete** button next to the CVM you want to remove.

   ![Remove CVM](img/cvms/cvm_removal.png)

3. **CVM Deactivation:**
   - The CVM’s status will change to **Inactive** upon removal.

---

## Additional Notes

- CVMs provide an extra layer of security by ensuring that computations occur in a protected execution environment.
- Once a CVM is removed, its resources are deallocated, and it cannot be recovered.
- For Azure and GCP CVMs, compute resources should be selected carefully based on workload requirements to optimize cost and performance.
- Regularly update certificates to maintain secure connections.

By following these guidelines, users can efficiently manage their Confidential Virtual Machines while maintaining a high level of security and performance.
