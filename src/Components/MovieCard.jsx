function MovieCard({ val }) {
  return (
    <div className="w-50 bg-gray-100 rounded-bl-xs shadow-md overflow-hidden flex flex-col justify-center items-center border-gray-300 border m-5">
      {val.Title}
      <img
        src={val.Poster}
        alt={val.Title}
        className="w-fit object-cover p-3"
      />
    </div>
  );
}

export default MovieCard;
