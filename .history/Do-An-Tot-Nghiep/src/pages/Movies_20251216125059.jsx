import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Play } from "lucide-react";

const API = "http://localhost:5000/api/movies";

export default function Movies() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState("All");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
        axios.get(`${API}/genres`).then(res => setGenres(res.data));
    }, []);

    const fetchMovies = async () => {
        setLoading(true);
        const res = await axios.get(API);
        setMovies(res.data);
        setLoading(false);
    };

    const fetchByGenre = async (g) => {
        setLoading(true);
        const res = await axios.get(`${API}/genre/${g}`);
        setMovies(res.data);
        setLoading(false);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return fetchMovies();
        setLoading(true);
        const res = await axios.get(`${API}/search`, {
            params: { query: search }
        });
        setMovies(res.data);
        setLoading(false);
    };

    const CategoryPill = ({ name }) => (
        <button
            onClick={() => {
                setGenre(name);
                name === "All" ? fetchMovies() : fetchByGenre(name);
            }}
            className={`px-5 py-2 rounded-full text-sm font-bold ${genre === name
                    ? "bg-white text-black"
                    : "border border-gray-600 text-gray-400 hover:text-white"
                }`}
        >
            {name}
        </button>
    );

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white pt-16">
            <Navbar />

            <section className="max-w-7xl mx-auto px-6 py-10">
                <form onSubmit={handleSearch} className="mb-6">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm phim..."
                        className="w-full max-w-md bg-[#161616] rounded-full px-5 py-3"
                    />
                </form>

                <div className="flex gap-3 overflow-x-auto mb-10">
                    <CategoryPill name="All" />
                    {genres.map(g => (
                        <CategoryPill key={g} name={g} />
                    ))}
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {movies.map(m => (
                            <div
                                key={m._id}
                                onClick={() => navigate(`/movie/${m._id}`)}
                                className="cursor-pointer rounded-xl overflow-hidden bg-[#1a1a1a] hover:-translate-y-2 transition"
                            >
                                <img src={m.posterUrl} alt="" />
                                <div className="p-3">
                                    <p className="font-bold">{m.title}</p>
                                    <button className="mt-2 w-full bg-red-600 py-2 rounded">
                                        <Play size={12} /> Xem phim
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}
