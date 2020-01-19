module.exports = {
    parser: false,
    plugins: {
        'postcss-import': {},
        'postcss-nested': {},
        'postcss-custom-properties': {},
        'postcss-preset-env': {
            'stage': 0
        },
        'autoprefixer': {},
        'cssnano': {}
    }
}