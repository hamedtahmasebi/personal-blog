import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import React from "react";
import { PostPreviewCard } from "../../components/posts-page/post-preview-card";
import { BlogPost } from "../../generated/graphql";
import apolloClient from "../../lib/apollo-client";
export const getStaticProps: GetStaticProps = async () => {
    const { data } = await apolloClient.query({
        query: gql`
            {
                blogPostCollection {
                    items {
                        sys {
                            id
                        }
                        title
                        articleContent {
                            json
                        }
                        picture {
                            url
                        }
                    }
                }
            }
        `,
    });
    return {
        props: {
            blogPosts: data.blogPostCollection.items,
        },
    };
};

const Posts = ({ blogPosts }: { blogPosts: BlogPost[] }) => {
    return (
        <div className="mt-6 px-4 md:px-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
                {blogPosts.map((post, index) => (
                    <div className="px-2 py-4" key={`post-preview-${index}`}>
                        <div className="flex flex-col justify-between shadow-md dark:shadow-2xl h-full px-6 py-4 rounded-md">
                            <PostPreviewCard
                                key={`post-preview-${index}`}
                                title={post.title ? post.title : "UNTITLED"}
                                summary={post.articleContent?.json.content[0].content[0].value.slice(
                                    0,
                                    140
                                )}
                                date={post.sys.publishedAt}
                                url={`/posts/${post.sys.id}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
