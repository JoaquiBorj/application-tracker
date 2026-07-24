import {useState, useEffect} from 'react';
import { collection, addDoc, updateDoc,  deleteDoc, 
    doc, query, where,  orderBy, 
    onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from "../firebase/config";
import {useAuth} from "./useAuth";

export function useApplications() {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setAppliucations([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, "applications"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const apps = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
            }));
            setApplications(apps);
            setLoading(false);
        },
        (err) => {
            setError(err.message);
            setLoading(false);
        });

        return unsubscribe;;
    }, [user]);

    const addApplication = async (application) => {
        if (!user) return;
        try {
            await addDoc(collection(db, "applications"), {
                ...data,
                userId: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const updateApplication = async (id, data) => {
        try {
            await updateDoc(doc(db, "applications", id), {
                ...data,
                updatedAt: serverTimestamp(),
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteApplication = async (id) => {
        try {
            await deleteDoc(doc(db, "applications", id));
        } catch (err) {
            setError(err.message);
        }
    };

    return {
        applications,
        loading,
        error,
        addApplication,
        updateApplication,
        deleteApplication,
    };
}