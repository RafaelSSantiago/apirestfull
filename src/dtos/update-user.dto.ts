import { Joi } from "celebrate";

export const updatedUserDto = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
});
