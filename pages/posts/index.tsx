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
        <div className="flex justify-center mt-6">
            <div className="w-full md:w-4/5">
                {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8"> */}
                <div className="flex flex-wrap mt-8">
                    {blogPosts.map((post, index) => (
                        <PostPreviewCard
                            key={`post-preview-${index}`}
                            title={post.title ? post.title : "UNTITLED"}
                            summary={post.articleContent?.json.content[0].content[0].value.slice(
                                0,
                                140
                            )}
                            imgUrl={post.picture?.url || undefined}
                            date={post.sys.publishedAt}
                            url={`/posts/${post.sys.id}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
