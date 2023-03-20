const removeElement = (el) => {
  let par = el.parentNode
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode.removeChild(el)
  }
  if (par) par.remove()
}

export default removeElement
