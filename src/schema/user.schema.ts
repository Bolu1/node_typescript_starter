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
        othernames:string({
            required_error:'OtherName is  required'
        }),
        phonenumber:string({
            required_error:'phonenumber is  required'
        }),
        gender:string({
            required_error:'gender is  required'
        }),
        dob:string({
            required_error:'dateofbirth is  required'
        }),
        department:string({
            required_error:'department is  required'
        }),
        imageUrl:string({
            required_error:'photograph is  required'
        }),
        datejoined: string({
            required_error:'datejoined is  required'
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