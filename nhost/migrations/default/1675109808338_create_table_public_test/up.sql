CREATE TABLE public.test (id uuid DEFAULT gen_random_uuid() NOT NULL, text text NOT NULL, PRIMARY KEY (id));
