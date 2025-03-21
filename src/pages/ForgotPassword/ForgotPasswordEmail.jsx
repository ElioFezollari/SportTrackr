import React, { useState } from 'react';
import '../../styles/verifyEmail.css';
import logo from "../../assets/images/Logo3.png";
import { sendForgotPasswordEmail } from '../../services/auth';
import { Link, useNavigate } from 'react-router'

function ForgotPasswordEmail() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsError(false);

    try {
      const response = await sendForgotPasswordEmail({ email });
      if (response.status === 200) {
        setMessage('Forgot password email sent successfully!');
        setShowModal(true);
      } else {
        setError('Failed to send email. Please try again.');
        setIsError(true);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Error sending email:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('An error occurred. Please try again later.');
      }
      setIsError(true);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (!isError) {
        navigate('../');
    }
  };

  return (
    <div className='email-verification-wrapper'>
      <div className='email-verification'>
        <div className='verification-form'>
          <img src={logo} alt="logo of SportTrackr"/>
          <h1>Forgot Password</h1>
          <form onSubmit={handleSubmit} className="email-form">
            <input
              type="email"
              placeholder="Get Forgot Password Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send</button>
            <p >Go <Link to="../login">Back</Link></p>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>

      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isError ? "Error" : "Success"}</h2>
            <p>{error || message}</p>
            <button onClick={closeModal} className='modal-button'>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordEmail;