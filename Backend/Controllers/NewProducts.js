import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const NewProducts = async (req, res) => {
    try{

        const NewProducts = await prisma.Producto.findMany({
            where: {
                estado: "nuevoproducto"
            }
        });

        if (NewProducts.length === 0) {
            return res.status(404).json({ message: 'No se encontraron Nuevos Productos' });
        }

        res.status(200).json(NewProducts);

    }
    catch(error){
        console.error("Error en la solicitud NewProducts:", error);
        res.status(500).json({ message: 'Error interno del servidor en NewProducts' });
    }
}