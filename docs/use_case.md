# Use cases

This document presents a **real-world scenario** where Prism is used to perform a **secure multiparty computation (MPC)** for collaborative training of a COVID-19 prediction model.

While this example is grounded in pandemic response, the underlying approach generalizes to any sensitive, collaborative AI training effort — including applications in **healthcare, finance, and government**.

If you have not used Prism before, it helps to first skim the [Getting Started Guide](/docs/getting-started.md) to familiarize yourself with workspaces, CVMs, and computations in the UI. This use case then shows how the same building blocks are combined for a concrete privacy‑preserving AI workflow.

---

## High-Level Use Case Context

Modern machine learning often requires diverse and high-quality datasets, but privacy, legal, and competitive concerns restrict data sharing. Prism addresses this by enabling **cross-organization AI workloads using secure enclaves** (Confidential Virtual Machines or CVMs), allowing data to remain private even during processing.

In this scenario you can imagine several hospitals, each holding chest X‑ray images, jointly training a COVID‑19 classifier without ever sharing raw images with one another. Prism orchestrates the collaboration, while Cocos and the CVM provide the confidential execution environment.

This COVID-19 use case highlights:

- **Collaborative model training** without exposing raw datasets.
- **Compliance with data protection regulations** (e.g., HIPAA, GDPR).
- **Deployment of algorithms in secure compute environments**, fully auditable and cryptographically verified.

