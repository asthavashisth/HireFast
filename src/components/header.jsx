import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search , setSearch] =  useSearchParams();
  useEffect(()=>{
    if(search.get('sign-in')){
      setShowSignIn(true)
    }
  },[search]);



  // Function to handle overlay click
  const handleOverlayClick = (e) => {
    if(e.target===e.currentTarget){
    setShowSignIn(false);
    setSearch({});
    } 
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="logo.jpeg" className="h-20" alt="Logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button
              variant="outline"
              className="bg-gray-500 text-white"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            <Link to="/post-job">
              <Button variant="destructive" className="bg-red-800 rounded-full">
                <PenBox size={20} className="mr-2" />
                Post a job
              </Button>
            </Link>
            <UserButton 
            appearance={{
              elements:{
                avatarBox:"w-10 h-10",
              },
            }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                    label="My Jobs"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href= "/my-jobs"
                />
                <UserButton.Link
                    label="Saved Job"
                    labelIcon={<Heart size={15} />}
                    href= "/saved-job"
                />
              </UserButton.MenuItems>

            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
            className="bg-white p-4 rounded" // Optional: Add styles to the SignIn component
          />
        </div>
      )}
    </>
  );
};

export default Header;
