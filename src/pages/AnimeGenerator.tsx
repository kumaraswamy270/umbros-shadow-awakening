
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from 'framer-motion';
import { Wand, Image, Film, ArrowRight } from 'lucide-react';
import { toast } from "sonner";
import AnimeLayout from '@/components/AnimeLayout';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Your prompt must be at least 10 characters.",
  }),
  style: z.enum(["anime", "manga", "chibi", "mecha"]),
});

const videoFormSchema = z.object({
  prompt: z.string().min(10, {
    message: "Your prompt must be at least 10 characters.",
  }),
  duration: z.enum(["short", "medium", "long"]),
});

const imageToVideoFormSchema = z.object({
  prompt: z.string().optional(),
  duration: z.enum(["short", "medium", "long"]),
});

const AnimeGenerator = () => {
  const [activeTab, setActiveTab] = useState("text-to-image");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Text to Image Form
  const textToImageForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      style: "anime",
    },
  });

  // Text to Video Form
  const textToVideoForm = useForm<z.infer<typeof videoFormSchema>>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      prompt: "",
      duration: "short",
    },
  });

  // Image to Video Form
  const imageToVideoForm = useForm<z.infer<typeof imageToVideoFormSchema>>({
    resolver: zodResolver(imageToVideoFormSchema),
    defaultValues: {
      prompt: "",
      duration: "short",
    },
  });

  // Handle form submissions
  const handleTextToImageSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setGeneratedImage(null);
    
    try {
      // In a real application, this would call an API endpoint
      console.log("Generating anime image with:", values);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demonstration, we'll use a placeholder anime image
      const demoImages = [
        "/anime-character-1.jpg",
        "/anime-character-2.jpg",
        "/anime-character-3.jpg"
      ];
      setGeneratedImage(demoImages[Math.floor(Math.random() * demoImages.length)]);
      toast.success("Your anime character has been generated!");
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTextToVideoSubmit = async (values: z.infer<typeof videoFormSchema>) => {
    setIsGenerating(true);
    setGeneratedVideo(null);
    
    try {
      console.log("Generating anime video with:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Demo video URL (in a real app, this would come from your video generation API)
      setGeneratedVideo("/anime-video-sample.mp4");
      toast.success("Your anime video has been generated!");
    } catch (error) {
      toast.error("Failed to generate video. Please try again.");
      console.error("Error generating video:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageToVideoSubmit = async (values: z.infer<typeof imageToVideoFormSchema>) => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }
    
    setIsGenerating(true);
    setGeneratedVideo(null);
    
    try {
      console.log("Generating video from image with:", { ...values, image: selectedImage.name });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Demo video URL
      setGeneratedVideo("/anime-video-sample.mp4");
      toast.success("Your anime video has been generated from the image!");
    } catch (error) {
      toast.error("Failed to generate video from image. Please try again.");
      console.error("Error generating video:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        toast.success(`Image ${file.name} selected`);
      } else {
        toast.error("Please select an image file");
      }
    }
  };

  return (
    <AnimeLayout>
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-umbros-flame to-purple-400 bg-clip-text text-transparent mb-4">
            Anime Generator Studio
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create stunning anime characters, scenes, and videos with AI-powered generators
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="text-to-image" className="flex items-center gap-2">
              <Wand className="w-4 h-4" />
              <span>Text to Image</span>
            </TabsTrigger>
            <TabsTrigger value="text-to-video" className="flex items-center gap-2">
              <Film className="w-4 h-4" />
              <span>Text to Video</span>
            </TabsTrigger>
            <TabsTrigger value="image-to-video" className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              <span>Image to Video</span>
            </TabsTrigger>
          </TabsList>

          {/* Text to Image Content */}
          <TabsContent value="text-to-image">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Create Anime Character</CardTitle>
                  <CardDescription>
                    Describe the anime character you want to create
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...textToImageForm}>
                    <form onSubmit={textToImageForm.handleSubmit(handleTextToImageSubmit)} className="space-y-6">
                      <FormField
                        control={textToImageForm.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Character Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your anime character (e.g., 'A female character with long blue hair, wearing a school uniform, with cat ears')"
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Be detailed about appearance, clothing, and style
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={textToImageForm.control}
                        name="style"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Anime Style</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div>
                                  <RadioGroupItem value="anime" id="anime" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="anime"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Standard Anime
                                  </FormLabel>
                                </div>
                                
                                <div>
                                  <RadioGroupItem value="manga" id="manga" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="manga"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Manga Style
                                  </FormLabel>
                                </div>
                                
                                <div>
                                  <RadioGroupItem value="chibi" id="chibi" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="chibi"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Chibi
                                  </FormLabel>
                                </div>
                                
                                <div>
                                  <RadioGroupItem value="mecha" id="mecha" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="mecha"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Mecha
                                  </FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isGenerating}
                      >
                        {isGenerating ? "Generating..." : "Generate Anime Character"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Generated Character</CardTitle>
                  <CardDescription>
                    Your anime character will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  {isGenerating ? (
                    <div className="text-center py-12">
                      <div className="animate-pulse mb-4">
                        <Wand className="mx-auto h-12 w-12 text-umbros-flame" />
                      </div>
                      <p className="text-gray-400">Creating your anime character...</p>
                    </div>
                  ) : generatedImage ? (
                    <div className="text-center">
                      <img 
                        src={generatedImage} 
                        alt="Generated anime character" 
                        className="max-w-full rounded-lg shadow-lg mx-auto"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Image className="mx-auto h-12 w-12 opacity-30 mb-4" />
                      <p>Your character will appear here</p>
                    </div>
                  )}
                </CardContent>
                {generatedImage && (
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.open(generatedImage, '_blank')}>
                      Download Image
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Text to Video Content */}
          <TabsContent value="text-to-video">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Create Anime Video</CardTitle>
                  <CardDescription>
                    Describe the anime video scene you want to generate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...textToVideoForm}>
                    <form onSubmit={textToVideoForm.handleSubmit(handleTextToVideoSubmit)} className="space-y-6">
                      <FormField
                        control={textToVideoForm.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the anime scene (e.g., 'A ninja character running through a futuristic Tokyo cityscape at night with neon lights')"
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Describe the scene, characters, actions and setting
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={textToVideoForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video Duration</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-3 gap-4"
                              >
                                <div>
                                  <RadioGroupItem value="short" id="short" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="short"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Short (5s)
                                  </FormLabel>
                                </div>
                                
                                <div>
                                  <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="medium"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Medium (10s)
                                  </FormLabel>
                                </div>
                                
                                <div>
                                  <RadioGroupItem value="long" id="long" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="long"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Long (15s)
                                  </FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isGenerating}
                      >
                        {isGenerating ? "Generating Video..." : "Generate Anime Video"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Generated Video</CardTitle>
                  <CardDescription>
                    Your anime video will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center p-4">
                  {isGenerating ? (
                    <div className="text-center py-12">
                      <div className="animate-pulse mb-4">
                        <Film className="mx-auto h-12 w-12 text-umbros-flame" />
                      </div>
                      <p className="text-gray-400">Creating your anime video...</p>
                    </div>
                  ) : generatedVideo ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <video 
                        src={generatedVideo} 
                        className="max-w-full max-h-full rounded-lg shadow-lg" 
                        controls
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Film className="mx-auto h-12 w-12 opacity-30 mb-4" />
                      <p>Your video will appear here</p>
                    </div>
                  )}
                </CardContent>
                {generatedVideo && (
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.open(generatedVideo, '_blank')}>
                      Download Video
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Image to Video Content */}
          <TabsContent value="image-to-video">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Image to Video</CardTitle>
                  <CardDescription>
                    Upload an anime image and convert it into a video
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...imageToVideoForm}>
                    <form onSubmit={imageToVideoForm.handleSubmit(handleImageToVideoSubmit)} className="space-y-6">
                      <div className="mb-6">
                        <FormLabel className="block mb-2">Upload Anime Image</FormLabel>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-umbros-dark border-gray-600 hover:border-umbros-flame"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Image className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-400">PNG, JPG or WebP (MAX. 10MB)</p>
                            </div>
                            <Input
                              id="image-upload"
                              type="file"
                              className="hidden"
                              onChange={handleImageUpload}
                              accept="image/*"
                            />
                          </label>
                        </div>
                        {selectedImage && (
                          <div className="mt-4 text-sm text-gray-400">
                            Selected: {selectedImage.name}
                          </div>
                        )}
                      </div>

                      <FormField
                        control={imageToVideoForm.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Animation Description (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe how the image should be animated (e.g., 'Zoom in slowly on the character's face')"
                                className="min-h-[80px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Optional guidance for the animation
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={imageToVideoForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video Duration</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-3 gap-4"
                              >
                                <div>
                                  <RadioGroupItem value="short" id="img-short" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="img-short"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Short (5s)
                                  </FormLabel>
                                </div>
                                
                                <div>
                                  <RadioGroupItem value="medium" id="img-medium" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="img-medium"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Medium (10s)
                                  </FormLabel>
                                </div>
                                
                                <div>
                                  <RadioGroupItem value="long" id="img-long" className="peer sr-only" />
                                  <FormLabel
                                    htmlFor="img-long"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-umbros-dark p-4 hover:bg-umbros-light hover:border-umbros-light peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    Long (15s)
                                  </FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isGenerating || !selectedImage}
                      >
                        {isGenerating ? "Generating Video..." : "Convert Image to Video"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Generated Video</CardTitle>
                  <CardDescription>
                    Your anime video animation will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center p-4">
                  {isGenerating ? (
                    <div className="text-center py-12">
                      <div className="animate-pulse mb-4">
                        <Film className="mx-auto h-12 w-12 text-umbros-flame" />
                      </div>
                      <p className="text-gray-400">Animating your image...</p>
                    </div>
                  ) : generatedVideo ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <video 
                        src={generatedVideo} 
                        className="max-w-full max-h-full rounded-lg shadow-lg" 
                        controls
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Film className="mx-auto h-12 w-12 opacity-30 mb-4" />
                      <p>Your video will appear here</p>
                    </div>
                  )}
                </CardContent>
                {generatedVideo && (
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.open(generatedVideo, '_blank')}>
                      Download Video
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-20 mb-10 px-4 py-8 rounded-lg bg-umbros-dark/50 border border-umbros-light">
          <h2 className="text-xl font-bold mb-4 text-center">About Anime Generator Studio</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Wand className="w-8 h-8 mx-auto mb-3 text-umbros-flame" />
              <h3 className="font-bold mb-2">Text to Image</h3>
              <p className="text-sm text-gray-400">Create stunning anime characters from textual descriptions</p>
            </div>
            <div>
              <Film className="w-8 h-8 mx-auto mb-3 text-umbros-flame" />
              <h3 className="font-bold mb-2">Text to Video</h3>
              <p className="text-sm text-gray-400">Generate dynamic anime scenes from your creative prompts</p>
            </div>
            <div>
              <ArrowRight className="w-8 h-8 mx-auto mb-3 text-umbros-flame" />
              <h3 className="font-bold mb-2">Image to Video</h3>
              <p className="text-sm text-gray-400">Bring your static anime images to life with animation</p>
            </div>
          </div>
        </div>
      </div>
    </AnimeLayout>
  );
};

export default AnimeGenerator;
