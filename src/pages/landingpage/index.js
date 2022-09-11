import React from "react";
import Header from "./header";

const LandingPage = () =>{
    return(
        <div className="w-ful h-screen flex flex-col items-center justify-between">
            <Header/>
            <p>Landing Page</p>
            
            {/* Footer */}
            <div className="w-full flex items-center justify-center poppins p-5">
                <p>&copy; quickshare</p>
            </div>
        </div>
    )
}


export default LandingPage;