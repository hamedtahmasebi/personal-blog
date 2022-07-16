import { useEffect, useState } from "react";
import { PostPreviewCard } from "../../components/posts-page/post-preview-card";
import { BlogPost, PostSearchQuery } from "../../generated/graphql";
import { baseUrl } from "../../utilities/routes";
import { useRouter } from "next/router";
import { Layout as PostsPageLayout } from "../index";
import axios from "axios";
export const Search: React.FC = () => {
    const { query } = useRouter();

    const [posts, setPosts] = useState([]);

    const getSearchResults = async () => {
        try {
            const res = await axios.post(`${baseUrl}/api/search`, {
                searchTerm: query.search_term,
            });
            if (res.status === 200) {
                setPosts(res.data.searchResult);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (query.search_term) {
            getSearchResults();
        }
    }, [query]);

    return (
        <PostsPageLayout>
            <div>
                <h2>
                    <span className="text-gray-400">Search result for: </span>
                    <span className="">{query.search_term}</span>
                </h2>
            </div>
            <hr />
            {posts.map((post: Partial<BlogPost>, index) => {
                if (!(post?.sys?.id && post.title && post.sys?.publishedAt)) return;
                return (
                    <div className="w-full lg:w-3/5 px-5" key={`post-preview-${index}`}>
                        <PostPreviewCard
                            post_id={post.sys?.id}
                            summary={" "}
                            key={`search-result-${index}`}
                            title={post.title ? post.title : "Untitled"}
                            date={post.sys.publishedAt}
                            url={`/posts/${post.sys?.id}`}
                        />
                    </div>
                );
            })}
        </PostsPageLayout>
    );

    // return (
    //     <div>
    //         {posts && posts.map((post) => <span key={post.sys.id}>{post.title}</span>)}
    //         {posts.length > 0 &&
    //             posts.map((post, index) => (
    //                 <PostPreviewCard
    //                     key={`search-res-${index}`}
    //                     title={post.title ? post.title : "Untitled"}
    //                     date={post.sys.publishedAt}
    //                     url={`${baseUrl}/posts/${post.sys.id}`}
    //                     post_id={post.sys.id}
    //                     summary={"..."}
    //                     tags={post?.contentfulMetadata.tags}
    //                 />
    //             ))}
    //     </div>
    // );
};

export default Search;
