import { Fragment } from "react";
import { global } from '../../utils/env';
import { openTab } from 'siyuan';

export function SiyuanLinkCard(props) {
    const openDoc = (docId) => {
        openTab({
            app: window.siyuan.ws.app,
            doc: {
                id: docId,
            }
        })
    }

    let timer;

    const onmouseenter = (e: React.MouseEvent) => {
        timer = setTimeout(() => {
            global.plugin.addFloatLayer({
                ids: [props.docId],
                defIds: [props.docId],
                x: e.clientX,
                y: e.clientY,
            })
        }, 1000);
    }

    const onmouseleave = () => {
        if (timer) {
            clearTimeout(timer)
        }
    }

    return <Fragment>
        <div
            className="siyuan-link-card"
            onClick={() => openDoc(props.docId)}
            onMouseEnter={(e) => onmouseenter(e)}
            onMouseLeave={() => onmouseleave()}
            // You need to stop the pointer down event on buttons
            // that should prevent shape selection or click and drag
            onPointerDown={(e) => e.stopPropagation()}>
                {props.text}
            </div>
    </Fragment>
}