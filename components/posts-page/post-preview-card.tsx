import Image from "next/image";
import Link from "next/link";
import React from "react";
import placeholderImage from "../../public/placeholder-image.png";
import profileAvatarPlaceholder from "../../public/profile-avatar-placeholder.png";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { ContentfulMetadata, ContentfulTag } from "../../generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import * as ROUTES from "../../utilities/routes";
import axios, { AxiosError } from "axios";
import { BOOKMARK } from "../../utilities/apiEndPoints";
import { toast } from "react-toastify";
import Modal from "../modal";
import Register from "../auth/register";
interface IPostPreviewCard {
    post_id: string;
    title: string;
    url: string;
    summary: string;
    imgUrl?: string;
    date: Date;
    tags?: ContentfulMetadata["tags"];
    bookmark?: boolean | null;
}

export const PostPreviewCard: React.FC<IPostPreviewCard> = ({
    post_id,
    title,
    date,
    url,
    imgUrl,
    summary,
    tags,
    bookmark,
}) => {
    const dateFormatter = Intl.DateTimeFormat("en", { month: "short", day: "numeric" });
    const dateString = `${dateFormatter.format(new Date(date))}`;

    const [showLoginModal, setShowLoginModal] = React.useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = React.useState(bookmark);
    const handleClickOnBookmark = async (): Promise<void> => {
        if (!isBookmarked) {
            try {
                await axios.post(`${ROUTES.baseUrl}/${BOOKMARK}/${post_id}`);
                toast.success("Added bookmark successfully", { toastId: post_id.slice(3) });
                setIsBookmarked(true);
                return;
            } catch (error) {
                if (error instanceof AxiosError) {
                    error.response?.data.error && toast.error(error.response?.data.error);
                    if (error.response?.data.isAuthenticated === false) {
                        setShowLoginModal(true);
                    }
                }
                console.error(error);
                return;
            }
        }
        if (isBookmarked) {
            try {
                const res = await axios.delete(`${ROUTES.baseUrl}/${BOOKMARK}/${post_id}`);
                if (res.status === 200) {
                    toast.success("Deleted bookmark successfully");
                    setIsBookmarked(false);
                    return;
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
                return;
            }
        }
    };

    return (
        <div className="flex my-1 rounded">
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <div>
                        <p className="text-center">Please log in to bookmark a post</p>
                        <div className="mt-4">
                            <Register />
                        </div>
                    </div>
                </Modal>
            )}
            <div className="grid grid-cols-8 w-full">
                <div className="col-span-6">
                    <div className="flex items-center text-gray-500 dark:text-gray-200">
                        {/* <div className="relative w-6 h-6 rounded-full">
                            <span className="absolute w-full h-full top-0 rounded-full overflow-hidden">
                                <Image
                                    src={profileAvatarPlaceholder}
                                    width={20}
                                    height={20}
                                    layout="fill"
                                    alt="profile"
                                />
                            </span>
                        </div>

                        <a href="#/" className="ml-2 text-sm hover:underline leading-1">
                            Username
                        </a> */}
                        {/* <span className="mx-1">•</span> */}
                        <span className="text-sm">{dateString}</span>
                    </div>
                    <div className="">
                        <Link href={url}>
                            <a className="">
                                <h4
                                    className="font-extrabold leading-8 transition-all md:text-2xl duration-100 
                                    text-primary-main hover:text-primary-500 
                                    dark:text-primaryDark-main dark:hover:text-primaryDark-200"
                                >
                                    {title}
                                </h4>
                            </a>
                        </Link>

                        <Link href={url}>
                            <p className="hidden md:block hover:underline hover:cursor-pointer text-[15px]">
                                {summary ? summary : " "}
                            </p>
                        </Link>

                        <div className="flex justify-between items-center text-gray-500 dark:text-gray-200 mt-2">
                            <div className="flex gap-2">
                                {tags && (
                                    <p className="my-0 py-0 text-xs">
                                        {tags.map(
                                            (tag: Maybe<ContentfulTag>) =>
                                                tag &&
                                                tag.name && (
                                                    <button
                                                        key={tag.name.slice(4)}
                                                        className="text-sm bg-gray-200 text-gray-500 rounded-full px-2
                                                transition-all hover:bg-gray-300 hover:text-gray-600
                                                dark:bg-gray-500 dark:text-gray-200
                                                dark:hover:bg-gray-600 dark:hover:text-gray-300
                                                "
                                                    >
                                                        {tag.name}
                                                    </button>
                                                )
                                        )}
                                    </p>
                                )}

                                {/* <div className="flex">
                                    <span className="text-sm">3 min read</span>
                                </div> */}
                            </div>
                            <div className="flex gap-1 mr-4 relative">
                                <button
                                    className="ml-2 hover:text-black transition-all p-1"
                                    onClick={handleClickOnBookmark}
                                >
                                    {isBookmarked ? (
                                        <BsFillBookmarkCheckFill
                                            size={22}
                                            className="text-emerald-600"
                                        />
                                    ) : (
                                        <BsBookmarkPlus size={22} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative p-1 col-span-2">
                    <Image
                        src={imgUrl ? imgUrl : placeholderImage}
                        alt="post"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    );
};
