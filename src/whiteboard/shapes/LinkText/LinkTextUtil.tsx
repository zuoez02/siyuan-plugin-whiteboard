import {
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLOnResizeHandler,
	getDefaultColorTheme,
	resizeBox,
} from '@tldraw/tldraw'
import { linkTextMigrations } from './link-text-migrations'
import { linkTextProps } from './link-text-props'
import { ILinkText } from './link-text-types'
import { SiyuanLinkCard } from '@/whiteboard/components/siyuan-link-card'

// A utility class for the card shape. This is where you define
// the shape's behavior, how it renders (its component and
// indicator), and how it handles different events.

export class LinkTextUtil extends ShapeUtil<ILinkText> {
	static override type = 'linkText' as const
	// A validation schema for the shape's props (optional)
	static override props = linkTextProps
	// Migrations for upgrading shapes (optional)
	static override migrations = linkTextMigrations

	// Flags
	override isAspectRatioLocked = (_shape: ILinkText) => false
	override canResize = (_shape: ILinkText) => true
	override canBind = (_shape: ILinkText) => true

	getDefaultProps(): ILinkText['props'] {
		return {
			w: 300,
			h: 300,
			color: 'black',
			size: 'm',
			weight: 'regular',
			docId: '',
			text: '',
		}
	}

	getGeometry(shape: ILinkText) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	// Render method — the React component that will be rendered for the shape
	component(shape: ILinkText) {
		const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode })

		// Unfortunately eslint will think this is a class components
		// eslint-disable-next-line react-hooks/rules-of-hooks
		let size;

		switch(shape.props.size) {
			case 's': size = 'small'; break;
			case 'm': size = 'medium'; break;
			case 'l': size = 'large'; break;
			case 'xl': size = 'x-large'; break;
			default: size = 'medium';
		}

		return (
			<HTMLContainer
				id={shape.id}
				className='siyuan-doc-card'
				style={{
					padding: '12px',
					lineHeight: 1.2,
					userSelect: 'none',
					pointerEvents: 'all',
					cursor: 'pointer',
					fontWeight: shape.props.weight,
					fontSize: size,
					color: theme[shape.props.color].solid,
				}}
			>
				<SiyuanLinkCard docId={shape.props.docId} text={shape.props.text}></SiyuanLinkCard>
			</HTMLContainer>
		)
	}

	// Indicator — used when hovering over a shape or when it's selected; must return only SVG elements here
	indicator(shape: ILinkText) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}

	// Events
	override onResize: TLOnResizeHandler<ILinkText> = (shape, info) => {
		return resizeBox(shape, info)
	}
}