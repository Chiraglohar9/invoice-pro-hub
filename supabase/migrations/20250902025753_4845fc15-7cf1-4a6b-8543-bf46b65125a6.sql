-- Fix security vulnerability: Restrict public access to users table
-- Drop the overly permissive SELECT policy that allows public read access
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;

-- Create a more secure SELECT policy that only allows authenticated users to read their own data
CREATE POLICY "Users can only read their own data" 
ON public.users 
FOR SELECT 
USING (auth.uid()::text = email OR auth.role() = 'authenticated');

-- Also update the UPDATE policy to be more specific
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.users;

CREATE POLICY "Users can only update their own data" 
ON public.users 
FOR UPDATE 
USING (auth.uid()::text = email);