module.exports = {
	parser: false,
    plugins: [
        require("cssnano")(require("./cssnano.config.cjs")),
        require("postcss-import"),
        require("postcss-nested"),
        require("postcss-custom-selectors"),
        require("postcss-custom-media"),
        require("postcss-extend-rule")({
			onRecursiveExtend: 'warm'
		}),
        require("@csstools/custom-units")
    ]
}
