import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Camera } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="bg-purple-600 text-white py-16">
        <div className="container mx-auto text-center">
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
      </header>

      <main className="container mx-auto py-12 px-4">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            src={catImages[currentImageIndex]}
            alt="A cute cat" 
            className="mx-auto object-cover w-full h-[500px] rounded-lg mb-12 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="flex justify-center mb-12">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleLike}
            className="flex items-center gap-2 bg-white hover:bg-pink-100 transition-colors"
          >
            <Heart className="w-5 h-5 text-red-500" /> Like this cat! ({likeCount})
          </Button>
        </div>

        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="mb-8"
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
              <Camera className="w-5 h-5" /> Cat Photo Gallery
            </CardTitle>
            <CardDescription>Swipe through adorable cat photos</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 overflow-x-auto py-4">
            {catImages.map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt={`Cat ${index + 1}`} 
                className="w-64 h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
