import { DefaultColorStyle, ShapeProps, StyleProp, T } from '@tldraw/tldraw'
import { ILinkDoc } from './link-doc-types'

export const WeightStyle = StyleProp.defineEnum('linkDoc:weight', {
	defaultValue: 'regular',
	values: ['regular', 'bold'],
})

// Validation for our custom card shape's props, using our custom style + one of tldraw's default styles
export const linkDocProps: ShapeProps<ILinkDoc> = {
	w: T.number,
	h: T.number,
	color: DefaultColorStyle,
	weight: WeightStyle,
	docId: T.string,
}