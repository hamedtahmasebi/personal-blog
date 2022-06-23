import { GetStaticProps } from "next";
import React from "react";
import { PostPreviewCard } from "../../components/posts-page/post-preview-card";
import client from "../../lib/contentful";
export const getStaticProps: GetStaticProps = async () => {
    const res = await client.getEntries({ content_type: "blogPost" });
    return {
        props: {
            blogPosts: res.items,
        },
    };
};

const Posts = ({ blogPosts }: { blogPosts: any }) => {
    return (
        <div className="mt-6 px-4 md:px-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
                {blogPosts.map((post: any, index: number) => (
                    <div className="px-2 py-4" key={`post-preview-${index}`}>
                        <div className="flex flex-col justify-between shadow-md dark:shadow-2xl h-full px-6 py-4 rounded-md">
                            <PostPreviewCard
                                key={`post-preview-${index}`}
                                title={post.fields.title}
                                summary={post.fields.articleContent.content[0].content[0].value.slice(
                                    0,
                                    140
                                )}
                                date={post.sys.updatedAt}
                                url={`posts/${post.sys.id}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
