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
        level: "TOEIC: 935",
        description: "Fluent technical reading, writing, and communication",
        show: true
    }
];

export default languages;
