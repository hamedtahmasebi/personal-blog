import axios from "axios";
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import apolloClient from "../../lib/apollo-client";
import { gql } from "@apollo/client";
import { BlogPost } from "../../generated/graphql";

export const getStaticPaths: GetStaticPaths = async () => {
    // const res = await client.getEntries({ content_type: "blogPost" });
    const { data } = await apolloClient.query({
        query: gql`
            query blogPostCollection {
                blogPostCollection {
                    items {
                        sys {
                            id
                        }
                    }
                }
            }
        `,
    });
    const ids = data.blogPostCollection.items.map((item: BlogPost) => item.sys.id);
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
    const { data } = await apolloClient.query({
        query: gql`
            query blogPost($id: String!) {
                blogPost(id: $id) {
                    title
                    articleContent {
                        json
                    }
                }
            }
        `,
        variables: {
            id: params!.id,
        },
    });
    return {
        props: {
            blogPostData: data.blogPost,
        },
    };
};

export const Post = ({ blogPostData }: { blogPostData: any }) => {
    return <div>{blogPostData.title}</div>;
};

export default Post;
