import { userData } from '@/app/mocks/data';
import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../api';


export const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const loadUser = async () => {
            setLoading(true);
            setError(null);
            setUser(null);

            try {
                const userData = await fetchUserProfile(userId);
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [userId]);

    const handleRetry = () => {
        if (userId) {
            // Trigger the useEffect by clearing error first
            setError(null);
            const loadUser = async () => {
                setLoading(true);
                try {
                    const userData = await fetchUserProfile(userId);
                    setUser(userData);
                    setError(null);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            loadUser();
        }
    };

    if (!userId) {
        return <div>Please provide a user ID</div>;
    }

    if (loading) {
        return (
            <div role="status" aria-live="polite">
                Loading user profile...
            </div>
        );
    }

    if (error) {
        return (
            <div role="alert">
                <p>Error: {error}</p>
                <button onClick={handleRetry}>
                    Retry
                </button>
            </div>
        );
    }

    if (user) {
        return (
            <div data-testid="user-profile">
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        );
    }

    return null;
};
