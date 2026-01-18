-- Fix: Orders table email exposure - ensure authentication is required
-- Drop existing SELECT policies
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

-- Create new policies with explicit authentication checks
CREATE POLICY "Users can view own orders" 
ON public.orders FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" 
ON public.orders FOR SELECT 
USING (auth.uid() IS NOT NULL AND is_admin_or_editor(auth.uid()));