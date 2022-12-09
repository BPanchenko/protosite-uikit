module.exports = {
	parser: false,
    plugins: [
        require("cssnano"),
        require("postcss-import"),
        require("postcss-nested"),
        require("postcss-color-function"),
        require("postcss-custom-media"),
        require("@csstools/custom-units")
    ]
}
