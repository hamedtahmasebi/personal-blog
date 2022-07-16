import { gql } from "@apollo/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PostSearchQuery } from "../../generated/graphql";
import apolloClient from "../../lib/apollo-client";

const search: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
    if (!req.body.searchTerm) return res.status(400).json({ error: "No search term was provided" });
    try {
        const { data } = await apolloClient.query<PostSearchQuery>({
            query: gql`
                query PostSearch {
                    blogPostCollection {
                        items {
                            title
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
        const searchRes = data.blogPostCollection.items.filter((post) =>
            post?.title?.match(new RegExp(req.body.searchTerm, "i"))
        );
        if (searchRes && searchRes.length === 0)
            return res.status(404).json({ error: "Not found" });
        res.status(200).json({ searchResult: searchRes });
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
};

export default search;
