
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const TwitterRetweetCleaner = () => {
  const [twitterId, setTwitterId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Here we would trigger the Python script
    // For now, we just simulate a response
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Started removing retweets for @${twitterId}. Check the terminal for progress.`,
      });
      setLoading(false);
    }, 1500);
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
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Remove Retweets"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
        <p>Note: This will trigger the Python script in the terminal.</p>
        <p>Make sure you have set up the environment as described in the README.</p>
      </CardFooter>
    </Card>
  );
};

export default TwitterRetweetCleaner;
