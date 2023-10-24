import './utils/env';
import React from "react";
import ReactDOM from "react-dom/client";
import { icon } from './assets/icon';
import { Plugin, openTab } from "siyuan";
import { initWhiteboardTab, initWhiteboardDock } from "./utils";
import './index.scss';
import { global } from './utils/env';
import { loadData } from './services/data';
import { Tab } from './components/tab';

export default class WhiteboardPlugin extends Plugin {
    tab: any;
    tabs: any[];

    onload() {
        global.plugin = this;
        this.tab = null;
        this.tabs = [];
        this.addIcons(icon);
        initWhiteboardDock(this);
        this.tab = initWhiteboardTab(this);

        this.eventBus.on('loaded-protyle', async (e) => {
            const wb = e.detail?.background?.ial['custom-whiteboard-id'];
            if (wb) {
                const element = e.detail.contentElement;
                const initData = await loadData(wb);
                const root = ReactDOM.createRoot(
                    element,
                );
                root.render(React.createElement(Tab, { initData, name: wb, el: element }));
            }
        })
    }

    open(name) {
        const t = openTab({
            app: this.app,
            custom: {
                icon: "iconWhiteboard",
                title: name,
                data: {
                    name,
                },
                id: 'siyuan-plugin-whiteboardwhiteboard',
            },
        });
        this.tabs.push({ name, tab: t });
    }

    closeTab(name) {
        const t = this.tabs.find((v) => v.name === name);
        if (t) {
            t.tab.close();
        }
    }
}