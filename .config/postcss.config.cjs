module.exports = {
	parser: false,
    plugins: [
        require("cssnano"),
        require("postcss-import"),
        require("postcss-nested"),
        require("postcss-custom-media"),
        require("postcss-extend-rule"),
        require("@csstools/custom-units")
    ]
}
