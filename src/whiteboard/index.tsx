import { Fragment, useState } from "react";
import { Tldraw, Editor, TLTextShape } from "@tldraw/tldraw";
import { getAssetUrls } from "@tldraw/assets/selfHosted";

import { saveData } from "../services/data";
import PropTypes from "prop-types";
import "@tldraw/tldraw/tldraw.css";
import { LinkDocTool } from "./shapes/LinkDoc/LinkDocTool";
import { LinkDocUtil } from "./shapes/LinkDoc/LinkDocUtil";
import { ILinkDoc } from "./shapes/LinkDoc/link-doc-types";
import { LinkTextTool } from "./shapes/LinkText/LinkTextTool";
import { LinkTextUtil } from "./shapes/LinkText/LinkTextUtil";
import { ILinkText } from "./shapes/LinkText/link-text-types";
import { uiOverrides } from "./ui-overrides";

const customShapeUtils = [LinkDocUtil, LinkTextUtil];
const customTools = [LinkDocTool, LinkTextTool];

// {{select * from blocks where id='20220425090637-orsgkk6'}}
const siyuanLinkRegex = /^\{\{select \* from blocks where id=\'(\d+-.+)\'\}\}$/;
// ((20220425090637-orsgkk6 '测试'))
const siyuanTextRegex = /^\(\((\d+\-.+) \'(.+)\'\)\)$/;

export const Whiteboard = (props) => {
  const initData = props.initData;
  const realName = props.name;
  const [editor, setEditor] = useState<Editor>(null);

  const assetUrls = getAssetUrls({
    baseUrl: "/plugins/siyuan-plugin-whiteboard/assets/",
  });

  const setAppToState = (e: Editor) => {
    if (!editor) {
      setEditor(e);
      if (Object.keys(initData).length) {
        e.store.loadSnapshot(initData);
      }
      e.store.listen(() => save(e));

      e.registerExternalContentHandler("text", ({ type, point, text }) => {
        const center = point ?? e.viewportPageCenter;
        if (type === "text") {
          if (siyuanLinkRegex.test(text)) {
            const res = siyuanLinkRegex.exec(text);
            const docId = res[1];
            e.createShape<ILinkDoc>({
              type: "linkDoc",
              x: center.x,
              y: center.y,
              props: {
                docId,
              },
            });
          } else if (siyuanTextRegex.test(text)) {
            const res = siyuanTextRegex.exec(text);
            const docId = res[1];
            e.createShape<ILinkText>({
              type: "linkText",
              x: center.x,
              y: center.y,
              props: {
                docId,
                text: res[2],
              },
            });
          } else {
            e.createShape<TLTextShape>({
              type: "text",
              x: center.x,
              y: center.y,
              props: {
                text,
              },
            });
          }
        }
      });
    }
  };

  let timer;

  function debounce(fn, timeout) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(), timeout);
  }

  function saveNow(e) {
    const json = e.store.getSnapshot();
    saveData(realName, json);
  }

  function save(e) {
    debounce(() => {
      saveNow(e);
    }, 500);
  }

  return (
    <Fragment>
      <div className="whiteboard-component">
        <Tldraw
          onMount={setAppToState}
          persistenceKey={realName}
          assetUrls={assetUrls}
          // Pass in the array of custom shape classes
          shapeUtils={customShapeUtils}
          // Pass in the array of custom tool classes
          tools={customTools}
          // Pass in any overrides to the user interface
          overrides={uiOverrides}
        />
      </div>
    </Fragment>
  );
};

Whiteboard.propTypes = {
  el: PropTypes.object.isRequired,
};
