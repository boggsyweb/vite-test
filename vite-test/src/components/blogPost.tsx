import { Link } from "react-router-dom";
import { getTagStyle } from "../functions/TagStyle";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


function BlogPost
({ entry }:any) {
  const { slug, title, content, date, readTime, image, tags } = entry;

  return (
    <div className="flex flex-col items-center leading-loose bg-white dark:bg-[#201C35] p-6 md:p-10 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] sm:w-4/5">
      <span className="grid md:grid-cols-[1fr_4fr] gap-6 mb-6">
        <img
          className="rounded-sm mb-1"
          src={`https:${image.fields.file.url}`}
          alt={title}
        />
        <span className="flex flex-col">
          <Link to={`/articles/${slug}`}>
            <h2
              className="font-extrabold text-2xl text-left mb-2 underline decoration-transparent transition-colors duration-300 hover:decoration-[#ff4656]"
            >
              {title}
            </h2>
          </Link>
          <span className="flex flex-col  items-center sm:flex-row">
            <p>
              {Array.isArray(tags)
                ? tags.map((tag, index) => (
                    <Link
                      to={`/tags/${tag.trim()}`}
                      key={tag}
                      className={getTagStyle(tag)}
                    >
                      {tag}
                      {index < tags.length - 1 && ", "}
                    </Link>
                  ))
                : tags}
            </p>
            <p className="sm:mx-10">{readTime} read</p>
            <span className="font-semibold  opacity-70">
              {" "}
              {new Date(date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </span>
        </span>
      </span>
      <article className="max-h-32 overflow-hidden">
        {documentToReactComponents(content)}
      </article>
      <Link
        className="group w-32 my-0 mx-auto translate-y-14 bg-[#4A4870] text-slate-50 font-semibold text-center py-2 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_0px_1px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[3px_3px_0px_1px_#ff4656c5]"
        to={`/articles/${slug}`}
      >
        <div key={slug}>Read More</div>
      </Link>
    </div>
  );
}

export default BlogPost

