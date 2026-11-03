interface WorkExperience {
    title: string;
    startDate: string;
    endDate?: string;
    company: string;
    companyUrl?: string;
    location: string;
    description: string;
    goals: string[];
    currentJob: boolean;
}

const workExperience: WorkExperience[] = [
    {
        title: "AI Agent Development & CI/CD Intern",
        startDate: "2025-09-15",
        endDate: "2026-01-30",
        company: "EQUANS",
        companyUrl: "https://www.equans.fr/",
        location: "France",
        description: "I completed a four-month internship at EQUANS between September 15, 2025 and January 30, 2026. Originally brought on to build an open-source AI agent using Ollama for CI/CD optimization, internal governance requirements required a quick shift in strategy. Instead of stalling, I redirected my efforts toward maximizing the tools already available:",
        goals: [
            "Demystifying GitHub Copilot: Led internal sessions covering advanced Copilot capabilities to streamline developer workflows.",
            "Prompt Engineering for CI/CD: Designed structured prompt templates to assist with automated delivery tasks.",
            "Repository Architecture: Re-organized the company's admin GitHub repository for better scalability and clearer governance.",
        ],
        currentJob: false,
    },
    {
        title: "QA Automation & Software Development Intern",
        startDate: "2025-01-13",
        endDate: "2025-04-25",
        company: "AQUILAB",
        companyUrl: "https://aquilab.com/",
        location: "France",
        description: "I completed a three-month internship at AQUILAB between January 13 and April 25, 2025. During my internship at AQUILAB, I had the opportunity to work across both QA and software development. My main focus areas included:",
        goals: [
            "Building automated test scripts with Cypress.",
            "Running functional test cycles to validate software releases.",
            "Revamping the UI/UX for a smoother user experience.",
            "Implementing a brand-new feature to expand the product's capabilities.",
        ],
        currentJob: false,
    },
];

export default workExperience;
