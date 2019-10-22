let isProduction = process.env.NODE_ENV === 'production';



 
module.exports = {
	plugins: [
		require('autoprefixer'),
		require('cssnano'),
		require('css-mqpacker')({
			preset: [
				'default', {
					discardComments: {
						removeAll: true
					}
				}
			]
		}),

	]
}
 