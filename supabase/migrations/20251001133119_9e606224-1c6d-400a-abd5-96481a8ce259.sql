-- Add subcategory column to products table
ALTER TABLE public.products ADD COLUMN subcategory TEXT;

-- Update existing products with subcategories
UPDATE public.products SET subcategory = 'Espresso Based' WHERE category = 'Coffee' AND name IN ('Espresso', 'Cappuccino', 'Latte');
UPDATE public.products SET subcategory = 'Brewed Coffee' WHERE category = 'Coffee' AND name = 'Americano';
UPDATE public.products SET subcategory = 'Fresh Baked' WHERE category = 'Pastry' AND name IN ('Croissant', 'Blueberry Muffin', 'Chocolate Chip Cookie');
UPDATE public.products SET subcategory = 'Breakfast' WHERE category = 'Food' AND name = 'Avocado Toast';

-- Set default subcategory for new products
ALTER TABLE public.products ALTER COLUMN subcategory SET DEFAULT 'General';