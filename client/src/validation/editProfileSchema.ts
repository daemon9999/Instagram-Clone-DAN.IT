import * as Yup from "yup"

export const editProfileSchema = Yup.object().shape({
  
    fullName: Yup.string().required().min(6),
    username: Yup.string().required().min(4),
    bio: Yup.string().max(200).notRequired(),


})