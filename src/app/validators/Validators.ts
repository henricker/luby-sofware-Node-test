import * as yup from 'yup'

const authSchema = yup.object().shape({
  username: yup.string().required()
});

const userSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  avatar: yup.string().required(),
  email: yup.string().required().email(),
  city: yup.string().required(),
  state: yup.string().required(),
  bio: yup.string().required()
});

const repositorySchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required().max(500),
  publicRepo: yup.boolean().required()
});


export {
  authSchema,
  userSchema,
  repositorySchema
}