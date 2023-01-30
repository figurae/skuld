SET check_function_bodies = false;
CREATE TABLE public.test (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    text text NOT NULL
);
ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (id);
