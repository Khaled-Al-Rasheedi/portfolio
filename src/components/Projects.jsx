import { useState } from "react";
import { photos } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";

const categories = ["All", ...new Set(photos.map((photo) => photo.category))];

function Projects() {
  const [category, setCategory] = useState("All");
  const [favoriteIds, setFavoriteIds] = useState([]);

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
      <h2 className="mb-2 text-3xl font-bold text-[#421823] dark:text-[#f2d7b0]">
        The 911 Gallery
      </h2>
      <p className="mb-6 text-[#625559] dark:text-[#d6c9c7]">
        Porsche 911 photography, organized by model family and character.
      </p>

      {/* Category buttons; useState determines the currently selected category. */}
      <div aria-label="Filter photographs by category" className="mb-4 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b83b4c] ${
              category === item
                ? "border-[#791d2d] bg-[#791d2d] text-white dark:border-[#b68c4a] dark:bg-[#b68c4a] dark:text-[#1c1210]"
                : "border-[#dacac9] bg-white text-[#6e1d2d] hover:bg-[#f7ecec] dark:border-[#584247] dark:bg-[#191415] dark:text-[#e8c789] dark:hover:bg-[#302126]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mb-6 text-sm text-[#625559] dark:text-[#d6c9c7]">
        Showing {visiblePhotos.length} of {photos.length} photographs
      </p>

      {/* Grid images stay uniformly cropped with object-cover inside ProjectCard. */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePhotos.map((photo) => (
          <ProjectCard
            key={photo.id}
            photo={photo}
            isFavorite={favoriteIds.includes(photo.id)}
            onFavoriteChange={(checked) => handleFavoriteChange(photo.id, checked)}
          />
        ))}
      </div>
      <p className="mt-6 text-xs text-[#736369] dark:text-[#c0aaa7]">
        Sample gallery photos are credited to their original photographers; replace with your own work for a personal photography portfolio.
      </p>
    </section>
  );
}

export default Projects;
