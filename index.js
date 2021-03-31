if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/vue-show-chart.min.js');
} else {
    module.exports = require('./dist/vue-show-chart.js');
}