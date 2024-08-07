import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Camera, Sun, Moon, Sparkles, ArrowDown } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [catFact, setCatFact] = useState("");
  const [generatedName, setGeneratedName] = useState("");
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/False_orca_size.svg/1200px-False_orca_size.svg.png",
  ];

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = useCallback(() => {
    setLikeCount((prev) => prev + 1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }, []);

  const generateCatName = () => {
    const prefixes = ["Mr.", "Mrs.", "Sir", "Lady", "Captain", "Professor"];
    const names = ["Whiskers", "Mittens", "Socks", "Fluffy", "Luna", "Oreo", "Simba", "Nala", "Leo", "Milo"];
    const suffixes = ["Jr.", "III", "the Great", "von Purrington", "Pawsome"];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    setGeneratedName(`${randomPrefix} ${randomName} ${randomSuffix}`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-purple-900 text-white' : 'bg-gradient-to-b from-purple-100 to-pink-100'}`}>
      <motion.header 
        className="bg-purple-600 text-white py-24 relative overflow-hidden"
        style={{ y }}
      >
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Feline Fascination
          </motion.h1>
          <motion.p 
            className="text-3xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Discover the Wonderful World of Cats
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-100">
              Explore Now
            </Button>
          </motion.div>
        </div>
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2
          }}
        />
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          style={{ opacity }}
        >
          <ArrowDown className="w-8 h-8 animate-bounce" />
        </motion.div>
      </motion.header>

      <main className="container mx-auto py-16 px-4">
        <div className="flex justify-end mb-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {theme === "light" ? "Dark" : "Light"} Mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-3xl">
                <Camera className="w-8 h-8" /> Cat Photo Gallery
              </CardTitle>
              <CardDescription className="text-lg">Swipe through adorable cat photos</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full max-w-md mx-auto">
                <CarouselContent>
                  {catImages.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <img 
                              src={src} 
                              alt={`Cat ${index + 1}`} 
                              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col items-center gap-4 mb-16">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleLike}
              className="flex items-center gap-2 bg-white hover:bg-pink-100 transition-colors text-lg"
            >
              <Heart className="w-6 h-6 text-red-500" /> Like this cat! ({likeCount})
            </Button>
            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Alert className="bg-green-100 border-green-500">
                    <Paw className="h-5 w-5 text-green-500" />
                    <AlertTitle className="text-green-700">Meow-velous!</AlertTitle>
                    <AlertDescription className="text-green-600">
                      This cat appreciates your love!
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Info className="w-6 h-6" /> Cat Fact of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-lg italic">{catFact || "Loading..."}</p>
              <Button 
                onClick={fetchCatFact} 
                disabled={isLoading}
                className="relative"
              >
                {isLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <>Get New Fact</>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Tabs defaultValue="characteristics" className="mb-16">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Info className="w-6 h-6" /> Characteristics of Cats
                  </CardTitle>
                  <CardDescription className="text-lg">What makes cats unique?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    {[
                      { trait: "Independence", level: 90 },
                      { trait: "Hunting Skills", level: 85 },
                      { trait: "Flexibility", level: 95 },
                      { trait: "Night Vision", level: 80 },
                      { trait: "Communication", level: 75 },
                    ].map((item, index) => (
                      <li key={index} className="flex flex-col">
                        <span className="font-medium mb-2 text-lg">{item.trait}</span>
                        <div className="flex items-center gap-4">
                          <Progress value={item.level} className="h-3 flex-grow" />
                          <span className="font-bold">{item.level}%</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Cat className="w-6 h-6" /> Popular Cat Breeds
                  </CardTitle>
                  <CardDescription className="text-lg">Some well-known cat breeds around the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-6">
                    {["Siamese", "Persian", "Maine Coon", "Bengal", "Scottish Fold"].map((breed, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Paw className="w-5 h-5 text-purple-500" />
                        <span className="text-lg">{breed}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="w-6 h-6" /> Cat Name Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-2xl font-bold text-center">
                {generatedName ? (
                  <motion.span
                    key={generatedName}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {generatedName}
                  </motion.span>
                ) : (
                  "Click to generate a fancy cat name!"
                )}
              </p>
              <div className="flex justify-center">
                <Button onClick={generateCatName} size="lg" className="text-lg">
                  Generate Name
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <footer className="bg-purple-600 text-white py-8 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg">© 2024 Feline Fascination. All rights reserved.</p>
          <p className="mt-2">Created with 😺 by cat lovers, for cat lovers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
