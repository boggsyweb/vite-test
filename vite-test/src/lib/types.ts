import { Document } from "@contentful/rich-text-types";

export type GlossaryPage = {
  fields: {
    body: Document;
    // linkName: string;
    pageImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    partTwo: Document;
  };
};

export type AboutPage = {
  fields: {
    body: Document;
    // linkName: string;
    aboutImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
};

export type BlogItem = {
  fields: {
    title: string;
    slug: string;
    date: Date;
    content: Document;
    readTime: string;
    tags: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
};
export type BlogItems = ReadonlyArray<BlogItem>;

export type BlogQueryResult = {
  fields: any;
  items: BlogItems;
};
