import { getCurrentYear } from "@site/lib/utils";

const navigationLinks = [
  { label: "Features", href: "/#features" },
  { label: "Solutions", href: "/#use-cases" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs/intro" },
  {
    label: "Blog",
    href: "https://medium.com/ultraviolet-blog",
  },
];

const logo = {
  src: "/img/logo.png",
  alt: "Prism Logo",
  width: "250px",
  height: "250px",
  placeholder: "/placeholder.svg",
};

export const HeaderData = {
  logo: logo,
  navigationLinks: navigationLinks,
  ctaButton: {
    text: "Try For Free",
    link: "/#pricing",
  },
};

export const FooterData = {
  companyInfo: {
    logo: logo,
    name: "Prism AI",
    description:
      "Secure, Collaborative AI for Confidential Workloads.",
  },
  quickLinks: navigationLinks,
  socialLinks: [
    {
      platform: "Twitter",
      icon: "Twitter",
      href: "https://twitter.com/ultravioletrs",
    },
    {
      platform: "LinkedIn",
      icon: "Linkedin",
      href: "https://www.linkedin.com/company/ultravioletrs",
    },
    {
      platform: "GitHub",
      icon: "Github",
      href: "https://github.com/ultravioletrs/cocos",
    },
  ],
  contact: {
    email: "info@ultraviolet.rs",
  },
  newsletter: {
    title: "Newsletter",
    subtitle: "Stay in the loop",
    placeholder: "Your email address",
    buttonText: "Subscribe",
  },
  footerCopyright: {
    year: getCurrentYear(),
    rights: "All rights reserved.",
    policies: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
};

export const HeroData = {
  title1: "Secure, Collaborative AI for Confidential Workloads",
  subtitle:
    "Prism AI empowers organizations to execute AI computations securely within Trusted Execution Environments (TEEs). Designed for privacy-preserving collaboration, it enables multi-party data sharing and analysis without exposing sensitive information. Whether in the cloud or on-premises, Prism AI ensures end-to-end encryption and robust security for your AI workflows.",
  getStartedButton: {
    text: "Get Started",
    link: "#",
  },
  requestDemoButton: {
    text: "Request For Demo",
    link: "#",
  },
  image: {
    url: "hero.webp",
    alt: "Hero Image",
  },
};

export const TrustedByData = [
  {
    name: "Target",
    logo: "img/logos/target.png",
    style: {
      height: "70px",
    },
  },
  {
    name: "Greennet",
    logo: "img/logos/greennet.png",
    style: {
      height: "40px",
    },
  },
  {
    name: "EU Commission",
    logo: "img/logos/eu.png",
    style: {
      height: "70px",
    },
  },
  {
    name: "Telefonica",
    logo: "img/logos/telefonica.png",
    style: {
      height: "40px",
    },
  },
  {
    name: "TUe",
    logo: "img/logos/tue.png",
    style: {
      height: "40px",
    },
  },
  {
    name: "TNO",
    logo: "img/logos/tno.png",
    style: {
      height: "50px",
    },
  },
  {
    name: "Intel",
    logo: "img/logos/parc.png",
    style: {
      height: "40px",
    },
  },
  {
    name: "VTT",
    logo: "img/logos/vtt.png",
    style: {
      height: "50px",
    },
  },
  {
    name: "etf",
    logo: "img/logos/etf.png",
    style: {
      height: "70px",
    },
  },
  {
    name: "LF",
    logo: "img/logos/lf.png",
    style: {
      height: "50px",
    },
  },
];

export const ProductData = {
  sectionId: "introduction",
  title: "What is Prism AI?",
  imageUrl: "https://user-images.githubusercontent.com/23095882/183417817-a5013c43-637e-488b-9e06-ee6fe8e588b0.svg",
  alt: "Prism AI Platform",
  content: {
    overview:
      "Prism AI is a cutting-edge platform designed to empower secure, collaborative AI computations within Trusted Execution Environments (TEEs). It enables organizations to share and analyze sensitive data across multiple parties without compromising privacy, making it ideal for industries like healthcare, finance, and government.",
    security:
      "Prism AI ensures end-to-end encryption and robust data protection throughout the computation process. It offers secure VM provisioning, fine-grained access control, and remote attestation, simplifying the deployment and management of confidential workloads.",
    community:
      "Prism AI's seamless integration with open-source tools like Cocos AI ensures flexibility, scalability, and transparency. This integration allows developers to innovate securely and efficiently, fostering a community-driven approach to AI development. The open-source nature of Cocos AI, which forms the core part of Prism AI, enables rapid bug fixing, customization, and collaboration within a thriving developer ecosystem, further enhancing the platform's capabilities and security features.",
  },
};

export const FeaturesOverviewData = {
  sectionId: "features",
  title: "Explore Our Features",
  subtitle:
    "Empower your production ecosystem with tools designed to simplify, secure, and scale your operations.",
  benefits: [
    {
      title: "Secure Collaboration",
      description:
        "Prism AI allows multiple parties to collaboratively process data without exposing sensitive information. Powered by Trusted Execution Environments (TEEs), the platform ensures the confidentiality and privacy of data exchanges and AI workloads. This enables Secure Multi-party Computation (SMPC) for confidential collaborative AI.",
      imageUrl: "img/product/collaboration-rafiki.svg",
    },
    {
      title: "Secure VM Provisioning and Management",
      description:
        "Prism AI excels in provisioning secure Confidential Virtual Machines (CVMs) within private, hybrid, or public cloud settings. Leveraging TEEs, Prism AI simplifies computation definition and management, enabling users to effortlessly define and execute secure workloads within secure enclaves. Seamlessly deploy and maintain secure Virtual Machines for your workloads.",
      imageUrl: "img/product/Server-rafiki.svg",
    },
    {
      title: "Remote Attestation",
      description:
        "Prism AI implements a robust remote attestation mechanism, verifying the integrity of remote systems. This ensures that your workloads run in trusted environments, even in untrusted or remote settings.",
      imageUrl: "img/product/Security-On-rafiki.svg",
    },
    {
      title: "Fine-Grained Access Control",
      description:
        "Prism AI empowers users with fine-grained access control through policies and attribute-based access control (ABAC) or role-based access control (RBAC). Ensures that only authorized entities access orchestration metadata, while AI algorithms and data are uploaded only in private confidential enclaves previously attested by the user.",
      imageUrl: "img/product/Privacy-policy-rafiki.svg",
    },
    {
      title: '"Bring Your Own Backend"',
      description:
        'Prism AI supports a "bring your own backend" approach, enabling the introduction of any TEE-capable node into the infrastructure, enhancing flexibility and scalability. Computational nodes can be enabled via the open-source Cocos AI platform. Prism AI is designed with a flexible architecture that supports multiple computational backends, adhering to a "bring your own backend" approach.',
      imageUrl: "img/product/Server-rafiki2.svg",
    },
    {
      title: "End-to-End Encryption",
      description:
        "Prism AI ensures end-to-end encryption for traffic, safeguarding the confidentiality and integrity of data transmissions. Collaborate on AI projects with the assurance that your data remains secure throughout the computation process.",
      imageUrl: "img/product/encryption-cuate.svg",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Prism AI features an intuitive user interface designed to simplify the management and orchestration of confidential workloads. The UI is crafted to enhance user experience, providing seamless navigation, easy configuration, and real-time monitoring of computational tasks.",
      imageUrl: "img/product/integration-bro.svg",
    },
    {
      title: "Open Source",
      description:
        "Core part of Prism AI - Cocos AI - is open source, published under the Apache 2.0 license, enabling transparency, rapid bug fixing, customization, and collaboration. It fosters heightened security and innovation within a thriving developer community.",
      imageUrl: "img/product/Open-source-rafiki.svg",
    },
  ],
};

export const FeaturesData = {
  sectionId: "features",
  title: "Explore Our Features",
  subtitle:
    "Discover tools that make your development journey seamless and scalable.",
  features: [
    {
      title: "Data Visualization",
      description:
        "Magistrala takes data visualization to the next level with customizable dashboards that provide real-time insights into the metrics that matter most to your business. Access a variety of charts, gauges, and control systems to monitor your devices effortlessly. Track and map your devices globally using advanced location services with marker and route maps. Shareable dashboards make it easy to collaborate with your team and keep everyone informed, no matter where they are.",
      imageUrl: "visual-person.svg",
    },
    {
      title: "Efficient and Cloud-Native",
      description:
        "Magistrala enables you to build, deploy, monitor and manage your IoT applications through a robust cloud-native architecture. This provides an extremely efficient and scalable deployment. Through the use of microservices you will have complete visibility over you ecosystems with the aid of remote monitoring, detailed and exhaustive logs as well as metric. This will ensire you never miss out.",
      imageUrl: "scalability.svg",
    },
    {
      title: "Rules Engine",
      description:
        "Magistrala’s Rules Engine is a powerful tool for creating dynamic, event-driven workflows tailored to your specific needs. It enables you to filter, enrich, and transform incoming data from devices, assets, or system events. With customizable rule nodes and chains, you can trigger real-time actions such as notifications, external API calls, or data validation. Whether processing telemetry, handling lifecycle events, or automating operations, the Rules Engine ensures precise control and seamless integration across your IoT ecosystem.",
      imageUrl: "calculator.svg",
    },
    {
      title: "UI and Open APIs",
      description:
        "Magistrala offers a visually stunning and highly engaging User Interface that empowers users to create, manage and connect clients, groups, and users over channels with ease. Designed with ease of use in mind, the UI eliminates the need for coding knowledge while providing comprehensive guides and documentation for any assistance. With support for Domains, you can efficiently group people and manage them seamlessly. While the Dashboards provide intuitive data visualization, Magistrala also boasts multiple APIs and SDKs to enable effortless integration with your systems. Developers can dive into our detailed dev docs for an enjoyable and productive experience while extending the platforms functionality.",
      imageUrl: "ui-woman-with-a-laptop.svg",
    },
    {
      title: "Superior Security",
      description:
        "Magistrala is built with security at its core, ensuring the protection and integrity of your data across diverse applications. Advanced encryption, authentication, and fine-grained access control mechanisms safeguard your sensitive information protecting you from cyber threats. The platform leverages access tokens for secure, token-based authentication and integrates with Google Zanzibar for distributed policy management, enabling scalable as well as granular access policies. Whether for IoT or enterprise systems, Magistrala provides the confidence to innovate without compromising security.",
      imageUrl: "abstract-art-5.svg",
    },
    {
      title: "Readers and Writers",
      description:
        "Magistrala enables seamless communication across diverse ecosystems with its powerful readers and writers framework. Messages are securely stored in scalable databases like TimescaleDB, ensuring they can be fetched at any time with minimal latency and maximum convenience. Whether it’s historical data retrieval or real-time message delivery, Magistrala offers unmatched reliability. Leverage industry-leading tools like RabbitMQ, Mosquitto, and CoAPCLI to handle both ingestion and delivery effortlessly. With robust support for message brokers and databases, you can ensure reliable data flow, optimized performance, and the flexibility to adapt to your unique requirements.",
      imageUrl: "searching-location-on-the-phone.svg",
    },
    {
      title: "Multi-Protocol Messaging",
      description:
        "The Magistrala Platform is designed to streamline communication between devices, applications and systems, regardless of their underlying protocols such as HTTP or MQTT. This ensures that your devices can effortlessly exchange data, making your IoT infrastructure both flexible and efficient. Built with multi-protocol messaging capabilities, it empowers businesses to handle data exchange across diverse infrastructures — from IoT ecosystems to cloud-based applications and enterprise software.",
      imageUrl: "surreal-hourglass.svg",
    },
  ],
};

export const UsecasesData = {
  sectionId: "use-cases",
  title: "Use Cases",
  subtitle: "Real-World Applications of Prism AI",
  useCases: [
    {
      title: "Confidential AI Workloads",
      description:
        "Prism AI is designed for executing confidential AI workloads in secure enclaves. Whether in private, hybrid, or public cloud environments, the platform ensures that sensitive computations are encrypted and isolated, making it suitable for financial institutions analyzing proprietary data or governments handling classified information.",
      imageUrl: "iot.jpg",
      ctaText: "Learn more",
      ctaLink: "#",
      secondaryCtaText: "View demo",
      secondaryCtaLink: "#",
    },
    {
      title: "Privacy-Preserving Data Analytics",
      description:
        "With Prism AI, organizations can perform data analytics without compromising privacy. The platform’s end-to-end encryption and secure VM provisioning allow businesses to derive insights from sensitive datasets while maintaining compliance with data protection regulations like GDPR or HIPAA.",
      imageUrl: "smart-home.jpg",
      ctaText: "Learn more",
      ctaLink: "#",
      secondaryCtaText: "View demo",
      secondaryCtaLink: "#",
    },
    {
      title: "Collaborative AI Development",
      description:
        "Prism AI fosters innovation by enabling secure collaboration among AI developers. Teams can share algorithms and datasets within trusted environments, ensuring intellectual property remains protected. This is particularly valuable for cross-organizational AI initiatives.",
      imageUrl: "industrial.jpg",
      ctaText: "Learn more",
      ctaLink: "#",
      secondaryCtaText: "View demo",
      secondaryCtaLink: "#",
    },
  ],
};

export const UsedForData = {
  sectionId: "used-for",
  title: "Prism AI is used for",
  usedFor: [
    {
      title: "Healthcare",
      description:
        "In the healthcare sector, Prism AI brings the power of confidential computing and secure multi-party computation (SMPC) to protect sensitive patient data and enable collaborative research. Healthcare organizations can securely share and analyze patient records, conduct research on medical data, and develop AI-driven healthcare solutions while maintaining data privacy and compliance with regulations.",
      icon: "BriefcaseMedical",
    },
    {
      title: "Finance",
      description:
        "In the finance sector, Prism AI enhances data security and privacy for financial institutions and organizations. It enables secure data sharing and collaborative financial analysis while protecting sensitive financial data. Financial organizations can securely exchange financial information, perform risk assessments, and develop AI-driven financial models, all within confidential computing environments.",
      icon: "ChartNoAxesCombined",
    },
    {
      title: "Government",
      description:
        "In government agencies and institutions, Prism AI ensures data security and privacy for critical government operations. It enables secure multi-party computation (SMPC) for collaborative data analysis, secure data sharing between government departments, and confidential computing for sensitive government applications. Government entities can leverage Prism AI to protect classified information, enhance cybersecurity, and drive data-driven policy decisions.",
      icon: "Landmark",
    },
  ],
};
export const PricingData = {
  sectionId: "pricing",
  title: "Pricing",
  subtitle:
    "Choose the right plan for your business needs and get started with Prism AI today",
  plans: [
    {
      title: "Trial",
      features: [
        "Private CVMs only (Max 30 minutes per lifecycle, Prism AI private cloud",
        "1 member",
        "2 concurrent computations",
        "10 computation runs per month",
        "1 concurrent VM",
        "Community support",
      ],
      price: {
        custom: true,
        month: "Free",
        year: "Free",
      },
      ctaText: "Sign Up",
      ctaLink: "#",
    },
    {
      title: "Developer",
      features: [
        "Single infrastructure choice (GCP)",
        "2 members",
        "3 concurrent computations",
        "1 concurrent VM",
        "Community support",
      ],
      price: {
        custom: false,
        month: "99",
        year: "90",
      },
      ctaText: "Sign Up",
      ctaLink: "/#",
    },
    {
      title: "Team",
      features: [
        "Two infrastructure choices (GCP, Azure)",
        "Up to 5 members",
        "Maximum 8 concurrent computations",
        "2 concurrent VMs",
        "Standard support",
      ],
      price: {
        custom: false,
        month: "499",
        year: "450",
      },
      ctaText: "Sign Up",
      ctaLink: "#",
    },
    {
      title: "Business",
      features: [
        "All infrastructure options (GCP, Azure, Private Cloud)",
        "Up to 15 members",
        "Maximum 25 concurrent computations",
        "5 concurrent VMs",
        "Priority support",
        "Basic analytics",
      ],
      price: {
        custom: false,
        month: "1499",
        year: "1350",
      },
      ctaText: "Sign Up",
      ctaLink: "#",
    },
    {
      title: "Enterprise",
      features: [
        "Custom infrastructure allocation",
        "Unlimited members",
        "Custom computation limits",
        "Custom VM allocation",
        "24/7 dedicated support",
        "Custom integration options",
      ],
      price: {
        custom: true,
        month: "Contact us",
        year: "Contact us",
      },
      ctaText: "Contact Us",
      ctaLink: "#",
    },
  ],
};

export const faqData = {
  sectionId: "faq",
  title: "FAQs",
  subtitle:
    "Here are some of our most frequently asked questions. If you have any other questions, feel free to contact us.",
  faqs: [
    {
      title: "General Questions",
      faqs: [
        {
          question: "What is a computation?",
          answer:
            "Computation an entity that defines a collection of users and assets that are used in a manifest to define a workload on the platfrom.",
        },
        {
          question: "Which cloud platforms do you support?",
          answer:
            "We support Google Cloud Platform, Azure and private cloud offerings.",
        },
        {
          question: "Can I integrate with existing systems?",
          answer:
            "Yes, our platform is designed to be highly integrable. We offer APIs and SDKs that allow you to easily integrate with your existing systems and workflows.",
        },
        {
          question: "Which confidential computing technologies do you use?",
          answer:
            "We support AMD SEV_SNP and have plans to support Intel TDX in the future.",
        },
      ],
    },
    {
      title: "Billing and Subscription",
      faqs: [
        {
          question: "What are the available pricing plans?",
          answer:
            "We offer flexible pricing plans tailored to your needs. Visit our pricing section for detailed information.",
        },
        {
          question: "How do I upgrade my plan?",
          answer:
            "You can upgrade your plan directly from your billing page. Select the desired plan and complete the payment process.",
        },
      ],
    },
  ],
};