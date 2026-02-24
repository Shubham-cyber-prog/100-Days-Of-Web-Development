export interface Planet {
  id: string;
  name: string;
  distanceFromSun: string;
  diameter: string;
  moons: number;
  description: string;
  funFacts: string[];
  color: string;
  glowColor: string;
  imageUrl: string;
  size: number; // Relative size for UI
  orbitRadius: number; // Pixels from center
  orbitDuration: number; // Seconds for one orbit
  temperature: string;
  gravity: string;
  orbitalPeriod: string;
}

export const planetsData: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    distanceFromSun: "57.9 million km",
    diameter: "4,879 km",
    moons: 0,
    description: "The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth's Moon. Its surface is covered with craters.",
    funFacts: [
      "A year on Mercury is just 88 Earth days",
      "Mercury has no atmosphere to retain heat",
      "It's the fastest planet, orbiting the Sun at 47 km/s"
    ],
    color: "#A8A8A8",
    glowColor: "#C0C0C0",
    imageUrl: "https://images.unsplash.com/photo-1558447971-af2d6fc8469f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjdXJ5JTIwcGxhbmV0JTIwc3BhY2V8ZW58MXx8fHwxNzcxODc2Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    size: 40,
    orbitRadius: 80,
    orbitDuration: 20,
    temperature: "430°C (day) / -180°C (night)",
    gravity: "3.7 m/s²",
    orbitalPeriod: "88 Earth days"
  },
  {
    id: "venus",
    name: "Venus",
    distanceFromSun: "108.2 million km",
    diameter: "12,104 km",
    moons: 0,
    description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's one of the brightest objects in the sky and is often called the 'Morning Star'.",
    funFacts: [
      "Venus rotates in the opposite direction to most planets",
      "A day on Venus is longer than its year",
      "Venus is the hottest planet in our solar system"
    ],
    color: "#FFC649",
    glowColor: "#FFD700",
    imageUrl: "https://images.unsplash.com/photo-1768387714768-60982681d9cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW51cyUyMHBsYW5ldCUyMHNwYWNlfGVufDF8fHx8MTc3MTg3NjI4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    size: 48,
    orbitRadius: 120,
    orbitDuration: 30,
    temperature: "471°C",
    gravity: "8.9 m/s²",
    orbitalPeriod: "225 Earth days"
  },
  {
    id: "earth",
    name: "Earth",
    distanceFromSun: "149.6 million km",
    diameter: "12,742 km",
    moons: 1,
    description: "Our home planet is the third planet from the Sun, and the only place we know of so far that's inhabited by living things. Earth is the only planet with liquid water on its surface.",
    funFacts: [
      "Earth is the only planet not named after a god",
      "70% of Earth's surface is covered with water",
      "Earth's atmosphere is 78% nitrogen and 21% oxygen"
    ],
    color: "#4A90E2",
    glowColor: "#6BA3FF",
    imageUrl: "https://images.unsplash.com/photo-1727363584291-433dcd86a0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHBsYW5ldCUyMHNwYWNlfGVufDF8fHx8MTc3MTgzMDgwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    size: 50,
    orbitRadius: 160,
    orbitDuration: 40,
    temperature: "15°C (average)",
    gravity: "9.8 m/s²",
    orbitalPeriod: "365.25 Earth days"
  },
  {
    id: "mars",
    name: "Mars",
    distanceFromSun: "227.9 million km",
    diameter: "6,779 km",
    moons: 2,
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere. This dynamic planet has seasons, polar ice caps, canyons, extinct volcanoes, and evidence that it was even more active in the past.",
    funFacts: [
      "Mars is known as the Red Planet due to iron oxide on its surface",
      "Mars has the largest volcano in the solar system - Olympus Mons",
      "A day on Mars is 24.6 hours, very similar to Earth"
    ],
    color: "#E27B58",
    glowColor: "#FF6347",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJzJTIwcGxhbmV0JTIwcmVkfGVufDF8fHx8MTc3MTg3NjI4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    size: 42,
    orbitRadius: 200,
    orbitDuration: 50,
    temperature: "-63°C (average)",
    gravity: "3.7 m/s²",
    orbitalPeriod: "687 Earth days"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    distanceFromSun: "778.5 million km",
    diameter: "139,820 km",
    moons: 95,
    description: "Jupiter is the largest planet in our solar system. It's a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets combined.",
    funFacts: [
      "Jupiter's Great Red Spot is a giant storm larger than Earth",
      "Jupiter has the shortest day of all planets - just 10 hours",
      "Jupiter's magnetic field is 14 times stronger than Earth's"
    ],
    color: "#C88B3A",
    glowColor: "#DAA520",
    imageUrl: "https://images.unsplash.com/photo-1765207363238-105669534be9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXBpdGVyJTIwcGxhbmV0JTIwZ2FzfGVufDF8fHx8MTc3MTg3NjI4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    size: 80,
    orbitRadius: 280,
    orbitDuration: 70,
    temperature: "-110°C (cloud tops)",
    gravity: "23.1 m/s²",
    orbitalPeriod: "12 Earth years"
  },
  {
    id: "saturn",
    name: "Saturn",
    distanceFromSun: "1.4 billion km",
    diameter: "116,460 km",
    moons: 146,
    description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It's adorned with thousands of beautiful ringlets and has more moons than any other planet.",
    funFacts: [
      "Saturn's rings are made of billions of pieces of ice and rock",
      "Saturn could float in water if there was a bathtub big enough",
      "Saturn has wind speeds up to 1,800 km/h"
    ],
    color: "#FAD5A5",
    glowColor: "#F4C542",
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXR1cm4lMjByaW5ncyUyMHBsYW5ldHxlbnwxfHx8fDE3NzE4NTAyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    size: 75,
    orbitRadius: 360,
    orbitDuration: 90,
    temperature: "-140°C (cloud tops)",
    gravity: "9.0 m/s²",
    orbitalPeriod: "29 Earth years"
  },
  {
    id: "uranus",
    name: "Uranus",
    distanceFromSun: "2.9 billion km",
    diameter: "50,724 km",
    moons: 28,
    description: "Uranus is the seventh planet from the Sun. It's an ice giant that rotates at a nearly 90-degree angle from the plane of its orbit, making it appear to spin on its side.",
    funFacts: [
      "Uranus rotates on its side, tilted at 98 degrees",
      "Uranus was the first planet discovered with a telescope",
      "A year on Uranus is 84 Earth years"
    ],
    color: "#4FD0E7",
    glowColor: "#00CED1",
    imageUrl: "https://images.unsplash.com/photo-1769364323382-e2de114ab151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBnaWFudCUyMHBsYW5ldHxlbnwxfHx8fDE3NzE4NzYyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    size: 58,
    orbitRadius: 430,
    orbitDuration: 110,
    temperature: "-195°C",
    gravity: "8.7 m/s²",
    orbitalPeriod: "84 Earth years"
  },
  {
    id: "neptune",
    name: "Neptune",
    distanceFromSun: "4.5 billion km",
    diameter: "49,244 km",
    moons: 16,
    description: "Neptune is the eighth and most distant planet from the Sun. It's a dark, cold, and whipped by supersonic winds, making it one of the most extreme planets in our solar system.",
    funFacts: [
      "Neptune has the strongest winds in the solar system, up to 2,000 km/h",
      "Neptune was the first planet located through mathematical predictions",
      "Neptune has completed only one orbit since its discovery in 1846"
    ],
    color: "#4169E1",
    glowColor: "#1E90FF",
    imageUrl: "https://images.unsplash.com/photo-1590821695525-1e86ef70a7ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXB0dW5lJTIwcGxhbmV0JTIwYmx1ZXxlbnwxfHx8fDE3NzE4NzYyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    size: 56,
    orbitRadius: 500,
    orbitDuration: 130,
    temperature: "-200°C",
    gravity: "11.0 m/s²",
    orbitalPeriod: "165 Earth years"
  }
];

export const quizQuestions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Mercury", "Jupiter"],
    correctAnswer: "Mars"
  },
  {
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn"
  },
  {
    question: "Which is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Venus"
  },
  {
    question: "How long does it take Earth to orbit the Sun?",
    options: ["365.25 days", "365 days", "366 days", "360 days"],
    correctAnswer: "365.25 days"
  },
  {
    question: "Which planet is the largest in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correctAnswer: "Jupiter"
  }
];
