import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const Login = async (req, res) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {   
        const credenciales = await prisma.User.findMany({
            where: {
                Username: Username,
            }
        });

        if (credenciales.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        let credencialValida = null;
        for (const credencial of credenciales) {
            const isPasswordValid = await bcrypt.compare(Password, credencial.Password);
            if (isPasswordValid) {
                credencialValida = credencial;
                break;
            }
        }

        if (!credencialValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const { Password: _, ...userWithoutPassword } = credencialValida;
        res.json({ message: "Inicio de sesión exitoso", usuario: userWithoutPassword });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
