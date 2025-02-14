import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { generateToken } from "../utils/token.util";

export class UserController {
  public static async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();

    if (!createdUser) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  }

  public static async loginUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if(!user){
      return res.send(401).json({ message: "Credenciais inválidas." });
    }

    const isPassWordValid = await bcrypt.compare(password, user.password);

    if(!isPassWordValid) {
      return res.status(401).json({message: 'Credenciais inválidas'})
    }

    const token = generateToken({id: user.id.toString(), email: user.email});

    if(!token) {
      return res.status(500).json({ message: 'Erro interno do servidor'});
    }

    return res.status(200).json({
      message: 'Login bem-sucedido.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  }

  public static async getUsers(req: Request, res: Response): Promise<Response> {
    const users = await User.find({}, { password: 0}); // para não retornar a senha
    
    if(!users){
      return res.status(200).json(users);
    }

    return res.status(200).json(users)
  }

  public static async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findById(id, { password: 0});

    if(!user) {
      return res.status(404).json({message: 'Usuário não encontrado.'});
    }

    return res.status(200).json(user);
  }

  public static async updateUser(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const {name, email} = req.body;

    const updatedUser  = await User.findByIdAndUpdate(
      id,
      {name, email},
      {new: true}
    )

    if(!updatedUser){
      return res.status(404).json({message: 'Usuário não encontrado.' })
    }

    return res.status(200).json({
      message: 'Usuário atualizado com sucesso.',
      user: updatedUser
    })
  }

  public static async deleteUser(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if(!deletedUser){
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    return res.status(200);
  }
}
