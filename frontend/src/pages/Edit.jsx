import { useEffect, useState } from "react";
import MoCardEdit from "../components/MoCardEdit";

export default function Edit() {
  const [movies, setMovies] = useState([]);
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
  let onDeleted = (_id) => {
    setMovies((prev) => prev.filter((r) => r._id !== _id));
  };

  return (
    <>
      <div className="bg-black p-8 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {!!movies.length &&
            movies.map((movie) => (
              <MoCardEdit movie={movie} onDeleted={onDeleted} key={movie._id} />
            ))}
        </div>
      </div>
    </>
  );
}
