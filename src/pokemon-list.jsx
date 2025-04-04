// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import axios from "axios";
import { useEffect, useState } from "react";
import SpinnerMini from "./Components/SpinnerMini";

const typeColors = {
  grass: "#78C850",
  poison: "#A040A0",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};

const PokemonList = () => {
  const [data, setData] = useState([]);
  const [offSet, setOffSet] = useState(5);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getImage = (query) => {
    axios.get(`${query}`).then((res) => {
      return res.data.sprites.other["official-artwork"].front_default;
    });
  };

  useEffect(() => {
    const List = setIsLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offSet}`)
      .then((res) => {
        const totalCount = res.data.count;
        setTotalDataCount(totalCount);
        const pokemonResults = res.data.results;
        pokemonResults.map((val) =>
          axios
            .get(val.url)
            .then((res) => {
              const updatedData = {
                ...val,
                imgUrl:
                  res.data.sprites.other["official-artwork"].front_default,
                types: res.data.types,
                id: String(res.data.id).padStart(
                  String(totalCount).length,
                  "0"
                ),
              };
              setData((prevData) => [...prevData, updatedData]);
              // console.log({ updatedData });
              setIsLoading(false);
            })
            .catch((err) => new Error("Error Fetching data"))
        );
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(setIsLoading(false));
  }, [offSet]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        padding: 10,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data &&
          data.map((val, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                width: 200,
                padding: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#f3f4f6 ",
                  borderRadius: 6,
                  borderColor: "#b9b9b9 ",
                }}
              >
                <img
                  src={val.imgUrl}
                  alt={val.name}
                  title={val.name}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    margin: "10px",
                  }}
                />
              </div>
              <span style={{ color: "#bbbbbb", marginLeft: 6 }}>#{val.id}</span>
              <div
                style={{
                  fontSize: 25,
                  margin: 22,
                  marginBottom: 2,
                  textTransform: "capitalize",
                }}
              >
                {val.name}
              </div>
              <div style={{ display: "flex", marginLeft: 20 }}>
                {val.types.map((arr) => (
                  <div
                    key={arr.slot}
                    style={{
                      margin: "0 2px 0 0",
                      padding: "2px 20px ",
                      backgroundColor: typeColors[arr.type.name] || "#ccc",
                      borderRadius: 3,
                      textTransform: "capitalize",
                      fontSize: 14,
                    }}
                  >
                    {arr.type.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div>
        Displaying {isLoading ? <SpinnerMini /> : offSet} of {totalDataCount}
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "lightgray",
          border: "none",
          borderRadius: "100px",
          padding: "15px 25px 15px 25px",
          margin: "10px auto",
          display: "block",
        }}
        onClick={() =>
          setOffSet((val) => (val < totalDataCount ? val + 5 : val))
        }
      >
        {isLoading ? <SpinnerMini /> : "Load More"}
      </button>
    </div>
  );
};

export default PokemonList;
