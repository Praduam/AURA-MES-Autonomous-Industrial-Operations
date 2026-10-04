// Factory Assets, Real-Time Telemetry, Vision Inspection Data, and GCP Architecture

export const INITIAL_ASSETS = [
  {
    id: 'CNC-04',
    name: '5-Axis CNC Milling Center #04',
    category: 'Subtractive Machining',
    location: 'Bay 3 - Aerospace Machining Cell',
    status: 'warning', // 'healthy', 'warning', 'critical'
    healthScore: 71,
    rulHours: 42,
    criticalComponent: 'Spindle High-Speed Ceramic Bearing',
    failureMode: 'Subsurface Bearing Outer-Race Flaking',
    recommendedAction: 'Throttle spindle feed to 75%, schedule bearing replacement during Bay 3 shift change (18:00)',
    metrics: {
      vibration: { value: 4.82, unit: 'mm/s RMS', normalMax: 2.8, status: 'warning', history: [2.1, 2.3, 2.7, 3.4, 4.1, 4.82] },
      temperature: { value: 78.4, unit: '°C', normalMax: 68.0, status: 'warning', history: [58, 61, 64, 69, 74, 78.4] },
      hydraulicPressure: { value: 142, unit: 'bar', normalRange: '135-150', status: 'healthy', history: [140, 142, 141, 143, 142, 142] },
      acousticEmission: { value: 89.2, unit: 'dB (High-Freq)', normalMax: 78, status: 'warning', history: [74, 75, 78, 82, 86, 89.2] },
      powerDraw: { value: 24.6, unit: 'kW', normalRange: '18-28', status: 'healthy', history: [22, 23, 24, 25, 24.6, 24.6] }
    },
    spectrumFrequencies: [
      { freq: '1X (RPM)', amp: 0.8 },
      { freq: '2X (Harmonic)', amp: 1.2 },
      { freq: 'BPFO (Outer Race)', amp: 4.82 }, // Defect peak!
      { freq: 'BPFI (Inner Race)', amp: 0.9 },
      { freq: 'BSF (Ball Spin)', amp: 0.5 }
    ]
  },
  {
    id: 'TBN-01',
    name: 'Gas Turbine Generator #01',
    category: 'Power & Cogeneration',
    location: 'Sub-Plant 1 - Energy Co-Gen',
    status: 'critical',
    healthScore: 48,
    rulHours: 18,
    criticalComponent: 'Stage-1 Titanium Impeller Blade',
    failureMode: 'Creep Thermal Fatigue Micro-Fracture',
    recommendedAction: 'Immediate controlled load shedding to 55MW, initiate automated Cloud Run emergency inspection work-order #WO-8910',
    metrics: {
      vibration: { value: 8.65, unit: 'mm/s RMS', normalMax: 3.5, status: 'critical', history: [3.2, 4.1, 5.5, 6.9, 7.8, 8.65] },
      temperature: { value: 1142, unit: '°C (Exhaust)', normalMax: 1050, status: 'critical', history: [980, 1010, 1045, 1090, 1120, 1142] },
      hydraulicPressure: { value: 188, unit: 'bar', normalRange: '180-210', status: 'healthy', history: [195, 192, 190, 189, 188, 188] },
      acousticEmission: { value: 96.4, unit: 'dB', normalMax: 85, status: 'critical', history: [82, 84, 88, 91, 94, 96.4] },
      powerDraw: { value: 68.2, unit: 'MW Out', normalRange: '60-75', status: 'healthy', history: [72, 71, 70, 69, 68.5, 68.2] }
    },
    spectrumFrequencies: [
      { freq: '1X Blade Pass', amp: 2.1 },
      { freq: 'Sub-Harmonic Res', amp: 8.65 },
      { freq: 'Shaft 2X', amp: 1.4 },
      { freq: 'Combustion Buzz', amp: 3.2 }
    ]
  },
  {
    id: 'ROB-02',
    name: 'Robotic Stamping Press Arm #02',
    category: 'High-Speed Automated Press',
    location: 'Bay 1 - Heavy Stamping Line',
    status: 'healthy',
    healthScore: 94,
    rulHours: 480,
    criticalComponent: 'Axis-3 Harmonic Drive Reducer',
    failureMode: 'None detected (baseline wear rate < 0.02%/100h)',
    recommendedAction: 'Continuous autonomous monitoring active; next scheduled grease purge in 21 days',
    metrics: {
      vibration: { value: 1.15, unit: 'mm/s RMS', normalMax: 2.5, status: 'healthy', history: [1.1, 1.2, 1.1, 1.2, 1.15, 1.15] },
      temperature: { value: 46.2, unit: '°C', normalMax: 65.0, status: 'healthy', history: [44, 45, 45, 46, 46.2, 46.2] },
      hydraulicPressure: { value: 210, unit: 'bar', normalRange: '200-220', status: 'healthy', history: [210, 209, 211, 210, 210, 210] },
      acousticEmission: { value: 68.5, unit: 'dB', normalMax: 76, status: 'healthy', history: [67, 68, 68, 69, 68.5, 68.5] },
      powerDraw: { value: 14.1, unit: 'kW', normalRange: '12-18', status: 'healthy', history: [13.5, 14.0, 14.2, 14.1, 14.1, 14.1] }
    },
    spectrumFrequencies: [
      { freq: '1X Motor', amp: 0.4 },
      { freq: 'Gear Mesh', amp: 1.15 },
      { freq: 'Cycle Shock', amp: 0.6 }
    ]
  },
  {
    id: 'CHL-03',
    name: 'Industrial Screw Chiller #03',
    category: 'HVAC & Cleanroom Utilities',
    location: 'Central Utilities Yard',
    status: 'healthy',
    healthScore: 91,
    rulHours: 720,
    criticalComponent: 'Twin-Helical Screw Compressor',
    failureMode: 'Normal operational signature',
    recommendedAction: 'Optimal heat rejection profile; energy efficiency coefficient (COP) at 4.62',
    metrics: {
      vibration: { value: 1.40, unit: 'mm/s RMS', normalMax: 3.0, status: 'healthy', history: [1.3, 1.3, 1.4, 1.35, 1.4, 1.4] },
      temperature: { value: 38.5, unit: '°C', normalMax: 55.0, status: 'healthy', history: [36, 37, 37.5, 38, 38.5, 38.5] },
      hydraulicPressure: { value: 14.8, unit: 'bar (Suct/Disch)', normalRange: '12-16', status: 'healthy', history: [14.6, 14.7, 14.8, 14.8, 14.8, 14.8] },
      acousticEmission: { value: 71.0, unit: 'dB', normalMax: 80, status: 'healthy', history: [70, 71, 70.5, 71, 71, 71] },
      powerDraw: { value: 48.0, unit: 'kW', normalRange: '40-60', status: 'healthy', history: [46, 47, 48, 48, 48, 48] }
    },
    spectrumFrequencies: [
      { freq: '1X Rotor', amp: 0.5 },
      { freq: 'Lobe Mesh', amp: 1.40 },
      { freq: 'Expansion Valve', amp: 0.3 }
    ]
  }
];

