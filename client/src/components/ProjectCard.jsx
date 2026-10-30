import Toggle from "./Toggle.jsx";

function ProjectCard({ photo, isFavorite, onFavoriteChange }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-[10px] border border-[#e7dedd] bg-white transition-colors duration-200 dark:border-[#38272b] dark:bg-[#191415]">
      {/* This fixed image frame makes the gallery consistent. */}
      <div className="aspect-[4/3] overflow-hidden bg-[#e9e1de] dark:bg-[#302526]">
        <img
          src={photo.image}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold tracking-wider text-[#872436] dark:text-[#dfb66b]">
            {photo.number}
          </span>
          <Toggle
            label="Favorite"
            checked={isFavorite}
            onChange={onFavoriteChange}
          />
        </div>

        <h3 className="mb-1 text-xl font-bold text-[#421823] dark:text-[#f2d7b0]">
          {photo.title}
        </h3>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#872436] dark:text-[#dfb66b]">
          {photo.category}
        </p>
        <p className="mb-5 text-sm text-[#625559] dark:text-[#d6c9c7]">
          {photo.description}
        </p>

        {/* Image credits matter: these are sample licensed photographs. */}
        <a
          href={photo.source}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-fit text-xs text-[#7c2634] underline underline-offset-2 hover:text-[#4c1421] dark:text-[#dfb66b] dark:hover:text-[#f1d49a]"
        >
          Photo: {photo.photographer} · CC BY-SA 4.0 ↗
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;
