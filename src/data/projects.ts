import type { Project } from "../types";

/** Ordered to match site sections: Robotics → Simulation → AI & Software → Finance */
export const projects: Project[] = [
  // Robotics & Embedded Systems
  {
    title: "Metal 3D Printing (LDED) & Robotic Milling Integration Software",
    category: "work project",
    topic: "Robotics & Embedded Systems",
    listPositionOverride: 1,
    organization: "Promation Engineering",
    bullets: [
      "Led a 3-person robotics integration research team",
      "Developed C# .NET desktop software to coordinate Fanuc and Kuka industrial robots",
      "Application: laser-directed deposition metal 3D printing and repair",
      "Used C# to postprocess milling toolpaths to Fanuc and Kuka robot positions and speeds",
      "Collaborated with university researchers and graduate students on steel sample characterization",
    ],
  },
  {
    title: "ROS Robotics Graduate Course Labs",
    category: "work project",
    topic: "Robotics & Embedded Systems",
    listPositionOverride: 2,
    organization: "McMaster University",
    bullets: [
      "Produced 3 labs for a graduate course on mobile robotics",
      "Controlled a differential drive robot using ROS",
      "Performed SLAM using an on-board LiDAR sensor",
    ],
  },
  {
    title: "Undergraduate IOT Course Labs",
    category: "work project",
    topic: "Robotics & Embedded Systems",
    listPositionOverride: 3,
    organization: "McMaster University",
    bullets: [
      "Produced 5 labs for a an undergraduate course on IOT devices and networks",
      "Demonstrated communication between microcontrollers using HTTP requests, MQTT, LoRaWAN, XBee, and Bluetooth",
    ],
  },
  {
    title: "Unitree GO1 Reverse Engineering",
    category: "school project",
    topic: "Robotics & Embedded Systems",
    listPositionOverride: 4,
    organization: "McMaster University",
    bullets: [
      "Reverse-engineered the Unitree GO1 quadruped robot to access HTTP control APIs, MQTT interface, and ROS system",
      "Built a React app with FastAPI backend to stream the camera feed and control the robot remotely",
    ],
  },
  {
    title: "Mechanical Design",
    category: "school club",
    topic: "Robotics & Embedded Systems",
    listPositionOverride: 5,
    organization: "McMaster Mars Rover Team",
    bullets: [
      "Participated as a Mechanical Designer on the McMaster Mars Rover competition team",
      "Contributed to the design and fabrication of rover subsystems",
    ],
  },
  {
    title: "Renesas Microcontroller Course Labs",
    category: "work project",
    topic: "Robotics & Embedded Systems",
    listPositionOverride: 6,
    organization: "McMaster University",
    bullets: [
      "Developed 7 course labs for programming a Renesas Synergy embedded systems microcontroller",
      "Included Timers, Registers, GPIO, PWM, I2C, and ADC through C APIs",
    ],
  },

  // Simulation
  {
    title: "Gaussian Splat Digital Twin in Omniverse",
    category: "work project",
    topic: "Simulation",
    listPositionOverride: 2,
    organization: "Eclipse Automation",
    bullets: [
      "Developed an Omniverse extension to process a video into a gaussian splat digital twin of an industrial facility",
      "The extension performed the Video -> Meshroom -> Sharpframes -> Colmap -> 3DGRUT - > PLY | USDZ pipeline",
      "Developed an Omniverse extension to spawn cameras in a scene and perform gaussian splatting completely virtually",
    ],
  },
  {
    title: "Fanuc & PLC OT Integration",
    category: "work project",
    topic: "Simulation",
    listPositionOverride: 1,
    organization: "Eclipse Automation",
    bullets: [
      "Integrated NVIDIA Omniverse with operational technology systems for virtual commissioning",
      "Connected Fanuc DCS safety signals, PLC tags, and sim-ready machine components to the simulation environment",
      "Enabled engineers to validate automation sequences in a digital twin before physical deployment",
    ],
  },
  {
    title: "Unreal Engine 4 Digital Twin",
    category: "work project",
    topic: "Simulation",
    listPositionOverride: 3,
    organization: "AXIBO Inc. & McMaster University",
    bullets: [
      "Developed custom Unreal Engine plugins to parse RabbitMQ messages to animate and control behaviour inside an Unreal Engine simulation",
      "Developed an Unreal Engine plugin to stream motor frequency data from an accelerometer and display the data as an info card and animations in an Unreal Engine simulation",
    ],
  },

  // AI & Software
  {
    title: "QC Document Review Automation",
    category: "work project",
    topic: "AI & Software",
    listPositionOverride: 1,
    organization: "Eclipse Automation",
    bullets: [
      "Built an internal web-app with a custom on-site AI pipeline to automate manual QC review",
      "Extracted and cross-referenced information on mechanical drawings and material conformance documents",
      "Replaced a time-intensive manual review process with automated document analysis",
    ],
  },
  {
    title: "Nemoclaw Business Process AI",
    category: "work project",
    topic: "AI & Software",
    listPositionOverride: 2,
    organization: "Eclipse Automation",
    bullets: [
      "Built an AI chatbot using the NVIDIA Nemoclaw platform and Neo4j GraphDB",
      "Designed to assist management in identifying gaps in business processes",
      "Linked identified gaps directly to impacted QC regulations and documentation",
      "Leveraged graph-based document relationships for contextual retrieval",
    ],
  },

  // Finance (section always last on site)
  {
    title: "AI Go-to-Market Strategy",
    category: "school project",
    topic: "Finance",
    listPositionOverride: 1,
    organization: "MBA - Innovation & Strategy Course",
    bullets: [
      "Developed a go-to-market strategy for an AI company as part of MBA coursework",
      "Translated technical AI capabilities into business value propositions for non-technical stakeholders",
    ],
  },
  {
    title: "Capital Budgeting for a Local Organization",
    category: "course project",
    topic: "Finance",
    listPositionOverride: 3,
    organization: "Flamborough Connects",
    bullets: [
      "Produced a capital budget in Excel to map expenses and estimate revenues from a fundraising event",
      "Organization provided social and administrative services to seniors",
    ],
  },
  {
    title: "Capital Budgeting, M&A Case Studies",
    category: "course project",
    topic: "Finance",
    listPositionOverride: 2,
    organization: "MBA - Corporate Finance Course",
    bullets: [
      "Provided financial analysis, performed sensitivity analysis, produced strategic recommendations for a fictional firm",
      "Merged financial statements to provide an estimate firm value and provided recommendations on external financing",
    ],
  },
];
