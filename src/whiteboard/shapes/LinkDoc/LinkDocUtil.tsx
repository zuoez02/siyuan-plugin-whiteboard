import {
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLOnResizeHandler,
	getDefaultColorTheme,
	resizeBox,
} from '@tldraw/tldraw'
import { useState } from 'react'
import { linkDocMigrations } from './link-doc-migrations'
import { linkDocProps } from './link-doc-props'
import { ILinkDoc } from './link-doc-types'
import { SiyuanDocCard } from '@/whiteboard/components/siyuan-doc-card'

// A utility class for the card shape. This is where you define
// the shape's behavior, how it renders (its component and
// indicator), and how it handles different events.

export class LinkDocUtil extends ShapeUtil<ILinkDoc> {
	static override type = 'linkDoc' as const
	// A validation schema for the shape's props (optional)
	static override props = linkDocProps
	// Migrations for upgrading shapes (optional)
	static override migrations = linkDocMigrations

	// Flags
	override isAspectRatioLocked = (_shape: ILinkDoc) => false
	override canResize = (_shape: ILinkDoc) => true
	override canBind = (_shape: ILinkDoc) => true

	getDefaultProps(): ILinkDoc['props'] {
		return {
			w: 300,
			h: 300,
			color: 'black',
			weight: 'regular',
			docId: '',
		}
	}

	getGeometry(shape: ILinkDoc) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	// Render method — the React component that will be rendered for the shape
	component(shape: ILinkDoc) {
		const bounds = this.editor.getShapeGeometry(shape).bounds
		const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode })

		// Unfortunately eslint will think this is a class components
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [count, setCount] = useState(0)

		return (
			<HTMLContainer
				id={shape.id}
				style={{
					border: '1px solid black',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'all',
					backgroundColor: theme[shape.props.color].semi,
					fontWeight: shape.props.weight,
					color: theme[shape.props.color].solid,
				}}
			>
				<SiyuanDocCard docId={shape.props.docId}></SiyuanDocCard>
			</HTMLContainer>
		)
	}

	// Indicator — used when hovering over a shape or when it's selected; must return only SVG elements here
	indicator(shape: ILinkDoc) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}

	// Events
	override onResize: TLOnResizeHandler<ILinkDoc> = (shape, info) => {
		return resizeBox(shape, info)
	}
}