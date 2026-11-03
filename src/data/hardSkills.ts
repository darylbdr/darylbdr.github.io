interface HardSkill {
  name: string;
  description: string;
  icon: string;
}

const hardSkills: HardSkill[] = [
  {
    name: "Deep Learning & Computer Vision",
    description: "PyTorch, Keras 3, CNN, Bahdanau Attention & LSTM decoders",
    icon: "brain-fill"
  },
  {
    name: "Local LLMs & Agentic AI",
    description: "Building grounded tool-calling agents with Ollama, function schemas, prompt engineering, and GitLab/Stockfish integrations",
    icon: "robot-fill"
  },
  {
    name: "Python Backend & MLOps",
    description: "FastAPI, Flask, Server-Sent Events streaming, Docker multi-stage builds, Azure Container Apps & CI/CD",
    icon: "code-box-fill"
  },
  {
    name: "React, TypeScript & QA Automation",
    description: "Interactive web applications with React, TypeScript, Vite, Tailwind CSS, and end-to-end testing with Cypress",
    icon: "react"
  }
];

export default hardSkills;
