import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Camera, Sun, Moon, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [catFact, setCatFact] = useState("");
  const [generatedName, setGeneratedName] = useState("");
  const { theme, setTheme } = useTheme();

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/False_orca_size.svg/1200px-False_orca_size.svg.png",
  ];

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);

  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
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
        className="bg-purple-600 text-white py-16 relative overflow-hidden"
        style={{ y }}
      >
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Feline Fascination
          </motion.h1>
          <motion.p 
            className="text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Discover the Wonderful World of Cats
          </motion.p>
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
      </motion.header>

      <main className="container mx-auto py-12 px-4">
        <div className="flex justify-end mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" /> Cat Photo Gallery
            </CardTitle>
            <CardDescription>Swipe through adorable cat photos</CardDescription>
          </CardHeader>
          <CardContent>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {catImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img 
                            src={src} 
                            alt={`Cat ${index + 1}`} 
                            className="w-full h-full object-cover rounded-lg"
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

        <div className="flex justify-center gap-4 mb-12">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleLike}
            className="flex items-center gap-2 bg-white hover:bg-pink-100 transition-colors"
          >
            <Heart className="w-5 h-5 text-red-500" /> Like this cat! ({likeCount})
          </Button>
          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Alert>
                  <Paw className="h-4 w-4" />
                  <AlertTitle>Meow-velous!</AlertTitle>
                  <AlertDescription>
                    This cat appreciates your love!
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" /> Cat Fact of the Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{catFact}</p>
            <Button onClick={fetchCatFact}>Get New Fact</Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" /> Characteristics of Cats
                </CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { trait: "Independence", level: 90 },
                    { trait: "Hunting Skills", level: 85 },
                    { trait: "Flexibility", level: 95 },
                    { trait: "Night Vision", level: 80 },
                    { trait: "Communication", level: 75 },
                  ].map((item, index) => (
                    <li key={index} className="flex flex-col">
                      <span className="font-medium mb-1">{item.trait}</span>
                      <Progress value={item.level} className="h-2" />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cat className="w-5 h-5" /> Popular Cat Breeds
                </CardTitle>
                <CardDescription>Some well-known cat breeds around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-4">
                  {["Siamese", "Persian", "Maine Coon", "Bengal", "Scottish Fold"].map((breed, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Paw className="w-4 h-4 text-purple-500" />
                      <span>{breed}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Cat Name Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-xl font-bold">{generatedName || "Click to generate a fancy cat name!"}</p>
            <Button onClick={generateCatName}>Generate Name</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
