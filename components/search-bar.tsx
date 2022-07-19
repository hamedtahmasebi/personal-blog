import { FormEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import * as ROUTES from "../utilities/routes";

type TProps = {
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    defaultValue?: string;
};

export const SearchBar: React.FC<TProps> = ({ onSubmit, defaultValue }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(defaultValue ?? "");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit && onSubmit(e);
                router.push(ROUTES.baseUrl + ROUTES.SEARCH + `?search_term=${searchTerm}`);
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
                    <BsSearch size={20} />
                </span>
                <input
                    type="text"
                    className="outline-none w-full peer text-gray-700 dark:text-slate-200"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>
        </form>
    );
};

export default SearchBar;
