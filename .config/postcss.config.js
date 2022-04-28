module.exports = {
    parser: false,
    plugins: [
        require("cssnano"),
        require("postcss-import"),
        require("postcss-nested"),
        require("postcss-custom-properties"),
        require("postcss-color-function"),
        require("postcss-custom-media")
    ]
}
