import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const OfertasFlash = async (req, res) => {
    try{

        const ofertasFlash = await prisma.Producto.findMany({
            where: {
                estado: "ofertaflash"
            }
        });

        if (ofertasFlash.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ofertas flash' });
        }

        res.status(200).json(ofertasFlash);

    }
    catch(error){
        console.error("Error en la solicitud OfertasFlash:", error);
        res.status(500).json({ message: 'Error interno del servidor en OfertasFlash' });
    }
}