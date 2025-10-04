-- Insert sample coffee bean products
INSERT INTO public.products (name, description, price, category, subcategory, image_url, available) VALUES
  (
    'Ethiopian Yirgacheffe',
    'Light roast with bright citrus notes, floral aroma, and tea-like body. Single origin from the birthplace of coffee.',
    18.99,
    'Beans',
    'Light - Ethiopia',
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop',
    true
  ),
  (
    'Colombian Supremo',
    'Medium roast with balanced acidity, caramel sweetness, and nutty undertones. Perfect for everyday brewing.',
    16.99,
    'Beans',
    'Medium - Colombia',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop',
    true
  ),
  (
    'Brazilian Dark Roast',
    'Bold dark roast with rich chocolate notes and low acidity. Ideal for espresso and strong coffee lovers.',
    15.99,
    'Beans',
    'Dark - Brazil',
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
    true
  ),
  (
    'Kenyan AA',
    'Medium-light roast with wine-like acidity, berry notes, and full body. Highly sought after single origin.',
    19.99,
    'Beans',
    'Medium - Kenya',
    'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800&h=600&fit=crop',
    true
  ),
  (
    'Sumatra Mandheling',
    'Dark roast with earthy, herbal notes and syrupy body. Low acidity with a lingering finish.',
    17.99,
    'Beans',
    'Dark - Indonesia',
    'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&h=600&fit=crop',
    true
  ),
  (
    'Costa Rican Tarrazu',
    'Light-medium roast with bright acidity, honey sweetness, and clean finish. Grown at high altitude.',
    18.49,
    'Beans',
    'Light - Costa Rica',
    'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&h=600&fit=crop',
    true
  ),
  (
    'Guatemalan Antigua',
    'Medium roast with cocoa, spice, and subtle smoke. Complex flavor profile with velvety body.',
    17.49,
    'Beans',
    'Medium - Guatemala',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
    true
  ),
  (
    'Italian Espresso Blend',
    'Dark roast blend crafted for espresso. Rich crema, full body, and notes of dark chocolate and toasted nuts.',
    16.49,
    'Beans',
    'Dark - Blend',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
    true
  );