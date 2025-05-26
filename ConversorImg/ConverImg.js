const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

const images = [];
const extensions = ['jpg', 'jpeg', 'png', 'webp'];

function findImagePath(basePath) {
  for (const ext of extensions) {
    const filePath = `${basePath}.${ext}`;
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

for (let i = 0; i <= 100; i++) {
  const filePath = findImagePath(`./public/${i}`);
  if (!filePath) continue;

  const buffer = fs.readFileSync(filePath);
  const base64 = buffer.toString('base64');
  images.push(base64);
}

for (let i = 0; i < images.length; i++) {
  console.log(`Imagen ${i + 1}:`);
  console.log(images[i]);
  console.log('-------------------------------');
}





let query = `
INSERT INTO Producto (id, nombre, marca, cantidad, caracteristicas, Imagenes, precio, preciooferta, tipo, busqueda, estado) VALUES
(uuid(), 'PlayStation 5 Standard', 'Sony', 15, '{"almacenamiento": "825GB SSD", "resolucion": "4K", "fps": "120fps", "conectividad": "WiFi 6"}', '{"images":["${images[1]}"]}', 499.99, 449.99, 'consolas', '["playstation", "ps5", "sony", "consola", "videojuegos", "4k", "gaming"]', 'ofertaflash'),

(uuid(), 'Xbox Series X', 'Microsoft', 12, '{"almacenamiento": "1TB SSD", "resolucion": "4K", "fps": "120fps", "retrocompatibilidad": true}', '{"images":["${images[2]}"]}', 499.99, 499.99, 'consolas', '["xbox", "series x", "microsoft", "consola", "4k", "gaming"]', 'normal'),

(uuid(), 'Nintendo Switch OLED', 'Nintendo', 25, '{"pantalla": "7 pulgadas OLED", "almacenamiento": "64GB", "portatil": true}', '{"images":["${images[3]}"]}', 349.99, 319.99, 'consolas', '["nintendo", "switch", "oled", "portatil", "zelda", "mario"]', 'tendencia'),

(uuid(), 'PlayStation 5 Digital', 'Sony', 8, '{"almacenamiento": "825GB SSD", "resolucion": "4K", "fps": "120fps", "digital": true}', '{"images":["${images[4]}"]}', 399.99, 399.99, 'consolas', '["playstation", "ps5", "digital", "sony", "consola"]', 'normal'),

(uuid(), 'Xbox Series S', 'Microsoft', 30, '{"almacenamiento": "512GB SSD", "resolucion": "1440p", "compacta": true}', '{"images":["${images[5]}"]}', 299.99, 249.99, 'consolas', '["xbox", "series s", "microsoft", "compacta", "gaming"]', 'ofertaflash'),

(uuid(), 'Steam Deck 256GB', 'Valve', 10, '{"almacenamiento": "256GB SSD", "pantalla": "7 pulgadas", "portatil": true, "steam": true}', '{"images":["${images[6]}"]}', 529.99, 529.99, 'consolas', '["steam", "deck", "valve", "portatil", "pc gaming"]', 'nuevoproducto'),

(uuid(), 'Nintendo Switch Lite', 'Nintendo', 40, '{"pantalla": "5.5 pulgadas", "almacenamiento": "32GB", "portatil": true, "lite": true}', '{"images":["${images[7]}"]}', 199.99, 179.99, 'consolas', '["nintendo", "switch", "lite", "portatil", "compacta"]', 'normal'),

(uuid(), 'PlayStation 4 Pro', 'Sony', 5, '{"almacenamiento": "1TB HDD", "resolucion": "4K", "hdr": true}', '{"images":["${images[8]}"]}', 399.99, 299.99, 'consolas', '["playstation", "ps4", "pro", "sony", "4k"]', 'ofertaflash'),

(uuid(), 'Xbox One X', 'Microsoft', 7, '{"almacenamiento": "1TB HDD", "resolucion": "4K", "hdr": true}', '{"images":["${images[9]}"]}', 499.99, 349.99, 'consolas', '["xbox", "one x", "microsoft", "4k"]', 'normal'),

(uuid(), 'Nintendo 3DS XL', 'Nintendo', 15, '{"pantallas": "dual 3D", "almacenamiento": "32GB", "portatil": true}', '{"images":["${images[10]}"]}', 199.99, 149.99, 'consolas', '["nintendo", "3ds", "xl", "portatil", "3d"]', 'normal'),

(uuid(), 'PlayStation Vita', 'Sony', 3, '{"pantalla": "5 pulgadas OLED", "almacenamiento": "variable", "portatil": true}', '{"images":["${images[11]}"]}', 299.99, 199.99, 'consolas', '["playstation", "vita", "sony", "portatil"]', 'ofertaflash'),

(uuid(), 'Retroid Pocket 3+', 'Retroid', 20, '{"pantalla": "4.7 pulgadas", "android": true, "emulacion": true}', '{"images":["${images[12]}"]}', 149.99, 149.99, 'consolas', '["retroid", "portatil", "emulacion", "android"]', 'tendencia'),

(uuid(), 'Analogue Pocket', 'Analogue', 8, '{"pantalla": "3.5 pulgadas", "gameboy": true, "fpga": true}', '{"images":["${images[13]}"]}', 219.99, 219.99, 'consolas', '["analogue", "pocket", "gameboy", "fpga"]', 'nuevoproducto'),

(uuid(), 'PlayStation Classic', 'Sony', 25, '{"juegos": 20, "hdmi": true, "mini": true}', '{"images":["${images[14]}"]}', 99.99, 59.99, 'consolas', '["playstation", "classic", "mini", "retro"]', 'ofertaflash'),

(uuid(), 'SNES Classic', 'Nintendo', 18, '{"juegos": 21, "hdmi": true, "mini": true}', '{"images":["${images[15]}"]}', 79.99, 69.99, 'consolas', '["nintendo", "snes", "classic", "mini", "retro"]', 'normal'),

(uuid(), 'Sega Genesis Mini', 'Sega', 12, '{"juegos": 42, "hdmi": true, "mini": true}', '{"images":["${images[16]}"]}', 79.99, 59.99, 'consolas', '["sega", "genesis", "mini", "retro"]', 'normal'),

(uuid(), 'Atari VCS 800', 'Atari', 6, '{"almacenamiento": "32GB", "linux": true, "moderna": true}', '{"images":["${images[17]}"]}', 389.99, 299.99, 'consolas', '["atari", "vcs", "moderna", "linux"]', 'ofertaflash'),

(uuid(), 'Neo Geo Mini', 'SNK', 10, '{"juegos": 40, "arcade": true, "mini": true}', '{"images":["${images[18]}"]}', 109.99, 89.99, 'consolas', '["neo geo", "mini", "arcade", "snk"]', 'normal'),

(uuid(), 'Game & Watch Zelda', 'Nintendo', 22, '{"juegos": 4, "portatil": true, "edicion limitada": true}', '{"images":["${images[19]}"]}', 49.99, 39.99, 'consolas', '["nintendo", "game watch", "zelda", "portatil"]', 'tendencia'),

(uuid(), 'Miyoo Mini Plus', 'Miyoo', 35, '{"pantalla": "3.5 pulgadas", "emulacion": true, "compacta": true}', '{"images":["${images[20]}"]}', 59.99, 59.99, 'consolas', '["miyoo", "mini", "emulacion", "portatil"]', 'nuevoproducto'),

(uuid(), 'PC Gaming RTX 4090', 'Custom Build', 5, '{"gpu": "RTX 4090", "cpu": "Intel i9-13900K", "ram": "32GB DDR5", "almacenamiento": "2TB NVMe"}', '{"images":["${images[21]}"]}', 3499.99, 3199.99, 'pcgaming', '["pc", "gaming", "rtx 4090", "intel", "custom"]', 'ofertaflash'),

(uuid(), 'PC Gaming RTX 4080', 'Custom Build', 8, '{"gpu": "RTX 4080", "cpu": "Intel i7-13700K", "ram": "32GB DDR5", "almacenamiento": "1TB NVMe"}', '{"images":["${images[22]}"]}', 2799.99, 2599.99, 'pcgaming', '["pc", "gaming", "rtx 4080", "intel"]', 'normal'),

(uuid(), 'PC Gaming RTX 4070', 'Custom Build', 12, '{"gpu": "RTX 4070", "cpu": "AMD Ryzen 7 7700X", "ram": "16GB DDR5", "almacenamiento": "1TB NVMe"}', '{"images":["${images[23]}"]}', 1899.99, 1799.99, 'pcgaming', '["pc", "gaming", "rtx 4070", "amd", "ryzen"]', 'tendencia'),

(uuid(), 'Alienware Aurora R15', 'Dell', 6, '{"gpu": "RTX 4080", "cpu": "Intel i9-13900F", "ram": "32GB", "rgb": true}', '{"images":["${images[24]}"]}', 3299.99, 2999.99, 'pcgaming', '["alienware", "aurora", "dell", "gaming pc"]', 'normal'),

(uuid(), 'ASUS ROG Strix GT35', 'ASUS', 4, '{"gpu": "RTX 4070", "cpu": "Intel i7-12700K", "ram": "16GB", "rog": true}', '{"images":["${images[25]}"]}', 2199.99, 1999.99, 'pcgaming', '["asus", "rog", "strix", "gaming pc"]', 'ofertaflash'),

(uuid(), 'HP Omen 45L', 'HP', 10, '{"gpu": "RTX 4060 Ti", "cpu": "AMD Ryzen 7 5700G", "ram": "16GB", "omen": true}', '{"images":["${images[26]}"]}', 1599.99, 1399.99, 'pcgaming', '["hp", "omen", "gaming pc", "amd"]', 'normal'),

(uuid(), 'MSI Aegis RS 13', 'MSI', 7, '{"gpu": "RTX 4070 Ti", "cpu": "Intel i7-13700K", "ram": "32GB", "msi": true}', '{"images":["${images[27]}"]}', 2499.99, 2299.99, 'pcgaming', '["msi", "aegis", "gaming pc", "intel"]', 'normal'),

(uuid(), 'Origin Chronos', 'Origin PC', 3, '{"gpu": "RTX 4090", "cpu": "Intel i9-13900K", "ram": "64GB", "custom": true}', '{"images":["${images[28]}"]}', 4999.99, 4599.99, 'pcgaming', '["origin", "chronos", "custom", "high end"]', 'nuevoproducto'),

(uuid(), 'CyberPowerPC Luxe', 'CyberPowerPC', 15, '{"gpu": "RTX 4060", "cpu": "AMD Ryzen 5 5600X", "ram": "16GB", "budget": true}', '{"images":["${images[29]}"]}', 1199.99, 999.99, 'pcgaming', '["cyberpower", "luxe", "budget", "gaming"]', 'ofertaflash'),

(uuid(), 'NZXT BLD Kit H5', 'NZXT', 9, '{"gpu": "RTX 4070", "cpu": "Intel i5-13600K", "ram": "16GB", "bld": true}', '{"images":["${images[30]}"]}', 1799.99, 1699.99, 'pcgaming', '["nzxt", "bld", "kit", "gaming pc"]', 'normal'),

(uuid(), 'Gaming Laptop RTX 4080', 'ASUS', 6, '{"gpu": "RTX 4080 Mobile", "cpu": "Intel i9-13900H", "ram": "32GB", "pantalla": "17.3 pulgadas"}', '{"images":["${images[31]}"]}', 2799.99, 2599.99, 'pcgaming', '["laptop", "gaming", "rtx 4080", "portatil"]', 'tendencia'),

(uuid(), 'ROG Zephyrus G14', 'ASUS', 8, '{"gpu": "RTX 4060", "cpu": "AMD Ryzen 9 7940HS", "ram": "16GB", "pantalla": "14 pulgadas"}', '{"images":["${images[32]}"]}', 1699.99, 1499.99, 'pcgaming', '["asus", "zephyrus", "laptop", "amd"]', 'normal'),

(uuid(), 'MSI Stealth 15M', 'MSI', 12, '{"gpu": "RTX 4050", "cpu": "Intel i7-13620H", "ram": "16GB", "pantalla": "15.6 pulgadas"}', '{"images":["${images[33]}"]}', 1299.99, 1199.99, 'pcgaming', '["msi", "stealth", "laptop", "gaming"]', 'normal'),

(uuid(), 'Razer Blade 15', 'Razer', 5, '{"gpu": "RTX 4070", "cpu": "Intel i9-13950H", "ram": "32GB", "pantalla": "15.6 pulgadas QHD"}', '{"images":["${images[34]}"]}', 2999.99, 2699.99, 'pcgaming', '["razer", "blade", "laptop", "premium"]', 'ofertaflash'),

(uuid(), 'Alienware m15 R7', 'Dell', 4, '{"gpu": "RTX 4060", "cpu": "Intel i7-12700H", "ram": "16GB", "alienware": true}', '{"images":["${images[35]}"]}', 1899.99, 1699.99, 'pcgaming', '["alienware", "m15", "laptop", "dell"]', 'normal'),

(uuid(), 'Legion 5 Pro', 'Lenovo', 10, '{"gpu": "RTX 4060", "cpu": "AMD Ryzen 7 7745HX", "ram": "16GB", "pantalla": "16 pulgadas"}', '{"images":["${images[36]}"]}', 1599.99, 1399.99, 'pcgaming', '["lenovo", "legion", "laptop", "amd"]', 'normal'),

(uuid(), 'Steam Deck OLED 1TB', 'Valve', 8, '{"almacenamiento": "1TB SSD", "pantalla": "7.4 pulgadas OLED", "steam": true, "portatil": true}', '{"images":["${images[37]}"]}', 649.99, 649.99, 'pcgaming', '["steam deck", "oled", "valve", "portatil"]', 'nuevoproducto'),

(uuid(), 'ROG Ally Z1 Extreme', 'ASUS', 12, '{"cpu": "AMD Z1 Extreme", "pantalla": "7 pulgadas", "windows": true, "portatil": true}', '{"images":["${images[38]}"]}', 699.99, 649.99, 'pcgaming', '["asus", "rog ally", "portatil", "windows"]', 'tendencia'),

(uuid(), 'MSI Claw A1M', 'MSI', 6, '{"cpu": "Intel Core Ultra 7", "pantalla": "7 pulgadas", "windows": true}', '{"images":["${images[39]}"]}', 749.99, 699.99, 'pcgaming', '["msi", "claw", "portatil", "intel"]', 'nuevoproducto'),

(uuid(), 'Mini PC Gaming NUC', 'Intel', 15, '{"cpu": "Intel i7-13700H", "gpu": "RTX 4060", "compacto": true, "ram": "16GB"}', '{"images":["${images[40]}"]}', 1399.99, 1299.99, 'pcgaming', '["intel", "nuc", "mini pc", "compacto"]', 'normal'),

(uuid(), 'Teclado Mecánico K95 RGB', 'Corsair', 25, '{"switches": "Cherry MX", "rgb": true, "macro": true, "material": "aluminio"}', '{"images":["${images[41]}"]}', 199.99, 179.99, 'periferricos', '["corsair", "teclado", "mecanico", "rgb", "k95"]', 'normal'),

(uuid(), 'Mouse Gaming G Pro X', 'Logitech', 30, '{"sensor": "HERO 25K", "peso": "63g", "wireless": true, "dpi": 25600}', '{"images":["${images[42]}"]}', 149.99, 129.99, 'periferricos', '["logitech", "mouse", "gaming", "wireless", "pro"]', 'ofertaflash'),

(uuid(), 'Headset SteelSeries Arctis 7P', 'SteelSeries', 20, '{"conectividad": "2.4GHz + Bluetooth", "bateria": "24h", "ps5": true}', '{"images":["${images[43]}"]}', 149.99, 149.99, 'periferricos', '["steelseries", "headset", "arctis", "wireless"]', 'normal'),

(uuid(), 'Monitor Gaming 27 4K 144Hz', 'ASUS', 8, '{"tamaño": "27 pulgadas", "resolucion": "4K", "frecuencia": "144Hz", "hdr": true}', '{"images":["${images[44]}"]}', 699.99, 649.99, 'periferricos', '["asus", "monitor", "4k", "144hz", "gaming"]', 'tendencia'),

(uuid(), 'Webcam Facecam MK.2', 'Elgato', 15, '{"resolucion": "1080p 60fps", "autofocus": true, "streaming": true}', '{"images":["${images[45]}"]}', 199.99, 179.99, 'periferricos', '["elgato", "webcam", "streaming", "1080p"]', 'normal'),

(uuid(), 'Micrófono Blue Yeti', 'Logitech', 18, '{"patron": "cardioide", "usb": true, "streaming": true, "color": "azul"}', '{"images":["${images[46]}"]}', 99.99, 89.99, 'periferricos', '["blue yeti", "microfono", "streaming", "usb"]', 'normal'),

(uuid(), 'Silla Gaming DXRacer', 'DXRacer', 12, '{"material": "cuero PU", "ergonomica": true, "reclinable": true, "lumbar": true}', '{"images":["${images[47]}"]}', 299.99, 249.99, 'periferricos', '["dxracer", "silla", "gaming", "ergonomica"]', 'ofertaflash'),

(uuid(), 'Mousepad XXL RGB', 'Razer', 40, '{"tamaño": "900x400mm", "rgb": true, "superficie": "micro-texturizada"}', '{"images":["${images[48]}"]}', 59.99, 49.99, 'periferricos', '["razer", "mousepad", "rgb", "xxl"]', 'normal'),

(uuid(), 'Controlador Xbox Wireless', 'Microsoft', 35, '{"conectividad": "Bluetooth + USB-C", "bateria": "40h", "xbox": true}', '{"images":["${images[49]}"]}', 59.99, 54.99, 'periferricos', '["xbox", "controlador", "wireless", "microsoft"]', 'normal'),

(uuid(), 'Controlador DualSense PS5', 'Sony', 28, '{"haptic": true, "triggers": "adaptativos", "bateria": "12h", "ps5": true}', '{"images":["${images[50]}"]}', 69.99, 64.99, 'periferricos', '["sony", "dualsense", "ps5", "controlador"]', 'normal'),

(uuid(), 'Teclado Compacto 60%', 'Anne Pro', 22, '{"tamaño": "60%", "wireless": true, "rgb": true, "switches": "Gateron"}', '{"images":["${images[51]}"]}', 89.99, 79.99, 'periferricos', '["anne pro", "teclado", "60%", "compacto"]', 'tendencia'),

(uuid(), 'Monitor Curvo 34 Ultrawide', 'Samsung', 6, '{"tamaño": "34 pulgadas", "curvo": "1000R", "resolucion": "3440x1440", "frecuencia": "144Hz"}', '{"images":["${images[52]}"]}', 599.99, 549.99, 'periferricos', '["samsung", "monitor", "curvo", "ultrawide"]', 'normal'),

(uuid(), 'Stream Deck XL', 'Elgato', 10, '{"botones": 32, "lcd": true, "streaming": true, "programable": true}', '{"images":["${images[53]}"]}', 249.99, 229.99, 'periferricos', '["elgato", "stream deck", "streaming", "xl"]', 'normal'),

(uuid(), 'Volante Racing G923', 'Logitech', 8, '{"force feedback": true, "pedales": true, "ps5": true, "xbox": true}', '{"images":["${images[54]}"]}', 399.99, 349.99, 'periferricos', '["logitech", "volante", "racing", "g923"]', 'ofertaflash'),

(uuid(), 'Auriculares HyperX Cloud III', 'HyperX', 25, '{"driver": "53mm", "microfono": "desmontable", "comodidad": true}', '{"images":["${images[55]}"]}', 99.99, 89.99, 'periferricos', '["hyperx", "auriculares", "cloud", "gaming"]', 'normal'),

(uuid(), 'Capturadora 4K60 Pro', 'Elgato', 7, '{"resolucion": "4K 60fps", "pcie": true, "streaming": true, "lag": "ultra bajo"}', '{"images":["${images[56]}"]}', 249.99, 229.99, 'periferricos', '["elgato", "capturadora", "4k", "streaming"]', 'normal'),

(uuid(), 'Luces LED Nanoleaf', 'Nanoleaf', 15, '{"forma": "triangular", "rgb": true, "sincronizacion": true, "app": true}', '{"images":["${images[57]}"]}', 199.99, 179.99, 'periferricos', '["nanoleaf", "luces", "led", "rgb"]', 'tendencia'),

(uuid(), 'Hub USB 3.0 RGB', 'Corsair', 30, '{"puertos": 7, "usb 3.0": true, "rgb": true, "aluminio": true}', '{"images":["${images[58]}"]}', 49.99, 44.99, 'periferricos', '["corsair", "hub", "usb", "rgb"]', 'normal'),

(uuid(), 'Base Refrigerante Laptop', 'Cooler Master', 20, '{"ventiladores": 5, "rgb": true, "ajustable": true, "hasta": "17 pulgadas"}', '{"images":["${images[59]}"]}', 39.99, 34.99, 'periferricos', '["cooler master", "base", "laptop", "refrigerante"]', 'normal'),

(uuid(), 'Soporte Monitor Dual', 'VIVO', 18, '{"monitores": 2, "ajustable": true, "hasta": "27 pulgadas", "vesa": true}', '{"images":["${images[60]}"]}', 79.99, 69.99, 'periferricos', '["vivo", "soporte", "monitor", "dual"]', 'normal'),

(uuid(), 'Camiseta The Last of Us', 'PlayStation', 50, '{"talla": "M", "material": "algodón", "diseño": "logo", "oficial": true}', '{"images":["${images[61]}"]}', 24.99, 19.99, 'merchandising', '["the last of us", "camiseta", "playstation", "oficial"]', 'ofertaflash'),

(uuid(), 'Taza Sonic the Hedgehog', 'SEGA', 75, '{"capacidad": "350ml", "ceramica": true, "microondas": true, "sonic": true}', '{"images":["${images[62]}"]}', 14.99, 14.99, 'merchandising', '["sonic", "taza", "sega", "ceramica"]', 'normal'),

(uuid(), 'Póster Zelda Breath of Wild', 'Nintendo', 100, '{"tamaño": "60x90cm", "papel": "premium", "oficial": true}', '{"images":["${images[63]}"]}', 19.99, 16.99, 'merchandising', '["zelda", "poster", "nintendo", "breath of wild"]', 'normal'),

(uuid(), 'Gorra Pokémon Ash Ketchum', 'Pokémon Company', 40, '{"material": "algodón", "ajustable": true, "bordado": true, "ash": true}', '{"images":["${images[64]}"]}', 29.99, 24.99, 'merchandising', '["pokemon", "gorra", "ash", "ketchum"]', 'normal'),

(uuid(), 'Sudadera Minecraft Creeper', 'Mojang', 30, '{"talla": "L", "capucha": true, "bolsillo": true, "verde": true}', '{"images":["${images[65]}"]}', 49.99, 39.99, 'merchandising', '["minecraft", "sudadera", "creeper", "mojang"]', 'ofertaflash'),

(uuid(), 'Calcetines Among Us Pack 3', 'InnerSloth', 60, '{"cantidad": 3, "tallas": "36-42", "colores": "rojo, azul, verde"}', '{"images":["${images[66]}"]}', 19.99, 17.99, 'merchandising', '["among us", "calcetines", "pack", "colores"]', 'normal'),

(uuid(), 'Llavero Pac-Man', 'Bandai Namco', 80, '{"material": "PVC", "tamaño": "5cm", "amarillo": true, "retro": true}', '{"images":["${images[67]}"]}', 9.99, 7.99, 'merchandising', '["pac-man", "llavero", "bandai", "retro"]', 'normal'),

(uuid(), 'Alfombrilla Mario Bros', 'Nintendo', 35, '{"tamaño": "80x50cm", "antideslizante": true, "lavable": true}', '{"images":["${images[68]}"]}', 34.99, 29.99, 'merchandising', '["mario", "alfombrilla", "nintendo", "bros"]', 'normal'),

(uuid(), 'Mochila Fortnite Battle Royale', 'Epic Games', 25, '{"capacidad": "25L", "compartimentos": 3, "reforzada": true}', '{"images":["${images[69]}"]}', 59.99, 49.99, 'merchandising', '["fortnite", "mochila", "battle royale", "epic"]', 'ofertaflash'),

(uuid(), 'Pin Set Overwatch Heroes', 'Blizzard', 45, '{"cantidad": 6, "metal": true, "heroes": "variados", "oficial": true}', '{"images":["${images[70]}"]}', 24.99, 22.99, 'merchandising', '["overwatch", "pins", "heroes", "blizzard"]', 'normal'),

(uuid(), 'Termo God of War', 'PlayStation', 20, '{"capacidad": "500ml", "acero inoxidable": true, "mantiene temperatura": "12h"}', '{"images":["${images[71]}"]}', 39.99, 34.99, 'merchandising', '["god of war", "termo", "playstation", "acero"]', 'normal'),

(uuid(), 'Chaqueta Cyberpunk 2077', 'CD Projekt', 55, '{"material": "poliéster", "amarillo": true, "diseño": "Night City"}', '{"images":["${images[72]}"]}', 16.99, 13.99, 'merchandising', '["cyberpunk", "bandana", "night city", "amarillo"]', 'tendencia'),

(uuid(), 'Pegatinas Retro Gaming Pack', 'Varios', 90, '{"cantidad": 50, "waterproof": true, "temas": "retro", "variadas": true}', '{"images":["${images[73]}"]}', 12.99, 9.99, 'merchandising', '["pegatinas", "retro", "gaming", "pack"]', 'ofertaflash'),

(uuid(), 'Sudadera Fall Guys', 'Mediatonic', 15, '{"material": "lana", "colores": "rosa y azul", "suave": true}', '{"images":["${images[74]}"]}', 29.99, 24.99, 'merchandising', '["fall guys", "bufanda", "rosa", "azul"]', 'normal'),

(uuid(), 'Taza Cambio Temperatura Mario', 'Nintendo', 28, '{"capacidad": "300ml", "cambio color": true, "ceramica": true, "mario": true}', '{"images":["${images[75]}"]}', 22.99, 19.99, 'merchandising', '["mario", "taza", "cambio temperatura", "nintendo"]', 'tendencia'),

(uuid(), 'Figura Master Chief Halo', 'McFarlane Toys', 12, '{"altura": "18cm", "articulada": true, "accesorios": true, "halo": true}', '{"images":["${images[76]}"]}', 89.99, 79.99, 'coleccionables', '["master chief", "halo", "figura", "mcfarlane"]', 'normal'),

(uuid(), 'Funko Pop Kratos', 'Funko', 25, '{"serie": "God of War", "numero": 269, "exclusivo": false, "10cm": true}', '{"images":["${images[77]}"]}', 14.99, 12.99, 'coleccionables', '["funko pop", "kratos", "god of war", "figura"]', 'normal'),

(uuid(), 'Estatua Link Zelda Premium', 'First 4 Figures', 3, '{"altura": "35cm", "resina": true, "edicion limitada": true, "base": true}', '{"images":["${images[78]}"]}', 299.99, 299.99, 'coleccionables', '["link", "zelda", "estatua", "premium"]', 'nuevoproducto'),

(uuid(), 'Carta Pokémon Charizard Holo', 'Pokémon TCG', 8, '{"rareza": "holográfica", "condicion": "mint", "primera edicion": true}', '{"images":["${images[79]}"]}', 199.99, 179.99, 'coleccionables', '["pokemon", "charizard", "carta", "holografica"]', 'ofertaflash'),

(uuid(), 'Réplica Espada Master Sword', 'Zelda Collection', 6, '{"material": "acero", "tamaño": "102cm", "soporte": true, "oficial": true}', '{"images":["${images[80]}"]}', 149.99, 134.99, 'coleccionables', '["zelda", "master sword", "replica", "espada"]', 'normal'),

(uuid(), 'Modelo Batmobile 1989', 'Hot Toys', 4, '{"escala": "1:6", "luces": true, "sonidos": true, "batman": true}', '{"images":["${images[81]}"]}', 449.99, 399.99, 'coleccionables', '["batman", "batmobile", "hot toys", "1989"]', 'ofertaflash'),

(uuid(), 'Set LEGO Nintendo NES', 'LEGO', 15, '{"piezas": 2646, "tv": "incluida", "cartucho": "mario", "funcional": true}', '{"images":["${images[82]}"]}', 229.99, 209.99, 'coleccionables', '["lego", "nintendo", "nes", "mario"]', 'normal'),

(uuid(), 'Busto Doom Slayer', 'Gaming Heads', 8, '{"altura": "20cm", "resina": true, "pintado a mano": true, "doom": true}', '{"images":["${images[83]}"]}', 179.99, 159.99, 'coleccionables', '["doom", "slayer", "busto", "gaming heads"]', 'normal'),

(uuid(), 'Figura Articulada Samus', 'Good Smile', 10, '{"altura": "16cm", "articulada": true, "accesorios": 8, "metroid": true}', '{"images":["${images[84]}"]}', 129.99, 119.99, 'coleccionables', '["samus", "metroid", "figura", "good smile"]', 'normal'),

(uuid(), 'Casco Mandalorian Replica', 'Hasbro', 5, '{"material": "plastico premium", "luces": true, "sonidos": true, "star wars": true}', '{"images":["${images[85]}"]}', 199.99, 179.99, 'coleccionables', '["mandalorian", "casco", "star wars", "replica"]', 'tendencia'),

(uuid(), 'Pin Badge Set Sonic', 'SEGA', 30, '{"cantidad": 12, "metal": true, "esmalte": true, "coleccionables": true}', '{"images":["${images[86]}"]}', 34.99, 29.99, 'coleccionables', '["sonic", "pin", "badge", "set"]', 'normal'),

(uuid(), 'Cartas Yu-Gi-Oh! Deck Completo', 'Konami', 20, '{"cartas": 50, "funda": "incluida", "holograficas": 5, "competitivo": true}', '{"images":["${images[87]}"]}', 79.99, 69.99, 'coleccionables', '["yu-gi-oh", "cartas", "deck", "holograficas"]', 'normal'),

(uuid(), 'Moneda Conmemorativa Mario', 'Nintendo', 40, '{"material": "plata", "peso": "31g", "edicion limitada": true, "certificado": true}', '{"images":["${images[88]}"]}', 49.99, 44.99, 'coleccionables', '["mario", "moneda", "plata", "conmemorativa"]', 'normal'),

(uuid(), 'Modelo Nave X-Wing', 'Bandai', 12, '{"escala": "1:72", "detalles": "premium", "pintada": true, "star wars": true}', '{"images":["${images[89]}"]}', 89.99, 79.99, 'coleccionables', '["star wars", "x-wing", "modelo", "bandai"]', 'normal'),

(uuid(), 'Figura Aloy Horizon', 'Pure Arts', 7, '{"altura": "25cm", "base": "incluida", "intercambiables": true, "horizon": true}', '{"images":["${images[90]}"]}', 159.99, 144.99, 'coleccionables', '["aloy", "horizon", "figura", "pure arts"]', 'tendencia'),

(uuid(), 'Funda Nintendo Switch Pro', 'Hori', 45, '{"material": "EVA", "compartimentos": 8, "correa": true, "proteccion": "premium"}', '{"images":["${images[91]}"]}', 29.99, 24.99, 'accesorios', '["nintendo", "switch", "funda", "hori"]', 'normal'),

(uuid(), 'Protector Pantalla PS5', 'dbrand', 60, '{"material": "vidrio templado", "transparencia": "99%", "instalacion": "facil"}', '{"images":["${images[92]}"]}', 19.99, 17.99, 'accesorios', '["ps5", "protector", "pantalla", "vidrio"]', 'normal'),

(uuid(), 'Cable HDMI 2.1 Gaming 3m', 'Ultra HD', 35, '{"version": "2.1", "4k": "120Hz", "longitud": "3m", "gaming": true}', '{"images":["${images[93]}"]}', 39.99, 34.99, 'accesorios', '["hdmi", "cable", "2.1", "gaming"]', 'normal'),

(uuid(), 'Adaptador Bluetooth PS4', 'Sony', 25, '{"conectividad": "Bluetooth 5.0", "auriculares": true, "latencia": "baja"}', '{"images":["${images[94]}"]}', 24.99, 22.99, 'accesorios', '["sony", "bluetooth", "adaptador", "ps4"]', 'normal'),

(uuid(), 'Soporte Vertical PS5', 'PlayStation', 30, '{"estabilidad": "alta", "ventilacion": true, "oficial": true, "negro": true}', '{"images":["${images[95]}"]}', 34.99, 29.99, 'accesorios', '["ps5", "soporte", "vertical", "oficial"]', 'ofertaflash'),

(uuid(), 'Cargador Dual Joy-Con', 'Nintendo', 40, '{"capacidad": 2, "led": "indicador", "compacto": true, "rapido": true}', '{"images":["${images[96]}"]}', 19.99, 17.99, 'accesorios', '["nintendo", "joy-con", "cargador", "dual"]', 'normal'),

(uuid(), 'Hub USB-C Switch Dock', 'UGREEN', 20, '{"puertos": 6, "hdmi": "4K", "ethernet": true, "pd": "100W"}', '{"images":["${images[97]}"]}', 49.99, 44.99, 'accesorios', '["switch", "hub", "usb-c", "dock"]', 'normal'),

(uuid(), 'Grip Pro Controller Switch', 'Satisfye', 18, '{"ergonomico": true, "comfort": "premium", "portatil": true, "asymetric": true}', '{"images":["${images[98]}"]}', 39.99, 34.99, 'accesorios', '["switch", "grip", "controller", "ergonomico"]', 'tendencia'),

(uuid(), 'Batería Externa Power Bank', 'Anker', 50, '{"capacidad": "20000mAh", "usb-c": "PD", "display": true, "gaming": true}', '{"images":["${images[99]}"]}', 59.99, 49.99, 'accesorios', '["anker", "bateria", "power bank", "20000mah"]', 'ofertaflash'),

(uuid(), 'Limpiador Pantallas Gaming', 'Screen Mom', 80, '{"volumen": "500ml", "sin alcohol": true, "microfibra": "incluida", "seguro": true}', '{"images":["${images[100]}"]}', 16.99, 14.99, 'accesorios', '["limpiador", "pantallas", "gaming", "screen mom"]', 'normal');
`

// Conectar y mandar la consulta
connection.connect((err) => {
  if (err) {
    return console.error('Error de conexión:', err.message);
  }

  console.log('Conexión exitosa.');

  // Consulta SQL
  const sql = query; // ejemplo de tabla 'usuarios'

  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.error('Error en la consulta:', err.message);
      return;
    }

    console.log('Resultados de la consulta:');
    console.log(results);

    // Cerrar la conexión
    connection.end();
  });
});