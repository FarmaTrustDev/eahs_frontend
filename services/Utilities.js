export function isEmpty(obj) {
  if (
    typeof obj === 'undefined' ||
    obj == null ||
    obj === false ||
    obj === 'NaN'
  )
    return true

  if (obj.length > 0) return false
  if (obj.length === 0) return true

  if (typeof obj !== 'object') return true

  return Object.keys(obj).length === 0
}

export function notification(message) {
  return this.$notification.open({ message })
}

export function filterOption(input, option) {
  return option.componentOptions.children[0].text
    .toLowerCase()
    .includes(input.toLowerCase())
}

export const errorNotification = ($this, err) => {
  const genericError = err.response.data.errors

  let description = ''
  if (!isEmpty(genericError)) {
    for (const key in genericError) {
      description += `${genericError[key][0]},`
    }
  }
  const genericException = err.response.data
  if (!isEmpty(genericException)) {
    description = genericException.message
  }

  $this.$notification.open({
    message: `Error`,
    description: () => description,
    placement: 'bottomLeft',
    class: 'error-notification',
    duration: 900000,
  })
}
