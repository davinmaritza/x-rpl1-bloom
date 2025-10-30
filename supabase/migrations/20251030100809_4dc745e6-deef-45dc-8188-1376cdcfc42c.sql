-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('developer', 'student');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create profiles table for student data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  class TEXT DEFAULT 'X RPL 1',
  absen_number INTEGER,
  nisn TEXT,
  nis TEXT,
  portfolio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create piket_schedules table
CREATE TABLE public.piket_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day TEXT NOT NULL,
  student_names TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on piket_schedules
ALTER TABLE public.piket_schedules ENABLE ROW LEVEL SECURITY;

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on gallery_images
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create page_content table for dynamic content
CREATE TABLE public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on page_content
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Developers can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Developers can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Developers can update roles"
  ON public.user_roles FOR UPDATE
  USING (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Developers can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'developer'));

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Developers can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Developers can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Developers can delete profiles"
  ON public.profiles FOR DELETE
  USING (public.has_role(auth.uid(), 'developer'));

-- RLS Policies for piket_schedules
CREATE POLICY "Anyone can view piket schedules"
  ON public.piket_schedules FOR SELECT
  USING (true);

CREATE POLICY "Developers can manage piket schedules"
  ON public.piket_schedules FOR ALL
  USING (public.has_role(auth.uid(), 'developer'));

-- RLS Policies for gallery_images
CREATE POLICY "Anyone can view gallery images"
  ON public.gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Developers can manage gallery images"
  ON public.gallery_images FOR ALL
  USING (public.has_role(auth.uid(), 'developer'));

-- RLS Policies for page_content
CREATE POLICY "Anyone can view page content"
  ON public.page_content FOR SELECT
  USING (true);

CREATE POLICY "Developers can manage page content"
  ON public.page_content FOR ALL
  USING (public.has_role(auth.uid(), 'developer'));

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, class)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    'X RPL 1'
  );
  
  -- Default role is student
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'student');
  
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_piket_schedules_updated_at
  BEFORE UPDATE ON public.piket_schedules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default home page content
INSERT INTO public.page_content (page_name, content)
VALUES ('home', '{"title": "Selamat Datang Di Website X RPL 1 SMK Negeri 13 Bandung", "subtitle": "Kelas Terbaik di SMK Negeri 13 Bandung"}');

-- Insert default piket schedules (empty for now)
INSERT INTO public.piket_schedules (day, student_names) VALUES
  ('Senin', ARRAY[]::TEXT[]),
  ('Selasa', ARRAY[]::TEXT[]),
  ('Rabu', ARRAY[]::TEXT[]),
  ('Kamis', ARRAY[]::TEXT[]),
  ('Jumat', ARRAY[]::TEXT[]);