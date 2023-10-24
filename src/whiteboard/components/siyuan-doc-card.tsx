import { getBlockByID, getBlockDom } from "@/api";
import { Fragment, useEffect, useRef, useState } from "react";
import { openTab, Protyle } from 'siyuan';

export function SiyuanDocCard(props) {
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');
    const [count, setCount] = useState(0);

    const element = useRef<HTMLDivElement>();

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
            new Protyle(window.siyuan.ws.app, element.current, {
                blockId: props.docId,
                mode: 'wysiwyg',
                render: {
                    background: false,
                    title: false,
                    gutter: false,
                    scroll: false,
                    breadcrumb: false,
                    breadcrumbDocName: false,
                },
                typewriterMode: false,
            });
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
        <div ref={element} id="protyle"></div>
    </Fragment>
}