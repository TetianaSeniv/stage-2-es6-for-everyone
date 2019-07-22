function superSort(value) {
    const words = value.split(' ')
    
    words.sort((a, b) => {
    a = a.replace(/\d+/g, '')
    b = b.replace(/\d+/g, '')
  
      if (a < b) {
        return -1
      }
  
      if (b < a) {
        return 1
      }
  
      return 0
    })
  
    return words.join(' ')
  }