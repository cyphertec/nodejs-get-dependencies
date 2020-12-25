const isDebug = false

export const log = (item: string) => {
  if (isDebug) {
    console.log(item)
  }
}

export const logArray = (array: any[]) => {
  if (isDebug) {
    array.forEach((item) => {
      console.log(item)
    })
  }
}
