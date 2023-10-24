import { defineMigrations } from '@tldraw/tldraw'

// Migrations for the custom card shape (optional but very helpful)
export const linkTextMigrations = defineMigrations({
	currentVersion: 1,
	migrators: {
		1: {
			// for example, removing a property from the shape
			up(shape) {
				const migratedUpShape = { ...shape }
				return migratedUpShape
			},
			down(shape) {
				const migratedDownShape = { ...shape }
				return migratedDownShape
			},
		},
	},
})