import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/errorPage.css";
import questionMark from "../../assets/images/errorPage/question-mark.webp";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className='error-page-wrapper'>
      <div>
        <h1>Something went wrong...</h1>
        <p>We can't find the page you are looking for.Go back or navigate to our help page!</p>
        <div className='error-buttons'>
        <button className='b-gray' onClick={() => navigate(-1)}>Go Back</button>
        <Link>Help</Link>
        </div>

      </div>
      <img src={questionMark} alt="Soccer field masked in the shape of a question mark" />
    </div>
  );
}

export default ErrorPage;
