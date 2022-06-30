import Image from "next/image";
import Link from "next/link";
import React from "react";
import placeholderImage from "../../public/placeholder-image.png";
interface IPostPreviewCard {
    title: string;
    summary: string;
    url: string;
    imgUrl?: string;
    date: Date;
}

export const PostPreviewCard: React.FC<IPostPreviewCard> = ({
    title,
    summary,
    date,
    url,
    imgUrl,
}) => {
    const dateFormatter = Intl.DateTimeFormat("en", { month: "short", day: "numeric" });
    const dateString = `${dateFormatter.format(new Date(date))}`;
    return (
        <div className="flex shadow-md dark:bg-slate-900 rounded">
            <div className="grid grid-cols-6 w-full">
                <div className="px-6 mt-3 col-span-4">
                    <div className="flex py-1">
                        <a
                            href="#/"
                            className="text-gray-600 dark:text-gray-200 text-sm hover:underline leading-1"
                        >
                            Username
                        </a>
                    </div>
                    <div className="pb-4">
                        <Link href={url}>
                            <a className="">
                                <h4
                                    className="font-extrabold leading-8 transition-all duration-100 
                                text-primary-main hover:text-primary-200 
                                dark:text-primaryDark-main dark:hover:text-primaryDark-200"
                                >
                                    {title}
                                </h4>
                                <p
                                    className="mt-1 text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-50
                                hover:underline"
                                >
                                    {summary}...
                                </p>
                            </a>
                        </Link>

                        <div className="text-gray-400 text-sm mt-2">{dateString}</div>
                    </div>
                </div>
                <div className=" relative p-1 col-span-2 ">
                    {imgUrl && <Image src={imgUrl} alt="post" layout="fill" objectFit="cover" />}
                </div>
            </div>
        </div>
    );
};
