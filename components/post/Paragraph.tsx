import React from "react";
import type { TContent } from "../../pages/posts/[id]";

export const Paragraph = ({ contentfulNode }: { contentfulNode: TContent }) => {
    console.log(contentfulNode);
    let isCode = false;
    contentfulNode.content?.forEach((node) => {
        node.marks?.forEach((mark) => {
            if (mark.type === "code") {
                isCode = true;
            }
        });
    });

    const MarkAdder = (value: string, marks: TContent["marks"]) => {
        let isBold = false,
            isUnderlined = false,
            isItalic = false;
        marks?.forEach((mark) => {
            switch (mark.type.toLowerCase()) {
                case "bold":
                    isBold = true;
                    break;
                case "underline":
                    isUnderlined = true;
                    break;
                case "italic":
                    isItalic = true;
                    break;
                default:
                    break;
            }
        });
        return (
            <span
                className={`${isBold ? "font-bold" : ""} ${isUnderlined ? "underline" : ""}
                ${isItalic ? "italic" : ""}
            `}
            >
                {value}
            </span>
        );
    };

    if (isCode && contentfulNode.content)
        return (
            <pre
                className="bg-black text-white p-4 rounded"
                key={`code-${contentfulNode.content[0].value?.slice(8)}`}
            >
                {contentfulNode.content[0].value}
            </pre>
        );
    return (
        <p className="whitespace-pre-wrap my-1">
            {contentfulNode.content?.map((node, index) => {
                return (
                    <>
                        {node.value && node.nodeType === "text" && (
                            <span key={`paragraph-${index}-${node.value?.slice(8)}`} className="">
                                {MarkAdder(node.value, node.marks)}
                            </span>
                        )}
                        {node.nodeType.toLowerCase() === "hyperlink" && node.content && (
                            <a
                                className="dark:text-primaryDark-main text-primary-300 underline "
                                href={node.data.uri}
                            >
                                {node.content[0].value}
                            </a>
                        )}
                    </>
                );
            })}
        </p>
    );
};

export default Paragraph;
