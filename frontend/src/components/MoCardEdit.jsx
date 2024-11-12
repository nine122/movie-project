import axios from "axios";
import { Link } from "react-router-dom";
export default function MoCard({ movie, onDeleted }) {
  let deleteRecipe = async () => {
    let res = await axios.delete(
      "http://localhost:8000/api/movies/" + movie._id
    );
    if (res.status === 200) {
      onDeleted(movie._id);
    }
  };
  return (
    <div className="flex flex-col justify-between w-64 bg-black text-white m-4 p-4 rounded-lg shadow-lg">
      <img
        src={import.meta.env.VITE_BACKEND_URL + movie.photo}
        className="w-full h-80 object-cover rounded-lg"
      />

      <h1 className="text-2xl font-bold mt-4">{movie.title}</h1>
      <h3 className="text-lg text-gray-400 mb-4">{movie.genre}</h3>
      <div className="flex flex-row">
        <Link
          to={`/editmovies/${movie._id}`}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm mr-4"
        >
          Edit
        </Link>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
          onClick={deleteRecipe}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
