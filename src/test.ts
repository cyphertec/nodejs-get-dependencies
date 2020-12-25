import * as fs from 'fs'
import { createPackageList, createPackageDepChain, transformVersionArray } from './index'

const readFixture = (filePath: string): string => {
  return fs.readFileSync(`${__dirname}/jsonfile/${filePath}`, 'utf8')
}

;(async () => {
  const manifestFileContent: string = readFixture('package.json')
  const lockFileContent: string = readFixture('package-lock.json')

  const packageList = await createPackageList(manifestFileContent, lockFileContent)

  transformVersionArray(packageList)

  createPackageDepChain(manifestFileContent, lockFileContent, 'mime-db')
  createPackageDepChain(manifestFileContent, lockFileContent, 'mime-db', '1.42.0')
})()
