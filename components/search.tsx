import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";

export const Search: React.FC = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                router.push(`/posts/search?search_term=${searchTerm}`);
            }}
        >
            <label
                className="flex items-center gap-2 p-2 border 
            bg-slate-50 dark:bg-slate-800 dark:focus-within:bg-slate-900 text-slate-400 rounded-lg 
            focus-within:bg-white focus-within:border-primary-main dark:focus-within:border-primaryDark-main
              focus-within:shadow-lg bootstrap-like-box-shadow  
            "
            >
                <span>
                    <BsSearch />
                </span>
                <input
                    type="text"
                    className="outline-none w-full peer"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>
        </form>
    );
};

export default Search;
