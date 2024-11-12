import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddMovies() {
  let [title, setTitle] = useState("");
  let [genre, setGenre] = useState("");
  let [hours, setHours] = useState("");
  let [minutes, setMinutes] = useState("");
  let [trailer, setTrailer] = useState("");
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState("");
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    let fetchMovie = async () => {
      if (id) {
        let res = await axios.get("http://localhost:8000/api/movies/" + id);
        if (res.status === 200) {
          setTitle(res.data.title);
          setGenre(res.data.genre);
          setHours(res.data.hours);
          setMinutes(res.data.minutes);
          setTrailer(res.data.trailer);
          setPreview(import.meta.env.VITE_BACKEND_URL + res.data.photo);
        }
      }
    };
    fetchMovie();
  }, [id]);

  let submit = async (e) => {
    try {
      e.preventDefault();
      console.log("added");

      let duration = `${hours}h${minutes}m`;
      console.log(duration);

      let movie = {
        title,
        genre,
        duration,
        trailer,
      };
      let response;
      if (id) {
        response = await axios.patch(
          "http://localhost:8000/api/movies/" + id,
          movie
        );
      } else {
        response = await axios.post("http://localhost:8000/api/movies", movie);
      }
      if (response.status === 200) {
        navigate("/movies");
      }
      let formData = new FormData();
      formData.set("photo", file);

      let uploadResponse = await axios.post(
        `http://localhost:8000/api/movies/${response.data._id}/upload`,
        formData,
        { headers: { Accept: "multipart/form-data" } }
      );
      console.log(uploadResponse);

      if (response.status === 200) {
        navigate("/movies");
      }
    } catch (e) {
      console.log(Object.keys(e.response.data.errors));
    }
  };

  let upload = (e) => {
    let file = e.target.files[0];
    setFile(file);

    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      setPreview(e.target.result);
      console.log(e);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-20 w-full max-w-sm"
        onSubmit={submit}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          {id ? `Edit Movie` : `Add a moive`}
        </h2>
        <input
          type="file"
          className="text-sm mb-4 text-gray-500"
          onChange={upload}
        />
        {!!preview && <img className="h-40" src={preview} />}
        <div className="mb-4">
          <label
            htmlFor="movie-title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Movie Title
          </label>
          <input
            id="movie-title"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Genre
          </label>
          <input
            id="genre"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Duration
          </label>
          <div className="flex">
            <input
              type="number"
              min="0"
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
            <input
              type="number"
              min="0"
              max="59"
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="trailer"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Trailer
          </label>
          <input
            id="trailer"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the trailer URL"
            value={trailer}
            onChange={(e) => setTrailer(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {id ? `Update` : `Submit`}
          </button>
        </div>
      </form>
    </div>
  );
}
