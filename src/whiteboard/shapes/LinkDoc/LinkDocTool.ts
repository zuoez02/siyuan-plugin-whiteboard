import { BaseBoxShapeTool, TLClickEvent } from '@tldraw/tldraw'

// A tool used to create our custom card shapes. Extending the base
// box shape tool gives us a lot of functionality for free.
export class LinkDocTool extends BaseBoxShapeTool {
	static override id = 'linkDoc'
	static override initial = 'idle'
	override shapeType = 'linkDoc'

	override onDoubleClick: TLClickEvent = (_info) => {
		// you can handle events in handlers like this one;
		// check the BaseBoxShapeTool source as an example
	}
}