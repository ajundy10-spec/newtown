-- Update the handle_new_user function to automatically grant admin role for admin@newtowncoffee.com
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  
  -- Insert default user role or admin role if email matches
  IF NEW.email = 'admin@newtowncoffee.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
  END IF;
  
  -- Initialize loyalty points
  INSERT INTO public.loyalty_points (user_id, points, total_earned, rewards_redeemed)
  VALUES (NEW.id, 0, 0, 0);
  
  RETURN NEW;
END;
$$;