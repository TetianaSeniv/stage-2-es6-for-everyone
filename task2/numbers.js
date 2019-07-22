function catchMeIfYouCan(numbers) {
    const arr = numbers.splice(0, 3);
    const obj = {};
  
    for (const el of arr) {
        obj[el] = ++obj[el] || 1;
    }
  
    const distinct = Object.keys(obj).map(key => parseInt(key, 10));
    if (distinct.length > 1) {
        return obj[distinct[0]] > 1 ? distinct[0] : distinct[1];
    }
  
    const notUnique = distinct[0];
    let found = false;
    let index = 0;
  
    while (!found) {
        found = notUnique !== numbers[index];
        index++;
    }
  
    return numbers[index - 1];
  }