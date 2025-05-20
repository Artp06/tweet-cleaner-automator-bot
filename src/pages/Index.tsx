
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TwitterRetweetCleaner from "@/components/TwitterRetweetCleaner";

const Index = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Twitter Retweet Cleaner
        </h1>
        <p className="text-xl text-muted-foreground text-center">
          Automatically remove all retweets from your Twitter profile
        </p>
      </div>
      
      <Separator className="my-6" />
      
      <div className="grid gap-8 mt-8">
        <TwitterRetweetCleaner />
      </div>
    </div>
  );
};

export default Index;
