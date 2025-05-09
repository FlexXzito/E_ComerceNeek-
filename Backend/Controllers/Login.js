import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const Login = async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {   
        const usuario = await prisma.user.findFirst({
            where: {
                Email: Email,
            }
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(Password, usuario.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const { Password: _, ...userWithoutPassword } = usuario;
        res.json({ message: "Inicio de sesión exitoso", usuario: userWithoutPassword });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
