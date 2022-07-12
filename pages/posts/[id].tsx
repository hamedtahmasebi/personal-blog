import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React, { ReactElement } from "react";
import apolloClient from "../../lib/apollo-client";
import { gql } from "@apollo/client";
import { BlogPost } from "../../generated/graphql";
import Paragraph from "../../components/post/Paragraph";
import { Table } from "../../components/post/Table";

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
export const contentDestructureAlgo = (node: TContent, index: number) => {
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
            default:
                break;
        }
    }
    if (node.marks?.length === 0) {
        return <>{node.value}</>;
    }
};
export const Post = ({ blogPostData }: { blogPostData: BlogPost }) => {
    const { title, articleContent } = blogPostData;
    const { content: contentfulContentArr } = articleContent?.json;
    const reactElementsArr = contentfulContentArr.map((node: TContent, index: number) => {
        return contentDestructureAlgo(node, index);
    });
    return (
        <div className="flex w-full justify-center mt-12">
            <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 px-8">
                <h1 className="font-extrabold md:text-4xl text-primary-main dark:text-primaryDark-main">
                    {title}
                </h1>
                <article className="mt-6">{reactElementsArr.map((el: ReactElement) => el)}</article>
            </div>
        </div>
    );
};

export default Post;
