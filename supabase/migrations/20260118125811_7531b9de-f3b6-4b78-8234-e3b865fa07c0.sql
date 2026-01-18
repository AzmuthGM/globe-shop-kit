-- Add policy for users to view their own roles
-- This allows users to check their own role assignments for UI decisions
-- while maintaining security (they cannot see other users' roles)

CREATE POLICY "Users can view own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);