import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedScene from '@/components/AnimatedScene';
import CharacterProfile from '@/components/CharacterProfile';
import VideoPlayer from '@/components/VideoPlayer';
import FlameEffect from '@/components/FlameEffect';
import AnimeNavigation from '@/components/AnimeNavigation';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Index = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Images would normally be hosted in the public folder
  const villageDestroyedImg = "/village-destroyed.jpg";
  const sanctumImg = "/obsidian-sanctum.jpg";
  const echoTestImg = "/echo-test.jpg";
  const finalSceneImg = "/final-scene.jpg";
  
  // Character images
  const kaelImg = "/kael.jpg";
  const umbrosImg = "/umbros.jpg";
  const elderImg = "/elder.jpg";

  // Scroll to the next section
  const scrollToNextSection = (index: number) => {
    setCurrentScene(index);
    const element = document.getElementById(`scene-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-umbros-dark text-white">
      <AnimeNavigation />
      
      {/* Add margin-top to account for fixed navigation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-umbros-dark">
          <div className="absolute inset-0 bg-[url('/umbros-bg.jpg')] bg-cover bg-center opacity-30"></div>
          <FlameEffect intensity="low" className="opacity-40" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative z-10 text-center max-w-3xl px-4"
        >
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={loaded ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white shadow-text"
          >
            <span className="text-umbros-flame">UMBROS:</span> Shadow Awakening
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={loaded ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-xl text-gray-300 mb-8"
          >
            When darkness rises, a lone survivor discovers the terrifying power that saved him
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={loaded ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Button 
              size="lg"
              className="bg-umbros-flame hover:bg-umbros-accent text-white rounded-full"
              onClick={() => scrollToNextSection(1)}
            >
              Watch Preview
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="animate-bounce text-gray-400 hover:text-white"
            onClick={() => scrollToNextSection(1)}
          >
            <ChevronDown size={24} />
          </Button>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Scene 1: Village Destroyed */}
        <div id="scene-1" className="mb-24">
          <AnimatedScene
            title="A Village in Flames"
            description="Kael's peaceful village is suddenly engulfed in unexplainable destruction. As flames consume everything he's ever known, he watches helplessly as his family and friends perish. When all hope seems lost, a mysterious black flame surrounds him, protecting him from the carnage."
            backgroundImage={villageDestroyedImg}
          >
            <div className="relative">
              <VideoPlayer
                videoSrc="/village-destruction.mp4"
                posterSrc={villageDestroyedImg}
                title="The Day Everything Changed"
                className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl"
              />
              <FlameEffect intensity="medium" />
            </div>
          </AnimatedScene>
        </div>

        {/* Scene 2: Obsidian Sanctum */}
        <div id="scene-2" className="mb-24">
          <AnimatedScene
            title="The Obsidian Sanctum"
            description="Orphaned and alone, Kael is discovered by members of the secretive Obsidian Sanctum—an ancient order that harnesses the power of spiritual entities known as Echoes. Sensing something unique in the boy, they bring him to their hidden fortress for training."
            backgroundImage={sanctumImg}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <CharacterProfile
                name="Kael"
                description="A village orphan with mysterious powers, haunted by his past and desperate to understand what saved him and why."
                imageSrc={kaelImg}
                type="protagonist"
              />
              <CharacterProfile
                name="Master Riven"
                description="The head elder of the Obsidian Sanctum, stern but fair. Hides dark secrets about the true nature of Echoes."
                imageSrc={elderImg}
                type="elder"
              />
              <CharacterProfile
                name="Umbros"
                description="The Shadow Phoenix, a mythical Echo thought to be merely legend, capable of immense destruction when unleashed."
                imageSrc={umbrosImg}
                type="spirit"
                className="echo-glow"
              />
            </div>
          </AnimatedScene>
        </div>

        {/* Scene 3: Echo Compatibility Test */}
        <div id="scene-3" className="mb-24">
          <AnimatedScene
            title="Awakening the Shadow"
            description="During his first Echo compatibility test, Kael unknowingly taps into a power unlike any the Sanctum has witnessed before. The elders watch in horror as the mythical Shadow Phoenix, Umbros, materializes—an entity whose emergence was prophesied to bring about catastrophe."
            backgroundImage={echoTestImg}
          >
            <div className="relative">
              <VideoPlayer
                videoSrc="/echo-test.mp4"
                posterSrc={echoTestImg}
                title="The First Awakening"
                className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl"
              />
              <FlameEffect intensity="high" className="opacity-70" />
            </div>
          </AnimatedScene>
        </div>

        {/* Scene 4: Losing Control */}
        <div id="scene-4" className="mb-16">
          <AnimatedScene
            title="Power Unleashed"
            description="As panic spreads through the Sanctum, whispers of 'cursed' and 'harbinger of doom' follow Kael. The fear and rejection trigger something within him—Umbros responds to his emotions, manifesting with increasing intensity. In the training arena, power surges uncontrollably as Kael struggles to contain the Shadow Phoenix, nearly destroying everything around him."
            backgroundImage={finalSceneImg}
          >
            <div className="text-center max-w-lg mx-auto">
              <p className="text-umbros-flame text-lg font-semibold mb-6">
                "What have we brought into our midst? The Shadow Phoenix was sealed for a reason..."
              </p>
              <Button 
                className="bg-umbros-flame hover:bg-umbros-accent text-white"
                size="lg"
              >
                Continue the Story
              </Button>
            </div>
          </AnimatedScene>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mt-20 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white shadow-text">
            The Legend of <span className="text-umbros-flame">Umbros</span> Has Just Begun
          </h2>
          <p className="text-gray-300 mb-8">
            Follow Kael's journey as he learns to control the most dangerous Echo ever known and uncovers the truth behind his village's destruction.
          </p>
          <Button 
            size="lg" 
            className="bg-umbros-accent hover:bg-umbros-flame text-white"
          >
            Watch Full Episode
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-umbros-dark border-t border-umbros-light py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            © 2025 Umbros: Shadow Awakening | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
