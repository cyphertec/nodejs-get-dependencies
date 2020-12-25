import { IDependency } from './IDependency';
import { IDependencyChain } from './IDependencyChain';
export declare const createPackageList: (manifestFileContent: string, lockFileContent: string) => Promise<IDependency[]>;
export interface IDependencyVer {
    name: string;
    versions: string[];
}
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
export declare const transformVersionArray: (list: IDependency[]) => IDependencyVer[];
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
export declare const createPackageDepChain: (manifestFileContent: string, lockFileContent: string, keyPackageName: string, keyVersion?: string) => Promise<IDependencyChain[]>;
export * from './IDependency';
export * from './IDependencyChain';
