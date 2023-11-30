import Async from "../../../node_modules/@preact/async-loader/async.js";

function load(cb) {
    require.ensure([], function (require) {
        var result = require("!!../../../node_modules/babel-loader/lib/index.js??ref--4!./index.js");
        typeof cb === 'function' && cb(result);
    }, "route-home");
}

export default Async(load);
