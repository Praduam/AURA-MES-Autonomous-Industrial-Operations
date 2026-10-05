# AURA-MES: Autonomous Industrial Operations & Intelligent Efficiency Platform
**Powered by Google Cloud Vertex AI & Gemini Multi-Modal**

An enterprise-grade smart manufacturing operations platform designed to address industrial challenges in **reliability, quality, efficiency, and sustainability**.

---

## 🌟 Live Demo & Quick Start

🚀 **Production Live Demo:**  
👉 **[https://optimal-buffer-499617-h2.web.app](https://optimal-buffer-499617-h2.web.app)**  
*(Alternate domain: [https://optimal-buffer-499617-h2.firebaseapp.com](https://optimal-buffer-499617-h2.firebaseapp.com))*

Local development server:
👉 **`http://localhost:5173/`**

### Running Locally:
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## 📸 Visual Interface & Operational Snapshots

### 1. Smart Factory Digital Twin & Executive Facility Showcase
> 4K plant floor viewport with interactive floor telemetry hotspots, operational bay selector, and real-time Shift & Pub/Sub latency monitoring.

![Digital Twin Facility Showcase](docs/screenshots/01_digital_twin_facility_showcase.png)

### 2. Fleet Machinery Photographic Workbench
> Real equipment photographs, live sensor telemetry sparklines, and manufacturer specification overlays.

![Fleet Machinery Workbench](docs/screenshots/02_fleet_machinery_workbench.png)

### 3. Precision CAD Engineering Blueprint & Defect Callout
> High-precision technical CAD cross-section schematic with defect region callouts and DIN ISO 2768-m / ABEC 7 tolerance limits.

![Precision CAD Blueprint](docs/screenshots/03_precision_cad_blueprint.png)

### 4. Fullscreen Metrology Lightbox Zoom Modal
> High-resolution inspection lightbox for analyzing mechanical bearing raceways and machinery components.

![Fullscreen Lightbox Modal](docs/screenshots/04_fullscreen_metrology_lightbox.png)

### 5. Multimodal Visual Quality Control & Optical Reticle Caliper
> High-speed automated optical inspection with sub-millimeter bounding box segmentation, reticle caliper overlay, and batch defect thumbnails.

![Visual Inspection Reticle](docs/screenshots/05_visual_inspection_reticle.png)

### 6. Sustainable Campus Solar & Wind Microgrid
> Net-zero factory campus with floating real-time microgrid generation telemetry for rooftop solar PV, wind turbine cluster, and BESS storage.

![Sustainable Microgrid Campus](docs/screenshots/06_sustainable_microgrid_campus.png)

### 7. Gemini 1.5 Pro Operational Copilot with Technical Grounding
> Conversational reasoning assistant grounded in real-time sensor streams and technical engineering blueprints.

![Gemini Copilot Workbench](docs/screenshots/07_gemini_copilot_technical_grounding.png)

---

## 📐 System Architecture & End-to-End Dataflow Diagram

The platform integrates physical shopfloor machinery with Google Cloud intelligence to enable autonomous closed-loop predictive maintenance and real-time optical quality inspection.

### 1. High-Level Architecture & Data Pipeline

```mermaid
flowchart TB
    %% Node Styling
    classDef edgeLayer fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef ingestLayer fill:#0b1e3b,stroke:#00f2fe,stroke-width:2px,color:#f8fafc;
    classDef processLayer fill:#0c2d28,stroke:#34d399,stroke-width:2px,color:#f8fafc;
    classDef aiLayer fill:#2a1236,stroke:#ec4899,stroke-width:2px,color:#f8fafc;
    classDef actuateLayer fill:#241d06,stroke:#f59e0b,stroke-width:2px,color:#f8fafc;
    classDef uiLayer fill:#181824,stroke:#818cf8,stroke-width:2px,color:#f8fafc;

    subgraph SHOPFLOOR ["1. Cyber-Physical Industrial Shopfloor (Edge Tier)"]
        direction TB
        CNC["CNC Milling Machines & Lathes\n(Sensors: Vibration RMS, Temp, Pressure)"]:::edgeLayer
        ROBOT["Robotic Assembly Cells\n(Joint Torque & Power Draw)"]:::edgeLayer
        AOI_CAM["4K High-Speed Optical Line\n(120 FPS High-Res Cameras)"]:::edgeLayer
        PLC["Industrial PLCs\n(Siemens S7-1500 / Allen-Bradley)"]:::edgeLayer
        EDGE_GW["Industrial Edge Gateway\n(OPC-UA Server & MQTT Broker)"]:::edgeLayer

        CNC -->|10kHz Vibration & Thermals| EDGE_GW
        ROBOT -->|Torque & Voltage Telemetry| EDGE_GW
        AOI_CAM -->|4K Optical Surface Frames| EDGE_GW
        PLC <-->|Bi-directional Machine Telemetry| EDGE_GW
    end

    subgraph INGESTION ["2. Telemetry Ingestion & Storage (Google Cloud Tier)"]
        direction TB
        PUBSUB["Google Cloud Pub/Sub\n(Zero-Loss Topic: 48,200 msg/sec)"]:::ingestLayer
        GCS["Google Cloud Storage\n(Inspection Frames, CAD Blueprints, OEM SOPs)"]:::ingestLayer

        EDGE_GW -->|Real-Time Telemetry Stream| PUBSUB
        EDGE_GW -->|Defect Imagery & Parquet Batches| GCS
    end

    subgraph PIPELINE ["3. Stream Analytics & Operational Lakehouse"]
        direction TB
        DATAFLOW["Google Cloud Dataflow (Apache Beam)\n(10kHz Sliding Window FFT & Harmonics Extraction)"]:::processLayer
        BIGQUERY["Google BigQuery Analytical Lakehouse\n(Multi-Year Operational Store & BigQuery ML Models)"]:::processLayer

        PUBSUB -->|Telemetry Stream| DATAFLOW
        DATAFLOW -->|Harmonic Peak Features| BIGQUERY
        DATAFLOW -->|Windowed Anomaly Vectors| VERTEX_AI
    end

    subgraph AI_BRAIN ["4. Machine Learning & Multimodal Cognitive Reasoning"]
        direction TB
        VERTEX_AI["Vertex AI Predictive ML\n(Remaining Useful Life Boosted Trees & LSTMs)"]:::aiLayer
        VISION_AI["Vertex AI Vision / Vision AI\n(Sub-mm Defect Segmentation & Caliper Tolerancing)"]:::aiLayer
        GEMINI["Gemini 1.5 Pro on Vertex AI\n(Multimodal Reasoning & Industrial Copilot)"]:::aiLayer

        GCS -->|Optical Defect Frames| VISION_AI
        GCS -->|CAD Schematics & Service Manuals| GEMINI
        VISION_AI -->|Defect Classification & Severity| GEMINI
        BIGQUERY -->|Baseline Telemetry & ISO 10816 Specs| GEMINI
        VERTEX_AI -->|RUL Forecast & Anomaly Risk Score| GEMINI
    end

    subgraph ACTUATION ["5. Closed-Loop Actuation & Enterprise Dispatch"]
        direction TB
        CLOUD_RUN["Google Cloud Run Microservices\n(Autonomous Actuator & Policy Engine)"]:::actuateLayer
        SAP_ERP["Enterprise ERP / CMMS\n(SAP S/4HANA & IBM Maximo Work Orders)"]:::actuateLayer
        FIREBASE["Firebase Firestore & Cloud Messaging\n(Live WebSocket Sync & Instant P1 Alerts)"]:::actuateLayer

        GEMINI -->|Autonomous Function Calls / Tool Execution| CLOUD_RUN
        CLOUD_RUN -->|Automated P1 Dispatch| SAP_ERP
        CLOUD_RUN -->|Closed-Loop Feed Override -25%| PLC
        CLOUD_RUN -->|Broadcast Anomaly State| FIREBASE
    end

    subgraph INTERFACE ["6. Operations Command Center (Frontend / PWA)"]
        direction TB
        DASHBOARD["Digital Twin 3D Viewport\n(Shift Telemetry & Pub/Sub Latency)"]:::uiLayer
        RUL_WORKBENCH["Predictive Maintenance Workbench\n(FFT Harmonics Spectrum & Sensor Sparklines)"]:::uiLayer
        METROLOGY["Metrology Inspection Lightbox\n(CAD Blueprint Overlays & Caliper Tool)"]:::uiLayer
        COPILOT_UI["Gemini Operational Copilot & Chat\n(Grounded Root Cause Analysis & SOP Execution)"]:::uiLayer

        FIREBASE -->|Real-Time State Sync| DASHBOARD
        FIREBASE -->|Telemetry Push| RUL_WORKBENCH
        FIREBASE -->|Optical Inspection Feed| METROLOGY
        FIREBASE -->|Interactive AI Diagnostics| COPILOT_UI
    end
```

---

### 2. Autonomous Closed-Loop Incident Response Flow

The sequence below illustrates how an anomalous vibration spike on a CNC spindle is autonomously ingested, diagnosed, and mitigated without unplanned shopfloor downtime:

```mermaid
sequenceDiagram
    autonumber
    participant Sensor as Edge Sensors / PLCs
    participant PubSub as Cloud Pub/Sub
    participant Dataflow as Cloud Dataflow (Apache Beam)
    participant Vertex as Vertex AI & BigQuery
    participant Gemini as Gemini 1.5 Pro (Vertex AI)
    participant CloudRun as Cloud Run Actuator
    participant Shopfloor as Shopfloor PLC
    participant ERP as SAP S/4HANA / Maximo
    participant UI as Operator Dashboard (Firebase)

    Sensor->>PubSub: Stream 10kHz vibration telemetry (RMS: 7.8 mm/s)
    PubSub->>Dataflow: Ingest stream with sub-18ms latency
    Dataflow->>Dataflow: Compute sliding-window FFT & extract BPFO peak (342 Hz)
    Dataflow->>Vertex: Forward harmonic anomaly vector
    Vertex->>Vertex: BigQuery ML / Boosted Tree calculates RUL: 14.2 Hours (Critical)
    Vertex->>Gemini: Trigger Multimodal RCA with sensor streams & CAD blueprint
    Gemini->>Gemini: Cross-reference ISO 10816-3 Class II limits & OEM manual
    Note over Gemini: Diagnosis: Outer-race flaking defect detected (Confidence: 94.6%)
    Gemini->>CloudRun: Execute Function Call `mitigate_bearing_anomaly(CNC-04, -25%)`
    CloudRun->>Shopfloor: Send OPC-UA command: Throttle spindle feed rate by -25%
    Shopfloor-->>CloudRun: Command confirmed (Vibration drops to safe 3.9 mm/s)
    CloudRun->>ERP: Auto-dispatch emergency SAP work order #WO-9042
    CloudRun->>UI: Push P1 alert & active mitigation badge via Firebase
    UI-->>Sensor: Continuous closed-loop monitoring verified
```

---

## 🏭 Core Solution Capabilities

### 1. Fleet Predictive Maintenance & RUL Estimation
- **Multi-Sensor Telemetry**: Live ingestion of vibration velocity (RMS), temperature, hydraulic pressure, acoustic emission (dB), and power draw.
- **Dataflow FFT Harmonics**: Real-time Fast Fourier Transform breakdown isolating defect harmonic peaks (BPFO outer race, BPFI inner race).
- **BigQuery ML Remaining Useful Life (RUL)**: Boosted Tree regression estimating operational hours remaining before failure.
- **Closed-Loop Intervention**: One-click PLC feed-rate throttling (-25%) and automated SAP/Maximo work order dispatch.

### 2. Multimodal Visual Quality Control (AOI / NDT)
- **High-Resolution Optical Inspection**: Live scanning line inspecting manufactured aerospace bearings, IoT gateway PCBs, and titanium turbine blades.
- **Defect Segmentation**: Bounding boxes with sub-millimeter metrology tolerances and confidence scoring.
- **Gemini 1.5 Multimodal RCA**: Autonomous diagnosis linking surface anomalies to physical root causes (e.g. lubrication breakdown, stencil aperture smear, thermal fatigue).

### 3. Gemini 1.5 Pro Operational Copilot
- Conversational industrial assistant grounded on live OPC-UA telemetry, OEM service manuals, and ISO 10816 standards.
- Executable tool calls: machine parameter overrides, SOP checklist generation, and maintenance dispatching.

### 4. Floating Plant Issue Support Chatbot (Global Widget)
- **Always-Accessible**: Persistent bottom-right floating AI widget available across every view in the application.
- **Proactive Alarm Detection**: Automatically pulses red with an issue badge whenever machine anomalies occur (e.g., CNC-04 vibration spike).
- **Direct Operational Actuation**: One-click actions directly in the chat to throttle spindle feed rates via Cloud Run, create emergency SAP/Maximo work orders, or navigate to diagnostic tools.
- **SOP Manuals & RCA**: Instant step-by-step Standard Operating Procedures (bearing replacement, lubrication specifications, torque preloads) and optical quality diagnostics.

### 5. OEE & Decarbonization Engine
- **OEE Waterfall Decomposition**: Availability (94.2%), Performance (89.6%), Quality (99.2%) yielding **83.8% Composite OEE**.
- **Dynamic Peak Grid Shifting**: Vertex AI schedule optimization shifting high-energy thermal cycles to renewable energy windows, saving **$20,400/month** and avoiding **18.6 Metric Tons of CO₂**.
- **Scrap Reduction**: Optical quarantine cuts scrap rate from **4.2% down to 0.8%**.

### 5. Suggested Google Cloud Technologies Implementation
- **Gemini on Vertex AI**: **Reasoning and operational assistance** — Correlates 10kHz vibration signals, 4K camera inspection frames from Cloud Storage, and OEM PDF service manuals to determine physical failure modes and autonomously trigger corrective actions via function calling.
- **Vertex AI**: **Predictive and machine-learning workloads** — Continuous Remaining Useful Life (RUL) regression (Boosted Trees & LSTMs) and multivariate anomaly probability scoring across rotating plant machinery.
- **BigQuery**: **Sensor and operational data analysis** — Petabyte-scale telemetry lakehouse storing raw sensor streams, batch cycle times, and maintenance logs with in-database BigQuery ML models for degradation trends.
- **Cloud Storage**: **Images, sensor data, and files** — High-durability (11 9's) object storage archiving 4K optical camera frames, raw 10kHz sensor parquet files, CAD models, and OEM equipment manuals with automated lifecycle tiering.
- **Vision AI / Vertex AI Vision**: **Image/video analysis capabilities where relevant** — High-speed (120 FPS) automated optical inspection (AOI) detecting surface spalling, micro-cracks, and dimensional anomalies.
- **Pub/Sub**: **Streaming or event-driven data** — Zero-loss ingestion capturing 48,200 telemetry messages/sec from shopfloor OPC-UA gateways, MQTT brokers, and machine vision triggers.
- **Dataflow**: **Data pipelines** — Serverless Apache Beam stream processing computing sliding-window aggregations and Fast Fourier Transform (FFT) harmonic extractions with sub-18ms latency.
- **Cloud Run**: **Application and processing services** — Containerized FastAPI microservices executing closed-loop PLC feed rate overrides via OPC-UA/Modbus, Eventarc triggers, and SAP/Maximo work order creation.
- **Firebase & Cloud Firestore**: **Client & Live State Sync** — Real-time WebSocket state propagation (`onSnapshot`) to operator screens and instant P1 alerts via Firebase Cloud Messaging (FCM).

---

## 📁 Project Structure

```
├── index.html                   # HTML entry point with fonts & metadata
├── src/
│   ├── main.jsx                 # React root renderer
│   ├── App.jsx                  # Main application state & simulation manager
│   ├── index.css                # Dark industrial cyber-physical design system
│   ├── data/
│   │   └── mockFactoryData.js   # Telemetry, vision datasets & GCP architectures
│   └── components/
│       ├── Header.jsx           # Top nav, live stream badge & simulation bar
│       ├── MetricCards.jsx       # OEE, scrap rate, and savings KPI strip
│       ├── PredictiveMaintenanceView.jsx # Live telemetry, FFT spectrum & RUL
│       ├── VisualInspectionView.jsx      # Optical scanner & Gemini vision RCA
│       ├── CopilotView.jsx               # Gemini 1.5 multimodal chat & tool calls
│       ├── SustainabilityView.jsx        # OEE breakdown & peak grid shifting
│       └── CloudArchitectureView.jsx     # Interactive GCP architecture blueprint
└── public/
    └── assets/
        └── inspection/          # High-resolution industrial macro assets
            ├── bearing_defect.jpg
            ├── pcb_defect.jpg
            └── turbine_crack.jpg
```
