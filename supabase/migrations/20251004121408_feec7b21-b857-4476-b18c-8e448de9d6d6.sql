-- Add restrictive RLS policies to loyalty_points table to prevent fraud
-- Only the system (via SECURITY DEFINER functions) can INSERT, UPDATE, or DELETE
-- Users can only view their own points (existing SELECT policy)

-- Prevent users from inserting loyalty points directly
CREATE POLICY "Only system can insert loyalty points"
ON public.loyalty_points
FOR INSERT
WITH CHECK (false);

-- Prevent users from updating loyalty points directly
CREATE POLICY "Only system can update loyalty points"
ON public.loyalty_points
FOR UPDATE
USING (false);

-- Prevent users from deleting loyalty points directly
CREATE POLICY "Only system can delete loyalty points"
ON public.loyalty_points
FOR DELETE
USING (false);

-- Note: SECURITY DEFINER functions (handle_new_user, update_loyalty_points_after_purchase)
-- will still be able to modify loyalty_points because they bypass RLS policies