function Filter({ setSelectedTypeHandler, setSelectedAdultAgeGroupHandler }) {
  return (
    <div className="filter">
      <select
        id="cardList-form"
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => {
          setSelectedTypeHandler(e.target.value);
        }}
      >
        <option value="all" selected>
          Type of bike
        </option>
        <option value="retro">Retro</option>
        <option value="modern">Modern</option>
        <option value="mountain">Mountain</option>
        <option value="electric">Electro</option>
      </select>
      <select
        id="cardList-form"
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => {
          setSelectedAdultAgeGroupHandler(e.target.value);
        }}
      >
        <option value="all" selected>
          Adults/Junior
        </option>
        <option value="adult">Adults</option>
        <option value="junior">Junior</option>
      </select>
    </div>
  );
}

export default Filter;
