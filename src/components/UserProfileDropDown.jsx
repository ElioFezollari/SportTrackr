import { Link } from 'react-router'
import "../styles/components/SettingsDropdown.css"
import useAuth from "../hooks/useAuth";
import {getOnboardingUrl} from '../services/onboarding'

function UserProfileDropDown() {

    const { auth } = useAuth();
    
    const handleOnBoarding = async () => {
        try {
            const response = await getOnboardingUrl(auth.accessToken);
            if (response.status === 200 || response.status === 201) {
                window.location.href = response.data.url;
            } else {
                console.error("Error Fetching URL:", response.status, response.data);
                alert("Error fetching onboarding URL. Please try again later.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("An error occurred. Please try again later.");
        }
    };
        

  return (
        <div className="settings-dropdown-menu">
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={()=>handleOnBoarding()}>Become League Owner</button>
            </li>
          </ul>
        </div>

  )
}

export default UserProfileDropDown