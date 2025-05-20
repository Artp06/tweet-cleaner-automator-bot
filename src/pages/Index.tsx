
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TwitterRetweetCleaner from "@/components/TwitterRetweetCleaner";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Twitter Retweet Cleaner
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          Automatically remove all retweets from your Twitter profile with this browser automation tool
        </p>
      </div>
      
      <Separator className="my-6" />
      
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Card className="p-6">
          <CardContent className="p-0">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Our Python script launches a browser</li>
              <li>It logs into your Twitter account</li>
              <li>Navigates to your profile</li>
              <li>Finds and removes all retweets one by one</li>
              <li>Continues until your profile is clean</li>
            </ol>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Security</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your credentials are never stored or transmitted</li>
              <li>The script runs directly on your computer</li>
              <li>The authentication process happens in a real browser</li>
              <li>No API keys or tokens are used or required</li>
            </ul>
          </CardContent>
        </Card>
        
        <div>
          <TwitterRetweetCleaner />
        </div>
      </div>
    </div>
  );
};

export default Index;
