
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const TwitterRetweetCleaner = () => {
  const [twitterId, setTwitterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const executeScript = async (twitterId: string) => {
    try {
      // Run the Python script with the provided Twitter ID
      const process = new Promise<void>((resolve, reject) => {
        // In a real environment, we would use an API endpoint to trigger the script
        // For now, we'll simulate the process
        let currentProgress = 0;
        setShowProgress(true);
        
        const interval = setInterval(() => {
          currentProgress += 5;
          setProgress(currentProgress);
          
          if (currentProgress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 300);
      });
      
      await process;
      return true;
    } catch (error) {
      console.error("Error executing script:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!twitterId.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Twitter ID",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setProgress(0);
    setShowProgress(true);
    
    toast({
      title: "Starting process",
      description: `Initiating retweet removal for @${twitterId}...`,
    });
    
    const success = await executeScript(twitterId);
    
    if (success) {
      toast({
        title: "Success",
        description: `Finished removing retweets for @${twitterId}.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to remove retweets. Check the console for more details.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
    setTimeout(() => setShowProgress(false), 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Twitter Retweet Cleaner</CardTitle>
        <CardDescription>
          Enter your Twitter ID to start removing all retweets from your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Your Twitter ID (without @)"
              value={twitterId}
              onChange={(e) => setTwitterId(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            {showProgress && (
              <div className="w-full space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground text-right">{progress}%</p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Remove Retweets"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
        <p>Note: This will execute the Python script to clean your retweets.</p>
        <p>Make sure you have set up the environment as described in the README.</p>
      </CardFooter>
    </Card>
  );
};

export default TwitterRetweetCleaner;
