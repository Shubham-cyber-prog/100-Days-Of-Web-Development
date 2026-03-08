export interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: "open" | "in-progress" | "completed";
  client: { name: string; avatar: string; rating: number };
  bidsCount: number;
  skills: string[];
}

export interface Bid {
  id: string;
  freelancer: { name: string; avatar: string; rating: number };
  amount: string;
  proposal: string;
  deliveryTime: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Website Redesign",
    description: "Looking for a skilled developer to redesign our existing e-commerce platform with modern UI/UX. Must be responsive and performant. We need someone who understands conversion optimization and can create a seamless shopping experience.",
    budget: "$3,000 - $5,000",
    deadline: "March 30, 2026",
    status: "open",
    client: { name: "Sarah Mitchell", avatar: "SM", rating: 4.9 },
    bidsCount: 12,
    skills: ["React", "Tailwind CSS", "Node.js"],
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    description: "Need a designer for a fitness tracking mobile app. Looking for clean, modern design with intuitive navigation and engaging visual elements.",
    budget: "$2,000 - $4,000",
    deadline: "April 15, 2026",
    status: "open",
    client: { name: "James Rodriguez", avatar: "JR", rating: 4.7 },
    bidsCount: 8,
    skills: ["Figma", "UI/UX", "Mobile Design"],
  },
  {
    id: "3",
    title: "WordPress Blog Development",
    description: "Create a professional blog website with custom theme, SEO optimization, and content management capabilities.",
    budget: "$1,500 - $2,500",
    deadline: "March 20, 2026",
    status: "in-progress",
    client: { name: "Emily Chen", avatar: "EC", rating: 5.0 },
    bidsCount: 15,
    skills: ["WordPress", "PHP", "SEO"],
  },
  {
    id: "4",
    title: "Brand Identity Design",
    description: "Complete brand identity package including logo, color palette, typography, and brand guidelines for a tech startup.",
    budget: "$1,000 - $2,000",
    deadline: "April 5, 2026",
    status: "open",
    client: { name: "Michael Park", avatar: "MP", rating: 4.8 },
    bidsCount: 20,
    skills: ["Branding", "Illustrator", "Photoshop"],
  },
  {
    id: "5",
    title: "API Integration Service",
    description: "Integrate multiple third-party APIs into our existing platform including payment gateway, shipping, and analytics.",
    budget: "$4,000 - $6,000",
    deadline: "May 1, 2026",
    status: "completed",
    client: { name: "Lisa Wong", avatar: "LW", rating: 4.6 },
    bidsCount: 6,
    skills: ["Python", "REST API", "AWS"],
  },
  {
    id: "6",
    title: "Social Media Dashboard",
    description: "Build an analytics dashboard that aggregates data from multiple social media platforms with real-time charts and reporting.",
    budget: "$5,000 - $8,000",
    deadline: "April 20, 2026",
    status: "open",
    client: { name: "David Kim", avatar: "DK", rating: 4.9 },
    bidsCount: 10,
    skills: ["React", "D3.js", "TypeScript"],
  },
];

export const sampleBids: Bid[] = [
  {
    id: "b1",
    freelancer: { name: "Alex Turner", avatar: "AT", rating: 4.9 },
    amount: "$3,500",
    proposal: "I have 5+ years of experience in e-commerce development. I can deliver a modern, responsive redesign with improved UX and conversion optimization.",
    deliveryTime: "3 weeks",
  },
  {
    id: "b2",
    freelancer: { name: "Priya Sharma", avatar: "PS", rating: 4.8 },
    amount: "$4,200",
    proposal: "Experienced in building high-performance e-commerce platforms. I'll focus on speed, accessibility, and a premium shopping experience.",
    deliveryTime: "4 weeks",
  },
  {
    id: "b3",
    freelancer: { name: "Marco Rossi", avatar: "MR", rating: 4.7 },
    amount: "$3,800",
    proposal: "I specialize in React-based e-commerce solutions with Stripe integration. I'll ensure a seamless checkout flow and mobile-first approach.",
    deliveryTime: "3.5 weeks",
  },
];