export const INSPECTION_SAMPLES = [
  {
    id: 'SCAN-BRG-9021',
    partName: 'Aerospace High-Speed Ball Bearing Race',
    partNumber: 'BRG-9021-X',
    batchId: 'BATCH-2026-Q3-0941',
    productionLine: 'Line 2 - Precision Grinding',
    image: '/assets/inspection/bearing_defect.jpg',
    status: 'REJECTED', // 'PASSED', 'REJECTED', 'QUARANTINE'
    inspectionDate: '2026-10-01 10:48:12 UTC',
    cycleTimeMs: 142,
    defects: [
      {
        id: 'DEF-01',
        label: 'Inner Race Micro-Crack',
        type: 'Crack',
        confidence: 0.984,
        severity: 'CRITICAL',
        bbox: { top: '38%', left: '46%', width: '14%', height: '16%' },
        measuredSize: '3.42 mm length / 18 µm width',
        toleranceLimit: '0.00 mm (Zero Tolerance)'
      },
      {
        id: 'DEF-02',
        label: 'Subsurface Pitting & Spalling',
        type: 'Surface Degradation',
        confidence: 0.941,
        severity: 'MAJOR',
        bbox: { top: '24%', left: '49%', width: '11%', height: '18%' },
        measuredSize: '0.45 mm² pit cluster',
        toleranceLimit: '< 0.05 mm²'
      }
    ],
    geminiRCA: {
      headline: 'Subsurface Metal Fatigue Induced by Inadequate Lubrication Film Under High Dynamic Loading',
      rootCauseSummary: 'The micro-crack propagation aligns with Hertzian shear stress peak ~0.2mm beneath the raceway surface. The pitting cluster indicates contact fatigue accelerated by particle contamination or inadequate viscosity of ISO VG 68 synthetic oil during 12,000 RPM runout test.',
      recommendedCorrectiveAction: 'Quarantine remaining 48 units from Batch 0941. Inspect automatic oil-mist injector nozzle #3 on CNC-04 for particulate clogging. Switch to ISO VG 100 with EP additive for next test run.',
      confidenceScore: '96.2%',
      dispatchedPubSubMessage: {
        topic: 'projects/aura-mes-prod/topics/defect-events',
        eventId: 'evt-brg-9021-reject',
        timestamp: '2026-10-01T10:48:12Z'
      }
    }
  },
  {
    id: 'SCAN-PCB-4102',
    partName: 'Smart Factory IoT Gateway Controller PCB',
    partNumber: 'PCB-4102-REV4',
    batchId: 'SMT-BATCH-8812',
    productionLine: 'Line 4 - SMT Pick & Place + Reflow',
    image: '/assets/inspection/pcb_defect.jpg',
    status: 'REJECTED',
    inspectionDate: '2026-10-01 10:52:40 UTC',
    cycleTimeMs: 88,
    defects: [
      {
        id: 'DEF-03',
        label: 'Solder Bridge Short Circuit',
        type: 'Soldering Anomaly',
        confidence: 0.992,
        severity: 'CRITICAL',
        bbox: { top: '44%', left: '42%', width: '15%', height: '12%' },
        measuredSize: '0.62 mm bridge across IC pins 14-16',
        toleranceLimit: '0.00 mm (IPC-A-610 Class 3 Violation)'
      }
    ],
    geminiRCA: {
      headline: 'Excessive Solder Paste Deposition & Stencil Misalignment at Pin Pitch 0.5mm',
      rootCauseSummary: 'Automated Optical Inspection (AOI) reveals a conductive solder bridge bridging pins 14, 15, and 16 of the microcontroller QFP package. Paste volume measured +45% over nominal target due to aperture smear on the laser stencil.',
      recommendedCorrectiveAction: 'Halt SMT Line 4 printer. Trigger automated solvent stencil wipe cycle. Calibrate squeegee pressure from 8.2 kg down to 6.8 kg. Route unit PCB-4102 to rework rework desoldering station.',
      confidenceScore: '98.5%',
      dispatchedPubSubMessage: {
        topic: 'projects/aura-mes-prod/topics/defect-events',
        eventId: 'evt-pcb-4102-short',
        timestamp: '2026-10-01T10:52:40Z'
      }
    }
  },
  {
    id: 'SCAN-TBN-8820',
    partName: 'Turbine High-Pressure Impeller Blade (NDT)',
    partNumber: 'TBN-8820-TI',
    batchId: 'AERO-FORGE-029',
    productionLine: 'Line 1 - Aerospace Forge & Fluorescent NDT',
    image: '/assets/inspection/turbine_crack.jpg',
    status: 'REJECTED',
    inspectionDate: '2026-10-01 10:55:04 UTC',
    cycleTimeMs: 165,
    defects: [
      {
        id: 'DEF-04',
        label: 'Creep Thermal Stress Branching Crack',
        type: 'Structural Fracture',
        confidence: 0.997,
        severity: 'FATAL DISCARD',
        bbox: { top: '39%', left: '50%', width: '9%', height: '22%' },
        measuredSize: '14.8 mm vertical branching crack',
        toleranceLimit: 'Zero Defect (Aerospace FAA/EASA Grade)'
      }
    ],
    geminiRCA: {
      headline: 'Thermal Cyclic Fatigue Crack Along Grain Boundary in Ti-6Al-4V Blade',
      rootCauseSummary: 'Fluorescent Penetrant Inspection (FPI) reveals primary vertical fatigue crack traversing from the leading edge into mid-foil section. Caused by rapid thermal shock transients exceeding 1150°C during cold-starts and hot-restart cycles.',
      recommendedCorrectiveAction: 'Immediate scrap disposition. Do not weld or repair. Update Vertex AI fleet model with thermal cycle count. Adjust co-gen turbine start ramp rate from 8°C/min to maximum 4.5°C/min.',
      confidenceScore: '99.4%',
      dispatchedPubSubMessage: {
        topic: 'projects/aura-mes-prod/topics/defect-events',
        eventId: 'evt-tbn-8820-crack',
        timestamp: '2026-10-01T10:55:04Z'
      }
    }
  }
];

