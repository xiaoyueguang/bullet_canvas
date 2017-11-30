const rawObject = {

}

// const observer = new Proxy(rawObject, {
//   get (target, key, receiver) {
//     return rawObject[key]
//   },
//   set (target, key, value, receiver) {
//     rawObject[key] = value
//     console.log('trigger')
//     return rawObject
//   }
// })

function observe (raw) {
  return new Proxy(raw, {
    get (target, key, receiver) {
      return target[key]
    },
    set (target, key, value, receiver) {
      target[key] = value
      return value
    }
  })
}

export default observe
