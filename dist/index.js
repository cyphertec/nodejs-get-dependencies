"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackageDepChain = exports.transformVersionArray = exports.createPackageList = void 0;
const Log_1 = require("./Log");
const nodejs_lockfile_parser_1 = require("nodejs-lockfile-parser");
const DependenciesParser_1 = __importDefault(require("./DependenciesParser"));
exports.createPackageList = async (manifestFileContent, lockFileContent) => {
    const depTree = await nodejs_lockfile_parser_1.buildDepTree(manifestFileContent, lockFileContent, false, nodejs_lockfile_parser_1.LockfileType.npm, false);
    // strict mode を false にすると package.json と package-lock.json の整合性をチェックしない
    const { dependencies } = depTree;
    // 分割代入で dependencies を取り出す
    const parser = new DependenciesParser_1.default(dependencies);
    const dependenciesList = parser.createDependenciesList();
    Log_1.log('=== start Dependendies List ===');
    Log_1.logArray(dependenciesList);
    return dependenciesList;
};
/**
 * パッケージリストのバージョン情報を配列化する
 * 例えば
 *   { name: 'mime-db', version: '1.23.0' }
 *   { name: 'mime-db', version: '1.42.0' }
 *   { name: 'mime-db', version: '1.44.0' }
 * を以下に整形する。
 *   { name: 'mime-db', versions: [ '1.23.0', '1.42.0', '1.44.0' ] }
 *
 * @param list createPackageList で作成したリスト
 */
exports.transformVersionArray = (list) => {
    const newList = [];
    for (const orgItem of list) {
        const depIndex = newList.findIndex(({ name }) => {
            if (name === orgItem.name) {
                return true;
            }
        });
        if (depIndex === -1) {
            // 新しいパッケージは newList に追加
            newList.push({ name: orgItem.name, versions: [orgItem.version] });
        }
        else {
            // パッケージが存在する場合は versions プロパティを更新
            const versionIndex = newList[depIndex].versions.findIndex((version) => {
                if (version === orgItem.version) {
                    return true;
                }
            });
            if (versionIndex === -1) {
                const versions = newList[depIndex].versions;
                versions.push(orgItem.version);
                newList.splice(depIndex, 1, { name: orgItem.name, versions }); // 配列の更新
            }
        }
    }
    Log_1.log('=== start Transformed Dependendies List ===');
    Log_1.logArray(newList);
    Log_1.log('=== end Transformed Dependendies List ===');
    return newList;
};
/**
 * 指定したパッケージを含む dependencies チェーン を作成する
 * 例： 'mime-db' の dependencies チェーン
 *      'react-native -> @react-native-community/cli -> @react-native-community/cli-server-api
 *       -> compression -> compressible -> mime-db'
 *
 * @param manifestFileContent package.json に相当するファイル名
 * @param lockFileContent package-lock.json に相当するファイル名
 * @param keyPackageName 検索するパッケージ名
 * @param keyVersion 検索するパッケージ名のバージョン
 */
exports.createPackageDepChain = async (manifestFileContent, lockFileContent, keyPackageName, keyVersion = '') => {
    const depTree = await nodejs_lockfile_parser_1.buildDepTree(manifestFileContent, lockFileContent, false, nodejs_lockfile_parser_1.LockfileType.npm, false);
    // strict mode を false にすると package.json と package-lock.json の整合性をチェックしない
    const { dependencies } = depTree;
    // 分割代入で dependencies を取り出す
    const parser = new DependenciesParser_1.default(dependencies);
    const dependenciesChainList = parser.createDependenciesChainList(keyPackageName, keyVersion);
    Log_1.log('=== start Dependendies Chain List ===');
    Log_1.logArray(dependenciesChainList);
    Log_1.log('=== end Dependendies Chain List ===');
    return dependenciesChainList;
};
__exportStar(require("./IDependency"), exports);
__exportStar(require("./IDependencyChain"), exports);
//# sourceMappingURL=index.js.map