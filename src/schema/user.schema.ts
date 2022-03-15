import {object, string, TypeOf} from 'zod'

export const createUserSchema = object({
    body: object({
        email:string({
            required_error:'email is  required'
        }).email('Not a valid email'),
        password:string({
            required_error:'password is  required'
        }).min(6, "Password too short "),
        firstname:string({
            required_error:'FirstName is  required'
        }),
        confirmPassword:string({
            required_error:'confirm password is  required'
        }),
        lastname:string({
            required_error:'LastName is  required'
        }),
       phone:string({
           required_error:'Phone number is required'
       })
    })
})

export const signinSchema = object({
    body: object({
        email: string({
            required_error:'email is required'
        }),
        password: string({
            required_error:'password is required'
        })
    })
})

export type createUserInput = TypeOf<typeof createUserSchema>