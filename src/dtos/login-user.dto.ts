import { Joi } from "celebrate";

export const loginUserDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
