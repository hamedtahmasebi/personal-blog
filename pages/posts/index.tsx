import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import React from "react";
import { PostPreviewCard } from "../../components/posts-page/post-preview-card";
import { BlogPost, BlogPostsQuery } from "../../generated/graphql";
import apolloClient from "../../lib/apollo-client";
export const getStaticProps: GetStaticProps = async () => {
    const { data, error } = await apolloClient.query({
        query: gql`
            query blogPosts {
                blogPostCollection {
                    items {
                        sys {
                            id
                            publishedAt
                        }
                        title
                        articleContent {
                            json
                        }
                        picture {
                            url
                        }
                        contentfulMetadata {
                            tags {
                                name
                            }
                        }
                    }
                }
            }
        `,
    });
    return {
        props: {
            blogPostCollection: data.blogPostCollection,
        },
    };
};

const Posts = ({
    blogPostCollection,
}: {
    blogPostCollection: BlogPostsQuery["blogPostCollection"];
}) => {
    if (!(blogPostCollection && blogPostCollection.items))
        throw new Error("Something went wrong while building UI");
    console.log(blogPostCollection.items[0]?.contentfulMetadata.tags);
    return (
        <div className="flex justify-center mt-6">
            <div className="w-full md:w-3/5">
                {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8"> */}
                <div className="flex flex-col gap-4 mt-8">
                    {blogPostCollection.items.map((post, index) => (
                        <>
                            <div className="w-full lg:w-3/5 px-5" key={`post-preview-${index}`}>
                                <PostPreviewCard
                                    summary={
                                        post?.articleContent?.json.content[0].content[0].value.slice(
                                            0,
                                            80
                                        ) + "..."
                                    }
                                    title={post?.title || "UNTITLED"}
                                    imgUrl={post?.picture?.url || undefined}
                                    date={post?.sys.publishedAt}
                                    url={`/posts/${post?.sys.id}`}
                                    tags={post?.contentfulMetadata.tags}
                                />
                            </div>
                            <div className="lg:w-3/5 px-5">
                                <hr />
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
