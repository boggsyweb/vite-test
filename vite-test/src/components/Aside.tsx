import { useState, useEffect } from "react";
import { BlogQueryResult } from "../lib/types";
import { contentfulClient } from "../lib/createClient";
import { Outlet, Link } from 'react-router-dom';


const client = contentfulClient;

function Aside() {
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
  const limitedBlogEntries = blogEntries.items.slice(0, 4);

  return (
    <div>
    <div className="flex-col py-12 gap-y-8 md:sticky md:top-0 md:flex md:min-h-screen  ">
      <span className="flex content-between items-center gap-3">
        <h3 className="text-xl font-bold">Recent Posts</h3>
        <hr className="border-[#ff46569d] border-2 w-full"/>
        </span>
        {limitedBlogEntries.map((singlePost, index) => {
        const { slug, title, image } = singlePost.fields;
        return (
            <div key={index}>
                 <Link to={`/articles/${slug}`} className="group flex justify-center items-center">
                <span className="w-1/4">
                    <img className="rounded-sm mb-1"
                         src={`https:${image.fields.file.url}`} alt={title}
                    />
                </span>
                <span className="w-3/4 ml-4">
                    <h4 className="truncate overflow-hidden font-bold text-md text-left underline decoration-transparent transition-colors duration-300 hover:decoration-[#ff46569d] md:whitespace-normal">
                    {title}
                    </h4>
                    <span className="flex gap-1">
                    </span>
                </span>
                </Link>
            </div>
          );
        })}
  </div>
  <Outlet />
</div>
);
}
export default Aside