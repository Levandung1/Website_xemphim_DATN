import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Play, Flame } from "lucide-react";
import MovieCard from "../components/MovieCard/MovieCard";

const API_URL = "http://localhost:5000/api/movies";

const NewPopular = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPopular();
    }, []);

    const fetchPopular = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/trending`);
            setMovies(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            <Navbar />

            <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">
                <h1 className="text-3xl font-black mb-8 flex items-center gap-2">
                    <Flame className="text-red-600" /> Mới & Phổ biến
                </h1>
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="aspect-[2/3] bg-[#1a1a1a] rounded-xl animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 overflow-visible">
                        {movies.map((m) => (
                            <MovieCard key={m._id} movie={m} />
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default NewPopular;
