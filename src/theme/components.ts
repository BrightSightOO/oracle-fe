export const components = {
	Button: {
		baseStyle: {},
		variants: {
			primaryAction: {
				py: 2,
				px: 4,
				bg: 'bluePrimary',
				color: 'textSecondary',
				_hover: { bg: 'blueHover' },
				_disabled: {
					_hover: {
						background: 'blueHover' + ' !important',
					},
					opacity: 0.3,
					cursor: 'not-allowed',
				},
			},
			primaryActionOutline: {
				py: 2,
				px: 4,
				color: 'bluePrimary',
				border: '1px solid',
				borderColor: 'bluePrimary',
				_hover: {
					bg: 'blueHover',
					color: 'textSecondary',
				},
				_disabled: {
					_hover: {
						background: 'blueHover' + ' !important',
						color: 'textSecondary' + ' !important',
					},
					opacity: 0.3,
					cursor: 'not-allowed',
				},
			},
			secondaryAction: {
				py: 2,
				px: 4,
				bg: 'textSecondary',
				color: 'bluePrimary',
				_hover: {
					bg: 'blueHover',
					color: 'textSecondary',
				},
				_disabled: {
					_hover: {
						background: 'blueHover' + ' !important',
					},
					opacity: 0.3,
					cursor: 'not-allowed',
				},
			},
			darkButton: {
				py: 2,
				px: 4,
				bg: 'greyDark',
				color: 'textSecondary',
				_hover: {
					bg: 'greyMedium',
					color: 'textSecondary',
				},
				_disabled: {
					_hover: {
						background: 'greyDark' + ' !important',
					},
					opacity: 0.75,
					cursor: 'not-allowed',
				},
			},
			warning: {
				bg: 'redSubdued',
				color: 'textSecondary',
				_hover: { bg: 'redSubdued' },
				_disabled: {
					_hover: {
						background: 'red4' + ' !important',
					},
					opacity: 0.3,
					cursor: 'not-allowed',
				},
			},
		},
	},
	Progress: {
		baseStyle: {
			filledTrack: {
				bg: 'lightGrey',
			},
		},
	},
};
