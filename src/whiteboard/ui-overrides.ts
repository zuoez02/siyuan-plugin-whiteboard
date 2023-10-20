import { TLUiMenuGroup, TLUiOverrides, menuItem, toolbarItem } from '@tldraw/tldraw'

// In order to see select our custom shape tool, we need to add it to the ui.

let isFullScreen = false;

function toggleFullscreen(element) {
    const el = element;
    if (!el) {
      return;
    }
    if (!isFullScreen) {
      el.requestFullscreen && el.requestFullscreen();
    } else {
      document.exitFullscreen && document.exitFullscreen();
    }
    isFullScreen = !isFullScreen;
  }


export const uiOverrides: TLUiOverrides = {
	// actions(editor, actions) {
	// 	// Create a new action or replace an existing one
	// 	actions['fullscreen'] = {
	// 		id: 'fullscreen',
	// 		label: 'fullscreen',
	// 		readonlyOk: true,
	// 		kbd: '$u',
	// 		onSelect() {
	// 			toggleFullscreen(editor.getContainer());
	// 		},
	// 	}
	// 	return actions
	// },
    // menu(editor, menu, { actions }) {
	// 	// using the findMenuItem helper
	// 	const fileMenu = findMenuItem(menu, ['menu', 'file'])
	// 	if (fileMenu.type === 'submenu') {
	// 		// add the new item to the file menu's children
	// 		const newMenuItem = menuItem(actions['my-new-action'])
	// 		fileMenu.children.unshift(newMenuItem)
	// 	}
	// 	return menu
	// },
}