The walkthrough builds on the COVID-19 training algorithm provided in the [AI repository](https://github.com/ultravioletrs/ai/tree/main/covid19) and executes it securely through Prism and Cocos.

---

## Summary Workflow

At a high level, the COVID‑19 training workflow in Prism looks like this:

1. **Provisioning**: Define a workspace and computation, and onboard stakeholders.
2. **Asset Registration**: Register and upload datasets and algorithms.
3. **CVM Creation**: Set up confidential compute infrastructure.
4. **Execution**: Run and monitor the multiparty computation.
5. **Result Consumption**: Authorize, download, and use the final model.

The sections below walk through each step in more detail, combining the UI‑based flow from the [Getting Started Guide](/docs/getting-started.md) with the additional CLI commands required for data and algorithm upload.

---

## 1. Provisioning the Prism Environment

The first phase is to prepare a secure collaboration space in Prism and define the computation that will run inside it.

### Create the Workspace and Computation

Using the Prism UI (as described in the [Getting Started Guide](/docs/getting-started.md)), log in and either create a **new workspace** or choose an existing one that all participating organizations will use.

Within that workspace:

- Create a **computation** that will encapsulate the COVID‑19 training task.
- Give it a meaningful name and description so collaborators can easily find it.
- Ensure a valid **billing account** is attached for tracking usage.

Conceptually, the workspace is the secure boundary for collaboration, and the computation is the specific “project” that will collect datasets, algorithms, and results.

![New Computation](img/usecase/new_comp.png)

### Invite Participating Organizations

Next, invite the organizations that will contribute data or consume results. From the workspace and computation views in the UI:

- Invite users from each institution to the workspace.
- Once they accept, assign them appropriate roles in the computation (e.g., **Dataset Provider**, **Algorithm Provider**, **Result Consumer**).

These roles control who can create assets, link them to the computation, and later retrieve results. For a more detailed explanation of role assignment, see the _Assigning Computation Roles and Permissions_ section in the [Getting Started Guide](/docs/getting-started.md).

![View Computation](img/usecase/view_comp.png)

---

## 2. Confidential Compute via CVM

A Confidential Virtual Machine (CVM) is where the COVID‑19 training actually executes. It provides a hardware‑backed trusted execution environment (Intel TDX, AMD SEV, etc.) so that data and code remain protected even from the cloud provider.

From the Prism UI, follow the same flow described in the _CVMs_ section of the [Getting Started Guide](/docs/getting-started.md):

1. Navigate to the **CVMs** page in your workspace.
2. Click **New CVM** and choose a backend provider and configuration.
3. Wait for the CVM to transition to the online state.

![Create CVM](img/usecase/create_cvm.png)

📘 Detailed setup instructions: [CVM Docs](/docs/cvms.md)

After the CVM is online, you can interact with it from the CLI. First, export the CVM's gRPC endpoint so the Cocos CLI knows where to connect:

```bash
export AGENT_GRPC_URL=192.0.2.1:6110
```

This environment variable allows CLI interaction with the agent running inside the CVM.

---

## 3. Creating Assets

With the workspace, computation, and CVM ready, the next step is to define the **assets** that will be used in the computation: datasets supplied by participating organizations and the training algorithm itself.

In the UI, assets are created and linked much like in the _Linking Computation Assets_ section of the [Getting Started Guide](/docs/getting-started.md). Assets (datasets and algorithms) should be declared on the platform as illustrated in the [Assets Docs](/docs/assets.md), then associated with the computation.

Once each provider has created and linked their assets, the computation view will show the full set of COVID‑19 datasets and the algorithm attached:

![COVID-19 Assets](img/usecase/datasets.png)

### Uploading Datasets

After defining dataset assets in the UI, each data‑providing organization uploads its actual data into the CVM using the [Cocos CLI](https://docs.cocos.ultraviolet.rs/cli). This step binds the logical dataset asset in Prism to encrypted data inside the CVM.

For example, a hospital with a zip file of chest X‑ray images can upload its dataset as follows:

```bash
export AGENT_GRPC_URL=192.0.2.1:6110

./build/cocos-cli data ../ai/covid19/datasets/h1.zip ./private.pem
```

Datasets are provided by the separate parties collaborating on the computation. Each party in the SMPC has their own dataset and uploads it under their own profile before associating it to the computation, prior to the computation being run.

### Uploading the Algorithm

The algorithm provider follows a similar pattern: first create an algorithm asset in the UI, then upload the training code and dependencies to the CVM using the Cocos CLI. For this COVID‑19 example, the algorithm is a Python training script from the AI repository.

Python-based training scripts should be uploaded with their dependencies:

```bash
export AGENT_GRPC_URL=192.0.2.1:6110

./build/cocos-cli algo ../ai/covid19/train.py ./private.pem \
  -a python \
  -r ../ai/covid19/requirements.txt
```

![Upload Algorithm](img/usecase/upload_algo.png)

The algorithm must conform to the Cocos runtime interface (as detailed in the AI repo).

![Algorithm Received](img/usecase/algo_received.png)

---

## 4. Execution of the Secure Computation

Once all assets are in place and linked, you are ready to run the secure multiparty computation.

From the computation details page in the UI (similar to the _Run Computation_ section in the [Getting Started Guide](/docs/getting-started.md)):

1. Verify that all required roles have linked their assets and that the **Run** button is enabled.
2. Click **Run** and select the target CVM you created earlier.
3. Monitor the computation state and logs in real time.

During the run, the computation will transition through states such as:

- **Receiving Algorithm**
- **Receiving Data**
- **Running**
- **Completed**

![Running Computation](img/usecase/running_computation.png)

All events and logs are cryptographically signed and verifiable.

![Computation Progress](img/usecase/computation_progress.png)

---

## 5. Result Retrieval

After the computation completes successfully, result consumers can retrieve the trained model and any additional outputs. This step happens from the CLI using the same keys that were used to upload assets.

Authorized users can retrieve results via:

```bash
./build/cocos-cli result ./private.pem
```

![Completed Computation](img/usecase/completed_computation.png)

Note: Results are **one-time consumable** and linked to access control lists defined by the computation owner. This ensures that even after the model has been produced, access to it is tightly controlled and auditable.

![Downloaded results](img/usecase/consumed_results.png)

---

Once the results are available, they can be used to perform inference on test data or any other dataset compatible with the model.

```bash
unzip results.zip -d results

python predict.py --model results/model.pth --image datasets/test/COVID/COVID-2.png
```

This will predict the condition of the image provided:

```bash
$python predict.py --model results/model.pth --image datasets/test/COVID/COVID-2.png
The predicted class for the image is: COVID
Image with prediction saved to ./results/prediction_COVID-2.png
```

Or a different image in the test dataset:

```bash
$python predict.py --model results/model.pth --image datasets/test/Viral\ Pneumonia/Viral\ Pneumonia-1014.png
The predicted class for the image is: Viral Pneumonia
Image with prediction saved to ./results/prediction_Viral Pneumonia-1014.png                         ~6s
```

---

## Broader Real-World Applications

This COVID-19 training use case serves as a **template for broader domains**:

| Domain                                                                       | Use Case Example                                                                        |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **[Healthcare](https://github.com/ultravioletrs/ai/tree/main/covid19)**      | Secure joint training of diagnostic models across hospitals.                            |
| **[Finance](https://github.com/ultravioletrs/ai/tree/main/fraud-detection)** | Fraud detection models using data from multiple banks.                                  |
| **Insurance**                                                                | Risk modeling across industry consortia.                                                |
| **[Energy](https://github.com/ultravioletrs/ai/tree/main/rul-turbofan)**     | Failure prediction and remaining useful life in turbo engines based on historical data. |
| **Public Sector**                                                            | Secure census or mobility analysis across government bodies.                            |

Prism, powered by [Cocos](https://docs.cocos.ultraviolet.rs), makes **confidential AI collaboration** practical at scale, with cryptographic audit trails and privacy guarantees.

---

## 🔗 References

- [AI COVID-19 Training Repo](https://github.com/ultravioletrs/ai/tree/main/covid19)
- [Cocos CLI Docs](https://docs.cocos.ultraviolet.rs/cli)
- [Prism Getting Started Guide](/docs/getting-started.md)
- [CVM Reference Manual](/docs/cvms.md)
