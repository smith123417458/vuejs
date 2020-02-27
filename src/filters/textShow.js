export default function (name) {
  let str = ''
  const len = name.length
  if (len > 20) {
    str = name.substring(0, 26) + ' …'
  } else {
    return name
  }
  return str
}
