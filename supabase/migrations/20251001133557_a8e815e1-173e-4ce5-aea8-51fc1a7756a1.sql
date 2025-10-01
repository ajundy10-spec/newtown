-- CRITICAL SECURITY FIX: Remove user update permission on loyalty_points
-- Users should NEVER be able to modify their own loyalty points
-- Only system processes (via SECURITY DEFINER functions) should update points

-- Drop the dangerous policy that allows users to update their own points
DROP POLICY IF EXISTS "Users can update their own loyalty points" ON public.loyalty_points;

-- Keep the SELECT policy so users can VIEW their points
-- (This policy already exists and is correct)

-- Create a SECURITY DEFINER function to update loyalty points safely
-- This function can only be called by authenticated users and validates the purchase
CREATE OR REPLACE FUNCTION public.update_loyalty_points_after_purchase(
  p_user_id UUID,
  p_order_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_points INTEGER;
  v_should_redeem BOOLEAN;
BEGIN
  -- Verify the order exists and belongs to the user
  IF NOT EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = p_order_id AND user_id = p_user_id
  ) THEN
    RAISE EXCEPTION 'Invalid order';
  END IF;

  -- Get current loyalty points
  SELECT points INTO v_current_points
  FROM public.loyalty_points
  WHERE user_id = p_user_id;

  -- Calculate new points (add 1 point per purchase)
  v_current_points := v_current_points + 1;
  v_should_redeem := v_current_points >= 10;

  -- Update loyalty points
  IF v_should_redeem THEN
    -- Reset points and increment rewards
    UPDATE public.loyalty_points
    SET 
      points = 0,
      total_earned = total_earned + 1,
      rewards_redeemed = rewards_redeemed + 1,
      updated_at = now()
    WHERE user_id = p_user_id;
  ELSE
    -- Just add the point
    UPDATE public.loyalty_points
    SET 
      points = v_current_points,
      total_earned = total_earned + 1,
      updated_at = now()
    WHERE user_id = p_user_id;
  END IF;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.update_loyalty_points_after_purchase(UUID, UUID) TO authenticated;