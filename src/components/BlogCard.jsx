import { useMemo, useState } from 'react';

const truncateToNearestWord = (text = '', limit = 250) => {
  if (text.length <= limit) {
    return text;
  }

  const slice = text.slice(0, limit);
  const breakpoint = Math.max(slice.lastIndexOf(' '), slice.lastIndexOf('\n'));
  const safeSlice = breakpoint > 0 ? slice.slice(0, breakpoint) : slice;

  return `${safeSlice.trimEnd()}...`;
};

const BlogCard = ({ title, author, date, excerpt = '', coverImage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const preview = useMemo(() => truncateToNearestWord(excerpt), [excerpt]);
  const showToggle = excerpt && excerpt.length > preview.length;
  const content = isExpanded ? excerpt : preview;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="h-48 w-full rounded-t-2xl object-cover"
        />
      )}

      <div className="flex flex-1 flex-col px-6 py-5">
        <header className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {(author || date) && (
            <p className="mt-1 text-sm text-slate-500">
              {author && <span>By {author}</span>}
              {author && date && <span className="mx-2">/</span>}
              {date && <span>{date}</span>}
            </p>
          )}
        </header>

        <p className="whitespace-pre-line text-sm text-slate-600 transition-all duration-200 ease-in-out">
          {content}
        </p>

        {showToggle && (
          <button
            type="button"
            onClick={() => setIsExpanded(prev => !prev)}
            className="mt-4 w-fit text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 focus:outline-none focus-visible:ring focus-visible:ring-blue-300"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
