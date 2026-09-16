import type { Project } from "./types";

export const projects: Project[] = [
  // 1. Live Web & AI Production Systems
  {
    id: "echomind",
    title: "EchoMind",
    domain: "AI & Intelligent Systems",
    status: "live",
    problem:
      "Organizations need conversational access to proprietary knowledge bases without hallucinated answers or sensitive data leakage.",
    solution:
      "A RAG-powered AI conversation and knowledge assistant featuring hybrid dense semantic vector retrieval and context-gated citation verification.",
    technology: ["AI / LLMs", "RAG", "Vector Search", "Next.js", "Python"],
    outcome: "Sub-200ms vector search across 50,000+ internal documents with 98% citation accuracy.",
    metrics: [
      { label: "Retrieval Time", value: "<180ms" },
      { label: "Indexed Docs", value: "50,000+" },
      { label: "Citation Accuracy", value: "98%" },
    ],
    architectureHighlights: [
      "Hybrid BM25 + dense semantic vector retrieval pipeline",
      "Automated prompt-shielding and hallucination filters",
      "Air-gapped enterprise privacy controls",
    ],
    isNDA: false,
    demoUrl: "https://echo-mind-wheat.vercel.app/",
    image: "/projects/echomind-preview.png",
  },
  {
    id: "forgekit",
    title: "ForgeKit",
    domain: "Web & Mobile",
    client: "Technosoft",
    status: "live",
    problem:
      "Sportswear customization platforms often rely on static 2D preview mockups, causing customer dissatisfaction, high return rates, and disconnected order quote flows.",
    solution:
      "A web-based 3D product customizer built on Three.js and React Three Fiber that enables real-time 360° sportswear design (jerseys, caps), dynamic decal and text placement, persistent JSON design state, and instant quote submission.",
    technology: [
      "Three.js",
      "React Three Fiber",
      "Zustand",
      "Express",
      "MongoDB",
      "Cloudinary",
    ],
    outcome:
      "Engineered a full-stack 3D configurator delivering 60 FPS real-time material updates, multi-zone color manipulation, and persistent account design state.",
    metrics: [
      { label: "3D Viewport", value: "60 FPS" },
      { label: "Color Zones", value: "Real-time" },
      { label: "Stack", value: "R3F + MERN" },
    ],
    architectureHighlights: [
      "GLTF/GLB 3D viewport powered by React Three Fiber with OrbitControls and zero-latency material zone shaders",
      "Dynamic canvas texture engine for real-time text, typography, and Cloudinary logo decals",
      "Full-stack MERN architecture with JWT authentication, design CRUD persistence, and MongoDB quote snapshots",
    ],
    isNDA: false,
    demoUrl: "https://forge-kit-nine.vercel.app/",
    image: "/projects/forgekit-preview.png",
  },
  {
    id: "dreamspace",
    title: "DreamSpace",
    domain: "Web & Mobile",
    status: "live",
    problem:
      "Interior spatial planning requires both an intuitive consumer mobile AR app and a centralized administration console to manage 3D spatial models, product catalogs, and vendor orders.",
    solution:
      "A two-part spatial commerce architecture: an AR mobile experience for spatial room previews paired with an enterprise web admin dashboard for real-time 3D asset ingestion, catalog curation, and order telemetry.",
    technology: ["Next.js", "Admin Console", "Mobile AR", "TypeScript", "Tailwind CSS"],
    outcome: "Delivered two-part spatial commerce platform; currently previewing the live enterprise admin console with real-time catalog and order orchestration.",
    metrics: [
      { label: "Architecture", value: "Mobile + Admin" },
      { label: "Asset Pipeline", value: "glTF / USDZ" },
      { label: "Admin Console", value: "Live Preview" },
    ],
    architectureHighlights: [
      "Two-part ecosystem: AR Mobile visualizer + centralized Enterprise Web Admin Panel",
      "Real-time 3D catalog synchronization and spatial model asset pipeline",
      "Multi-vendor order routing and inventory state management console",
    ],
    isNDA: false,
    demoUrl: "https://dream-space-admin-panel-peb3.vercel.app/",
    image: "/projects/dreamspace-preview.png",
  },

  // 2. Data & Analytics Flagships (Featured BI & Data Engineering Suite)
  {
    id: "loan-default-risk",
    title: "Loan Default Risk Analysis",
    domain: "Data & Analytics",
    status: "live",
    problem:
      "Financial institutions face severe credit default exposure and non-performing loan losses when borrower risk dynamics across income brackets, credit ratings, and employment tenures are fragmented across siloed records.",
    solution:
      "An end-to-end banking analytics pipeline utilizing Python (Pandas) data transformation, complex SQL portfolio KPI queries, Excel pivot models, and an interactive executive Power BI risk telemetry dashboard.",
    technology: ["Python", "Pandas", "SQL", "Power BI", "Excel", "Risk Analytics"],
    outcome:
      "Identified critical default drivers across lower-income and lower-credit segments, providing risk executives with proactive portfolio mitigation and credit scoring insights.",
    metrics: [
      { label: "Core Pipeline", value: "Python + SQL" },
      { label: "Executive BI", value: "Power BI" },
      { label: "Domain", value: "Credit Risk" },
    ],
    architectureHighlights: [
      "Cleaned, prepared, and transformed multi-variable loan portfolio records using Python (Pandas)",
      "Engineered analytical SQL queries to compute default rates, loss exposure, and portfolio KPIs",
      "Designed an interactive executive Power BI dashboard with dynamic drill-downs by credit score, employment stability, and loan purpose",
      "Conducted exploratory data analysis to isolate high-risk customer segments and repayment predictors",
      "Utilized Excel pivot tables for financial model reconciliation and rapid audit validation",
    ],
    isNDA: false,
    image: "/projects/loan-default-risk-analysis-preview.png",
    gallery: [
      "/projects/dashboards/loan-default-risk/sheet-1.jpg",
      "/projects/dashboards/loan-default-risk/sheet-2.jpg",
      "/projects/dashboards/loan-default-risk/sheet-3.jpg",
      "/projects/dashboards/loan-default-risk/sheet-4.jpg",
      "/projects/dashboards/loan-default-risk/sheet-5.jpg",
      "/projects/dashboards/loan-default-risk/sheet-6.jpg",
    ],
  },
  {
    id: "cyclic-bike-share",
    title: "Cyclistic Bike-Share Analytics",
    domain: "Data & Analytics",
    status: "live",
    problem:
      "Urban micro-mobility operators struggle to maximize conversion and fleet utilization without granular behavioral clarity distinguishing casual pay-per-trip riders from subscribed annual commuter members.",
    solution:
      "A comprehensive end-to-end analytics workflow based on the Google Data Analytics Capstone, combining Excel Power Query preprocessing, Python (Pandas & NumPy) transformation in Jupyter Notebook, MySQL structured storage, and an interactive Power BI operational dashboard.",
    technology: ["Python", "Pandas", "NumPy", "MySQL", "Excel", "Power BI"],
    outcome:
      "Uncovered key behavioral differences between casual riders and annual members across weekdays, rideable bike types, and average trip lengths, delivering data-backed strategies to drive membership conversion.",
    metrics: [
      { label: "Data Pipeline", value: "Python + MySQL" },
      { label: "Transformation", value: "Excel + Pandas" },
      { label: "Visualization", value: "Power BI" },
    ],
    architectureHighlights: [
      "Conducted thorough data cleaning and preprocessing in Excel using Power Query, Pivot Tables, and advanced formulas to ensure data accuracy",
      "Performed multi-dataset transformation, standardization, and concatenation in Python (Pandas and NumPy) via Jupyter Notebook",
      "Engineered automated Python ingestion pipeline into MySQL for structured relational storage and scalable querying",
      "Executed targeted SQL analysis to extract aggregate rides, average ride duration variances, user segmentation, and hourly/weekly trends",
      "Designed an interactive multi-sheet Power BI dashboard showcasing ride distribution by user tier, weekday trends, and rideable type telemetry",
    ],
    isNDA: false,
    image: "/projects/cyclic-bike-share-analytics-preview.png",
    gallery: [
      "/projects/dashboards/cyclic-bike-share/sheet-1.jpg",
      "/projects/dashboards/cyclic-bike-share/sheet-2.jpg",
      "/projects/dashboards/cyclic-bike-share/sheet-3.jpg",
      "/projects/dashboards/cyclic-bike-share/sheet-4.jpg",
      "/projects/dashboards/cyclic-bike-share/sheet-5.jpg",
      "/projects/dashboards/cyclic-bike-share/sheet-6.jpg",
    ],
  },
  {
    id: "world-bank-gdp",
    title: "World Bank Global GDP Analytics",
    domain: "Data & Analytics",
    status: "live",
    problem:
      "Macroeconomic decision-makers and global analysts face difficulty tracking and comparing cross-country GDP trajectories across multi-decade World Bank datasets without unified modeling and storytelling.",
    solution:
      "An interactive multi-page Power BI dashboard utilizing World Bank GDP datasets, featuring Power Query ETL data cleaning, relational data modeling, custom DAX growth measures, and analytical storytelling visuals.",
    technology: ["Power BI", "DAX", "Power Query", "Data Modeling", "Economic Analytics"],
    outcome:
      "Structured multi-decade global economic trends across countries and regions into interactive storytelling views with decomposition trees, ribbon charts, geo-spatial maps, and KPI benchmark cards.",
    metrics: [
      { label: "BI Engine", value: "Power BI + DAX" },
      { label: "ETL & Modeling", value: "Power Query" },
      { label: "Dataset", value: "World Bank" },
    ],
    architectureHighlights: [
      "Ingested and normalized historical World Bank GDP indicators across global countries and regions via Power Query",
      "Constructed multi-table relational data models with time-intelligence and regional classification dimensions",
      "Formulated custom DAX measures to calculate compound annual growth rates, global GDP rankings, and regional contribution shares",
      "Designed rich multi-page interactive visual layouts including decomposition trees, ribbon charts, treemaps, and trend matrices",
      "Implemented dynamic cross-filtering, interactive regional slicers, and KPI cards to deliver comprehensive analytical storytelling",
    ],
    isNDA: false,
    image: "/projects/world-bank-gdp-preview.png",
    gallery: [
      "/projects/dashboards/world-bank-gdp/sheet-1.jpg",
      "/projects/dashboards/world-bank-gdp/sheet-2.jpg",
      "/projects/dashboards/world-bank-gdp/sheet-3.jpg",
      "/projects/dashboards/world-bank-gdp/sheet-4.jpg",
      "/projects/dashboards/world-bank-gdp/sheet-5.jpg",
      "/projects/dashboards/world-bank-gdp/sheet-6.jpg",
    ],
  },
  {
    id: "aura-arq",
    title: "Aura & Arq",
    domain: "Web & Mobile",
    status: "live",
    problem:
      "A luxury lifestyle brand needed multi-currency storefronts, internationalized inventory, and a custom operations dashboard.",
    solution:
      "A headless e-commerce platform with edge caching, localized checkout, and unified administrative tooling.",
    technology: ["Next.js", "Headless Commerce", "Stripe Connect", "i18n", "Tailwind CSS"],
    outcome: "Production e-commerce storefront deployed live on Vercel with localized currency and optimistic cart management.",
    metrics: [
      { label: "Architecture", value: "Headless" },
      { label: "Cart Latency", value: "Zero-latency" },
      { label: "Deployment", value: "Live Vercel" },
    ],
    archiveNotice:
      "Originally engineered for client production; standalone deployment showcase preserved live on Vercel.",
    architectureHighlights: [
      "Edge-rendered multi-currency localized product catalog",
      "Zero-latency optimistic cart state management",
      "Role-based fulfillment and warehouse management console",
    ],
    isNDA: false,
    demoUrl: "https://shophub-orpin.vercel.app/",
    image: "/projects/aura-arq-preview.png",
  },
  {
    id: "pingly",
    title: "Pingly Messenger",
    domain: "Software Engineering",
    status: "live",
    warningNotice:
      "This system is currently unavailable due to upstream infrastructure and socket synchronization issues. Engineering investigation and restoration are in progress.",
    problem:
      "Distributed engineering teams needed dependable, zero-lag cross-platform messaging without fragile socket synchronization or message drops.",
    solution:
      "A resilient real-time chat and presence architecture with local-first offline sync, WebSocket clustering, and end-to-end payload encryption.",
    technology: ["Realtime Sockets", "WebRTC", "React", "Node.js", "Redis"],
    outcome: "Live production deployment on Sevalla. System is temporarily experiencing technical unavailability.",
    metrics: [
      { label: "Availability", value: "Degraded" },
      { label: "Socket Latency", value: "<45ms" },
      { label: "Sync Engine", value: "Local-First" },
    ],
    architectureHighlights: [
      "Clustered Redis pub/sub brokers for sub-50ms message delivery",
      "Local-first state reconciliation for offline message queuing",
      "End-to-end payload encryption and typing presence heartbeats",
    ],
    isNDA: false,
    demoUrl: "https://pingly-d3dss.sevalla.app/",
    image: "/projects/pingly-preview.png",
  },

  // 4. Confidential & Compliance NDA Projects (Sanitized Enterprise Delivery) - Pending case studies/materials
  /*
  {
    id: "workforce-tracking",
    title: "Field Workforce & Telematics",
    client: "Enterprise Equipment Provider (Sanitized)",
    domain: "Enterprise Systems",
    status: "nda",
    problem:
      "A commercial equipment corporation needed live telemetry visibility into technician dispatch, safety compliance, and equipment servicing.",
    solution:
      "GPS-driven field technician mobile tracking paired with a high-throughput manager and admin operations console.",
    technology: ["Mobile Telematics", "GPS Streaming", "Web Dashboard", "PostGIS", "AWS"],
    outcome: "Orchestrated 400+ active field technicians daily with automated route dispatch and geofencing.",
    confidentialityNotice:
      "Delivered under strict enterprise NDA. Client trademarks and proprietary infrastructure sanitized.",
    architectureHighlights: [
      "Geofence event streaming with sub-second dispatcher alerts",
      "Low-power mobile background telemetry sync algorithms",
      "Encrypted audit log pipeline meeting enterprise compliance standards",
    ],
    isNDA: true,
  },
  {
    id: "order-operations",
    title: "Industrial Order & Inventory Hub",
    client: "Heavy Machinery Manufacturer (Sanitized)",
    domain: "Enterprise Systems",
    status: "nda",
    problem:
      "A machinery manufacturing business needed unified inventory visibility and automated order routing across regional assembly plants.",
    solution:
      "An inventory and order management platform tailored to complex manufacturing supply chains and parts reconciliation.",
    technology: ["Enterprise Web", "Inventory Routing", "PostgreSQL", "Role-Based Access", "Docker"],
    outcome: "Consolidated 12,000+ SKU inventory tracking with automated parts procurement workflows.",
    confidentialityNotice:
      "Delivered under enterprise NDA. Operational schematics available under consultation.",
    architectureHighlights: [
      "Atomic transaction guarantees across multi-warehouse transfers",
      "Automated reorder point algorithms with supplier webhook triggers",
      "Fine-grained role-based access control (RBAC)",
    ],
    isNDA: true,
  },
  {
    id: "factory-management",
    title: "Automated Factory Operations Console",
    client: "Precision Manufacturing Plant (Sanitized)",
    domain: "Enterprise Systems",
    status: "nda",
    problem:
      "A precision manufacturing plant required confidential operational tooling with real-time PLC telemetry and downtime diagnostics.",
    solution:
      "A real-time plant operations dashboard consolidating PLC telemetry, defect rates, and technician shifts with minimal disclosable detail.",
    technology: ["Industrial IoT", "WebSockets", "Dashboard UI", "Time-Series DB", "Grafana"],
    outcome: "Delivered unified telemetry across 6 production lines with automated stoppage alerts.",
    confidentialityNotice:
      "Delivered under strict enterprise NDA. Factory identities and hardware specifics sanitized.",
    architectureHighlights: [
      "Sub-second PLC sensor stream ingestion and threshold alerts",
      "Automated shift handover diagnostic reports",
      "Air-gapped on-premises fallback deployment capability",
    ],
    isNDA: true,
  },
  */
];
