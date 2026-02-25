import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MovieRow } from './components/MovieRow';
import { MovieModal } from './components/MovieModal';
import { Footer } from './components/Footer';
import { Movie } from './components/MovieCard';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Mock movie data
  const trendingMovies: Movie[] = [
    {
      id: 1,
      title: "Shadow Strike",
      image: "https://images.unsplash.com/photo-1771295764148-7998dec610d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "98",
      year: "2025",
      duration: "2h 15m",
      description: "An elite special forces team must prevent a global catastrophe in this heart-pounding action thriller.",
      genres: ["Action", "Thriller", "Military"]
    },
    {
      id: 2,
      title: "Quantum Horizon",
      image: "https://images.unsplash.com/photo-1763198216782-b534fea3dcf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "95",
      year: "2026",
      duration: "2h 30m",
      description: "In a distant future, humanity's last hope lies in exploring the unknown reaches of space.",
      genres: ["Sci-Fi", "Adventure", "Drama"]
    },
    {
      id: 3,
      title: "The Last Witness",
      image: "https://images.unsplash.com/photo-1647264157150-491bfd016aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "92",
      year: "2025",
      duration: "1h 58m",
      description: "A detective races against time to protect the only witness to a crime that could bring down an empire.",
      genres: ["Thriller", "Mystery", "Crime"]
    },
    {
      id: 4,
      title: "Realm of Legends",
      image: "https://images.unsplash.com/photo-1758484102803-760525a244d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "96",
      year: "2025",
      duration: "2h 45m",
      description: "A young hero embarks on an epic quest through magical lands to save their kingdom from darkness.",
      genres: ["Fantasy", "Adventure", "Epic"]
    },
    {
      id: 5,
      title: "Love & Laughter",
      image: "https://images.unsplash.com/photo-1761764574105-07b945ce06a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "88",
      year: "2025",
      duration: "1h 42m",
      description: "Two opposites attract in this heartwarming romantic comedy about finding love in unexpected places.",
      genres: ["Romance", "Comedy"]
    }
  ];

  const actionMovies: Movie[] = [
    {
      id: 6,
      title: "Operation Nightfall",
      image: "https://images.unsplash.com/photo-1770985274315-f728b6e2b844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "94",
      year: "2025",
      duration: "2h 10m",
      description: "Elite soldiers embark on a dangerous mission behind enemy lines in this intense war drama.",
      genres: ["Action", "War", "Drama"]
    },
    {
      id: 7,
      title: "Shadow Agent",
      image: "https://images.unsplash.com/photo-1569087682520-45253cc2e0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "91",
      year: "2026",
      duration: "2h 5m",
      description: "A master spy must use all their skills to prevent a global conspiracy from unfolding.",
      genres: ["Action", "Spy", "Thriller"]
    },
    {
      id: 8,
      title: "Thunder Road",
      image: "https://images.unsplash.com/photo-1771295764148-7998dec610d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "89",
      year: "2025",
      duration: "1h 55m",
      description: "High-octane car chases and explosive action in this adrenaline-pumping adventure.",
      genres: ["Action", "Adventure"]
    },
    {
      id: 9,
      title: "Iron Fist",
      image: "https://images.unsplash.com/photo-1705478563275-a4693b6bf2cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "93",
      year: "2025",
      duration: "2h 20m",
      description: "A superhero rises to protect the city from an ancient evil threatening to destroy everything.",
      genres: ["Superhero", "Action", "Fantasy"]
    },
    {
      id: 10,
      title: "Desert Fury",
      image: "https://images.unsplash.com/photo-1650397306167-5283e1f47239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "87",
      year: "2025",
      duration: "2h",
      description: "In the lawless west, a lone gunslinger seeks justice against those who wronged him.",
      genres: ["Western", "Action", "Drama"]
    }
  ];

  const horrorMovies: Movie[] = [
    {
      id: 11,
      title: "The Haunting",
      image: "https://images.unsplash.com/photo-1635442061157-c5e72fe99472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "90",
      year: "2025",
      duration: "1h 48m",
      description: "A family moves into an old mansion, only to discover they're not alone in this terrifying horror.",
      genres: ["Horror", "Thriller"]
    },
    {
      id: 12,
      title: "Dark Whispers",
      image: "https://images.unsplash.com/photo-1647264157150-491bfd016aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "86",
      year: "2026",
      duration: "1h 52m",
      description: "Mysterious voices from beyond lead to a chilling revelation about the past.",
      genres: ["Horror", "Mystery"]
    },
    {
      id: 13,
      title: "Midnight Terror",
      image: "https://images.unsplash.com/photo-1635442061157-c5e72fe99472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "88",
      year: "2025",
      duration: "1h 45m",
      description: "When night falls, an ancient evil awakens to hunt its prey in this spine-chilling horror.",
      genres: ["Horror", "Supernatural"]
    },
    {
      id: 14,
      title: "The Curse",
      image: "https://images.unsplash.com/photo-1647264157150-491bfd016aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "84",
      year: "2025",
      duration: "1h 50m",
      description: "A cursed artifact brings terror to everyone who comes in contact with it.",
      genres: ["Horror", "Mystery"]
    },
    {
      id: 15,
      title: "Silent Screams",
      image: "https://images.unsplash.com/photo-1635442061157-c5e72fe99472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "85",
      year: "2026",
      duration: "1h 55m",
      description: "In an abandoned hospital, something sinister lurks in the shadows.",
      genres: ["Horror", "Thriller"]
    }
  ];

  const documentaries: Movie[] = [
    {
      id: 16,
      title: "Wild Earth",
      image: "https://images.unsplash.com/photo-1719743441581-632023e3d2ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "97",
      year: "2025",
      duration: "1h 30m",
      description: "Explore the untamed beauty of nature and witness wildlife in their natural habitats.",
      genres: ["Documentary", "Nature"]
    },
    {
      id: 17,
      title: "Ocean Mysteries",
      image: "https://images.unsplash.com/photo-1719743441581-632023e3d2ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "95",
      year: "2025",
      duration: "1h 25m",
      description: "Dive deep into the ocean to discover the secrets of marine life.",
      genres: ["Documentary", "Nature"]
    },
    {
      id: 18,
      title: "Planet's Edge",
      image: "https://images.unsplash.com/photo-1719743441581-632023e3d2ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "93",
      year: "2026",
      duration: "1h 40m",
      description: "Journey to the most remote corners of our planet in this breathtaking documentary.",
      genres: ["Documentary", "Adventure"]
    },
    {
      id: 19,
      title: "The Last Frontier",
      image: "https://images.unsplash.com/photo-1719743441581-632023e3d2ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "96",
      year: "2025",
      duration: "1h 35m",
      description: "Witness the struggle for survival in Earth's most extreme environments.",
      genres: ["Documentary", "Wildlife"]
    },
    {
      id: 20,
      title: "Nature's Symphony",
      image: "https://images.unsplash.com/photo-1719743441581-632023e3d2ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "94",
      year: "2025",
      duration: "1h 28m",
      description: "Experience the harmony of nature through stunning visuals and captivating storytelling.",
      genres: ["Documentary", "Nature"]
    }
  ];

  const comedies: Movie[] = [
    {
      id: 21,
      title: "Laugh Out Loud",
      image: "https://images.unsplash.com/photo-1604674725989-52c312835516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "86",
      year: "2025",
      duration: "1h 38m",
      description: "A hilarious comedy about friendship, mistakes, and finding joy in the chaos of life.",
      genres: ["Comedy"]
    },
    {
      id: 22,
      title: "Happy Days",
      image: "https://images.unsplash.com/photo-1604674725989-52c312835516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "84",
      year: "2025",
      duration: "1h 42m",
      description: "Feel-good comedy that will leave you smiling from start to finish.",
      genres: ["Comedy", "Family"]
    },
    {
      id: 23,
      title: "The Funny Bunch",
      image: "https://images.unsplash.com/photo-1604674725989-52c312835516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "88",
      year: "2026",
      duration: "1h 45m",
      description: "A group of misfits come together in this laugh-out-loud comedy adventure.",
      genres: ["Comedy", "Adventure"]
    },
    {
      id: 24,
      title: "Comic Relief",
      image: "https://images.unsplash.com/photo-1761764574105-07b945ce06a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "82",
      year: "2025",
      duration: "1h 35m",
      description: "Romantic comedy that proves love and laughter go hand in hand.",
      genres: ["Comedy", "Romance"]
    },
    {
      id: 25,
      title: "Jokers Wild",
      image: "https://images.unsplash.com/photo-1604674725989-52c312835516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "85",
      year: "2025",
      duration: "1h 40m",
      description: "Outrageous comedy about a prank war that spirals out of control.",
      genres: ["Comedy"]
    }
  ];

  const dramas: Movie[] = [
    {
      id: 26,
      title: "Emotional Journey",
      image: "https://images.unsplash.com/photo-1631632286519-cb83e10e3d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "92",
      year: "2025",
      duration: "2h 10m",
      description: "A powerful drama about family, loss, and the strength it takes to move forward.",
      genres: ["Drama"]
    },
    {
      id: 27,
      title: "True Calling",
      image: "https://images.unsplash.com/photo-1631632286519-cb83e10e3d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "90",
      year: "2026",
      duration: "2h 5m",
      description: "An inspiring story of pursuing dreams against all odds.",
      genres: ["Drama", "Biography"]
    },
    {
      id: 28,
      title: "The Detective",
      image: "https://images.unsplash.com/photo-1734812070354-a0af3c243b2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "94",
      year: "2025",
      duration: "2h 15m",
      description: "A brilliant detective must solve a case that hits too close to home.",
      genres: ["Crime", "Drama", "Mystery"]
    },
    {
      id: 29,
      title: "Hearts Unbroken",
      image: "https://images.unsplash.com/photo-1631632286519-cb83e10e3d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "89",
      year: "2025",
      duration: "1h 58m",
      description: "A touching drama about resilience, hope, and the human spirit.",
      genres: ["Drama", "Romance"]
    },
    {
      id: 30,
      title: "The Final Act",
      image: "https://images.unsplash.com/photo-1631632286519-cb83e10e3d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "91",
      year: "2026",
      duration: "2h 8m",
      description: "A dramatic tale of redemption and second chances.",
      genres: ["Drama"]
    }
  ];

  const familyMovies: Movie[] = [
    {
      id: 31,
      title: "Family Adventures",
      image: "https://images.unsplash.com/photo-1686477771368-c6a9e9e248b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "87",
      year: "2025",
      duration: "1h 32m",
      description: "A heartwarming family adventure that will delight viewers of all ages.",
      genres: ["Family", "Adventure"]
    },
    {
      id: 32,
      title: "Kids Quest",
      image: "https://images.unsplash.com/photo-1686477771368-c6a9e9e248b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "85",
      year: "2025",
      duration: "1h 28m",
      description: "Join a group of young heroes on an unforgettable quest.",
      genres: ["Family", "Fantasy"]
    },
    {
      id: 33,
      title: "Together Forever",
      image: "https://images.unsplash.com/photo-1686477771368-c6a9e9e248b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "88",
      year: "2026",
      duration: "1h 35m",
      description: "A touching story about the bonds that hold families together.",
      genres: ["Family", "Drama"]
    },
    {
      id: 34,
      title: "Magic Kingdom",
      image: "https://images.unsplash.com/photo-1758484102803-760525a244d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "90",
      year: "2025",
      duration: "1h 40m",
      description: "Enter a magical world where anything is possible in this enchanting family film.",
      genres: ["Family", "Fantasy", "Adventure"]
    },
    {
      id: 35,
      title: "Young Heroes",
      image: "https://images.unsplash.com/photo-1686477771368-c6a9e9e248b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "86",
      year: "2025",
      duration: "1h 30m",
      description: "Kids discover their true potential in this inspiring adventure.",
      genres: ["Family", "Adventure"]
    }
  ];

  const animeMovies: Movie[] = [
    {
      id: 36,
      title: "Spirit Warriors",
      image: "https://images.unsplash.com/photo-1764730282820-f9cdd430b1c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "95",
      year: "2025",
      duration: "2h",
      description: "An epic anime adventure featuring legendary warriors battling for the fate of their world.",
      genres: ["Anime", "Action", "Fantasy"]
    },
    {
      id: 37,
      title: "Tokyo Dreams",
      image: "https://images.unsplash.com/photo-1764730282820-f9cdd430b1c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "92",
      year: "2026",
      duration: "1h 50m",
      description: "A coming-of-age anime set in the bustling streets of modern Tokyo.",
      genres: ["Anime", "Drama", "Romance"]
    },
    {
      id: 38,
      title: "Dragon's Path",
      image: "https://images.unsplash.com/photo-1764730282820-f9cdd430b1c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "96",
      year: "2025",
      duration: "2h 15m",
      description: "Follow a young hero's journey to master ancient powers and save their realm.",
      genres: ["Anime", "Fantasy", "Adventure"]
    },
    {
      id: 39,
      title: "Cyber City",
      image: "https://images.unsplash.com/photo-1764730282820-f9cdd430b1c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "93",
      year: "2026",
      duration: "1h 55m",
      description: "Futuristic anime thriller set in a dystopian cyberpunk metropolis.",
      genres: ["Anime", "Sci-Fi", "Thriller"]
    },
    {
      id: 40,
      title: "Mystic Guardians",
      image: "https://images.unsplash.com/photo-1764730282820-f9cdd430b1c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "94",
      year: "2025",
      duration: "2h 5m",
      description: "Magical anime adventure with stunning visuals and an unforgettable story.",
      genres: ["Anime", "Fantasy", "Action"]
    }
  ];

  const sportsMovies: Movie[] = [
    {
      id: 41,
      title: "Championship Dreams",
      image: "https://images.unsplash.com/photo-1639843091936-bb5fca7b5684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "89",
      year: "2025",
      duration: "2h",
      description: "An underdog team fights their way to the championship in this inspiring sports drama.",
      genres: ["Sports", "Drama"]
    },
    {
      id: 42,
      title: "The Athlete",
      image: "https://images.unsplash.com/photo-1639843091936-bb5fca7b5684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "87",
      year: "2026",
      duration: "1h 55m",
      description: "The inspiring true story of an athlete who overcame incredible odds.",
      genres: ["Sports", "Biography", "Drama"]
    },
    {
      id: 43,
      title: "Victory Lane",
      image: "https://images.unsplash.com/photo-1639843091936-bb5fca7b5684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "88",
      year: "2025",
      duration: "2h 5m",
      description: "High-speed racing action and personal triumph collide in this thrilling sports film.",
      genres: ["Sports", "Action", "Drama"]
    },
    {
      id: 44,
      title: "Team Spirit",
      image: "https://images.unsplash.com/photo-1639843091936-bb5fca7b5684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "85",
      year: "2025",
      duration: "1h 50m",
      description: "A heartwarming story about teamwork, dedication, and the love of the game.",
      genres: ["Sports", "Family"]
    },
    {
      id: 45,
      title: "Final Match",
      image: "https://images.unsplash.com/photo-1639843091936-bb5fca7b5684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "90",
      year: "2026",
      duration: "2h 10m",
      description: "Everything comes down to one final match in this intense sports thriller.",
      genres: ["Sports", "Thriller"]
    }
  ];

  const musicals: Movie[] = [
    {
      id: 46,
      title: "Stage Lights",
      image: "https://images.unsplash.com/photo-1767969457898-51d5e9cf81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "91",
      year: "2025",
      duration: "2h 8m",
      description: "A dazzling musical spectacular featuring show-stopping performances and unforgettable songs.",
      genres: ["Musical", "Drama"]
    },
    {
      id: 47,
      title: "Broadway Dreams",
      image: "https://images.unsplash.com/photo-1767969457898-51d5e9cf81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "89",
      year: "2026",
      duration: "2h",
      description: "Follow aspiring performers as they chase their dreams on the Great White Way.",
      genres: ["Musical", "Drama"]
    },
    {
      id: 48,
      title: "Rhythm & Soul",
      image: "https://images.unsplash.com/photo-1767969457898-51d5e9cf81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "92",
      year: "2025",
      duration: "1h 58m",
      description: "A celebration of music, dance, and the power of artistic expression.",
      genres: ["Musical", "Biography"]
    },
    {
      id: 49,
      title: "The Show Must Go On",
      image: "https://images.unsplash.com/photo-1767969457898-51d5e9cf81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "88",
      year: "2025",
      duration: "2h 5m",
      description: "Against all odds, a theater company puts on the performance of a lifetime.",
      genres: ["Musical", "Comedy", "Drama"]
    },
    {
      id: 50,
      title: "Concert Night",
      image: "https://images.unsplash.com/photo-1767969457898-51d5e9cf81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      rating: "86",
      year: "2026",
      duration: "1h 52m",
      description: "Experience the magic of live performance in this electrifying musical film.",
      genres: ["Musical", "Music"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navigation />
      
      <HeroSection 
        backgroundImage="https://images.unsplash.com/photo-1659990589628-d1f999129056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
        title="The Awakening"
        description="When ancient forces threaten to tear the world apart, a reluctant hero must embrace their destiny and unite unlikely allies in an epic battle between light and darkness. Journey through breathtaking landscapes and face impossible odds in this cinematic masterpiece that redefines the fantasy genre."
        genres={["Epic", "Fantasy", "Adventure"]}
      />

      <div className="relative -mt-32 z-10">
        <MovieRow 
          title="Trending Now" 
          movies={trendingMovies}
          onSelectMovie={setSelectedMovie}
        />
        
        <MovieRow 
          title="Action Movies" 
          movies={actionMovies}
          onSelectMovie={setSelectedMovie}
        />
        
        <MovieRow 
          title="Horror" 
          movies={horrorMovies}
          onSelectMovie={setSelectedMovie}
        />
        
        <MovieRow 
          title="Documentaries" 
          movies={documentaries}
          onSelectMovie={setSelectedMovie}
        />
        
        <MovieRow 
          title="Comedies" 
          movies={comedies}
          onSelectMovie={setSelectedMovie}
        />
        
        <MovieRow 
          title="Dramas" 
          movies={dramas}
          onSelectMovie={setSelectedMovie}
        />
        
        <MovieRow 
          title="Family Movies" 
          movies={familyMovies}
          onSelectMovie={setSelectedMovie}
        />
        
        <MovieRow 
          title="Anime" 
          movies={animeMovies}
          onSelectMovie={setSelectedMovie}
        />
        
        <MovieRow 
          title="Sports" 
          movies={sportsMovies}
          onSelectMovie={setSelectedMovie}
        />
        
        <MovieRow 
          title="Musicals" 
          movies={musicals}
          onSelectMovie={setSelectedMovie}
        />
      </div>

      <Footer />

      <MovieModal 
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
