"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DependenciesParser {
    constructor(json) {
        this.dependenciesList = [];
        this.filteredDependenciesList = [];
        this.dependenciesChainList = [];
        /**
         * パッケージリストを作る
         */
        this.createDependenciesList = () => {
            // リストが未作成の場合は作成する
            if (this.filteredDependenciesList.length !== 0) {
                return this.filteredDependenciesList;
            }
            this.parseList(this.jsonData);
            // ソート
            this.dependenciesList.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                else if (a.name > b.name) {
                    return 1;
                }
                else {
                    if (a.version < b.version) {
                        return -1;
                    }
                    else if (a.version > b.version) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            });
            // 重複を削除
            this.filteredDependenciesList = this.dependenciesList.filter((element, index, self) => {
                return self.findIndex((e) => e.name === element.name && e.version === element.version) === index;
            }); // https://kojimanotech.com/2020/03/20/208/
            return this.filteredDependenciesList;
        };
        /**
         * 指定したパッケージの関連ツリーリストを作る
         * @param packageName パッケージ名
         * @param version パッケージのバージョン
         */
        this.createDependenciesChainList = (packageName, version = '') => {
            // チェーンリストが未作成の場合は作成する
            if (this.dependenciesChainList.length === 0) {
                this.parseListWithChain('', this.jsonData);
            }
            return this.dependenciesChainList.filter((element) => {
                // パッケージ名が一致しなければ即除去
                if (element.name !== packageName) {
                    return false;
                }
                // バージョンの指定がなければパッケージ名の一致だけで採用
                if (!version) {
                    return true;
                }
                // パッケージの指定があればバージョンを判定する
                if (element.version === version) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        this.parseList = (list) => {
            const keys = Object.keys(list);
            keys.forEach((key) => {
                this.parseLeaf(list[key]);
            });
        };
        this.parseLeaf = (leaf) => {
            const { dependencies, name, version } = leaf;
            if (dependencies != null) {
                this.parseList(dependencies);
            }
            this.dependenciesList.push({ name, version });
        };
        this.parseListWithChain = (chain, list) => {
            const keys = Object.keys(list);
            keys.forEach((key) => {
                const newChain = !chain ? key : chain + ' -> ' + key;
                this.parseLeafWithChain(newChain, list[key]);
            });
        };
        this.parseLeafWithChain = (chain, leaf) => {
            const { dependencies, name, version } = leaf;
            if (dependencies != null) {
                this.parseListWithChain(chain, dependencies);
            }
            this.dependenciesChainList.push({ chain, name, version });
        };
        this.jsonData = json;
    }
}
exports.default = DependenciesParser;
//# sourceMappingURL=DependenciesParser.js.map