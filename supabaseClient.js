import { createClient } from '@supabase/supabase-js';

// Reemplaza con las credenciales de tu proyecto de Supabase
const supabaseUrl = 'https://fsmpgzystzedgwrinukb.supabase.co';  // URL de tu proyecto
const supabaseKey = '<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbXBnenlzdHplZGd3cmludWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTk2ODksImV4cCI6MjA3MDQ5NTY4OX0.6bXgSLXvqKRt7T5yt-togXQQX4fbW-zk0z-4PRHt2yg>';                   // La clave pública (anon key)

// Crear el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
