import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../utilities/routes";
import { SEARCH } from "../utilities/apiEndPoints";
import Spinner from "../components/spinner";
import { PostSearchQuery } from "../generated/graphql";
import { PostPreviewCard } from "../components/posts-page/post-preview-card";
import SearchBar from "../components/search-bar";
export const Search = () => {
    const router = useRouter();
    const { query } = router;
    const [searchResult, setSearchResult] = useState<PostSearchQuery["blogPostCollection"]>();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const search = async () => {
        setIsPending(true);
        try {
            const res = await axios.post(baseUrl + SEARCH, { searchTerm: query.search_term });
            if (res.status === 200) {
                setSearchResult(res.data.searchResult);
                setError(null);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.error);
            }
        }
        setIsPending(false);
    };

    useEffect(() => {
        if (query.search_term) {
            search();
        }
    }, [query]);

    if (isPending)
        return (
            <div className="flex mt-12 w-full justify-center">
                <div className="h-8 w-8">
                    <Spinner />
                </div>
            </div>
        );

    return (
        <div className="mt-12">
            <div className="my-3">
                <SearchBar
                    defaultValue={typeof query.search_term === "string" ? query.search_term : ""}
                />
            </div>
            {!query.search_term && (
                <span className="text-slate-600">
                    Please enter a keyword and hit Enter to search
                </span>
            )}
            {error && <b className="text-red-600">{error}</b>}
            {query.search_term && !error && (
                <>
                    <h3 className="text-slate-600 dark:text-slate-300">
                        Search Results for:{" "}
                        <span className="text-black dark:text-white">{query.search_term}</span>
                    </h3>
                    {searchResult?.items && searchResult.items.length === 0 && (
                        <span>
                            No results for <b>{query.search_term}</b>
                        </span>
                    )}
                    {searchResult?.items && (
                        <div className="mt-6 w-full">
                            <div className="flex flex-col gap-4 mt-8">
                                {searchResult.items.map((post, index) => (
                                    <>
                                        {post && post.sys.id && (
                                            <>
                                                <div
                                                    key={`search-res-post-preview-${index}`}
                                                    className="my-2 px-4 py-2"
                                                >
                                                    <PostPreviewCard
                                                        summary={
                                                            post?.articleContent?.json.content[0].content[0].value.slice(
                                                                0,
                                                                80
                                                            ) + "..."
                                                        }
                                                        post_id={post.sys.id}
                                                        title={post.title || "UNTITLED"}
                                                        imgUrl={post.picture?.url || undefined}
                                                        date={post?.sys.publishedAt}
                                                        url={`/posts/${post?.sys.id}`}
                                                        tags={post.contentfulMetadata.tags}
                                                    />
                                                </div>
                                                <div className="my-2">
                                                    <hr />
                                                </div>
                                            </>
                                        )}
                                    </>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

Search.getLayout = function (page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Search;
