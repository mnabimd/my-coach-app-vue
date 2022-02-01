const path = require('path');

module.exports = {
    // The built dirctory output
    outputDir: path.resolve(__dirname, '../server/public'),
    // When you're in development mode
    devServer: {
        proxy: 'http://localhost:7500'
    }
}