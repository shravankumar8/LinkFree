import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "./Animations";
import { supabase } from "../supabaseClient";
import { useWindowSize } from "react-use"; 
import { Bounce, ToastContainer, toast } from "react-toastify";
import ReactDesignRain from "../components/ui/Reactconfeti"
const Waitlist: React.FC = () => {
  const [showRain, setShowRain] = useState(false);

  const [email, setEmail] = useState("");
  const [isWaitListSuccess, SetisWaitListSuccess] = useState(Boolean);
  useEffect(() => {
    if (isWaitListSuccess) {
      // Show the rain when isWaitListSuccess becomes true
      setShowRain(true);

      // Set a timer to hide it after 5 seconds (5000 milliseconds)
      const timer = setTimeout(() => {
        setShowRain(false);
      }, 5000);

      // Cleanup function to clear the timer if isWaitListSuccess changes or component unmounts
      return () => clearTimeout(timer);
    }
  }, [isWaitListSuccess]);
  const JoinedWaitlist = () => {
    SetisWaitListSuccess(true);
    return toast.success("You have been successfully added to the waitlist!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const waitListError = () => {
    return toast.error("🦄 some internal error please try later ", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const addToWaitlist = async (email) => {
    const { data, error } = await supabase.from("waitlist").insert([{ email }]);

    if (error) {
      console.error("Error inserting data:", error.message);
      waitListError();
    } else {
      
      JoinedWaitlist();
      console.log("Data inserted successfully:", data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addToWaitlist(email);
    setEmail("");
  };

  return (
    <section id="waitlist" className="py-20 bg-primary/5">
      <div className="container-tight">
      
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the <span className="text-gradient">Waitlist</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              LinkFree is coming soon! Be the first to know when we launch and
              get early access to all features.
            </p>

            <form
              id="waitlist-form"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission behavior
                JoinedWaitlist();

              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="h-11"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-primary hover:opacity-90 transition-all text-white button-shine px-4 py-2 rounded-lg duration-150 active:scale-95 hover:scale-105"
              >
                Join Waitlist
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              We'll never share your email with anyone else.
            </p>
          </div>
        </FadeIn>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {isWaitListSuccess ?   <ReactDesignRain /> :<></>}
    </section>
  );
};

export default Waitlist;
