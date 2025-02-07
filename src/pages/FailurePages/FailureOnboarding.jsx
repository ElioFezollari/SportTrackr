import { useEffect, useState } from "react";
import "../../styles/failurePage.css";
import sadCloud from '../../assets/images/failurePage/sad_cloud.png'

const leagueOwnerOnboardingFailure = () => {
    const [showFailure, setShowFailure] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFailure(true);
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
            {showFailure && (
                <div className="container fade-in">
                    <div className="check-wrap">
                        <div className="icon">
                            <img src={sadCloud} alt="Failure Icon" className="cloud-icon" />
                        </div>
                    </div>
                    <h1>Oops! Something went wrong.</h1>
                    <p>Please try again or contact support.</p>
                    <a href="./" className="button">Go Back</a>
                </div>
            )}
        </section>
    );
};

export default leagueOwnerOnboardingFailure;