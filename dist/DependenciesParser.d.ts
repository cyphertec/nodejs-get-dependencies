import { IDependency } from './IDependency';
import { IDependencyChain } from './IDependencyChain';
export default class DependenciesParser {
    private jsonData;
    private dependenciesList;
    private filteredDependenciesList;
    private dependenciesChainList;
    constructor(json: any);
    /**
     * パッケージリストを作る
     */
    createDependenciesList: () => IDependency[];
    /**
     * 指定したパッケージの関連ツリーリストを作る
     * @param packageName パッケージ名
     * @param version パッケージのバージョン
     */
    createDependenciesChainList: (packageName: string, version?: string) => IDependencyChain[];
    private parseList;
    private parseLeaf;
    private parseListWithChain;
    private parseLeafWithChain;
}
