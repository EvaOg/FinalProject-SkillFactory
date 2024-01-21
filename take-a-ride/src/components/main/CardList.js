import BikeCard from "./BikeCard";
import cards_array from "../../data/cardsData.json";
import Filter from "./Filter";
import { useState } from "react";

function CardList() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedAdultAgeGroup, setSelectedAdultAgeGroup] = useState("all");

  function setSelectedTypeHandler(value) {
    setSelectedType(value);
  }

  function setSelectedAdultAgeGroupHandler(value) {
    setSelectedAdultAgeGroup(value);
  }

  return (
    <>
      <Filter
        setSelectedTypeHandler={setSelectedTypeHandler}
        setSelectedAdultAgeGroupHandler={setSelectedAdultAgeGroupHandler}
      />

      <div className="cards-container">
        {cards_array
          .filter((card) =>
            selectedType === "all" ? card !== null : card.type === selectedType
          )
          .filter((card) =>
            selectedAdultAgeGroup === "all"
              ? card !== null
              : card.agegroup === selectedAdultAgeGroup
          )
          .map((card) => (
            <BikeCard
              title={card.title}
              url={card.url}
              price={card.price}
              age={card.agegroup}
            />
          ))}
      </div>
    </>
  );
}

export default CardList;
