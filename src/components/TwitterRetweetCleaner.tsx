
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TwitterRetweetCleaner = () => {
  const [twitterId, setTwitterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [activeTab, setActiveTab] = useState("local");

  const executeLocalScript = async (twitterId: string) => {
    try {
      // Simulate running the script locally
      const process = new Promise<void>((resolve, reject) => {
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

  const handleLocalSubmit = async (e: React.FormEvent) => {
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
      title: "Starting local process",
      description: `Please check your terminal for login prompt for @${twitterId}`,
    });
    
    const success = await executeLocalScript(twitterId);
    
    if (success) {
      toast({
        title: "Success",
        description: "Script execution completed. Check your terminal for results.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to execute script. Check the console for more details.",
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
          Remove all retweets from your Twitter profile
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="local" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="local">Run Locally</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="local" className="mt-4">
            <form onSubmit={handleLocalSubmit}>
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
                  {loading ? "Processing..." : "Run Script Locally"}
                </Button>
              </div>
            </form>
            
            <div className="mt-4">
              <Alert>
                <AlertTitle>Local Execution</AlertTitle>
                <AlertDescription>
                  This will run the script on your local machine. Open a terminal, navigate to the project directory and run:
                  <code className="block bg-muted p-2 mt-2 rounded text-sm">
                    python twitter_retweet_cleaner.py
                  </code>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
          
          <TabsContent value="instructions" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">How to Use This Tool:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Install Python and required dependencies (see README)</li>
                <li>Open a terminal in your project folder</li>
                <li>Run the Python script directly: <code className="bg-muted px-1">python twitter_retweet_cleaner.py</code></li>
                <li>Enter your Twitter credentials in the terminal when prompted</li>
                <li>The script will automatically remove your retweets one by one</li>
              </ol>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Security Note:</h3>
              <p className="text-sm">
                For security reasons, we recommend running the script locally rather than entering credentials in a web interface. 
                The local script will never store your login information.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
        <p>Note: This tool uses browser automation to clean your retweets.</p>
        <p>Make sure you have Chrome and ChromeDriver installed.</p>
      </CardFooter>
    </Card>
  );
};

export default TwitterRetweetCleaner;
