import { gql } from "@apollo/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { PostPreviewCard } from "../components/posts-page/post-preview-card";
import { BlogPostsQuery } from "../generated/graphql";
import apolloClient from "../lib/apollo-client";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

interface IProps {
    blogPostCollection: BlogPostsQuery["blogPostCollection"];
    userBookmarksIds: string[] | null;
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { req, res } = context;

    const { data: postsData } = await apolloClient.query<BlogPostsQuery>({
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

    if (req.cookies.token) {
        const { sub } = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string);
        if (sub && typeof sub === "string") {
            try {
                const bookmarkedPosts = await prisma.bookmark.findMany({
                    where: {
                        user_id: sub,
                    },
                });
                const bookmarkedPostsIds: string[] = bookmarkedPosts.map((item) => item.id);
                return {
                    props: {
                        blogPostCollection: postsData.blogPostCollection,
                        userBookmarksIds: bookmarkedPostsIds,
                    },
                };
            } catch (error) {
                res.statusCode === 500;
                console.error(error);
                res.end();
            }
        }
    }

    const props: IProps = {
        blogPostCollection: postsData.blogPostCollection,
        userBookmarksIds: null,
    };

    return {
        props,
    };
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="mt-6 w-full">
            <div className="flex flex-col gap-4 mt-8">{children}</div>
        </div>
    );
};

const Posts = ({ blogPostCollection, userBookmarksIds }: IProps) => {
    if (!(blogPostCollection && blogPostCollection.items))
        throw new Error("Something went wrong while building UI");
    return (
        <Layout>
            {blogPostCollection.items.map((post, index) => {
                return (
                    post?.sys.id && (
                        <>
                            <PostPreviewCard
                                key={`post-preview-${index}`}
                                summary={
                                    post?.articleContent?.json.content[0].content[0].value.slice(
                                        0,
                                        80
                                    ) + "..."
                                }
                                post_id={post?.sys.id}
                                title={post?.title || "UNTITLED"}
                                imgUrl={post?.picture?.url || undefined}
                                date={post?.sys.publishedAt}
                                url={`/posts/${post?.sys.id}`}
                                tags={post?.contentfulMetadata.tags}
                                bookmark={
                                    userBookmarksIds && userBookmarksIds.includes(post.sys.id)
                                }
                            />
                            <hr />
                        </>
                    )
                );
            })}
        </Layout>
    );
};

export default Posts;
