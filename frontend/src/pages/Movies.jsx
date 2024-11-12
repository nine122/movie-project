import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
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
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
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
