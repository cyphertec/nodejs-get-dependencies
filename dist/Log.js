"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logArray = exports.log = void 0;
const isDebug = false;
exports.log = (item) => {
    if (isDebug) {
        console.log(item);
    }
};
exports.logArray = (array) => {
    if (isDebug) {
        array.forEach((item) => {
            console.log(item);
        });
    }
};
//# sourceMappingURL=Log.js.map