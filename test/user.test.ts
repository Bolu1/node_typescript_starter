// import supertest from 'supertest'
// const db = require('../src/utils/connect')
// const app = require('../src/app')
// const data = require('../testdata.json')
// console.log(data)
// describe('user', () =>{
 
//     describe('sign in route', ()=>{
//         describe('given the user does not exist ', ()=>{
//             it('should return a 404', async()=>{
//                const userId = 'employee-123'
//                await supertest(app).get(`/db/getoneuser/${userId}`).expect(404)
//             })
//         })

//         describe('given the user does  exist ', ()=>{
//             it('should return a 200', async()=>{
//                 const userId = '1'
//                 await supertest(app).get(`/db/getoneuser/${userId}`).expect(200)
//             }) 
//         })

//         describe.skip('Create a user', ()=>{
//             it('should return a 200 and create the product', async()=>{
//                 const {statusCode} = await supertest(app).post("/v1/user/auth/signin").send(data.createUser)

//                 expect(statusCode).toBe(200)
//             })  
//         })
//     })
//     afterAll(async ()=>{ 
//         await db.destroy();
//     })
// })