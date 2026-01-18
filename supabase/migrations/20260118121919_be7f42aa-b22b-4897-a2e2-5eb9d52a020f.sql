-- Fix 1: Add authentication requirement for order_items table
-- Currently only users with order ownership OR admins can view, but anonymous users need to be blocked
CREATE POLICY "Authenticated users only for order items" 
ON public.order_items FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND (
    is_admin_or_editor(auth.uid()) OR 
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  )
);

-- Drop the existing policies that allow unauthenticated access
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;

-- Fix 2: Add authentication requirement for profiles table
-- Block all public SELECT and only allow users to view their own profile + admins
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING (auth.uid() IS NOT NULL AND is_admin_or_editor(auth.uid()));