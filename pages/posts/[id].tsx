import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import client from "../../lib/contentful";

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await client.getEntries({ content_type: "blogPost" });
    const ids = res.items.map((item) => item.sys.id);
    const paths = ids.map((id: string) => {
        return { params: { id } };
    });
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { params } = context;
    const blogPost = await client.getEntry(params!.id as string);
    return {
        props: {
            blogPostData: blogPost,
        },
    };
};

export const Post = ({ blogPostData }: { blogPostData: any }) => {
    return <div>{blogPostData.fields.title}</div>;
};

export default Post;
