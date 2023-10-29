import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BlogQueryResult } from '../lib/types';
import { contentfulClient } from '../lib/createClient';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from '../Layout';

const client = contentfulClient

function Home() {
  const [blogEntries, setBlogEntries] = useState<BlogQueryResult | null>(null);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogEntries = async () => {
      try {
        const entries = await client.getEntries({ content_type: 'blog', order: ['-fields.date'], include: 1 });
  
        // Cast entries to BlogQueryResult
        const transformedEntries = entries as unknown as BlogQueryResult;
  
        setBlogEntries(transformedEntries);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', err);
      }
    };
  
    getBlogEntries();
  }, []);
  

  if (blogEntries === null) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
    <div className="flex items-center min-h-screen flex-col py-12 gap-y-12">
        {blogEntries.items.map((singlePost, index) => {
        const { slug, title, content, date, readTime, image } = singlePost.fields;
        return (
          <div key={index} className="flex flex-col items-center leading-loose bg-white dark:bg-[#201C35] p-6 md:p-10 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] sm:w-4/5">
            <span className="grid md:grid-cols-[1fr_4fr] gap-6 mb-6">
              <img className="rounded-sm mb-1" src={`https:${image.fields.file.url}`} alt={title} />
              <span className="flex flex-col">
              <Link to={`/articles/${slug}`}>
                <h2 className="font-extrabold text-2xl text-left underline decoration-transparent transition-colors duration-300 hover:decoration-[#ff46569d]" key={slug}>
                {title}
              </h2>
              </Link>

                <span className="flex flex-col  items-center sm:flex-row">
                <p className="sm:mx-10">{readTime} read</p>
                  <span className="font-semibold  opacity-70">
                {" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                </span>
                  </span>
              </span>
            </span>
            <div className="max-h-32 overflow-hidden">{documentToReactComponents(content)}</div>
          </div>
        );
      })}
    <Outlet />
    </div>
    </Layout>
  );
}

export default Home;
