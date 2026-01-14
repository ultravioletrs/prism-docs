# Getting Started with Prism

Welcome to Prism! This guide will walk you through setting up your first workspace, creating secure compute environments, and running your first computation.

## What is Prism?

Prism is a confidential computing platform that enables secure multi-party computations using Trusted Execution Environments (TEEs). It allows multiple parties to collaborate on computations without exposing their sensitive data or algorithms.

## What You'll Build

In this guide, you'll run a **machine learning model to classify iris flowers**. This demonstrates how one party can provide an algorithm while another provides data, with results going to a third party—all without anyone seeing each other's sensitive information.

**The Scenario:**

- **Algorithm Provider**: Provides a Python script that adds numbers
- **Dataset Provider**: Provides a list of numbers to add
- **Result Consumer**: Receives the sum of all numbers

## Prerequisites

Before you begin, make sure you have:

1. **Cocos CLI Tool**: Required for key generation, file uploads, and retrieving results
   - Download and install from: [Cocos CLI Repository](https://github.com/ultravioletrs/cocos/releases)
   - Verify installation: `./build/cocos-cli --help` (should return some common CLI commands)

> **Important**: The Cocos CLI is essential for most operations in this guide, including generating keys, uploading algorithms/datasets, and downloading results. Install it now before proceeding.

## Quick Start Overview

1. **Account Setup** - Create your account and log in
2. **Workspace Creation** - Set up your collaborative environment  
3. **CVM Setup** - Create Confidential Virtual Machines for secure computing
4. **Computation Management** - Define, configure, and run secure computations.

![Quick Setup](../static/img/ui/Setup.png)

---

## 1. Account Setup

### Creating Your Account

1. Navigate to the Prism UI at [https://prism.ultraviolet.rs](https://prism.ultraviolet.rs)
2. Click **Register** to create a new account
3. Provide your username, email, and secure password
4. Complete registration and verify your email if required

![Registration Process](../static/img/ui/login.png)

### Logging In

1. Go to the login page
2. Enter your email and password
3. Click **Login**

![Login Page](../static/img/ui/login_page.png)

After successful login, you'll be directed to the workspaces page where you can select or create workspaces.

---

## 2. Workspace Management

### Understanding Workspaces

Workspaces are collaborative environments where teams can:

- Share secure computations
- Manage user permissions and roles
- Control access to algorithms and datasets
- Monitor computation runs and results

### Creating a New Workspace

1. From the workspaces page, click **Create New Workspace**
2. Provide a descriptive workspace name
3. Configure initial settings and permissions
4. Click **Create Workspace**

![Workspace Creation](../static/img/ui/projcreate.png)
![Workspace Setup](../static/img/ui/newproj.png)

### Joining an Existing Workspace

If you've been invited to a workspace:

1. Check your email for workspace invitation or login to prism
2. Follow the invitation link
3. Accept the invitation
4. The workspace will appear in your workspace list

### Accessing Your Workspace

1. Select the desired workspace from your list
2. Click **Enter Workspace** to access the dashboard
3. You'll now have access to all workspace features

![Workspace Login](../static/img/ui/wkslogin.png)

---

## 3. Set Up Your Keys

Keys serve as your **digital signature for identity verification** in Prism. They prove you authorized uploads and downloads—like a secure signature that can't be forged.

> **Important**: These keys are for identity/authentication only. All data encryption happens automatically via aTLS (attested TLS) within the secure enclave.

### Why Two Keys?

- **Public key**: Upload to Prism to verify your identity when creating assets
- **Private key**: Keep secret on your machine to sign your uploads and downloads

### Generate Your Keys

Use the [Cocos CLI tool](https://docs.cocos.ultraviolet.rs/cli#command-keys):

```bash
./build/cocos-cli keys -k rsa
```

![Generated keys](../static/img/getting_started_keys.png)

**Supported types:** `rsa`, `ecdsa`, `ed25519`

This creates two files:

- `public_key.pem` → You'll upload this to Prism shortly
- `private_key.pem` → Keep this secure and never share it

> **Security Note**: Your private key never leaves your machine. Prism never has access to it.

## 4. CVM (Confidential Virtual Machine) Setup

### What are CVMs?

CVMs are secure, isolated computing environments that run inside Trusted Execution Environments (TEEs). They ensure your computations remain confidential even from the cloud provider.

### Creating Your First CVM

> **Prerequisites**: You must have an active subscription with available backend providers (Azure, GCP, Ultraviolet, External).

1. Navigate to **CVMs** section in your workspace
2. Click **Create New CVM**
3. Select your preferred backend provider
4. Configure CVM specifications:
   - Memory allocation
   - CPU requirements
   - TEE type (AMD SEV_SNP/Intel TDX)
5. Click **Create CVM**

![Create CVM](../static/img/ui/new_cvm.png)

### CVM Status Monitoring

After creation, your CVM will go through several states:

- **Creating**: Initial setup in progress
- **Starting**: CVM is booting up
- **Online**: Ready for computations
- **Offline**: Not available for use

![CVM Creating](../static/img/ui/cvm_creating.png)
![CVM Online](../static/img/cvms/online-cvm.png)

> **⏱️ Setup Time**: CVMs typically come online within 2-5 minutes after creation or longer ~10 minutes for public cloud CVMs Azure/GCP.

---

## 5. Computation Management

A computation is a secure collaborative task in Prism. It brings together an algorithm and data from different parties, runs them in an encrypted environment, and delivers results—all without any party seeing the other's sensitive information.

### Iris Flower Classification in Prism - A Guided Example

This section demonstrates the complete workflow using a practical example: training a machine learning model to classify iris flowers. You'll learn how to:

- Create and configure a computation
- Assign roles and permissions
- Link algorithms and datasets
- Execute secure computations
- Interpret your results

This example uses a logistic regression algorithm to identify iris flower species (Setosa, Versicolor, or Virginica) based on four measurements: sepal length, sepal width, petal length, and petal width. Prism handles the secure computation while you maintain control of your algorithm and data through cryptographic hashes and private keys.

**Files you'll use:**

- **Algorithm**: [Logistic Regression script](https://github.com/ultravioletrs/cocos/blob/main/test/manual/algo/lin_reg.py) `lin_reg.py`
- **Dataset**: [Iris flower measurements](https://github.com/ultravioletrs/cocos/blob/main/test/manual/data/iris.csv) (`iris.csv`)

Download these files locally before proceeding.

---

### The Problem Prism Solves

**Problem**: One party has valuable data they can't share (due to privacy, regulations, or competitive reasons), and another party has an algorithm they want to keep proprietary. Normally, collaboration is difficult.

**Prism's solution**: The algorithm runs on the data inside an encrypted environment. The data owner never sees the algorithm, the algorithm owner never sees the data, and the platform can't access either. Only the designated party receives the encrypted results.
This enables secure collaboration that would otherwise be legally or commercially impossible.

Every computation involves these roles:

- **Algorithm Provider** – Supplies the code or model to be executed (e.g., a data scientist with a predictive model)
- **Dataset Provider** – Supplies the input data for processing (e.g., a company with proprietary customer data)
- **Result Consumer** – Receives the encrypted computation output (e.g., the company receiving predictions)

Note: The same person or organization can hold multiple roles, or each role can be filled by different parties—the structure adapts to your collaboration needs.

### What You'll Set Up

To create a computation:

1. **Define the computation** – Name it and describe what it does
2. **Assign roles** – Choose which workspace members fill each role
3. **Link assets** – Connect the specific algorithm and dataset to use
4. **Select a CVM** – Pick where the secure computation will run
5. **Execute** – Run the computation and monitor progress

In this guide, we'll demonstrate the complete workflow using a practical example: training a machine learning model to classify iris flowers. This example will take you through every step—from creating your computation to interpreting the results.

### Creating a Computation

1. Navigate to **Computations** in your workspace
2. Click **New Computation**
2. Fill in details:
   - **Name**: "Iris Classification Demo"
   - **Description**: "Machine learning classification of iris flower species"
   - **Agent Configuration**: Leave default TLS settings

      ![New Computation](../static/img/ui/new_computation.png)

### Understanding Roles

Every computation has three required roles that represent different parties in the secure collaboration:

| Role                   | What They Provide | Required?   |
|------------------------|-------------------|-------------|
| **Algorithm Provider** | The code to run   | ✅ Yes.     |
| **Dataset Provider**   | Input data        | ⚪ Optional |
| **Result Consumer**    | Gets the results  | ✅ Yes      |

> **Example**: Company A provides a fraud-detection algorithm, Company B provides transaction data, Company C receives the fraud report.

Important constraints:

- One role per user: Each user can only be assigned to one role per computation
- Need multiple permissions? You can create custom roles or update existing ones to combine actions (e.g., a role that's both Algorithm Provider and Result Consumer)
- Other built-in roles exist: Owner, Viewer, Editor, Runner—for different access levels beyond the core computation roles

Each role has specific actions that determine what users can do—like `view`, `edit`, `run`, `algo_provider`, `dataset_provider`, or `result_consumer`. [Learn more about managing roles and permissions](./roles.md).

#### Step 1: Navigate to Roles

1. Go to your computation's details page
2. Click on **Roles** tab

   ![Roles Tab](../static/img/ui/roles.png)

#### Step 2: Assign User Roles

3. **If you're the only user in your workspace**: You automatically have the Owner role. You still do not have ability to act as Algorithm Provider, Dataset Provider, and Result Consumer. To add this:

   - Click on the **Owner** role
   ![Roles Tab](../static/img/ui/edit_owner_role.png)
   - Click **Add Actions** or edit the role
   - Add the actions: `algo_provider`, `dataset_provider`, and `result_consumer` to your Owner role
   ![Edit Owner Role](../static/img/ui/add_roles.png)
   - This allows you to perform all three functions in this demo as owner, this should be how your role looks like:
   ![Role added successfully](../static/img/ui/owner_role_success.jpg)

4. **If you have multiple users**: For each role (Algorithm Provider, Dataset Provider, Result Consumer):

   - Click on the role
   ![Role Assignment](../static/img/ui/view_role.png)
   - Click **Add Members**
   ![Role Assignment](../static/img/ui/add_members.png)
   - Search for workspace users
   - Select users and confirm assignment
   ![Add User to Role](../static/img/ui/add_user_to_role.png)

> **📝 Note**: Users must already be invited to the workspace before they can be assigned computation roles. A user cannot belong to more than one role, to add permissions you should actions on the required [role](./roles.md).

### Upload a Public Key

A public key is needed for every computation.

- Click on Upload Public Key - there will be an indicator that no public key is attached
![Upload public key](../static/img/ui/upload_public_key.png)
- This opens a box for you to select a public key
 ![Upload public key success](../static/img/ui/upload_key.png)
- From the [generated keys here](#generate-your-keys), upload your public key and indicator will disappear as below:
 ![Upload public key success](../static/img/ui/upload_public_key_success.png)

### Managing Computation Assets

Each role owner needs to create their asset (algorithm, dataset, etc.) and link it to the computation. Assets are cryptographically verified using file hashes and secured using your public/private key pair.

> Note: Prism UI only creates asset metadata.Actual files are not uploaded to Prism.
Algorithms and datasets must be uploaded directly to the CVM using the Cocos CLI (via AGENT_GRPC_URL).The CLI is required for uploading files and retrieving results.

---

## Step-by-Step: Building Your Iris Classification Computation

Now let's walk through creating and executing your computation.

### Prepare Your Demo Files

For this demo, you'll use:

**Algorithm**: [Logistic Regression script](https://github.com/ultravioletrs/cocos/blob/main/test/manual/algo/lin_reg.py) `lin_reg.py`

**Dataset**: [Iris flower measurements](https://github.com/ultravioletrs/cocos/blob/main/test/manual/data/iris.csv) (`iris.csv`)

Save these files locally.

### Generate File Hashes

For each file, generate its cryptographic hash using the [Cocos CLI](https://docs.cocos.ultraviolet.rs/cli#command-checksum) to be used in the next step:

```bash
# Hash the algorithm
./build/cocos-cli checksum lin_reg.py

# Hash the dataset
./build/cocos-cli checksum iris.csv
```

![Generate Hashes](../static/img/generate_hashes.png)

> **Why hashes?** The hash is a unique digital fingerprint that ensures the exact file you specify is used in the computation and hasn't been modified.

### Create Algorithm Asset

1. Navigate to **Assets** → **Create New Asset**
2. Select **Algorithm** type
3. Fill in:

   - **Name**: "Iris Classification Model"
   - **Description**: "Logistic Regression for iris species classification"
   - **File Hash**: Paste the hash from `lin_reg.py`

      ![New Asset](../static/img/ui/new_asset.png)

4. Click **Create Asset**

### Link Algorithm to Computation

1. From your **Assets** page, find "Iris Classification Model"

   ![Algo Assets](../static/img/ui/algo_assets.png)

2. Click **Associate**

   ![Associate Algo](../static/img/ui/algo_associate.png)

3. Select your computation (e.g., "Iris Classification Demo")
4. Confirm

   ![Associate Asset](../static/img/ui/associate_algo_asset.png)

### Create Dataset Asset

Repeat the same process for your dataset:

1. Navigate to **Assets** → **Create New Asset**
2. Select **Dataset** type
3. Fill in:

   - **Name**: "Iris Dataset"
   - **Description**: "150 iris flower measurements for classification"
   - **File Hash**: Paste the hash from `iris.csv`

      ![New Asset](../static/img/ui/create_dataset.png)

4. Click **Create Asset**
5. Click **Associate**

   ![Associate Algo](../static/img/ui/dataset_associate.png)

6. Select your computation (e.g., "Iris Classification Demo")
7. Confirm

   ![Associate Asset](../static/img/ui/associate_dataset_asset.png)
There will be a tag that shows the associated computation for each linked asset:

   ![Associate Asset Success](../static/img/ui/associate_user_asset_success.png)

#### Ready to Run Your Computation

You've now completed all the setup steps:

- ✅ Created a computation

- ✅ Assigned roles and permissions

- ✅ Uploaded your public key

- ✅ Created and linked algorithm and dataset assets

>Note: The **Run Computation** button will be disabled until all requirements are met.

![Run Disabled](../static/img/ui/run_computation_disabled.png)
>Before running, ensure:

 - ✅ All required roles are assigned

 - ✅ All necessary assets are linked

 - ✅ At least one CVM is online

 - ✅ Users have uploaded their public keys

With everything in place, the Run Computation button is now enabled. Click it to start your secure computation.

#### Executing the Computation

1. Click **Run Computation** (when enabled)
2. Select an available online CVM
   ![Select CVM](../static/img/ui/select_cvm.png)
3. Confirm execution
   ![Confirm Execution](../static/img/ui/successfully_running_computation.png)

As you can see in the computation timeline,
the status shows "Receiving algorithm" with "In progress" - this means the CVM is ready.
It is waiting for your files.
Now you need to upload the algorithm and dataset to the computation using the [Cocos CLI tool](https://github.com/ultravioletrs/cocos/releases).

### Upload Your Files to the CVM

After creating the asset metadata in Prism, upload the actual files to the Confidential Virtual Machine (CVM).

#### Set Up Connection

First, export the agent's gRPC URL to connect to the CVM:

```bash
export AGENT_GRPC_URL=<agent_ip>:<port>
# Example: export AGENT_GRPC_URL=199.92.195.153:61088
```

You can find the AGENT_GRPC_URL on the computations page as shown:

![Agent URL](../static/img/ui/agent_url.png)

#### Upload Files

Then upload your files:

```bash
# Upload the algorithm
./build/cocos-cli algo lin_reg.py <private_key_file_path> -r <requirements_file>
```

![Algo Uploaded CLI](../static/img/upload_algo_cli.png)

NB: The requirements file is optional.

The state in the UI changes and the CVM is now awaiting the dataset:
![Algo Uploaded](../static/img/ui/upload_algo_prism.png)

```bash
# Upload the dataset
./build/cocos-cli data iris.csv <private_key_file_path>
```

![Dataset Uploaded CLI](../static/img/upload_dataset_cli.png)

Nothing changes after uploading dataset in the UI but the computation is still in progress. You can monitor through the logs:

![Dataset Uploaded CLI](../static/img/ui/computation_logs.png)

The CLI connects to the agent via gRPC and encrypts your files before uploading them to the CVM, where they remain protected throughout the computation. Your private key ensures only you can perform this upload and later decrypt the results.

More documentation on: [algo](https://docs.cocos.ultraviolet.rs/cli/#command-algo) and [data](https://docs.cocos.ultraviolet.rs/cli/#command-data)

Once both files are uploaded, the CVM will:

1. Train the logistic regression model on the iris data
2. Split data into training and testing sets automatically
3. Evaluate the model's performance
4. Generate results including accuracy metrics

#### Retrieve Your Computation Results

Once the computation completes, download and decrypt your results using the [Cocos CLI tool](https://docs.cocos.ultraviolet.rs/cli/#command-result) with your **private key** as a digital identity:

```bash
./build/cocos-cli result <private_key_file_path> <output_file_name>
```

**Example output:**
![Stop Computation](../static/img/computation_Results.png)

The decrypted results will be saved to your specified output file, ready for analysis.

### Understanding Your Results

After the computation completes, you'll receive a **`results.zip`** file containing:

- **Trained model** — Ready to classify new iris flowers
- **Performance metrics** — Accuracy, precision, and recall scores
- **Confusion matrix** — Shows classification accuracy for each species

#### What Good Results Look Like

For the Iris dataset, you should typically see:

- **Training accuracy:** 90-95%
- **Testing accuracy:** 95-100%

**Example output:**

```bash
Training Accuracy: 0.93
Testing Accuracy: 1.00

              precision    recall
Iris-setosa       1.00      1.00
Iris-versicolor   1.00      1.00
Iris-virginica    1.00      1.00
```

High accuracy on both training and testing sets means your model learned clear patterns and can reliably classify new flowers.

### Making Predictions

Use your trained model to classify new iris flowers:

```bash
python ./test/manual/algo/lin_reg.py predict results.zip ./test/manual/data
```

The model will predict the species for each flower based on its measurements.

### Tips for Success

✅ **Verify file hashes** — Ensure hashes match before uploading to guarantee file integrity

✅ **Keep your private key secure** — It's required for uploading files and decrypting results

✅ **Check both accuracies** — Training and testing scores should be similar; large gaps may indicate overfitting

✅ **Save your model** — Keep `results.zip` for future predictions without retraining

### Next Steps

- **Try different algorithms** — Compare performance across various classification methods
- **Upload your own datasets** — Apply machine learning to your specific classification problems
- **Explore advanced features** — Adjust hyperparameters for improved model performance

### Monitoring Execution

#### Real-time Monitoring

Once started, you can monitor:

- **Events**: High-level computation milestones
- **Logs**: Detailed execution information from the in enclave agent

![Events and Logs](../static/img/ui/logsEvents.png)

#### Stopping a Running Computation

You can stop a computation at any time by:

1. Clicking the **Stop** button on the events card, or
2. Using the **Stop** button in the Logs tab

![Stop Computation](../static/img/ui/stop_computation.png)
![Stop Computation Run](../static/img/ui/stop_computation_run.png)

## Troubleshooting

### Common Issues

#### CVM Won't Start

- Check your subscription status and available credits
- Try creating a new CVM
- Contact support if the issue persists

#### Can't Run Computation

- Ensure all required assets are linked
- Verify all roles have assigned users
- Check that at least one CVM is online
- Check your subscription status and available credits

#### Asset Upload Failures

- Verify your public key is correctly uploaded
- Ensure you have proper role permissions

### Getting Help

- **Documentation**: Browse our comprehensive docs
- **Support**: Contact our support team
- **Community**: Join our user community forums

---

## Next Steps

Now that you've completed the getting started guide:

1. **Explore Advanced Features**: Learn about [computation roles](./roles.md), advanced security settings
2. **API Integration**: Discover how to automate workflows using our [API](./api.md)
3. **Attestation**: Discover our [attestation](https://docs.cocos.ultraviolet.rs/attestation-introduction) implementation
4. **Community**: Connect with other Prism and [CoCoS](https://docs.cocos.ultraviolet.rs/) users

Ready to dive deeper? Check out our [Computation documentation](../computations) and [API Documentation](../api/).

---
