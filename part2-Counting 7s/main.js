function contain_seven_count(n){
  let result = 0
  for(i=1;i<=n;i++){
    if(String(i).indexOf('7') !== -1){
      result++
    }
  }
  console.log(`g(${n}):`,result)
  return result
}

console.log('g(1000):',contain_seven_count(1000))

module.exports = contain_seven_count