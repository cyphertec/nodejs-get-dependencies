"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logArray = exports.log = void 0;
const log4js = __importStar(require("log4js"));
const initLogger = () => {
    log4js.configure({
        appenders: {
            system: { type: 'file', filename: 'system.log' }
        },
        categories: {
            default: { appenders: ['system'], level: 'debug' }
        }
    });
    return log4js.getLogger('system');
};
exports.log = (item) => {
    logger.debug(item);
};
exports.logArray = (array) => {
    array.forEach((item) => {
        logger.debug(item);
    });
};
const logger = initLogger();
//# sourceMappingURL=Log.js.map