var should = require('should')
var contain_seven_count = require('../main')

describe('contain seven count',()=>{
  it('should reutrn number of string contain seven',done=>{
    let result1 = contain_seven_count(7)
    result1.should.equal(1)
    let result2 = contain_seven_count(20)
    result2.should.equal(2)
    let result3 = contain_seven_count(70)
    result3.should.equal(8)
    let result4 = contain_seven_count(100)
    result4.should.equal(19)
    done()
  })
})