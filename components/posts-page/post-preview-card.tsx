import Link from "next/link";
import React from "react";

interface IPostPreviewCard {
    title: string;
    summary: string;
    url: string;
    date: Date;
}

export const PostPreviewCard: React.FC<IPostPreviewCard> = ({ title, summary, date, url }) => {
    return (
        <>
            <section>
                <h3 className="text-primary-main dark:text-primaryDark-main">{title}</h3>
                <p className="mt-3">{summary}...</p>
            </section>
            <div className="flex mt-3 justify-end">
                <button className="bg-primary-main dark:bg-primaryDark-main text-white px-6 py-2 rounded h-auto w-full md:w-auto">
                    <Link href={url}>Read more</Link>
                </button>
            </div>
        </>
    );
};
