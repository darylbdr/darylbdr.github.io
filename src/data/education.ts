interface Education {
    title: string;
    startDate: string;
    endDate?: string;
    school: string;
    schoolUrl?: string;
    location: string;
    description: string;
    currentUni: boolean;
}

const education: Education[] = [
    {
        title: "Engineering Degree in Computer Science — AI & Data Science",
        startDate: "2022-09-01",
        endDate: "",
        school: "CESI École d'Ingénieurs",
        schoolUrl: "https://www.cesi.fr/",
        location: "France",
        description: "Engineering curriculum (Grade de Master, CTI-accredited) specializing in Artificial Intelligence, Machine Learning, Deep Learning (Computer Vision & NLP), Software Engineering, and Cloud/DevOps architectures through project-based learning.",
        currentUni: true,
    },
    {
        title: "Academic Exchange Semester — AI & Cloud Computing",
        startDate: "2026-03-01",
        endDate: "2026-07-15",
        school: "Politehnica University of Timișoara (UPT)",
        schoolUrl: "https://www.upt.ro/",
        location: "Timișoara, Romania",
        description: "International exchange semester at the Faculty of Automation and Computers (Facultatea de Automatică și Calculatoare). Completed English-taught coursework focused on Natural Language Processing (NLP), Reinforcement Learning (RL), and Cloud Computing architectures.",
        currentUni: false,
    },
    {
        title: "Preparatory Classes for Engineering Schools (Classes Préparatoires)",
        startDate: "2020-09-01",
        endDate: "2022-06-30",
        school: "Prépa Saint-Jean (Institut Universitaire Saint-Jean)",
        schoolUrl: "https://prepasaintjean.org/",
        location: "Douala, Cameroon",
        description: "Intensive two-year scientific and technological preparatory program (Mathematics, Linear Algebra, Probability, Physics, Algorithms & Programming, and Engineering Sciences) designed in partnership with French Grandes Écoles d'Ingénieurs.",
        currentUni: false,
    },
];

export default education;
