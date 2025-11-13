import PropTypes from 'prop-types';
import { useMemo } from 'react';

const lineIsFaq = (line) => /^\d+\.\s+/.test(line);
const lineIsBullet = (line) => line.startsWith('- ');
const lineIsSubHeading = (line, title) => {
  if (!line) return false;
  if (line === title) return false;
  if (lineIsFaq(line) || lineIsBullet(line)) return false;
  if (line.length >= 60) return false;
  return /^[A-Z]/.test(line);
};

const BlogCard = ({ title, excerpt = '' }) => {
  const sections = useMemo(() => {
    return excerpt
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        if (lineIsSubHeading(line, title)) {
          return (
            <h3 key={`subheading-${index}`} className="text-xl font-semibold text-green-700 mt-6">
              {line}
            </h3>
          );
        }

        if (lineIsFaq(line)) {
          return (
            <p key={`faq-${index}`} className="italic font-medium text-slate-700 mt-3">
              {line}
            </p>
          );
        }

        if (lineIsBullet(line)) {
          return (
            <p
              key={`bullet-${index}`}
              className="ml-4 text-slate-600 leading-relaxed before:content-['•'] before:mr-2"
            >
              {line.slice(2).trim()}
            </p>
          );
        }

        return (
          <p key={`paragraph-${index}`} className="text-slate-600 leading-relaxed">
            {line}
          </p>
        );
      });
  }, [excerpt, title]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
      <h2
        className="text-3xl font-bold text-[#0ba112] mb-6 sm:text-4xl"
        style={{ fontFamily: 'KoHo, sans-serif' }}
      >
        {title}
      </h2>
      <article>{sections}</article>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
};

export default BlogCard;
