import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const SignUp = async (req, res) => {
    const { Username, Password, Email, Acepto } = req.body;

    if (!Username || !Password || !Email || !Acepto) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {

        if(Acepto === false){
            return res.status(400).json({ message: 'No ha aceptado los terminos y condiciones' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await prisma.User.create({
            data: {
                Username,
                Password: hashedPassword,
                Email,
                Acepto : true
            }
        });

        res.status(201).json({ message: "Usuario creado exitosamente", usuario: newUser });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}