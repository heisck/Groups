import { FindaGroup } from './find.js'
import { prisma } from './lib/prisma'


const findAgroup = new FindaGroup()

async function main(info : any) {
  // Create a new user with a post
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     index_Number: 2,
  //     student_ID: 2,
  //     Group: 1,
  //   },
  // })
  // console.log('Created user:', user)

  const user = await prisma.user.findMany({
    where: {
      Group : findAgroup.group
    },
  })
  console.log(user.length)

  const cont_ = findAnother(user.length)

  if (cont_) {
    // Create a new user with a group
    const user = await prisma.user.create({
      data: {
        name: info.name,
        index_Number: info.indexNumber,
        student_ID: info.id,
        Group: findAgroup.group,
        phone_number : info.phone
      },
    })
    console.log('Created user:', user)
  }


}

main(info)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



const findAnother = (something : number) => {
  if (something <= 38) 
    return 1
  return 0
}

export { main }