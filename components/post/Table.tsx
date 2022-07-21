import React from "react";
import type { TContent } from "../../pages/posts/[id]";
import { contentDestructureAlgo } from "../../pages/posts/[id]";
export const Table = ({ contentfulNode }: { contentfulNode: TContent }) => {
    // this one is a little bit tricky. because of the data structure that contentful returns
    // and we have to be careful about HTML structure
    // in order to do that, we need to separate heading rows from normal rows
    // please review contentful data structure to better understand the code
    if (!contentfulNode.content) throw new Error("No content found in" + contentfulNode.nodeType);

    let tableRows = contentfulNode.content.map((tableRow: TContent) => {
        if (tableRow.content && tableRow.content[0].nodeType === "table-header-cell") {
            return { rowType: "heading", content: tableRow.content };
        }
        if (tableRow.content && tableRow.content[0].nodeType === "table-cell") {
            return { rowType: "cell", content: tableRow.content };
        }
    });
    let tableHeadingRows = tableRows.filter((row) => row?.rowType === "heading");
    let tableCellRows = tableRows.filter((row) => row?.rowType === "cell");

    return (
        <table className="table my-1">
            <thead>
                {/* creates the thead rows */}
                {tableHeadingRows.map((row, rowIndex) => (
                    <tr key={`tr-${row?.rowType}-${rowIndex}`}>
                        {/* creates th elements */}
                        {row?.content.map((th, headingIndex) => (
                            <th className="th font-bold" key={`th-${row.rowType}-${headingIndex}`}>
                                {/* Runs the algorithm on th content and returns expected elements */}
                                {th.content?.map((contentObj, headingContentIndex) =>
                                    contentDestructureAlgo(contentObj, headingContentIndex)
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {/* creates the tbody rows */}
                {tableCellRows.map((row, index) => (
                    <tr key={`tr-${row?.rowType}-${index}`}>
                        {/* creates td elements */}
                        {row?.content.map((td, index2) => (
                            <td className="td" key={`td-${row.rowType}-${index2}`}>
                                {/* Runs the algorithm on td content and returns expected elements */}
                                {td.content?.map((contentObj, index3) =>
                                    contentDestructureAlgo(contentObj, index3)
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
