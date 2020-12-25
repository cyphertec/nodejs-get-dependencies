import { log, logArray } from './Log'

import { buildDepTree, LockfileType } from 'nodejs-lockfile-parser'
import DependenciesParser from './DependenciesParser'
import { IDependency } from './IDependency'
import { IDependencyChain } from './IDependencyChain'

export const createPackageList = async (
  manifestFileContent: string,
  lockFileContent: string
): Promise<IDependency[]> => {
  const depTree = await buildDepTree(manifestFileContent, lockFileContent, false, LockfileType.npm, false)
  // strict mode を false にすると package.json と package-lock.json の整合性をチェックしない

  const { dependencies } = depTree
  // 分割代入で dependencies を取り出す

  const parser = new DependenciesParser(dependencies)
  const dependenciesList = parser.createDependenciesList()
  log('=== start Dependendies List ===')
  logArray(dependenciesList)
  return dependenciesList
}

export interface IDependencyVer {
  name: string
  versions: string[]
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
export const transformVersionArray = (list: IDependency[]): IDependencyVer[] => {
  const newList: IDependencyVer[] = []
  for (const orgItem of list) {
    const depIndex = newList.findIndex(({ name }) => {
      if (name === orgItem.name) {
        return true
      }
    })
    if (depIndex === -1) {
      // 新しいパッケージは newList に追加
      newList.push({ name: orgItem.name, versions: [orgItem.version] })
    } else {
      // パッケージが存在する場合は versions プロパティを更新
      const versionIndex = newList[depIndex].versions.findIndex((version) => {
        if (version === orgItem.version) {
          return true
        }
      })
      if (versionIndex === -1) {
        const versions = newList[depIndex].versions
        versions.push(orgItem.version)
        newList.splice(depIndex, 1, { name: orgItem.name, versions }) // 配列の更新
      }
    }
  }
  log('=== start Transformed Dependendies List ===')
  logArray(newList)
  log('=== end Transformed Dependendies List ===')
  return newList
}

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
export const createPackageDepChain = async (
  manifestFileContent: string,
  lockFileContent: string,
  keyPackageName: string,
  keyVersion = ''
): Promise<IDependencyChain[]> => {
  const depTree = await buildDepTree(manifestFileContent, lockFileContent, false, LockfileType.npm, false)
  // strict mode を false にすると package.json と package-lock.json の整合性をチェックしない

  const { dependencies } = depTree
  // 分割代入で dependencies を取り出す

  const parser = new DependenciesParser(dependencies)
  const dependenciesChainList = parser.createDependenciesChainList(keyPackageName, keyVersion)
  log('=== start Dependendies Chain List ===')
  logArray(dependenciesChainList)
  log('=== end Dependendies Chain List ===')
  return dependenciesChainList
}

export * from './IDependency'
export * from './IDependencyChain'
