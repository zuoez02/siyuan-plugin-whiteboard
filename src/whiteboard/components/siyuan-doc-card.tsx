import { getBlockByID, getChildBlocks } from "@/api";
import { Fragment, useEffect, useState } from "react";

export function SiyuanDocCard(props) {
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const docId = props.docId;
        getBlockByID(docId).then((res) => {
            const block = res;
            console.log(block, props.docId);
            if (block.type === 'd') {
                // document
                setHeader(block.content);

                getChildBlocks(docId).then((blocks) => {
                    console.log(blocks);
                    const first = blocks[0];
                    if (first) {
                        getBlockByID(first.id).then((b) => {
                            const content = b.content;
                            setContent(content);
                        })
                    }
                })
            }
        })
    }, [])

    return <Fragment>
        <h2>{header}</h2>
        <div dangerouslySetInnerHTML={ { __html: content }}></div>
    </Fragment>
}