import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const CarProducts = async (req, res) => {
    const { id } = req.body; // Recibe un array de ids

    if (!Array.isArray(id) || id.length === 0) {
        return res.status(400).json({ message: 'Se debe enviar un array de IDs válido' });
    }

    try {
        const productos = await prisma.Producto.findMany({
            where: {
                id: { in: id }
            }
        });

        if (productos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos para los IDs proporcionados' });
        }

        res.status(200).json(productos);

    } catch (error) {
        console.error("Error en la solicitud CarProducts:", error);
        res.status(500).json({ message: 'Error interno del servidor en CarProducts' });
    }
};
