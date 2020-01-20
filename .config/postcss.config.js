module.exports = {
    parser: false,
    plugins: {
        'postcss-import': {},
        'postcss-nested': {},
        'postcss-custom-properties': {},
        'postcss-color-function': {
            'preserveCustomProps': true
        },
        'postcss-preset-env': {
            'stage': 0
        },
        'autoprefixer': {},
        'cssnano': {}
    }
}