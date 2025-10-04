-- Security Enhancement: Update update_updated_at_column function to include search_path
-- This prevents potential SQL injection and ensures the function only accesses the public schema

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;