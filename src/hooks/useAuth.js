import  { useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signup = async (email, password) => {
        setError(null);
        try {
            await creatUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
                setError(err.message);
             }
        };

    const login = async (email, password) => {
        setError(null);

        try {
            await signInWithEmailAndPassword (auth, email, password);
        } catch (error) {
            setError(err.message);
        }
    };

    const signOut = async () => {
        await signOut(auth);
    };

    return { user, loading, error, signup, login, signOut };
}