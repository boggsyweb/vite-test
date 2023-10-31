import { useState, useEffect } from "react";
import { AboutPage } from "../lib/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { contentfulClient } from "../lib/createClient";
import Layout from "../components/Layout";

const client = contentfulClient;

function About() {
  const [aboutContent, setAboutContent] = useState<AboutPage | null>(null);
  useEffect(() => {
    const getAboutContent = async () => {
      try {
        const entries = await client.getEntries({ content_type: "aboutText" });
        if (entries.items.length > 0) {
          setAboutContent(entries.items[0] as unknown as AboutPage);
        }
      } catch (error) {
        console.error("Error geting About content:", error);
      }
    };

    getAboutContent();
  }, []);
  if (aboutContent === null) {
    return <div>Loading...</div>;
  }
  const { body, aboutImage } = aboutContent.fields;

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen py-12 gap-y-12">
        <article className="flex flex-col items-center leading-loose bg-white dark:bg-[#201C35] p-6 md:p-10 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] sm:w-4/5">
          <h1 className="font-extrabold text-3xl mb-4">About</h1>
          <div className="prose max-w-full [&>p]:mb-8 [&>h2]:text-[#454360] [&>h2]:font-extrabold [&>h2]:text-center [&>h3]:text-[#454360]  prose-p:text-[#454360] prose-a:text-[#454360]  hover:prose-a:text-[#ff4656d1] dark:prose-p:text-[#b6b6cc] dark:[&>h2]:text-[#b6b6cc] dark:[&>h3]:text-[#b6b6cc] dark:prose-a:text-[#b6b6cc]">
            {documentToReactComponents(body)}
          </div>
          <img
            className="w-1/4"
            src={`https:${aboutImage.fields.file.url}`}
            alt="profile image"
          />
        </article>
      </div>
    </Layout>
  );
}

export default About;
