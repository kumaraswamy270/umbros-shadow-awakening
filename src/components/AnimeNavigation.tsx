
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Film, Image, Play, Book, LogIn, LogOut, User, Wand } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const AnimeNavigation = () => {
  const { isAuthenticated, username, logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-umbros-dark/80 backdrop-blur-lg border-b border-umbros-light"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <NavigationMenu className="py-4">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Book className="w-5 h-5 mr-2" />
                  eBooks
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <ListItem href="/ebooks" title="All eBooks" icon={Book}>
                      Browse our entire collection
                    </ListItem>
                    <ListItem href="/ebooks?category=new" title="New Releases" icon={Book}>
                      Recently added to our library
                    </ListItem>
                    <ListItem href="/ebooks?category=popular" title="Popular eBooks" icon={Book}>
                      Reader favorites
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Stories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-umbros-flame/50 to-umbros-dark p-6 no-underline outline-none focus:shadow-md"
                        to="/stories"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          Umbros: Shadow Awakening
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Discover the epic tale of Kael and the mysterious Shadow Phoenix.
                        </p>
                      </Link>
                    </li>
                    <ListItem href="/stories?category=action" title="Action" icon={BookOpen}>
                      Epic battles and adventures
                    </ListItem>
                    <ListItem href="/stories?category=romance" title="Romance" icon={BookOpen}>
                      Love stories that touch the heart
                    </ListItem>
                    <ListItem href="/stories?category=fantasy" title="Fantasy" icon={BookOpen}>
                      Magical worlds and creatures
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Film className="w-5 h-5 mr-2" />
                  Latest
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <ListItem href="/latest" title="Latest Episodes" icon={Play}>
                      Watch the latest episodes
                    </ListItem>
                    <ListItem href="/latest?type=season" title="New Seasons" icon={Film}>
                      Latest anime seasons
                    </ListItem>
                    <ListItem href="/latest?type=upcoming" title="Upcoming" icon={Film}>
                      Coming soon announcements
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Image className="w-5 h-5 mr-2" />
                  Gallery
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/gallery" title="Artwork" icon={Image}>
                      Official artwork and illustrations
                    </ListItem>
                    <ListItem href="/gallery?type=screenshots" title="Screenshots" icon={Film}>
                      Episode screenshots
                    </ListItem>
                    <ListItem href="/gallery?type=behind" title="Behind the Scenes" icon={BookOpen}>
                      Production artwork and sketches
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Wand className="w-5 h-5 mr-2" />
                  Generator
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <ListItem href="/generator" title="Anime Generator" icon={Wand}>
                      Create custom anime content
                    </ListItem>
                    <ListItem href="/generator?tab=text-to-image" title="Text to Image" icon={Image}>
                      Generate anime characters from descriptions
                    </ListItem>
                    <ListItem href="/generator?tab=text-to-video" title="Text to Video" icon={Film}>
                      Create anime videos from text prompts
                    </ListItem>
                    <ListItem href="/generator?tab=image-to-video" title="Image to Video" icon={Film}>
                      Convert anime images to videos
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{username}</span>
                </div>
                <Button variant="ghost" onClick={logout} className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button asChild variant="ghost" className="flex items-center gap-2">
                <Link to="/login">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ComponentType<{ className?: string }>, title: string }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-umbros-light hover:text-white focus:bg-umbros-light focus:text-white",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            <Icon className="h-5 w-5" />
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default AnimeNavigation;
