import { Link } from "react-router-dom";
export default function MoCard({ movie }) {
  return (
    <div className="flex flex-col justify-between w-64 h-85 text-white m-4 p-6 rounded-lg shadow-lg ">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={import.meta.env.VITE_BACKEND_URL + movie.photo}
          className="w-full h-80 object-cover rounded-lg"
        />
      </Link>

      <h1 className="text-2xl font-bold mt-4">{movie.title}</h1>
      <h3 className="text-lg text-gray-400 mb-4">{movie.genre}</h3>
      <Link
        to={`/movies/${movie._id}`}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
      >
        Buy Ticket
      </Link>
    </div>
  );
}
