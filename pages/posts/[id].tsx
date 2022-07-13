import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React, { ReactElement } from "react";
import apolloClient from "../../lib/apollo-client";
import { gql } from "@apollo/client";
import { BlogPost, BlogPostArticleContentLinks } from "../../generated/graphql";
import Paragraph from "../../components/post/Paragraph";
import { Table } from "../../components/post/Table";
import Image from "next/image";
export type TContent = {
    nodeType: string;
    data: any;
    value?: string;
    marks?: { type: string }[];
    content?: TContent[];
};

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
                        links {
                            assets {
                                block {
                                    url
                                    title
                                    sys {
                                        id
                                    }
                                }
                            }
                        }
                    }
                    sys {
                        firstPublishedAt
                        publishedAt
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

// This is a recursive algorithm, in each step, an HTML element will wrap the returned value
// at the end where there are no more elements to add, we will return the value
// some nodeTypes require further work, I have created separate components for those
export const contentDestructureAlgo = (
    node: TContent,
    index: number,
    links?: BlogPostArticleContentLinks
) => {
    const reRunFunctionOneLayerDeeper = (node: TContent) => {
        return node.content!.map((contentObj: TContent) =>
            contentDestructureAlgo(contentObj, index)
        );
    };

    if (node.content) {
        switch (node.nodeType.toLowerCase()) {
            case "heading-1":
                return <h1 className="my-1">{reRunFunctionOneLayerDeeper(node)}</h1>;
            case "heading-2":
                return <h2 className="mt-2">{reRunFunctionOneLayerDeeper(node)}</h2>;
            case "heading-3":
                return <h3 className="mt-2">{reRunFunctionOneLayerDeeper(node)}</h3>;
            case "heading-4":
                return <h4 className="mt-2">{reRunFunctionOneLayerDeeper(node)}</h4>;
            case "heading-5":
                return <h5 className="mt-2">{reRunFunctionOneLayerDeeper(node)}</h5>;
            case "paragraph":
                return <Paragraph key={`paragraph-${index}`} contentfulNode={node} />;
            case "unordered-list":
                return <ul>{reRunFunctionOneLayerDeeper(node)}</ul>;
            case "ordered-list":
                return <ol>{reRunFunctionOneLayerDeeper(node)}</ol>;
            case "list-item":
                return <li>{reRunFunctionOneLayerDeeper(node)}</li>;
            case "blockquote":
                return (
                    <div className="border-l-8 border-primary-main bg-primary-50 dark:border-primaryDark-main dark:bg-primaryDark-200 text-black rounded py-2 pl-6">
                        {reRunFunctionOneLayerDeeper(node)}
                    </div>
                );
            case "table":
                return <Table contentfulNode={node} />;
            case "embedded-asset-block":
                const indexOfPicture = links?.assets.block.findIndex(
                    (item) => item?.sys.id !== node.data.target.sys.id
                );
                console.log(indexOfPicture);
                if (!indexOfPicture)
                    throw new Error("Something went wrong while destructuring pictures");
                const asset = links?.assets.block.at(indexOfPicture);
                if (!asset || !asset.url)
                    throw new Error(
                        `Destructuring pictures: Could not find a url for asset node with id: ${node.data.target.sys.id}`
                    );
                return (
                    <div className="my-4 w-full h-[50vh] relative rounded">
                        <Image src={asset.url} layout={"fill"} objectFit={"cover"} alt="post" />
                    </div>
                );
            default:
                break;
        }
    }
    if (node.marks?.length === 0) {
        return <>{node.value}</>;
    }
};
export const Post = ({ blogPostData }: { blogPostData: BlogPost }) => {
    const { title, articleContent, sys } = blogPostData;
    const { content: contentfulContentArr } = articleContent?.json;
    const reactElementsArr = contentfulContentArr.map((node: TContent, index: number) => {
        return contentDestructureAlgo(node, index, blogPostData.articleContent?.links);
    });

    const publishDate = new Date(sys.publishedAt);

    return (
        <div className="flex w-full justify-center mt-12">
            <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 px-8">
                <div>
                    <h1 className="font-extrabold md:text-4xl text-primary-main dark:text-primaryDark-main">
                        {title}
                    </h1>
                    <span className="text-gray-600 dark:text-gray-200 text-base">
                        {publishDate.toLocaleDateString("en-us", {
                            day: "numeric",
                            month: "short",
                        })}
                    </span>
                </div>
                <article className="mt-6">{reactElementsArr.map((el: ReactElement) => el)}</article>
            </div>
        </div>
    );
};

export default Post;
