import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        try {
          const res = await fetch(`http://localhost:8000/api/movies/${id}`);
          if (res.ok) {
            const data = await res.json();
            setMovie(data);
          }
        } catch (error) {
          console.error("Error fetching movie:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Image Container */}
          <div className="w-full h-64 md:h-96 relative overflow-hidden">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${movie.photo}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
          </div>

          {/* Content Container */}
          <div className="p-6 md:p-8 -mt-16 relative">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                {movie.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">●</span>
                  <span>{movie.genre}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">●</span>
                  <span>{movie.duration}</span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed">
                {movie.description || "No description available."}
              </p>

              <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white font-semibold px-6 py-3 rounded-lg mt-4 group"
              >
                {/* Simple play icon using HTML entities */}
                <span className="inline-block mr-2">▶</span>
                <span>Watch Trailer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
