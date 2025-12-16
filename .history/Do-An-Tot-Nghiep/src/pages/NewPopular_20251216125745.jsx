import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Play, Flame } from "lucide-react";

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
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {movies.map((m) => (
                            <div
                                key={m._id}
                                onClick={() => navigate(`/movie/${m._id}`)}
                                className="group cursor-pointer rounded-xl overflow-hidden bg-[#1a1a1a]
                           transition-all duration-500 hover:-translate-y-2
                           hover:shadow-[0_10px_40px_-10px_rgba(229,9,20,0.6)]"
                            >
                                <div className="aspect-[2/3] overflow-hidden">
                                    <img
                                        src={m.posterUrl}
                                        alt={m.title}
                                        className="w-full h-full object-cover transition-transform duration-700
                               group-hover:scale-110 group-hover:brightness-75"
                                    />
                                </div>

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                                bg-gradient-to-t from-black via-black/40 to-transparent
                                transition-opacity flex items-end p-4">
                                    <button className="w-full py-2 bg-red-600 hover:bg-red-700
                                     rounded-lg text-xs font-bold flex items-center
                                     justify-center gap-2">
                                        <Play size={12} fill="currentColor" /> Xem ngay
                                    </button>
                                </div>

                                <div className="p-3">
                                    <h3 className="font-bold text-sm line-clamp-2 mb-1">
                                        {m.title}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        ⭐ {m.rating || "N/A"} · 👁 {m.views || 0}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default NewPopular;
