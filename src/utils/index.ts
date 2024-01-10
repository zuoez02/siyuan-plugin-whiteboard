import React from "react";
import ReactDOM from "react-dom/client";
import { loadData, loadAllFiles } from "../services/data";
import { Dock } from "../components/dock";
import { Tab } from "../components/tab";

export function registerIcon(name, size, svg) {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" xmlns="http://www.w3.org/2000/svg">
      <defs>
          <symbol id="${name}" viewBox="0 0 ${size} ${size}">
              ${svg}
          </symbol>
      </defs>
  </svg>`
  );
}

export function initWhiteboardTab(plugin) {
  return plugin.addTab({
    type: `whiteboard`,
    async init() {
      this.element.innerHTML =
        `<div class="fn__flex fn__flex-1 fn__flex-column"><div style="border: none" class="whiteboard whiteboard-wrapper fn__flex fn__flex-1"></div></div>`;
      const initData = await loadData(this.data.name);
      const wrapper = this.element.querySelector(".whiteboard-wrapper") as HTMLElement;
      const shadow = wrapper.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      fetch('/plugins/siyuan-plugin-whiteboard/index.css').then((res) => res.text()).then((text) => {
        style.innerText = text;
      })

      document.head.querySelectorAll('link[rel=stylesheet]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) {
          return;
        }
        let url: string;
        if (href.startsWith('base') && href.endsWith('.css')) {
          url = window.location.pathname + '/' + href;
        } else if (/^\S+base\.\S+\.css$/.test(href)) {
          url = href;
        } else {
          return;
        }
        fetch(url).then((res) => res.text()).then((text) => {
          let baseStyle = document.createElement('style');
          baseStyle.innerText = text;
          shadow.appendChild(baseStyle);
        })
      })
      shadow.appendChild(style);
      const rootEl = document.createElement('div');
      rootEl.style.flex = 'auto';
      shadow.appendChild(rootEl);
      const root = ReactDOM.createRoot(
        rootEl
      );
      root.render(React.createElement(Tab, { initData, name: this.data.name, el: this.element }));
      this.data.destroy = () => {
        root && root.unmount();
      };
    },
    beforeDestroy() {
      this.data.destroy && this.data.destroy();
    },
  });
}

export async function initWhiteboardDock(plugin) {
  const props = {
    files: [],
    plugin,
  };
  const data = await loadAllFiles();
  if (data) {
    props.files = data;
  }
  let root;
  plugin.addDock({
    config: {
      position: "LeftBottom",
      size: { width: 200, height: 0 },
      icon: "iconWhiteboard",
      title: "白板",
    },
    data: {
      files: props.files,
    },
    type: "WhiteboardDock",
    init() {
      root = ReactDOM.createRoot(this.element);
      root.render(React.createElement(Dock, props));
    },
  });
}