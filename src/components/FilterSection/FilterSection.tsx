import "./filtersection.css";

type Props = {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
};
export const FilterSection = ({ sortBy, setSortBy }: Props) => {
  return (
    <section className="filter-section">
      Filter By:
      <div className="filter-btn-container">
        <button
          onClick={() => setSortBy("All")}
          className={`btn filter-btn ${sortBy === "All" && "active-btn"}`}
        >
          All Emails
        </button>

        <button
          onClick={() => setSortBy("Unread")}
          className={`btn filter-btn ${sortBy === "Unread" && "active-btn"}`}
        >
          Unread
        </button>
        <button
          onClick={() => setSortBy("Read")}
          className={`btn filter-btn ${sortBy === "Read" && "active-btn"}`}
        >
          Read
        </button>
        <button
          onClick={() => setSortBy("Favourites")}
          className={`btn filter-btn ${
            sortBy === "Favourites" && "active-btn"
          }`}
        >
          Favourites
        </button>
      </div>
    </section>
  );
};
