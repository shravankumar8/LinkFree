
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "./Animations";

const Waitlist: React.FC = () => {
  return (
    <section id="waitlist" className="py-20 bg-primary/5">
      <div className="container-tight">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the <span className="text-gradient">Waitlist</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              LinkFree is coming soon! Be the first to know when we launch and get early access to all features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-11"
              />
              <Button 
                className="bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
              >
                Join Waitlist
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              We'll never share your email with anyone else.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Waitlist;
