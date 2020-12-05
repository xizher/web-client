const faker = require('faker')
const { RegExpHelper } = require('../js.utils')

for (let i = 0; i < 10; i++) {
  const num = faker.random.number()
  console.log(num)
  
}
