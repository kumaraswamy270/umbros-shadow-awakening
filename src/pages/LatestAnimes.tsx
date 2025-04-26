
import React from 'react';
import { motion } from 'framer-motion';
import { Film, Play } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimeLayout from '@/components/AnimeLayout';

// Mock anime data
const latestAnimes = [
  {
    id: 1,
    title: "Shadow Phoenix Chronicles",
    episode: 14,
    thumbnail: "https://picsum.photos/600/340?random=1",
    releaseDate: "Today",
    duration: "24 min",
    isNew: true
  },
  {
    id: 2,
    title: "Mecha Warrior Academy",
    episode: 22,
    thumbnail: "https://picsum.photos/600/340?random=2",
    releaseDate: "Yesterday",
    duration: "24 min",
    isNew: true
  },
  {
    id: 3,
    title: "Magical Cooking Contest",
    episode: 8,
    thumbnail: "https://picsum.photos/600/340?random=3",
    releaseDate: "2 days ago",
    duration: "24 min",
    isNew: true
  },
  {
    id: 4,
    title: "Samurai Legacy",
    episode: 41,
    thumbnail: "https://picsum.photos/600/340?random=4",
    releaseDate: "3 days ago",
    duration: "24 min",
    isNew: false
  },
  {
    id: 5,
    title: "Digital Dreamers",
    episode: 16,
    thumbnail: "https://picsum.photos/600/340?random=5",
    releaseDate: "5 days ago",
    duration: "24 min",
    isNew: false
  },
  {
    id: 6,
    title: "Academy of Heroes",
    episode: 35,
    thumbnail: "https://picsum.photos/600/340?random=6",
    releaseDate: "1 week ago",
    duration: "24 min",
    isNew: false
  }
];

const upcomingAnimes = [
  {
    id: 101,
    title: "Dragon Kingdom",
    season: "New Series",
    thumbnail: "https://picsum.photos/600/340?random=7",
    releaseDate: "Coming next week",
    genre: "Fantasy, Adventure"
  },
  {
    id: 102,
    title: "Cyber Detectives",
    season: "Season 2",
    thumbnail: "https://picsum.photos/600/340?random=8",
    releaseDate: "Coming in 2 weeks",
    genre: "Mystery, Sci-Fi"
  }
];

const LatestAnimes = () => {
  return (
    <AnimeLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Film className="mr-2" /> Latest Episodes
          </h1>
          <p className="text-gray-400">
            Watch the newest anime episodes as soon as they release
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {latestAnimes.map((anime) => (
            <motion.div
              key={anime.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-umbros-light bg-umbros-dark/50 backdrop-blur-lg hover:shadow-xl hover:shadow-umbros-accent/20 transition-shadow">
                <div className="relative h-40">
                  <img 
                    src={anime.thumbnail} 
                    alt={anime.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-umbros-dark to-transparent"></div>
                  {anime.isNew && (
                    <Badge className="absolute top-2 right-2 bg-umbros-flame text-white">
                      NEW
                    </Badge>
                  )}
                  <Button variant="ghost" size="icon" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full w-12 h-12">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{anime.title} - Ep. {anime.episode}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2 pt-0">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{anime.duration}</span>
                    <span>{anime.releaseDate}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" size="sm" className="w-full">
                    Watch Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-gray-400">
            Upcoming anime releases to look forward to
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingAnimes.map((anime) => (
            <motion.div
              key={anime.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-umbros-light bg-umbros-dark/50 backdrop-blur-lg hover:shadow-xl hover:shadow-umbros-accent/20 transition-shadow">
                <div className="md:flex">
                  <div className="md:w-2/5 h-40 relative">
                    <img 
                      src={anime.thumbnail} 
                      alt={anime.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-umbros-dark/80 hidden md:block"></div>
                    <Badge className="absolute top-2 left-2 bg-umbros-accent text-white">
                      {anime.season}
                    </Badge>
                  </div>
                  <div className="md:w-3/5 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{anime.title}</h3>
                      <p className="text-sm text-gray-400">{anime.genre}</p>
                      <p className="text-xs text-umbros-flame mt-2">{anime.releaseDate}</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimeLayout>
  );
};

export default LatestAnimes;
