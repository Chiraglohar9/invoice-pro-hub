-- Fix security vulnerability: Restrict public access to profiles table
-- Drop the overly permissive SELECT policy that allows public read access
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a secure SELECT policy that only allows users to view their own profile
CREATE POLICY "Users can only view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);