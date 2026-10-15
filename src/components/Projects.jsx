import { useState } from "react";
import { projects } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";

const categories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];

function Projects() {
  const [category, setCategory] = useState("All");
  const [favoriteIds, setFavoriteIds] = useState([]);

  const visibleProjects = projects.filter(
    (project) =>
      category === "All" || project.category === category
  );

  function handleFavoriteChange(projectId, checked) {
    setFavoriteIds((previousIds) =>
      checked
        ? [...previousIds, projectId]
        : previousIds.filter((id) => id !== projectId)
    );
  }

  return (
    <section
      id="projects"
      className="mx-auto max-w-[70rem] px-4 py-12 md:py-16"
    >
      <h2 className="mb-2 text-3xl font-bold">
        Featured Projects
      </h2>

      <p className="mb-6 text-[#52606d] dark:text-slate-300">
        A selection of my development work, practical experience,
        and software engineering projects.
      </p>

      {/* CATEGORY FILTER */}
      <div
        aria-label="Filter projects by category"
        className="mb-4 flex flex-wrap gap-2"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
              category === item
                ? "border-[#2f5d8a] bg-[#2f5d8a] text-white dark:border-blue-500 dark:bg-blue-600"
                : "border-[#d5dde5] bg-white text-[#1f4066] hover:bg-blue-50 dark:border-slate-600 dark:bg-[#152238] dark:text-blue-200 dark:hover:bg-slate-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p
        aria-live="polite"
        className="mb-6 text-sm text-[#52606d] dark:text-slate-400"
      >
        Showing {visibleProjects.length} of {projects.length} projects
      </p>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isFavorite={favoriteIds.includes(project.id)}
            onFavoriteChange={(checked) =>
              handleFavoriteChange(project.id, checked)
            }
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;