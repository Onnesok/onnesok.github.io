export interface Milestone {
    id: string;
    title: string;
    subtitle: string;
    image?: string;
    tag: string;
    description: string;
    color: string;
    type: 'honor' | 'robotics' | 'software' | 'research' | 'summit' | 'funding';
}

export const allMilestones: Milestone[] = [
    {
        id: "vc-award",
        title: "VC Award",
        subtitle: "Excellence in Extracurricular Activities",
        image: "/projects/milestone/vc award.jpeg",
        tag: "Extracurricular",
        description: "Received prestigious recognition from the Vice Chancellor for exceptional leadership and impact in extracurricular initiatives.",
        color: "#00e5ff",
        type: 'honor'
    },
    {
        id: "uihp-grant",
        title: "UIHP Pre-seed Grant",
        subtitle: "Innovation for Onnesok",
        image: "/projects/milestone/uihp preseed grant.jpeg",
        tag: "Funding",
        description: "Awarded pre-seed funding for Onnesok through the University Innovation Hub Program to drive digital innovation.",
        color: "#a855f7",
        type: 'funding'
    },
    {
        id: "bdapps-summit",
        title: "BDApps Innovation Summit",
        subtitle: "ShooterX National Recognition",
        image: "/projects/milestone/bdapps innovation summit.jpeg",
        tag: "Summit",
        description: "Honored at the national level for the breakthrough success and innovation of ShooterX at the BDApps Innovation Summit.",
        color: "#f43f5e",
        type: 'summit'
    },
    {
        id: "shooterx-award",
        title: "ShooterX GameDev Award",
        subtitle: "Independent Game Excellence",
        image: "/projects/milestone/shooterx gamedev award.jpeg",
        tag: "Gamedev",
        description: "Recognized for excellence in game design and technical implementation in the development of ShooterX.",
        color: "#fbbf24",
        type: 'software'
    },
    {
        id: "iot-matrix",
        title: "IoT Matrix Hackathon",
        subtitle: "National Hackathon Winner",
        image: "/projects/milestone/iot matrix.jpeg",
        tag: "Hackathon",
        description: "Triumph at the IoT Matrix national hackathon, showcasing hardware-software integration for scalable industrial solutions.",
        color: "#10b981",
        type: 'robotics'
    },
    {
        id: "research-poster",
        title: "Research Poster Presentation",
        subtitle: "ADAS Research for Future Mobility",
        image: "/projects/milestone/research poster .jpeg",
        tag: "ADAS",
        description: "Presented cutting-edge research on Advanced Driver Assistance Systems (ADAS) to facilitate safer and smart mobility solutions.",
        color: "#3b82f6",
        type: 'research'
    },
    {
        id: "technoxian-world-cup",
        title: "Technoxian Robotics World Cup",
        subtitle: "National Champion & Global Finalist",
        image: "/projects/milestone/technoxian robotics world cup.jpeg",
        tag: "Robotics",
        description: "Represented excellence by winning the National Championship and competing on the global stage at the Technoxian Robotics World Cup.",
        color: "#fbbf24",
        type: 'robotics'
    },
    {
        id: "wro-achievement",
        title: "World Robot Olympiad",
        subtitle: "National Robotics Selection",
        image: "/projects/milestone/wro.jpeg",
        tag: "Engineering",
        description: "Competed in the World Robot Olympiad (WRO), demonstrating advanced problem-solving and engineering through robotics.",
        color: "#10b981",
        type: 'robotics'
    },
    {
        id: "rusc-innovation",
        title: "RUSC Innovation Competition",
        subtitle: "Breakthrough Technical Solution",
        image: "/projects/milestone/rusc innovation competition.jpeg",
        tag: "Innovation",
        description: "Recognized for a breakthrough technical solution at the RUSC Innovation Competition, focusing on scalable impact.",
        color: "#8b5cf6",
        type: 'software'
    },
    {
        id: "ieee-gold",
        title: "IEEE Gold Award",
        subtitle: "Technical Excellence Recognition",
        image: "/projects/milestone/ieee gold award.jpeg",
        tag: "Recognition",
        description: "Awarded by IEEE for demonstrating outstanding technical proficiency and contribution to the engineering community.",
        color: "#0ea5e9",
        type: 'honor'
    },
    {
        id: "azure-admin",
        title: "Azure Administrator",
        subtitle: "Microsoft Certified Associate",
        image: "/projects/milestone/microsoft azure adminstrator.jpeg",
        tag: "Cert",
        description: "Successfully cleared the AZ-104 certification, demonstrating expertise in managing cloud infrastructure.",
        color: "#0089d6",
        type: 'funding'
    },
    {
        id: "azure-ai",
        title: "Azure AI Fundamentals",
        subtitle: "Microsoft Certified Associate",
        image: "/projects/milestone/microsoft azure ai.jpeg",
        tag: "Cert",
        description: "Achieved AI-900 certification, showcasing a foundational understanding of AI and machine learning on Azure.",
        color: "#00a4ef",
        type: 'funding'
    },
    {
        id: "azure-fund",
        title: "Azure Fundamentals",
        subtitle: "Microsoft Certified Associate",
        image: "/projects/milestone/microsoft azure fundamentals.jpeg",
        tag: "Cert",
        description: "Certified in AZ-900, validating knowledge of cloud concepts and core Azure services.",
        color: "#737373",
        type: 'funding'
    },
    {
        id: "science-fair-national",
        title: "39th National Science Fair",
        subtitle: "National Level Achievement",
        image: "/projects/milestone/39th national science fair .jpeg",
        tag: "Science",
        description: "Awarded at the 39th National Science and Technology Week for innovative project display and scientific inquiry.",
        color: "#f59e0b",
        type: 'honor'
    },
    {
        id: "medico-digital-art",
        title: "Medico Digital Art Challenge",
        subtitle: "Visual Communication & Design",
        image: "/projects/milestone/medico digital art challenge.jpeg",
        tag: "Creative",
        description: "Secured a top position in the Medico Digital Art Challenge, blending healthcare themes with digital creativity.",
        color: "#f43f5e",
        type: 'software'
    },
    {
        id: "tech-spectra",
        title: "Tech Spectra Achievement",
        subtitle: "Engineering Showcase",
        image: "/projects/milestone/tech spectra.jpeg",
        tag: "Tech",
        description: "Recognized for technical excellence during the Tech Spectra showcase, highlighting advanced engineering projects.",
        color: "#a855f7",
        type: 'robotics'
    },
    {
        id: "green-genius",
        title: "Green Genius Achievement",
        subtitle: "Sustainability & Innovation",
        image: "/projects/milestone/green genius.jpeg",
        tag: "Awards",
        description: "Honored for innovative approaches to sustainability and green technology in a competitive environment.",
        color: "#22c55e",
        type: 'honor'
    },
    {
        id: "online-science-fair",
        title: "1st Online Science Fair",
        subtitle: "Digital Innovation Winner",
        image: "/projects/milestone/first online science fair.jpeg",
        tag: "Digital",
        description: "Winner of the inaugural online science fair, showcasing a digital-first approach to scientific experimentation.",
        color: "#00e5ff",
        type: 'software'
    },
];
