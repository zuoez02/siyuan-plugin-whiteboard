import { icon } from './assets/icon';
import { Plugin, openTab } from "siyuan";
import { initWhiteboardTab, initWhiteboardDock } from "./utils";
import './index.scss';

export default class WhiteboardPlugin extends Plugin {
    tab: any;
    tabs: any[];

    onload() {
        this.tab = null;
        this.tabs = [];
        this.addIcons(icon);
        initWhiteboardDock(this);
        this.tab = initWhiteboardTab(this);
    }

    open(name) {
        const tab = this.tab;
        const t = (openTab as any)({
            custom: {
                icon: "iconWhiteboard",
                title: name,
                data: {
                    name,
                },
                fn: tab,
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