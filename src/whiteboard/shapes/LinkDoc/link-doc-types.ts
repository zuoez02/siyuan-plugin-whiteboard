import { TLBaseShape, TLDefaultColorStyle, TLDefaultSizeStyle } from '@tldraw/tldraw'

// We'll have a custom style called weight
export type IWeightStyle = 'regular' | 'bold'
export type ISizeStyle = TLDefaultSizeStyle;

// A type for our custom card shape
export type ILinkDoc = TLBaseShape<
	'linkDoc',
	{
		w: number
		h: number
		color: TLDefaultColorStyle
		weight: IWeightStyle,
		size: TLDefaultSizeStyle,
		docId: string
	}
>