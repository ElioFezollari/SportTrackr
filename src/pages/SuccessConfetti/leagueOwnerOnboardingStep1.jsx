import { useEffect, useState } from "react";
import "../../styles/teamCreationConfetti.css";
import confetti from "canvas-confetti";

const leagueOwnerOnboardingStep1 = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    const timer = setTimeout(() => {
      setShowSuccess(true);
    }, 2000); 

    const iframe = document.getElementById("memberstack-iframe");
    if (iframe) {
      const domain = window.location.hostname;
      const src = iframe.getAttribute("src").replace("ref=blank", "ref=" + domain);
      iframe.setAttribute("src", src);
    }

    return () => clearTimeout(timer); 
  }, []);

  return (
    <section className="section_big">


      {showSuccess && (
        <div className="container fade-in">
          <div className="check-wrap">
            <div className="icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0002 15.172L19.1922 5.979L20.6072 7.393L10.0002 18L3.63623 11.636L5.05023 10.222L10.0002 15.172Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <h1>You have successfully completed Step 1</h1>
          <p>Email has been sent to you For Step 2</p>
          <a href="./app" className="button">Your dashboard</a>
        </div>
      )}
    </section>
  );
};

export default leagueOwnerOnboardingStep1;
