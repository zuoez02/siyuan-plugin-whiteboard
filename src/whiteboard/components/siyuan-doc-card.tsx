import { getBlockByID } from "@/api";
import { Fragment, useEffect, useRef, useState } from "react";
import { openTab, Protyle } from "siyuan";

export function SiyuanDocCard(props) {
  const [header, setHeader] = useState("");

  const element = useRef<HTMLDivElement>();

  const shape = props.shape;
  const theme = props.theme;

  const openDoc = (docId) => {
    openTab({
      app: window.siyuan.ws.app,
      doc: {
        id: docId,
      },
    });
  };

  useEffect(() => {
    const docId = props.docId;
    getBlockByID(docId).then((res) => {
      const block = res;
      if (block.type === "d") {
        // document
        setHeader(block.content);
      }
      new Protyle(window.siyuan.ws.app, element.current, {
        action: ["cb-get-html"],
        blockId: props.docId,
        mode: "wysiwyg",
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
    });
  }, []);

  let size;

  switch (shape.props.size) {
    case "s":
      size = "small";
      break;
    case "m":
      size = "medium";
      break;
    case "l":
      size = "large";
      break;
    case "xl":
      size = "x-large";
      break;
    default:
      size = "medium";
  }

  return (
    <Fragment>
      <div
        className="siyuan-doc-card-btn"
        onClick={() => openDoc(props.docId)}
        // You need to stop the pointer down event on buttons
        // that should prevent shape selection or click and drag
        onPointerDown={(e) => e.stopPropagation()}
      >
        打开
      </div>
      {header && (
        <h3
          style={{ marginBottom: "8px", color: theme[shape.props.color].solid }}
        >
          {header}
        </h3>
      )}
      <div
        style={{
          background: "transparent",
          padding: "12px",
          overflow: "hidden",
          userSelect: "none",
          pointerEvents: "all",
          cursor: "pointer",
          backgroundColor: theme[shape.props.color].semi,
          fontWeight: shape.props.weight,
          fontSize: size,
          color: theme[shape.props.color].solid,
          height: header ? shape.props.h - 20 : shape.props.h
        }}
        ref={element}
        id="protyle"
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      ></div>
    </Fragment>
  );
}
