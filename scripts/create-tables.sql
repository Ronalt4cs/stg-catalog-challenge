CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  whatsapp_sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO products (name, description, price, image_url, category) VALUES
('Raquete de tenis', 'Raquete de tenis proficional da Wilson', '2899.90', 'https://images.unsplash.com/photo-1667757351193-41503c1bd9d4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Esportes', '2025-08-05 19:28:02.664286+00'), 
('Tênis Casual Adidas', 'Tênis branco clássico com detalhes em preto, ideal para o dia a dia', '349.90', 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Calçados', '2025-08-05 19:28:28.153915+00'), 
('Calça Jeans', 'Calça jeans feminina com elastano para maior conforto', '199.90', 'https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Roupas', '2025-08-05 19:21:46.82667+00'),
( 'Bola de Futebol Nike', 'Bola oficial Barcelona, tamanho 5, material premium', '299.90', 'https://images.unsplash.com/photo-1571354188019-9a5038b88457?q=80&w=732&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Esportes', '2025-08-05 19:13:35.381117+00'), 
('Jaqueta', 'Jaqueta elegante para ocasiões formais com corte contemporâneo', '279.90', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Roupas', '2025-08-05 19:21:46.82667+00'),
('Bota Coturno Masculina', 'Bota resistente em couro sintético com solado antiderrapante', '429.90', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Calçados', '2025-08-05 19:28:28.153915+00'), 
('MacBook Air M2', 'Notebook ultrafino com chip M2, 13.6" Retina e 18h de bateria', '8099.90', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Eletrônicos', '2025-08-05 18:58:06.088751+00'), 
('Bicicleta Mountain Bike', 'Bicicleta aro 29 com 21 velocidades e suspensão dianteira', '2899.90', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Esportes', '2025-08-05 19:13:35.381117+00'), 
('Sapato Social Couro', 'Sapato masculino em couro legítimo para ocasiões formais', '499.90', 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Calçados', '2025-08-05 19:28:28.153915+00'), 
('Bolça', 'Bolça vermelha de couro', '599.90', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Roupas', '2025-08-05 19:21:46.82667+00'), 
('Sony WH-1000XM5', 'Fones de ouvido sem fio com cancelamento de ruído líder do mercado', '2199.90', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', 'Eletrônicos', '2025-08-05 19:23:50.351875+00'), 
('Samsung Galaxy S23 Ultra', 'Smartphone top de linha com câmera de 200MP e S Pen integrado', '4799.90', 'https://images.pexels.com/photos/30466740/pexels-photo-30466740.jpeg', 'Eletrônicos', '2025-08-05 18:58:06.088751+00'), 
('Kit de Halteres Ajustáveis', 'Par de halteres de 10kg a 40kg com sistema de ajuste rápido', '899.90', 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Esportes', '2025-08-05 19:13:35.381117+00'), 
('Sandália Feminina Comfort', 'Sandália confortável com palmilha acolchoada e tiras ajustáveis', '199.90', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Calçados', '2025-08-05 19:28:28.153915+00'), 
('iPhone 15 Pro', 'Smartphone premium da Apple com tela Super Retina XDR e câmera tripla', '8999.90', 'https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Eletrônicos', '2025-08-05 18:58:06.088751+00'), 
('Camiseta Básica Algodão', 'Camiseta 100% algodão com corte moderno e diversas cores disponíveis', '89.90', 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Roupas', '2025-08-05 19:21:46.82667+00');