import React, { useState } from 'react';
import '../../styles/verifyEmail.css';
import logo from "../../assets/images/Logo3.png";
import { resetPassword } from '../../services/auth';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = useParams("token")


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsError(false);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setIsError(true);
            setShowModal(true);
            return;
        }

        try {
            const data = {
                new_password: newPassword,
                confirmPassword: confirmPassword
            }

            const response = await resetPassword(token.token, data);
            if (response.status === 200) {
                setMessage('Password reset successfully!');
                setShowModal(true);
            } else {
                setError('Failed to reset password. Please try again.');
                setIsError(true);
                setShowModal(true);
            }
        } catch (err) {
            console.error("Error resetting password:", err);
            setError('An error occurred. Please try again later.');
            setIsError(true);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        if (!isError) {
            navigate('../login');
        }
    };

    return (
        <div className='email-verification-wrapper'>
            <div className='email-verification'>
                <div className='verification-form'>
                    <img src={logo} alt="logo of SportTrackr" />
                    <h1>Reset Password</h1>
                    <form onSubmit={handleSubmit} className="email-form">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Reset Password</button>
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

export default ResetPassword;