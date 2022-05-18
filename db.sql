-- Database: tasks

-- DROP DATABASE IF EXISTS tasks;

CREATE DATABASE tasks
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Mexico.1252'
    LC_CTYPE = 'Spanish_Mexico.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.task

-- DROP TABLE IF EXISTS public.task;

CREATE TABLE IF NOT EXISTS public.task
(
    task_id serial NOT NULL,
    name character varying(50),
    description character varying(90),
    creation_date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    due_date timestamp without time zone
)


--HERE YOU CAN START TO POBLATING THE TABLE TO SEE ITS USAGE