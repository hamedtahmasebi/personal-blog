import { gql } from "@apollo/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PostSearchQuery } from "../../generated/graphql";
import apolloClient from "../../lib/apollo-client";

const search: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body.searchTerm) return res.status(400).json({ error: "No search term was provided" });
    try {
        const { data } = await apolloClient.query<PostSearchQuery>({
            query: gql`
                query PostSearch {
                    blogPostCollection {
                        items {
                            title
                            picture {
                                url
                            }
                            articleContent {
                                json
                            }
                            sys {
                                id
                                publishedAt
                            }
                            contentfulMetadata {
                                tags {
                                    name
                                    id
                                }
                            }
                        }
                    }
                }
            `,
        });

        if (!data.blogPostCollection) return res.status(500).end();
        const searchResItems = data.blogPostCollection.items.filter((post) =>
            post?.title?.match(new RegExp(req.body.searchTerm, "i"))
        );

        const searchResult = { ...data.blogPostCollection, items: searchResItems };

        if (searchResItems) return res.status(200).json({ searchResult });
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
};

export default search;
