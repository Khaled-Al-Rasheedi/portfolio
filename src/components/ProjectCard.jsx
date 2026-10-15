import Toggle from "./Toggle.jsx";

function ProjectCard({ project, isFavorite, onFavoriteChange }) {
  return (
    <article className="flex min-w-0 flex-col rounded-[10px] border border-[#d5dde5] bg-white p-5 transition-colors duration-200 dark:border-slate-700 dark:bg-[#152238] sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold tracking-wide text-[#2f5d8a] dark:text-blue-300">
          {project.number}
        </p>

        <Toggle
          label="Favorite"
          checked={isFavorite}
          onChange={onFavoriteChange}
        />
      </div>

      <h3 className="mb-3 text-xl font-bold text-[#1f4066] dark:text-blue-200">
        {project.title}
      </h3>

      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#2f5d8a] dark:text-blue-300">
        {project.category}
      </p>

      <p className="mb-8 break-words text-[#52606d] dark:text-slate-300">
        {project.description}
      </p>

      <p className="mt-auto mb-4 break-words text-sm font-bold text-[#2f5d8a] dark:text-blue-300">
        {project.tech}
      </p>

      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit font-bold text-[#2f5d8a] hover:underline focus-visible:underline dark:text-blue-300"
        >
          View on GitHub →
        </a>
      ) : (
        <p className="text-sm italic text-[#52606d] dark:text-slate-400">
          {project.note}
        </p>
      )}
    </article>
  );
}

export default ProjectCard;