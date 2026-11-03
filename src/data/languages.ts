interface Language {
    name: string;
    level: string;
    description: string;
    show: boolean;
}

const languages: Language[] = [
    {
        name: "French",
        level: "Native",
        description: "Native speaker",
        show: true
    },
    {
        name: "English",
        level: "Professional Working Proficiency",
        description: "Fluent technical reading, writing, and communication",
        show: true
    }
];

export default languages;
