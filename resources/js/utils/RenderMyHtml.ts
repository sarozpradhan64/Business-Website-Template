//https://www.npmjs.com/package/dompurify
//https://github.com/remarkablemark/html-react-parser

import parse, { domToReact } from "html-react-parser";
import DOMPurify from "dompurify";

export default function RenderMyHtml(html, opts = {}) {
    return parse(DOMPurify.sanitize(html), {
        // ...{
        //   replace: replaceNode,
        // },
        // ...opts,
    });
}
