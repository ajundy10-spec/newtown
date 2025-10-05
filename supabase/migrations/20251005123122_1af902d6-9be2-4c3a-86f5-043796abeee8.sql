-- Delete all order items first (to avoid foreign key constraints)
DELETE FROM order_items;

-- Delete all orders
DELETE FROM orders;

-- Delete all existing products
DELETE FROM products;

-- Insert Hot Drinks - Espresso
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Single Espresso', 'A concentrated shot of pure espresso', 2.20, 'Coffee', 'Espresso', true, 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400'),
('Double Espresso', 'Two shots of rich espresso', 2.50, 'Coffee', 'Espresso', true, 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400'),
('Espresso Macchiato', 'Espresso with a touch of foamed milk', 3.00, 'Coffee', 'Espresso', true, 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400');

-- Insert Hot Drinks - Specialty Coffee
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Piccolo Latte', 'Small latte with ristretto shot', 3.20, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400'),
('Cortado', 'Equal parts espresso and steamed milk', 3.70, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400'),
('Café Bonbon', 'Espresso with sweetened condensed milk', 3.00, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400'),
('Americano', 'Espresso with hot water', 3.10, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400'),
('Cappuccino', 'Espresso with steamed milk and foam', 4.00, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400'),
('Large Cappuccino', 'Larger serving of cappuccino', 4.90, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400'),
('Latte', 'Espresso with steamed milk', 4.00, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400'),
('Large Latte', 'Larger serving of latte', 4.90, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400'),
('Mochaccino', 'Chocolate-flavored coffee drink', 4.50, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1578374173704-22ade7e72516?w=400'),
('Hot Spanish Latte', 'Sweet espresso with condensed milk', 4.70, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400'),
('Turkish Coffee', 'Traditional Turkish coffee', 3.00, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=400'),
('V60', 'Pour over coffee', 4.10, 'Coffee', 'Specialty Coffee', true, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400');

-- Insert Hot Drinks - Hot Chocolate
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Newtown Special Hot Chocolate', 'Premium hot chocolate blend', 4.60, 'Coffee', 'Hot Chocolate', true, 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400'),
('Regular Hot Chocolate', 'Classic hot chocolate', 4.00, 'Coffee', 'Hot Chocolate', true, 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400');

-- Insert Tea & More
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Chai Latte', 'Spiced chai tea with steamed milk', 4.50, 'Tea & More', 'Tea', true, 'https://images.unsplash.com/photo-1597318181274-e6a6a28e2044?w=400'),
('Large Chai Latte', 'Larger serving of chai latte', 4.90, 'Tea & More', 'Tea', true, 'https://images.unsplash.com/photo-1597318181274-e6a6a28e2044?w=400'),
('Matcha', 'Japanese green tea powder latte', 4.50, 'Tea & More', 'Tea', true, 'https://images.unsplash.com/photo-1536013138252-31e4c36c8d45?w=400'),
('Large Matcha', 'Larger serving of matcha', 4.90, 'Tea & More', 'Tea', true, 'https://images.unsplash.com/photo-1536013138252-31e4c36c8d45?w=400'),
('Tea', 'Selection of fine teas', 3.00, 'Tea & More', 'Tea', true, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400');

-- Insert Cold Drinks - Iced Coffee
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Iced Spanish Latte', 'Chilled Spanish latte', 4.60, 'Coffee', 'Iced Coffee', true, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400'),
('Iced Latte', 'Chilled latte with no syrup', 4.00, 'Coffee', 'Iced Coffee', true, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400'),
('Iced Matcha', 'Chilled matcha latte', 4.80, 'Coffee', 'Iced Coffee', true, 'https://images.unsplash.com/photo-1536013138252-31e4c36c8d45?w=400'),
('Iced Americano', 'Chilled Americano', 3.30, 'Coffee', 'Iced Coffee', true, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400');

-- Insert Cold Drinks - Cold Brew
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Cold Nitro Brew', 'Nitrogen-infused cold brew', 4.00, 'Coffee', 'Cold Brew', true, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400'),
('Cold Drip', 'Slow-dripped cold coffee', 3.80, 'Coffee', 'Cold Brew', true, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400');

-- Insert Cold Drinks - Frozen Drinks
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Affogato', 'Gelato topped with espresso', 4.50, 'Coffee', 'Frozen Drinks', true, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'),
('Frappuccino', 'Blended ice coffee - Caramel, Vanilla, Mocha', 4.90, 'Coffee', 'Frozen Drinks', true, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
('Milkshake', 'Caramel, Vanilla, or Mocha milkshake', 4.80, 'Coffee', 'Frozen Drinks', true, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
('Oreo Milkshake', 'Creamy Oreo cookie milkshake', 5.50, 'Coffee', 'Frozen Drinks', true, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
('Thickshake', 'Chocolate, Vanilla, or Caramel thickshake', 5.00, 'Coffee', 'Frozen Drinks', true, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
('Smoothies', 'Strawberry or Mango smoothie', 5.30, 'Coffee', 'Frozen Drinks', true, 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400');

-- Insert Tea & More - Iced Tea
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Newtown Iced Hibiscus Tea', 'Refreshing hibiscus iced tea', 3.80, 'Tea & More', 'Iced Tea', true, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Iced Tea', 'Peach or Passion Fruit iced tea', 3.00, 'Tea & More', 'Iced Tea', true, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400');

-- Insert Bakery - Cakes & Desserts
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Lotus Cheese Cake', 'Rich cheesecake with Lotus biscoff', 4.50, 'Bakery', 'Cakes & Desserts', true, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'),
('Belgian Truffle Cake', 'Decadent Belgian chocolate truffle cake', 4.50, 'Bakery', 'Cakes & Desserts', true, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'),
('Brownies', 'Rich chocolate brownies', 3.50, 'Bakery', 'Cakes & Desserts', true, 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400'),
('Sticky Date Pudding', 'Warm sticky date pudding', 5.00, 'Bakery', 'Cakes & Desserts', true, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400');

-- Insert Bakery - Pastries
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Salted Belgian Chocolate Cookies', 'Gourmet chocolate cookies', 3.00, 'Bakery', 'Pastries', true, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400'),
('Muffins', 'Freshly baked muffins', 3.50, 'Bakery', 'Pastries', true, 'https://images.unsplash.com/photo-1607958996540-29e24825e13f?w=400'),
('Croissant', 'Buttery croissant - Plain or Cheese', 3.50, 'Bakery', 'Pastries', true, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'),
('Pain Au Chocolate', 'Chocolate-filled croissant', 4.00, 'Bakery', 'Pastries', true, 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400');

-- Insert Food - Sandwiches
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Turkey Ciabatta Sandwich', 'Turkey on ciabatta bread', 9.00, 'Food', 'Sandwiches', true, 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400'),
('Cheese Trimossini', 'Cheese sandwich on sourdough', 9.00, 'Food', 'Sandwiches', true, 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400'),
('Turkey Mushroom Cheese', 'Turkey, mushroom, and cheese on sourdough', 9.00, 'Food', 'Sandwiches', true, 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400');

-- Insert Gelato
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Specialty Gelato 1 Scoop', 'One scoop of specialty gelato', 2.20, 'Bakery', 'Gelato', true, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'),
('Specialty Gelato 2 Scoops', 'Two scoops of specialty gelato', 4.00, 'Bakery', 'Gelato', true, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400');

-- Insert Extras
INSERT INTO products (name, description, price, category, subcategory, available, image_url) VALUES
('Special Milk', 'Oat, almond, or soy milk', 0.60, 'Coffee', 'Extras', true, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'),
('Honey', 'Teaspoon of honey', 0.60, 'Coffee', 'Extras', true, 'https://images.unsplash.com/photo-1587049352846-4a222e784e38?w=400'),
('Syrup / Sauce', 'Flavor syrup or sauce', 0.60, 'Coffee', 'Extras', true, 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400'),
('Chai / Matcha Add-on', 'Add chai or matcha to any drink', 1.00, 'Coffee', 'Extras', true, 'https://images.unsplash.com/photo-1536013138252-31e4c36c8d45?w=400'),
('Extra Shot', 'Additional espresso shot', 0.60, 'Coffee', 'Extras', true, 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400');