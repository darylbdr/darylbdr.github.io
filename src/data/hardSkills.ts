interface HardSkill {
  name: string;
  description: string;
  icon: string;
}

const hardSkills: HardSkill[] = [
  {
    name: "Deep Learning & Computer Vision",
    description: "PyTorch, Keras 3, CNN, U-Net denoising, Bahdanau Attention & LSTM decoders",
    icon: "brain-fill"
  },
  {
    name: "LLM Fine-Tuning & Agentic AI",
    description: "Hybrid CPT and SFT with QLoRA on Hugging Face, plus tool-calling agents using Ollama, Stockfish, and GitLab",
    icon: "robot-fill"
  },
  {
    name: "Python Backend & MLOps",
    description: "FastAPI, Flask, Server-Sent Events streaming, Docker, Azure Container Apps & CI/CD",
    icon: "code-box-fill"
  },
  {
    name: "React, TypeScript & QA Automation",
    description: "Interactive web applications with React, TypeScript, Vite and end-to-end testing with Cypress",
    icon: "react"
  }
];

export default hardSkills;
