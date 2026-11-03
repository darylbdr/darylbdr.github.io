interface Education {
    title: string;
    startDate: string;
    endDate?: string;
    school: string;
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
        location: "France",
        description: "Specializing in Artificial Intelligence, Machine Learning, Deep Learning (Computer Vision & NLP), Software Engineering, and Cloud/DevOps architectures.",
        currentUni: true,
    },
];

export default education;
