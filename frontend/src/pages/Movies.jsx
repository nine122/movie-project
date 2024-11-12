import { useEffect, useState } from "react";
import MoCard from "../components/MoCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let fetchMovie = async () => {
      let response = await fetch("http://localhost:8000/api/movies");
      if (response.ok) {
        let data = await response.json();
        setMovies(data);
      }
    };
    fetchMovie();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-black p-4 sm:p-8 flex flex-col items-center">
        {/* Responsive Search Input Container */}
        <div className="flex justify-center sm:justify-end w-full mb-4">
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 rounded text-black"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="16"
              height="16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 4a7 7 0 017 7c0 1.3-.37 2.52-1 3.54L21 20l-2 2-5.46-5.46a7 7 0 11-2.54-11.54zm-6 7a6 6 0 1112 0 6 6 0 01-12 0z"
              />
            </svg>
          </div>
        </div>

        {/* Responsive Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MoCard movie={movie} key={movie._id} />
            ))
          ) : (
            <p className="text-white">No movies found</p>
          )}
        </div>
      </div>
    </>
  );
}
