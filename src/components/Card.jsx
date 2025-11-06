const Card = ({ title, description, icon, actionLabel }) => {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-500">
        {icon || (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22c5-4 8-7.58 8-11a8 8 0 1 0-16 0c0 3.42 3 7 8 11z" />
            <circle cx="12" cy="11" r="3" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 flex-1 text-sm text-slate-600">{description}</p>
      {actionLabel && (
        <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary-500 group-hover:text-primary-600">
          {actionLabel}
          <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </div>
  );
};

export default Card;
