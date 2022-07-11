import React from "react";
import ReactMarkdown, { MarkdownToJSX } from "markdown-to-jsx";
import options from "./options";

type MarkdownProps = {
    [key: string]: any;
    children: string;
    options?: MarkdownToJSX.Options;
};

const Markdown: React.FC<MarkdownProps> = (props) => <ReactMarkdown options={options} {...props} />;
export default Markdown;
