export function NewsCard() {
  return (
    <article className="group flex cursor-pointer flex-row justify-start gap-2">
      <div>
        <span className="text-lg text-title">1.</span>
      </div>
      <div className="flex flex-col ">
        <h2 className="text-lg text-title group-hover:underline ">
          Title of the article
        </h2>
        <div className="flex gap-1.5">
          <span className="text-xs font-medium text-newsSource">
            The Guardian
          </span>
          <span className="text-xs text-subtitle">-</span>
          <span className="text-xs text-subtitle">Author of the post</span>
          <span className="text-xs text-subtitle">-</span>
          <span className="text-xs text-subtitle">03/08/2024</span>
        </div>
      </div>
    </article>
  )
}
