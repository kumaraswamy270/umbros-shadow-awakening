
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimeLayout from '@/components/AnimeLayout';

// Mock story data
const featuredStories = [
  {
    id: 1,
    title: "Umbros: Shadow Awakening",
    author: "Miyazaki Haru",
    cover: "https://picsum.photos/800/400?random=1",
    excerpt: "In the aftermath of his village's destruction, Kael discovers a mysterious shadow that grants him incredible power—but at what cost?",
    chapters: 14,
    tags: ["Action", "Fantasy", "Drama"]
  },
  {
    id: 2,
    title: "The Last Samurai Princess",
    author: "Takahashi Yumiko",
    cover: "https://picsum.photos/800/400?random=2",
    excerpt: "After her clan's destruction, Princess Himari takes up her father's sword to avenge her family and restore honor to her name.",
    chapters: 22,
    tags: ["Historical", "Action", "Drama"]
  },
  {
    id: 3,
    title: "Digital Dreams",
    author: "Nakamura Ryo",
    cover: "https://picsum.photos/800/400?random=3",
    excerpt: "When players of a popular VRMMO find themselves unable to log out, the line between virtual and reality begins to blur.",
    chapters: 18,
    tags: ["Sci-Fi", "Adventure", "Mystery"]
  }
];

const popularStories = [
  {
    id: 4,
    title: "Academy of Magical Arts",
    author: "Sato Mei",
    cover: "https://picsum.photos/300/200?random=4",
    excerpt: "When ordinary Hinata discovers she has extraordinary magical abilities, she's invited to attend the prestigious Academy of Magical Arts.",
    chapters: 42,
    tags: ["Fantasy", "School", "Coming of Age"]
  },
  {
    id: 5,
    title: "Mecha Pilots: New Generation",
    author: "Yamamoto Kenji",
    cover: "https://picsum.photos/300/200?random=5",
    excerpt: "Five teenagers are selected to pilot experimental mecha units to defend Earth from an alien invasion.",
    chapters: 36,
    tags: ["Sci-Fi", "Mecha", "Action"]
  },
  {
    id: 6,
    title: "Spirits of the Forest",
    author: "Kobayashi Akiko",
    cover: "https://picsum.photos/300/200?random=6",
    excerpt: "Young priestess Sakura must journey through an ancient forest to cleanse the corrupted spirits and restore balance to nature.",
    chapters: 29,
    tags: ["Fantasy", "Supernatural", "Adventure"]
  },
  {
    id: 7,
    title: "Cooking Battle Royale",
    author: "Ikeda Takeshi",
    cover: "https://picsum.photos/300/200?random=7",
    excerpt: "Top chefs from around the world compete in an extraordinary culinary competition with unusual ingredients and impossible challenges.",
    chapters: 52,
    tags: ["Comedy", "Cooking", "Competition"]
  }
];

const AnimeStories = () => {
  return (
    <AnimeLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <BookOpen className="mr-2" /> Anime Stories
          </h1>
          <p className="text-gray-400">
            Immerse yourself in captivating anime stories and adventures
          </p>
        </div>

        <Tabs defaultValue="featured" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New Releases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured">
            <div className="space-y-8">
              {featuredStories.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden border-umbros-light bg-umbros-dark/50 backdrop-blur-lg hover:shadow-xl hover:shadow-umbros-accent/20 transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-64 md:h-auto relative">
                        <img 
                          src={story.cover} 
                          alt={story.title} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <CardTitle className="text-2xl">{story.title}</CardTitle>
                          <CardDescription>by {story.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300">{story.excerpt}</p>
                          <p className="mt-4 text-sm text-gray-400">Chapters: {story.chapters}</p>
                        </CardContent>
                        <CardFooter>
                          <div className="flex flex-wrap gap-2">
                            {story.tags.map((tag, idx) => (
                              <span 
                                key={idx}
                                className="text-xs bg-umbros-accent/20 text-umbros-accent px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularStories.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden h-full border-umbros-light bg-umbros-dark/50 backdrop-blur-lg hover:shadow-xl hover:shadow-umbros-accent/20 transition-shadow">
                    <div className="h-48 relative">
                      <img 
                        src={story.cover} 
                        alt={story.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{story.title}</CardTitle>
                      <CardDescription>by {story.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-300">{story.excerpt}</p>
                      <p className="mt-2 text-xs text-gray-400">Chapters: {story.chapters}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {story.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-umbros-accent/20 text-umbros-accent px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new">
            <div className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-16 h-16 text-gray-500 mb-4" />
              <h3 className="text-xl font-medium">New Stories Coming Soon</h3>
              <p className="text-gray-400 mt-2 text-center max-w-md">
                Our team is working on adding new exciting stories. Check back soon for updates!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AnimeLayout>
  );
};

export default AnimeStories;
