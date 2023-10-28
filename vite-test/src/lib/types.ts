import { Document } from "@contentful/rich-text-types";

export type PageItem = {
  fields: {
    title: string;
    body: Document;
    slug: string;
    order: number;
    linkName: string;
    image: {
      fields: {
        file: {
          url: string;
        }
      }
    }
  }
}
export type PageItems = ReadonlyArray<PageItem>;
export type PageQueryResult = {
  items: PageItems;
};

export type BlogQueryResult = {
  items: BlogItems;
  // Include other fields if present in the response
};

export type BlogItems = ReadonlyArray<BlogItem>;

export type BlogItem = {
  fields: {
    title: string;
    // slug: string;
    date: Date;
    content: Document;
    readTime: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
};

