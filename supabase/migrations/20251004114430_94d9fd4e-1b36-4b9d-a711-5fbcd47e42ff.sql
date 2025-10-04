-- Add Starbucks-style menu items for Newtown Coffee

-- Insert Coffee Drinks
INSERT INTO public.products (name, description, price, image_url, category, subcategory, available) VALUES
-- Hot Coffees
('Caffè Americano', 'Espresso shots topped with hot water for a rich, full-bodied coffee', 3.45, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', 'Coffee', 'Hot Coffees', true),
('Caffè Latte', 'Espresso with steamed milk, topped with a light layer of foam', 4.45, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 'Coffee', 'Hot Coffees', true),
('Cappuccino', 'Dark, rich espresso with steamed milk and a deep layer of foam', 4.45, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', 'Coffee', 'Hot Coffees', true),
('Caramel Macchiato', 'Freshly steamed milk with vanilla syrup, espresso and caramel drizzle', 5.25, 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400', 'Coffee', 'Hot Coffees', true),
('Flat White', 'Bold ristretto shots of espresso with steamed whole milk', 4.95, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400', 'Coffee', 'Hot Coffees', true),
('Espresso', 'Rich, full-bodied coffee with a layer of crema', 2.55, 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400', 'Coffee', 'Hot Coffees', true),

-- Cold Coffees
('Iced Caffè Americano', 'Espresso shots topped with cold water and ice', 3.75, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400', 'Coffee', 'Cold Coffees', true),
('Iced Latte', 'Espresso with cold milk served over ice', 4.75, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 'Coffee', 'Cold Coffees', true),
('Cold Brew', 'Smooth, naturally sweet coffee slowly steeped for 20 hours', 4.45, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400', 'Coffee', 'Cold Coffees', true),
('Iced Caramel Macchiato', 'Vanilla syrup, cold milk, espresso and caramel drizzle over ice', 5.55, 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400', 'Coffee', 'Cold Coffees', true),
('Nitro Cold Brew', 'Cold brew infused with nitrogen for a smooth, creamy texture', 5.25, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 'Coffee', 'Cold Coffees', true),

-- Frappuccinos
('Caramel Frappuccino', 'Coffee blended with milk, ice and caramel syrup', 5.95, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', 'Coffee', 'Frappuccino', true),
('Mocha Frappuccino', 'Coffee blended with milk, ice and mocha sauce', 5.95, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', 'Coffee', 'Frappuccino', true),
('Java Chip Frappuccino', 'Coffee blended with milk, ice, mocha sauce and chocolate chips', 6.25, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', 'Coffee', 'Frappuccino', true),
('Vanilla Bean Frappuccino', 'Vanilla bean powder blended with milk and ice', 5.75, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', 'Coffee', 'Frappuccino', true),

-- Tea & More
('Chai Tea Latte', 'Black tea infused with cinnamon, clove and spices, steamed with milk', 4.65, 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400', 'Tea & More', 'Hot Teas', true),
('Green Tea Latte', 'Premium matcha green tea blended with milk', 5.25, 'https://images.unsplash.com/photo-1536013188940-e199f2e51b49?w=400', 'Tea & More', 'Hot Teas', true),
('Earl Grey Tea', 'A bold black tea with hints of bergamot', 3.25, 'https://images.unsplash.com/photo-1597318996732-7ffa2e028349?w=400', 'Tea & More', 'Hot Teas', true),
('Iced Green Tea', 'Premium green tea shaken with ice', 3.45, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', 'Tea & More', 'Iced Teas', true),
('Iced Passion Tango Tea', 'Hibiscus tea with lemonade served over ice', 3.65, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', 'Tea & More', 'Iced Teas', true),
('Hot Chocolate', 'Steamed milk with mocha sauce and vanilla', 4.25, 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400', 'Tea & More', 'Hot Drinks', true),

-- Bakery
('Butter Croissant', 'Flaky, buttery pastry baked to golden perfection', 3.75, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', 'Bakery', 'Pastries', true),
('Chocolate Croissant', 'Classic French pastry with rich chocolate filling', 4.25, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', 'Bakery', 'Pastries', true),
('Blueberry Muffin', 'Moist muffin bursting with fresh blueberries', 3.95, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', 'Bakery', 'Muffins', true),
('Double Chocolate Chip Cookie', 'Rich chocolate cookie with chunks of chocolate', 2.95, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', 'Bakery', 'Cookies', true),
('Cinnamon Roll', 'Soft, warm roll swirled with cinnamon and icing', 4.45, 'https://images.unsplash.com/photo-1619985652803-c1aa892a7baa?w=400', 'Bakery', 'Pastries', true),

-- Breakfast
('Bacon, Egg & Cheese Sandwich', 'Bacon, eggs and cheese on a toasted English muffin', 5.45, 'https://images.unsplash.com/photo-1619740455993-9e8c6b7868d8?w=400', 'Food', 'Breakfast', true),
('Spinach & Feta Wrap', 'Egg whites, spinach and feta in a whole wheat wrap', 5.95, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400', 'Food', 'Breakfast', true),
('Avocado Toast', 'Smashed avocado with everything bagel seasoning on sourdough', 6.45, 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400', 'Food', 'Breakfast', true),

-- Lunch
('Turkey & Pesto Panini', 'Roasted turkey with basil pesto, mozzarella on ciabatta', 8.95, 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400', 'Food', 'Lunch', true),
('Caprese Sandwich', 'Fresh mozzarella, tomato and basil with balsamic glaze', 7.95, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', 'Food', 'Lunch', true),
('Chicken Caesar Wrap', 'Grilled chicken, romaine, parmesan and Caesar dressing', 8.45, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400', 'Food', 'Lunch', true);
