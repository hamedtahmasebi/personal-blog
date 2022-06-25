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
    return (
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-2">
            <div className="flex flex-col justify-between h-full shadow-md dark:shadow-2xl rounded-md">
                <div className="">
                    <Image
                        src={imgUrl ? imgUrl : placeholderImage}
                        alt="post-preview-image"
                        className="object-cover rounded-t-md"
                        width={"100"}
                        height={"60"}
                        layout="responsive"
                    />
                    <div className="px-6 mt-3">
                        <h3 className="text-primary-main dark:text-primaryDark-main">{title}</h3>
                        <p className="mt-3">{summary}...</p>
                    </div>
                </div>
                <div className="px-6 py-4 flex flex-col">
                    <div className="flex mt-3 justify-end w-full md:w-auto">
                        <button
                            className="bg-primary-main 
                        dark:bg-primaryDark-main text-white px-6 
                        py-2 rounded h-auto w-full md:w-auto
                        "
                        >
                            <Link href={url}>Read more</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
