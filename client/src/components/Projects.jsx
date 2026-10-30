import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";

function Projects() {
  const [photos, setPhotos] = useState([]);
  const [totalCars, setTotalCars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    let active = true;
    async function loadCars() {
      try {
        const [carsResponse, countResponse] = await Promise.all([
          fetch("/api/cars"),
          fetch("/api/cars/count"),
        ]);
        if (!carsResponse.ok || !countResponse.ok) {
          throw new Error("API could not load the gallery");
        }
        const carsData = await carsResponse.json();
        const countData = await countResponse.json();
        if (active) {
          setPhotos(carsData.cars);
          setTotalCars(countData.count);
        }
      } catch (error) {
        if (active) setError(error.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadCars();
    return () => { active = false; };
  }, []);

  const categories = ["All", ...new Set(photos.map((photo) => photo.category))];
  const visiblePhotos = photos.filter(
    (photo) => category === "All" || photo.category === category
  );

  function handleFavoriteChange(photoId, checked) {
    setFavoriteIds((previousIds) =>
      checked
        ? [...previousIds, photoId]
        : previousIds.filter((id) => id !== photoId)
    );
  }

  return (
    <section id="gallery" className="mx-auto max-w-[72rem] px-4 py-12 sm:px-6 md:py-16">
      <h2 className="mb-2 text-3xl font-bold text-[#421823] dark:text-[#f2d7b0]">The 911 Gallery</h2>
      <p className="mb-6 text-[#625559] dark:text-[#d6c9c7]">Porsche 911 photography, organized by model family and character.</p>

      {loading && <p role="status">Loading cars from PostgreSQL...</p>}
      {error && <p role="alert" className="mb-5 text-red-700 dark:text-red-300">{error}. Is your Express server running?</p>}

      {!loading && !error && (
        <>
          <div aria-label="Filter photographs by category" className="mb-4 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b83b4c] ${
                  category === item
                    ? "border-[#791d2d] bg-[#791d2d] text-white dark:border-[#b68c4a] dark:bg-[#b68c4a] dark:text-[#1c1210]"
                    : "border-[#dacac9] bg-white text-[#6e1d2d] hover:bg-[#f7ecec] dark:border-[#584247] dark:bg-[#191415] dark:text-[#e8c789] dark:hover:bg-[#302126]"
                }`}>{item}</button>
            ))}
          </div>
          <p aria-live="polite" className="mb-6 text-sm text-[#625559] dark:text-[#d6c9c7]">
            Showing {visiblePhotos.length} of {totalCars} photographs
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePhotos.map((photo) => (
              <ProjectCard key={photo.id} photo={photo} isFavorite={favoriteIds.includes(photo.id)}
                onFavoriteChange={(checked) => handleFavoriteChange(photo.id, checked)} />
            ))}
          </div>
          {photos.length === 0 && <p>No cars in database. Run the seed script.</p>}
        </>
      )}
      <p className="mt-6 text-xs text-[#736369] dark:text-[#c0aaa7]">Sample gallery photos are credited to their original photographers.</p>
    </section>
  );
}

export default Projects;
