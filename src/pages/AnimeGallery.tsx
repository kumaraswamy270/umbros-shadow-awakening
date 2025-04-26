
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AnimeLayout from '@/components/AnimeLayout';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock gallery data
const galleryImages = [
  {
    id: 1,
    title: "Shadow Phoenix Rising",
    category: "Official Art",
    thumbnail: "https://picsum.photos/400/300?random=1",
    fullImage: "https://picsum.photos/1200/900?random=1",
    artist: "Studio Ghibli"
  },
  {
    id: 2,
    title: "Kael Training Scene",
    category: "Concept Art",
    thumbnail: "https://picsum.photos/400/300?random=2", 
    fullImage: "https://picsum.photos/1200/900?random=2",
    artist: "Miyazaki Art Team"
  },
  {
    id: 3,
    title: "The Obsidian Sanctum",
    category: "Background Art",
    thumbnail: "https://picsum.photos/400/300?random=3",
    fullImage: "https://picsum.photos/1200/900?random=3",
    artist: "Landscape Masters"
  },
  {
    id: 4,
    title: "Echo Compatibility Test",
    category: "Key Visual",
    thumbnail: "https://picsum.photos/400/300?random=4",
    fullImage: "https://picsum.photos/1200/900?random=4",
    artist: "Animation Studio"
  },
  {
    id: 5,
    title: "Elder Council",
    category: "Character Design",
    thumbnail: "https://picsum.photos/400/300?random=5",
    fullImage: "https://picsum.photos/1200/900?random=5",
    artist: "Character Design Team"
  },
  {
    id: 6,
    title: "Village in Flames",
    category: "Background Art",
    thumbnail: "https://picsum.photos/400/300?random=6",
    fullImage: "https://picsum.photos/1200/900?random=6",
    artist: "Fire Effects Studio"
  },
  {
    id: 7,
    title: "Umbros Manifestation",
    category: "Key Visual",
    thumbnail: "https://picsum.photos/400/300?random=7",
    fullImage: "https://picsum.photos/1200/900?random=7",
    artist: "Special Effects Team"
  },
  {
    id: 8,
    title: "Final Battle Sketch",
    category: "Concept Art",
    thumbnail: "https://picsum.photos/400/300?random=8",
    fullImage: "https://picsum.photos/1200/900?random=8",
    artist: "Action Scene Artists"
  },
];

const AnimeGallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | typeof galleryImages[0]>(null);
  const [filter, setFilter] = useState("All");

  const filteredImages = filter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);
  
  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];

  return (
    <AnimeLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Image className="mr-2" /> Anime Gallery
          </h1>
          <p className="text-gray-400">
            Browse our collection of beautiful anime artwork
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map(category => (
            <Button 
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              layoutId={`image-${image.id}`}
              onClick={() => setSelectedImage(image)}
            >
              <Card className="overflow-hidden cursor-pointer border-umbros-light bg-umbros-dark/50 backdrop-blur-lg hover:shadow-xl hover:shadow-umbros-accent/20 transition-shadow">
                <div className="h-48 relative">
                  <img 
                    src={image.thumbnail} 
                    alt={image.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm">{image.title}</h3>
                  <p className="text-xs text-gray-400">{image.category}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-umbros-dark/95 backdrop-blur-lg border-umbros-light overflow-hidden">
            <DialogClose className="absolute right-4 top-4 z-10" />
            <div className="relative">
              <Carousel>
                <CarouselContent>
                  {galleryImages.map((image) => (
                    <CarouselItem key={image.id}>
                      <div className="p-1">
                        <div className="aspect-[16/9] relative bg-umbros-dark/60">
                          <img 
                            src={image.fullImage} 
                            alt={image.title} 
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h2 className="text-xl font-semibold">{image.title}</h2>
                          <p className="text-sm text-gray-400">Artist: {image.artist}</p>
                          <p className="text-xs text-gray-500 mt-1">{image.category}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AnimeLayout>
  );
};

export default AnimeGallery;
