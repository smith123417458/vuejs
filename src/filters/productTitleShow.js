export default function (name) {
  let str = ''
  const len = name.length
  if (len > 24) {
    str = name.substring(0, 25) + ' ...'
  } else {
    return name
  }
  return str
}
