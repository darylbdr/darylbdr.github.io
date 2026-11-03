interface HardSkill {
  name: string;
  description: string;
  icon: string;
}

const hardSkills: HardSkill[] = [
  {
    name: "Deep Learning & Computer Vision",
    description: "PyTorch & Keras 3: CNNs, U-Net denoising (MSE+SSIM), InceptionV3 feature extraction, Bahdanau Attention & LSTM decoders",
    icon: "brain-fill"
  },
  {
    name: "Local LLMs & Agentic AI",
    description: "Building grounded tool-calling agents with Ollama (Gemma 4), function schemas, prompt engineering, and GitLab/Stockfish integrations",
    icon: "robot-fill"
  },
  {
    name: "Python Backend & MLOps",
    description: "FastAPI, Flask, Server-Sent Events (SSE) & NDJSON streaming, Docker multi-stage builds, Azure Container Apps & CI/CD",
    icon: "code-box-fill"
  },
  {
    name: "React, TypeScript & QA Automation",
    description: "Interactive web applications with React, TypeScript, Vite, Astro MDX, Tailwind CSS, and end-to-end testing with Cypress",
    icon: "react"
  }
];

export default hardSkills;
