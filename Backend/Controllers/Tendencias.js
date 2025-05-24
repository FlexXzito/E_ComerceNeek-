import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Tendencias = async (req, res) => {
    try{

        const Tendencias = await prisma.Producto.findMany({
            where: {
                estado: "tendencia"
            }
        });

        if (Tendencias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ofertas flash' });
        }

        res.status(200).json(Tendencias);

    }
    catch(error){
        console.error("Error en la solicitud Tendencias:", error);
        res.status(500).json({ message: 'Error interno del servidor en Tendencias' });
    }
}