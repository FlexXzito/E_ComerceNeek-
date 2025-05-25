import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GetTipo = async (req, res) => {
    const { tipo } = req.body;
    try{

        const GetTipo = await prisma.Producto.findMany({
            where: {
                tipo: tipo,
            }
        });

        if (GetTipo.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos',tipo });
        }

        res.status(200).json(GetTipo);

    }
    catch(error){
        console.error("Error en la solicitud GetTipo:", error);
        res.status(500).json({ message: 'Error interno del servidor en GetTipo' });
    }
}