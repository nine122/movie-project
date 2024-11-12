import { Link } from "react-router-dom";
import cover from "../assets/cover.jpg";
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <img
        src={cover}
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />
      <div className="relative text-center space-y-10">
        <h1 className="text-5xl md:text-7xl font-bold drop-shadow-xl">
          WELCOME FROM
        </h1>
        <p className="text-2xl md:text-4xl mt-4">OUR CINEMA</p>
        <button className="bg-red-700 text-white px-4 py-2 rounded">
          <Link to={"/movies"}>Get Started</Link>
        </button>
      </div>
    </div>
  );
}
