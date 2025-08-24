-- Fix search path for the create_user_schema function
CREATE OR REPLACE FUNCTION public.create_user_schema(username text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
    schema_name TEXT := 'user_' || username || '_schema';
BEGIN
    -- Create the schema
    EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', schema_name);
    
    -- Create tables in the schema
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.transactions (
            id SERIAL PRIMARY KEY,
            amount DECIMAL(10,2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            description TEXT
        )', schema_name);
    
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.invoices (
            id SERIAL PRIMARY KEY,
            customer_id INTEGER,
            total_amount DECIMAL(10,2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )', schema_name);
    
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.customers (
            customer_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            sales DECIMAL(10,2),
            pending DECIMAL(10,2)
        )', schema_name);
    
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            price DECIMAL(10,2)
        )', schema_name);
    
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.reports (
            id SERIAL PRIMARY KEY,
            report_type VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )', schema_name);
    
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.account (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            balance DECIMAL(10,2)
        )', schema_name);
    
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.settings (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            preference JSONB
        )', schema_name);
    
    RETURN schema_name;
END;
$function$;