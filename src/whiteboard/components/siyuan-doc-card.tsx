import { getBlockByID, getBlockDom } from "@/api";
import { Fragment, useEffect, useState } from "react";
import { openTab } from 'siyuan';

export function SiyuanDocCard(props) {
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');
    const [count, setCount] = useState(0);

    const openDoc = (docId) => {
        console.log(docId);
        setCount(count + 1)
        openTab({
            app: window.siyuan.ws.app,
            doc: {
                id: docId,
            }
        })
    }

    useEffect(() => {
        const docId = props.docId;
        getBlockByID(docId).then((res) => {
            const block = res;
            if (block.type === 'd') {
                // document
                setHeader(block.content);
            }
            getBlockDom(docId).then(content => {
                let dom = content.dom.replace(/contenteditable=\"true\"/g, '');
                dom = dom.replace(/contenteditable=\"false\"/g, '');
                dom = dom.replace(/contentEditable=\"true\"/g, '');
                dom = dom.replace(/contentEditable=\"false\"/g, '');
                setContent(dom);
            })
        })
    }, [])

    return <Fragment>
        <div
            className="siyuan-doc-card-btn"
            onClick={() => openDoc(props.docId)}
            // You need to stop the pointer down event on buttons
            // that should prevent shape selection or click and drag
            onPointerDown={(e) => e.stopPropagation()}>打开</div>
        <h2>{header}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Fragment>
}