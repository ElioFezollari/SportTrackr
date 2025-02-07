import React, { useState, useEffect } from 'react';
import '../../styles/transactions.css';
import { getLeagueOwnerTransactions } from '../../services/transaction';
import useAuth from "../../hooks/useAuth";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getLeagueOwnerTransactions(auth.accessToken);
                if (response.data.transactions) {
                    setTransactions(response.data.transactions);
                } else {
                    setError("Failed to fetch transactions.");
                }
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError("An error occurred while fetching transactions.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [auth.accessToken]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true
        };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="transactions-container">
            <h1>Transactions</h1>
            {loading && <p>Loading transactions...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && transactions.length === 0 && <p>No transactions found.</p>}
            <div className='transactions-cards-container'>
                {!loading && !error && transactions.map((transaction) => (
                    <div key={transaction.created_at || transaction.id} className="transaction-card">
                        <h2 className="league-name">{transaction.league_name}</h2>
                        <div className="transaction-details">
                            <p className="team-name">Team: {transaction.name}</p>
                            <p className="amount">Amount: {transaction.amount}</p>
                            <p className="time">Time: {formatDate(transaction.created_at)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Transactions;