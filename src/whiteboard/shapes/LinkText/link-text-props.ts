import { DefaultColorStyle, DefaultSizeStyle, ShapeProps, StyleProp, T } from '@tldraw/tldraw'
import { ILinkText } from './link-text-types'

export const WeightStyle = StyleProp.defineEnum('linkText:weight', {
	defaultValue: 'regular',
	values: ['regular', 'bold'],
});

export const SizeStyle = StyleProp.defineEnum('linkText:size', {
	defaultValue:  'm',
	values: ['s', 'm', 'l', 'xl'],
});

// Validation for our custom card shape's props, using our custom style + one of tldraw's default styles
export const linkTextProps: ShapeProps<ILinkText> = {
	w: T.number,
	h: T.number,
	color: DefaultColorStyle,
	weight: WeightStyle,
	size: DefaultSizeStyle,
	docId: T.string,
	text: T.string,
}