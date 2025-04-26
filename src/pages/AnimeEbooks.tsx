
import React from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AnimeLayout from '@/components/AnimeLayout';

// Mock ebook data
const animeEbooks = [
  {
    id: 1,
    title: "The Shadow Phoenix Chronicles",
    author: "Miyazaki Haru",
    cover: "https://picsum.photos/300/400?random=1",
    rating: 4.8,
    categories: ["Fantasy", "Adventure"]
  },
  {
    id: 2,
    title: "Mecha Academy",
    author: "Tanaka Rei",
    cover: "https://picsum.photos/300/400?random=2",
    rating: 4.5,
    categories: ["Sci-Fi", "Action"]
  },
  {
    id: 3,
    title: "Magical School Diaries",
    author: "Suzuki Aoi",
    cover: "https://picsum.photos/300/400?random=3",
    rating: 4.7,
    categories: ["Fantasy", "Slice of Life"]
  },
  {
    id: 4,
    title: "Samurai of the Lost Kingdom",
    author: "Watanabe Kenji",
    cover: "https://picsum.photos/300/400?random=4",
    rating: 4.9,
    categories: ["Historical", "Action"]
  },
  {
    id: 5,
    title: "Yokai Adventures",
    author: "Nakamura Yuki",
    cover: "https://picsum.photos/300/400?random=5",
    rating: 4.6,
    categories: ["Fantasy", "Supernatural"]
  },
  {
    id: 6,
    title: "Neon City Hunters",
    author: "Ito Hiroshi",
    cover: "https://picsum.photos/300/400?random=6",
    rating: 4.4,
    categories: ["Cyberpunk", "Action"]
  },
];

const AnimeEbooks = () => {
  return (
    <AnimeLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Book className="mr-2" /> Anime eBooks Collection
          </h1>
          <p className="text-gray-400">
            Explore our extensive library of anime eBooks and light novels
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animeEbooks.map((ebook) => (
            <motion.div
              key={ebook.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden h-full border-umbros-light bg-umbros-dark/50 backdrop-blur-lg hover:shadow-xl hover:shadow-umbros-accent/20 transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={ebook.cover} 
                    alt={ebook.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{ebook.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-400">by {ebook.author}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(ebook.rating) ? 'text-yellow-400' : 'text-gray-600'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-400">{ebook.rating}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex flex-wrap gap-1">
                    {ebook.categories.map((category, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-umbros-accent/20 text-umbros-accent px-2 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimeLayout>
  );
};

export default AnimeEbooks;
