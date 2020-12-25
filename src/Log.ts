import * as log4js from 'log4js'

const initLogger = (): any => {
  log4js.configure({
    appenders: {
      system: { type: 'file', filename: 'system.log' }
    },
    categories: {
      default: { appenders: ['system'], level: 'debug' }
    }
  })
  return log4js.getLogger('system')
}

export const log = (item: string) => {
  logger.debug(item)
}

export const logArray = (array: any[]) => {
  array.forEach((item) => {
    logger.debug(item)
  })
}

const logger = initLogger()