export const FACTORY_METRICS = {
  oee: { value: 83.8, target: 85.0, status: 'good' },
  availability: { value: 94.2, target: 92.0, status: 'optimal' },
  performance: { value: 89.6, target: 90.0, status: 'good' },
  quality: { value: 99.2, target: 99.0, status: 'optimal' },
  energyEfficiency: { value: '14.2 kWh/unit', delta: '-12.4% vs last week', status: 'optimal' },
  carbonAvoided: { value: '18.6 Metric Tons', period: 'This Month', status: 'optimal' },
  preventedDowntime: { value: '64.5 Hours', costSaved: '$328,000 Saved', status: 'optimal' },
  scrapReduction: { value: '0.8%', prev: '4.2%', status: 'optimal' }
};

export const SUGGESTED_GCP_TECHNOLOGIES = [
  {
    id: 'gemini',
    name: 'Gemini on Vertex AI',
    role: 'Reasoning and operational assistance',
    tag: 'GenAI & Reasoning',
    iconName: 'Sparkles',
    color: '#ec4899'
  },
  {
    id: 'vertex-ai',
    name: 'Vertex AI',
    role: 'Predictive and machine-learning workloads',
    tag: 'Predictive ML & RUL',
    iconName: 'Cpu',
    color: '#a855f7'
  },
  {
    id: 'bigquery',
    name: 'BigQuery',
    role: 'Sensor and operational data analysis',
    tag: 'Lakehouse & Analytics',
    iconName: 'Database',
    color: '#818cf8'
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    role: 'Images, sensor data, and files',
    tag: 'Object & Frame Store',
    iconName: 'HardDrive',
    color: '#06b6d4'
  },
  {
    id: 'vision-ai',
    name: 'Vision AI / Vertex AI Vision',
    role: 'Image/video analysis capabilities where relevant',
    tag: 'Optical Inspection (AOI)',
    iconName: 'Camera',
    color: '#38bdf8'
  },
  {
    id: 'pubsub',
    name: 'Pub/Sub',
    role: 'Streaming or event-driven data',
    tag: 'Telemetry Streaming',
    iconName: 'Radio',
    color: '#00f2fe'
  },
  {
    id: 'dataflow',
    name: 'Dataflow',
    role: 'Data pipelines',
    tag: 'Streaming Pipelines',
    iconName: 'Workflow',
    color: '#34d399'
  },
  {
    id: 'cloud-run',
    name: 'Cloud Run',
    role: 'Application and processing services',
    tag: 'Container Microservices',
    iconName: 'Server',
    color: '#10b981'
  }
];

