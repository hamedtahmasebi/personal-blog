import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import placeholderImage from "../../public/placeholder-image.png";
import profileAvatarPlaceholder from "../../public/profile-avatar-placeholder.png";
import { BsBookmarkPlus } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { ContentfulMetadata, ContentfulTag } from "../../generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import PopUp from "../pop-up";
import PrimaryButton from "../primary-button";
interface IPostPreviewCard {
    title: string;
    url: string;
    summary: string;
    imgUrl?: string;
    date: Date;
    tags?: ContentfulMetadata["tags"];
}

export const PostPreviewCard: React.FC<IPostPreviewCard> = ({
    title,
    date,
    url,
    imgUrl,
    summary,
    tags,
}) => {
    const dateFormatter = Intl.DateTimeFormat("en", { month: "short", day: "numeric" });
    const dateString = `${dateFormatter.format(new Date(date))}`;

    const [showAlert, setShowAlert] = React.useState(false);

    const bookmark = React.useRef<HTMLButtonElement>(null);

    if (bookmark) {
        bookmark.current?.onmouseover;
    }

    return (
        <div className="flex my-1 rounded">
            <div className="grid grid-cols-6 w-full">
                <div className="col-span-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-200">
                        <div className="relative w-6 h-6 rounded-full">
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
                        </a>
                        <span className="mx-1">•</span>
                        <span className="text-sm">{dateString}</span>
                    </div>
                    <div className="mt-2">
                        <Link href={url}>
                            <a className="">
                                <h4
                                    className="font-extrabold leading-8 transition-all duration-100 
                                text-primary-main hover:text-primary-200 
                                dark:text-primaryDark-main dark:hover:text-primaryDark-200"
                                >
                                    {title}
                                </h4>
                            </a>
                        </Link>

                        <Link href={url}>
                            <p className="hidden md:block hover:underline hover:cursor-pointer">
                                {summary}
                            </p>
                        </Link>

                        {tags && (
                            <p className="mt-3">
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

                        <div className="flex justify-between items-center text-gray-500 dark:text-gray-200 mt-2">
                            <div className="flex">
                                <span className="text-sm">3 min read</span>
                            </div>
                            <div className="flex gap-1 mr-4 relative">
                                <button
                                    ref={bookmark}
                                    onMouseOver={(e) => setShowAlert(true)}
                                    onMouseLeave={(e) => setShowAlert(false)}
                                    className="ml-2 hover:text-black transition-all p-1"
                                >
                                    <BsBookmarkPlus size={22} />
                                </button>
                                {showAlert && !sessionStorage.getItem("access_token") && (
                                    <PopUp
                                        onMouseOver={(e) => setShowAlert(true)}
                                        onMouseLeave={(e) => setShowAlert(false)}
                                        style={{ top: "35px", left: "5px" }}
                                    >
                                        <div className="text-xs">
                                            To add a bookmark you have to login
                                        </div>
                                        <PrimaryButton className="rounded-md py-0 mt-2">
                                            <span className="text-xs">Login</span>
                                        </PrimaryButton>
                                    </PopUp>
                                )}
                                <button className="ml-2 hover:text-red-900 transition-all p-1">
                                    <BiMinusCircle size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" relative p-1 col-span-2 ">
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
