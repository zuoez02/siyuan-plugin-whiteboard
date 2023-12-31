import { TLUiOverrides } from '@tldraw/tldraw'

// In order to see select our custom shape tool, we need to add it to the ui.

// let isFullScreen = false;

// function toggleFullscreen(element) {
// 	const el = element;
// 	if (!el) {
// 		return;
// 	}
// 	if (!isFullScreen) {
// 		el.requestFullscreen && el.requestFullscreen();
// 	} else {
// 		document.exitFullscreen && document.exitFullscreen();
// 	}
// 	isFullScreen = !isFullScreen;
// }


export const uiOverrides: TLUiOverrides = {
	tools(editor, tools) {
		// Create a tool item in the ui's context.
		tools.linkDoc = {
			id: 'linkDoc',
			icon: 'color',
			label: 'linkDoc' as any,
			kbd: 'c',
			readonlyOk: false,
			onSelect: () => {
				editor.setCurrentTool('linkDoc')
			},
		}
		tools.linkText = {
			id: 'linkText',
			icon: 'color',
			label: 'linkText' as any,
			kbd: 'c',
			readonlyOk: false,
			onSelect: () => {
				editor.setCurrentTool('linkText')
			},
		}
		return tools
	},
	// toolbar(_app, toolbar, { tools }) {
	// 	// Add the tool item from the context to the toolbar.
	// 	toolbar.splice(4, 0, toolbarItem(tools.linkDoc))
	// 	return toolbar
	// },
	// keyboardShortcutsMenu(_app, keyboardShortcutsMenu, { tools }) {
	// 	// Add the tool item from the context to the keyboard shortcuts dialog.
	// 	const toolsGroup = keyboardShortcutsMenu.find(
	// 		(group) => group.id === 'shortcuts-dialog.tools'
	// 	) as TLUiMenuGroup
	// 	toolsGroup.children.push(menuItem(tools.linkDoc))
	// 	return keyboardShortcutsMenu
	// },
}