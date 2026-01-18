-- Allow service role to insert order items (used by create-order edge function)
-- The edge function uses the service role key which bypasses RLS, so no policy change needed
-- However, we should ensure the orders table insert policy is correct for authenticated users

-- Drop and recreate the orders insert policy to be more explicit
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

-- Allow order creation with proper validation
-- Guest orders have NULL user_id, authenticated users must match their own id
CREATE POLICY "Orders can be created by guests or authenticated users" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  -- Guest checkout: user_id is NULL
  user_id IS NULL 
  OR 
  -- Authenticated checkout: user_id matches the authenticated user
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
);