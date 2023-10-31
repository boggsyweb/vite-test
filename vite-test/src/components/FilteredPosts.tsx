import { useEffect, useState } from "react";
import { useParams, Outlet, Link } from "react-router-dom";
import { BlogQueryResult } from "../lib/types";
import { getTagStyle } from "../functions/TagStyle";
import { contentfulClient } from "../lib/createClient";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/Layout";

const client = contentfulClient;

function FilteredPosts() {
  const { tag } = useParams();
  const [filteredBlogEntries, setFilteredBlogEntries] =
    useState<BlogQueryResult | null>(null);

  useEffect(() => {
    const getFilteredBlogEntries = async () => {
      try {
        const entries = await client.getEntries({
          content_type: "blog",
          order: ["-fields.date"],
          include: 1,
          "fields.tags": tag,
        });
        // Cast entries to BlogQueryResult
        const transformedEntries = entries as unknown as BlogQueryResult;
        setFilteredBlogEntries(transformedEntries);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    };

    getFilteredBlogEntries();
  }, [tag]);

  if (filteredBlogEntries === null) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex items-center min-h-screen flex-col py-12 gap-y-12">
        <h1 className="text-3xl font-extrabold">{tag}</h1>
        {filteredBlogEntries.items.map((singlePost, index) => {
          const { slug, title, content, date, readTime, image, tags } =
            singlePost.fields;
          return (
            <div
              key={index}
              className="flex flex-col items-center leading-loose bg-white dark:bg-[#201C35] p-6 md:p-10 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] sm:w-4/5"
            >
              <span className="grid md:grid-cols-[1fr_4fr] gap-6 mb-6">
                <img
                  className="rounded-sm mb-1"
                  src={`https:${image.fields.file.url}`}
                  alt={title}
                />
                <span className="flex flex-col">
                  <Link to={`/articles/${slug}`}>
                    <h2
                      className="font-extrabold text-2xl text-left underline decoration-transparent transition-colors duration-300 hover:decoration-[#ff46569d]"
                      key={slug}
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
              <Link className="group" to={`/articles/${slug}`}>
                <div
                  className="w-32 my-0 mx-auto translate-y-14 bg-[#4A4870] text-slate-50 font-semibold text-center py-2 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] hover:shadow-[3px_3px_0px_1px_#ff4656c5] dark:shadow-[3px_3px_0px_1px_rgba(0,0,0,0.3)] transition-shadow duration-200"
                  key={slug}
                >
                  Read More
                </div>
              </Link>
            </div>
          );
        })}
        <Outlet />
      </div>
    </Layout>
  );
}
export default FilteredPosts;
