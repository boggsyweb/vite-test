import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { BlogItem } from '../lib/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { contentfulClient } from '../lib/createClient';
import Layout from '../Layout';

const client = contentfulClient;

const options = {
  renderNode: {
    hyperlink: (node: any) => {
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {node.content[0].value}
        </a>
      );
    },
  },
};

export default function BlogPost() {
  const { slug } = useParams(); // Use useParams to access the slug from the URL
  const [article, setArticle] = useState<BlogItem | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const queryOptions = {
        content_type: 'blog',
        'fields.slug': slug,
      };
      const queryResult = await client.getEntries(queryOptions);
      if (queryResult.items.length > 0) {
        setArticle(queryResult.items[0] as unknown as BlogItem);
      }
    };

    fetchBlogPost(); 
  }, [slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const { title, date, content, image } = article.fields;

  return (
    <Layout>
    <div className="flex flex-col items-center min-h-screen py-12 gap-y-12">
      <article className="flex flex-col items-center leading-loose bg-white dark:bg-[#201C35] p-6 md:p-10 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] sm:w-4/5">
        <h1 className="font-extrabold text-3xl mb-2">{title}</h1>
        <img src={`https:${image.fields.file.url}`} alt={title} className="w-full" />
        <p className="mb-6 opacity-70">
          Posted on{' '}
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="prose max-w-full [&>p]:mb-8 [&>h2]:text-[#454360] [&>h2]:text-2xl [&>h3]:text-[#454360] [&>h3]:text-xl prose-p:text-[#454360] hover:prose-a:text-[#ff4656d1] dark:prose-p:text-[#b6b6cc] dark:[&>h2]:text-[#b6b6cc] dark:[&>h3]:text-[#b6b6cc] dark:prose-a:text-[#b6b6cc]">
          {documentToReactComponents(content, options)}
        </div>
      </article>
    </div>
    </Layout>
  );
}