export const GCP_ARCHITECTURE_STACK = [
  {
    id: 'gemini',
    name: 'Gemini on Vertex AI',
    category: 'Suggested Google Cloud Tech',
    suggested: true,
    role: 'Reasoning and operational assistance',
    tech: 'Gemini 1.5 Pro / Flash Multimodal AI + Function Calling',
    metric: '1M+ Context Window • Multimodal Telemetry + SOPs',
    description: 'Powers multimodal reasoning and operational assistance across the plant. Correlates live 10kHz vibration signals, 4K camera inspection frames from Cloud Storage, and OEM PDF service manuals to determine physical failure modes and autonomously trigger corrective actions via function calling.',
    codeSnippet: `# Multimodal Reasoning & Operational Assistance with Gemini on Vertex AI
import vertexai
from vertexai.generative_models import GenerativeModel, Part, Tool, FunctionDeclaration

vertexai.init(project="aura-mes-prod", location="us-central1")

# Declare Autonomous Operational Assistance Tools for Gemini
throttle_tool = FunctionDeclaration(
    name="throttle_feed_rate",
    description="Throttle machine spindle feed rate via Cloud Run to mitigate bearing damage",
    parameters={
        "type": "OBJECT",
        "properties": {
            "asset_id": {"type": "STRING", "description": "e.g. CNC-04"},
            "feed_rate_pct": {"type": "INTEGER", "description": "Percentage (e.g. 75)"}
        },
        "required": ["asset_id", "feed_rate_pct"]
    }
)

model = GenerativeModel(
    "gemini-1.5-pro",
    tools=[Tool(function_declarations=[throttle_tool])]
)

# Multimodal prompt combining Cloud Storage inspection frame with live sensor telemetry
image_part = Part.from_uri("gs://aura-mes-industrial-lake/scans/CNC-04/SCAN-BRG-9021.jpg", mime_type="image/jpeg")
prompt = """
Analyze this high-resolution bearing race inspection frame alongside telemetry:
- Asset: CNC-04 5-Axis Milling Center
- Vibration: 4.82 mm/s RMS (Outer Race BPFO Harmonic Peak)
- Temp: 78.4°C | Oil Viscosity: 68 cSt

Task:
1. Provide visual defect classification and physical root-cause analysis (RCA).
2. If risk of catastrophic spindle failure exceeds 70%, invoke tool 'throttle_feed_rate'.
"""

response = model.generate_content([image_part, prompt])
print("Gemini Operational Reasoning & Function Calls:", response)`
  },
  {
    id: 'vertex-ai',
    name: 'Vertex AI',
    category: 'Suggested Google Cloud Tech',
    suggested: true,
    role: 'Predictive and machine-learning workloads',
    tech: 'Vertex AI Model Registry, Custom Endpoints & AutoML',
    metric: '< 12ms Inference Latency • 99.4% F1-Score',
    description: 'Handles predictive and machine-learning workloads including Remaining Useful Life (RUL) regression, LSTM vibration forecasting, and multivariate anomaly probability scoring across rotating assets.',
    codeSnippet: `# Vertex AI Python SDK: Real-Time Predictive Workloads (RUL & Anomaly Estimation)
from google.cloud import aiplatform

aiplatform.init(project="aura-mes-prod", location="us-central1")
endpoint = aiplatform.Endpoint(endpoint_name="projects/123456/locations/us-central1/endpoints/789012")

# Send sensor feature vector extracted by Dataflow pipeline
prediction = endpoint.predict(instances=[
    [4.82, 78.4, 89.2, 24.6, 12000] # vib_rms, temp, acoustic, power, rpm
])

rul_hours = prediction.predictions[0]["rul_hours"]
anomaly_confidence = prediction.predictions[0]["anomaly_prob"]

print(f"Vertex AI Predicted RUL: {rul_hours:.1f} Hours Remaining")
print(f"Anomaly Degradation Probability: {anomaly_confidence * 100:.2f}%")`
  },
  {
    id: 'bigquery',
    name: 'BigQuery',
    category: 'Suggested Google Cloud Tech',
    suggested: true,
    role: 'Sensor and operational data analysis',
    tech: 'BigQuery Telemetry Lakehouse & In-Database BigQuery ML',
    metric: '4.8 PB Analyzed in 1.4s • Sub-second BI Engine',
    description: 'Enterprise lakehouse for high-volume sensor and operational data analysis. Stores terabytes of millisecond telemetry, batch cycle times, and maintenance logs, enabling instant SQL trend analysis and machine degradation modeling.',
    codeSnippet: `-- BigQuery SQL: Sensor & Operational Data Analysis + RUL Degradation Trends
CREATE OR REPLACE TABLE \`industrial_lake.cnc_degradation_hourly_trends\` AS
SELECT
  asset_id,
  TIMESTAMP_TRUNC(timestamp, HOUR) AS hour_window,
  AVG(vibration_rms) AS avg_vibration,
  MAX(vibration_rms) AS peak_vibration,
  AVG(temperature_c) AS avg_temp,
  AVG(oil_viscosity_cst) AS avg_viscosity,
  CORR(vibration_rms, temperature_c) AS vib_temp_correlation,
  COUNTIF(vibration_rms > 4.5) AS p1_threshold_breaches
FROM
  \`industrial_lake.sensor_telemetry_live\`
WHERE
  timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
GROUP BY
  asset_id, hour_window
ORDER BY
  hour_window DESC;`
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    category: 'Suggested Google Cloud Tech',
    suggested: true,
    role: 'Images, sensor data, and files',
    tech: 'Google Cloud Storage (GCS) Dual-Region Buckets + Lifecycle Policies',
    metric: '11 9s Durability • Sub-35ms Retrieval Latency',
    description: 'Stores high-resolution 4K optical camera inspection frames, time-series sensor parquet archives, OEM mechanical drawings, CAD models, firmware binaries, and standard operating procedure (SOP) documentation with automatic coldline lifecycle tiering.',
    codeSnippet: `# Google Cloud Storage (GCS): Archiving Inspection Images & Sensor Parquet Files
from google.cloud import storage
import datetime

client = storage.Client(project="aura-mes-prod")
bucket = client.bucket("aura-mes-industrial-lake")

def archive_optical_inspection_frame(asset_id: str, scan_id: str, image_bytes: bytes) -> str:
    """Uploads 4K optical inspection frame for Vision AI & Gemini multimodal analysis."""
    date_path = datetime.datetime.utcnow().strftime("%Y/%m/%d")
    blob_path = f"optical-scans/{asset_id}/{date_path}/{scan_id}.jpg"
    
    blob = bucket.blob(blob_path)
    blob.upload_from_string(
        image_bytes,
        content_type="image/jpeg",
        metadata={
            "asset_id": asset_id,
            "scan_id": scan_id,
            "camera_id": "CAM-BAY3-OPT-01",
            "resolution": "3840x2160"
        }
    )
    gcs_uri = f"gs://{bucket.name}/{blob_path}"
    print(f"Optical Frame Archived to GCS: {gcs_uri}")
    return gcs_uri

def archive_sensor_parquet_batch(batch_id: str, parquet_bytes: bytes) -> str:
    """Stores high-frequency 10kHz sensor telemetry in compressed Parquet format."""
    blob = bucket.blob(f"telemetry-parquet/raw/{batch_id}.parquet")
    blob.upload_from_string(parquet_bytes, content_type="application/octet-stream")
    return f"gs://{bucket.name}/{blob.name}"`
  },
  {
    id: 'vision-ai',
    name: 'Vision AI / Vertex AI Vision',
    category: 'Suggested Google Cloud Tech',
    suggested: true,
    role: 'Image/video analysis capabilities where relevant',
    tech: 'Cloud Vision AI & Vertex AI Vision (Edge & Cloud Inference)',
    metric: '120 FPS High-Speed Line Inspection • 99.4% Recall',
    description: 'Provides automated optical and video analysis capabilities for real-time defect detection, surface crack localization, dimensional verification, and quality grading directly on assembly lines.',
    codeSnippet: `# Cloud Vision AI & Vertex AI Vision: Automated Optical Inspection (AOI)
from google.cloud import vision

client = vision.ImageAnnotatorClient()

def inspect_bearing_surface_defects(gcs_image_uri: str):
    """Detects surface spalling, micro-cracks, and dimensional anomalies."""
    image = vision.Image()
    image.source.image_uri = gcs_image_uri

    features = [
        vision.Feature(type_=vision.Feature.Type.OBJECT_LOCALIZATION),
        vision.Feature(type_=vision.Feature.Type.LABEL_DETECTION),
        vision.Feature(type_=vision.Feature.Type.IMAGE_PROPERTIES)
    ]
    request = vision.AnnotateImageRequest(image=image, features=features)
    response = client.annotate_image(request)

    detected_defects = []
    for localized_object in response.localized_object_annotations:
        detected_defects.append({
            "defect_type": localized_object.name,
            "confidence": round(localized_object.score, 4),
            "normalized_bounding_box": [
                {"x": v.x, "y": v.y} for v in localized_object.bounding_poly.normalized_vertices
            ]
        })

    print(f"Vision AI Detected {len(detected_defects)} defect regions: {detected_defects}")
    return detected_defects`
  },
  {
    id: 'pubsub',
    name: 'Pub/Sub',
    category: 'Suggested Google Cloud Tech',
    suggested: true,
    role: 'Streaming or event-driven data',
    tech: 'Google Cloud Pub/Sub High-Throughput Topics & Subscriptions',
    metric: '48,200 msg/sec Ingested • < 15ms Buffer Latency',
    description: 'Provides reliable streaming and event-driven data ingestion, capturing telemetry from hundreds of OPC-UA gateways, MQTT brokers, and machine vision triggers with zero message loss.',
    codeSnippet: `# Cloud Pub/Sub: Streaming & Event-Driven Telemetry Ingestion
from google.cloud import pubsub_v1
import json

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path("aura-mes-prod", "factory-telemetry-stream")

telemetry_payload = {
    "asset_id": "CNC-04",
    "timestamp": "2026-10-04T10:45:00Z",
    "vibration_rms": 4.82,
    "temperature_c": 78.4,
    "acoustic_db": 89.2,
    "oil_viscosity_cst": 68.0,
    "spindle_rpm": 12000,
    "sample_rate_hz": 10000
}

future = publisher.publish(
    topic_path, 
    json.dumps(telemetry_payload).encode("utf-8"),
    origin="edge-opc-ua-gateway",
    priority="high"
)
print(f"Pub/Sub Dispatched Telemetry Message ID: {future.result()}")`
  },
  {
    id: 'dataflow',
    name: 'Dataflow',
    category: 'Suggested Google Cloud Tech',
    suggested: true,
    role: 'Data pipelines',
    tech: 'Google Cloud Dataflow (Apache Beam Managed Service)',
    metric: '< 18ms Processing Latency • Sliding Windows',
    description: 'Executes unified stream and batch data pipelines. Computes sliding-window aggregations, Fast Fourier Transform (FFT) harmonic extractions, and anomaly detection filters in real time.',
    codeSnippet: `# Apache Beam Pipeline on Google Cloud Dataflow: High-Frequency Feature Extraction
import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
import json
import numpy as np

def compute_fft_bearing_harmonics(element):
    """Calculates FFT harmonics to isolate Outer Race (BPFO) vibration peaks."""
    raw_samples = element.get("raw_samples", [])
    if len(raw_samples) > 0:
        fft_vals = np.abs(np.fft.rfft(raw_samples))
        # BPFO harmonic frequency band ~214 Hz
        element["bpfo_amp"] = float(np.max(fft_vals[180:240])) if len(fft_vals) > 240 else 0.0
    return element

with beam.Pipeline(options=PipelineOptions()) as p:
    (p | "ReadFromPubSub" >> beam.io.ReadFromPubSub(subscription="projects/aura-mes-prod/subscriptions/telemetry-sub")
       | "ParseJSON" >> beam.Map(json.loads)
       | "SlidingWindow5s" >> beam.WindowInto(beam.window.SlidingWindows(size=5, period=1))
       | "ExtractFFT" >> beam.Map(compute_fft_bearing_harmonics)
       | "WriteToBigQuery" >> beam.io.WriteToBigQuery("aura-mes-prod:industrial_lake.sensor_telemetry_live"))`
  },
  {
    id: 'cloud-run',
    name: 'Cloud Run',
    category: 'Suggested Google Cloud Tech',
    suggested: true,
    role: 'Application and processing services',
    tech: 'Serverless Container Microservices (FastAPI / Python)',
    metric: '0 to 100+ Instances in 2.2s • Zero Idle Cost',
    description: 'Hosts containerized application and processing services. Bridges AI decisions to physical shopfloor PLCs via OPC-UA/Modbus, handles closed-loop speed overrides, manages Eventarc webhooks, and orchestrates ERP/SAP maintenance ticketing.',
    codeSnippet: `# Cloud Run Application & Processing Service: Closed-Loop PLC Control Dispatcher
from fastapi import FastAPI, Request, HTTPException
import httpx
import google.cloud.firestore as firestore

app = FastAPI(title="AURA-MES Cloud Run Closed-Loop Processing Engine")
db = firestore.Client(project="aura-mes-prod")

@app.post("/api/events/closed-loop-override")
async def execute_plc_override(request: Request):
    payload = await request.json()
    asset_id = payload.get("asset_id")
    feed_rate_override_pct = payload.get("feed_rate_pct", 75)
    
    # 1. Update Firestore state for real-time operator screen synchronization
    doc_ref = db.collection("assets").document(asset_id)
    doc_ref.update({
        "status": "warning",
        "feed_rate_override_pct": feed_rate_override_pct,
        "active_action": f"Spindle Feed Rate Throttled to {feed_rate_override_pct}%",
        "updated_at": firestore.SERVER_TIMESTAMP
    })

    # 2. Bridge command to physical edge PLC via industrial gateway HTTP/OPC-UA endpoint
    async with httpx.AsyncClient(timeout=4.0) as client:
        res = await client.post("http://edge-plc-gw.lan/api/v1/throttle", json={
            "machine_id": asset_id,
            "feed_rate_override_pct": feed_rate_override_pct,
            "initiated_by": "Gemini on Vertex AI Closed-Loop Agent"
        })
        
    return {"status": "actuated", "asset_id": asset_id, "plc_code": res.status_code}`
  },
  {
    id: 'firestore',
    name: 'Google Cloud Firestore',
    category: 'Client & Live State',
    suggested: false,
    role: 'Real-time operational state & live sync (onSnapshot)',
    tech: 'Cloud Firestore Multi-Region Live Document Store',
    metric: '99.999% SLA • Sub-millisecond Local Cache',
    description: 'Serves as the high-availability real-time state database for machine telemetry snapshots, active optical defect inspections, and automated work orders. Uses Firestore real-time listeners (onSnapshot) to propagate live sensor deviations from Cloud Run to operator screens across multiple assembly bays without manual page reloads.',
    codeSnippet: `// Cloud Firestore Real-Time Telemetry & Work-Order Sync
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";

const db = getFirestore();

// Subscribe to Live Asset Telemetry & RUL Degradation in Real-Time
export function subscribeToAssetHealth(assetId, callback) {
  const assetRef = doc(db, "assets", assetId);
  return onSnapshot(assetRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    }
  });
}`
  },
  {
    id: 'firebase',
    name: 'Firebase (Hosting, Auth & Cloud Messaging)',
    category: 'Client & Live State',
    suggested: false,
    role: 'Zero-trust portal, RBAC & instant field technician push',
    tech: 'Firebase Hosting + Firebase Auth + FCM',
    metric: '< 25ms Global CDN • Instant FCM Alerts',
    description: 'Delivers the AURA-MES operational interface via Firebase Hosting CDN with microsecond TLS handshakes. Secures plant operations with Firebase Authentication (Role-Based Access Control) and dispatches instant P1 emergency alerts to field tablets via Firebase Cloud Messaging (FCM).',
    codeSnippet: `// Firebase Client SDK: Zero-Trust Auth & FCM Emergency Push
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = { projectId: "aura-mes-prod" };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log("URGENT Shopfloor Notification Received:", payload.notification.title);
});`
  }
];

export const INITIAL_COPILOT_MESSAGES = [
  {
    id: 1,
    sender: 'gemini',
    time: '10:56 AM',
    text: `Hello Operator. I am **AURA-MES Copilot**, powered by **Gemini 1.5 Pro on Vertex AI**. 

I am continuously cross-referencing factory IoT streams, camera inspection lines, and equipment maintenance manuals.

⚠️ **Active Attention Item**: **5-Axis CNC Milling Center #04** has developed an elevated vibration signature (4.82 mm/s RMS) with harmonic peaks at Outer Race BPFO (Ball Pass Frequency Outer). Remaining Useful Life (RUL) is estimated at **42 hours**.

How would you like to proceed?`,
    suggestedActions: [
      'Simulate Machine Throttle to 75%',
      'Run Gemini Vision Root-Cause Analysis on Bearing',
      'Generate Automated Maximo Work Order',
      'Calculate Carbon Reduction vs Throughput'
    ]
  }
];
