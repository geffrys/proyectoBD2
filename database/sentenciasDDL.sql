-- db in postgresql
CREATE TABLE paises(
	codigo INTEGER NOT NULL,
	nombre CHAR VARYING (30) NOT NULL,
	CONSTRAINT PAISES_PK PRIMARY KEY (codigo)
);

CREATE TABLE departamentos(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (30) NOT NULL,
    codigo_pais INTEGER NOT NULL,
    CONSTRAINT DEPARTAMENTOS_PK PRIMARY KEY (codigo),
    CONSTRAINT DEPARTAMENTOS_PAISES_FK FOREIGN KEY (codigo_pais) REFERENCES paises (codigo)
);

CREATE TABLE ciudades(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (30) NOT NULL,
    codigo_departamento INTEGER NOT NULL,
    CONSTRAINT CIUDADES_PK PRIMARY KEY (codigo),
    CONSTRAINT CIUDAD_DEPARTAMENTOS_FK FOREIGN KEY (codigo_departamento) REFERENCES departamentos (codigo)
);

CREATE TABLE sedes(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (30) NOT NULL,
    codigo_ciudad INTEGER NOT NULL,
    CONSTRAINT SEDES_PK PRIMARY KEY (codigo),
    CONSTRAINT SEDES_CIUDADES_FK FOREIGN KEY (codigo_ciudad) REFERENCES ciudades (codigo)
);

CREATE TABLE tipos_contratacion(
    nombre CHAR VARYING (30) NOT NULL,
    CONSTRAINT TIPOS_CONTRATACION_PK PRIMARY KEY (nombre)
);

CREATE TABLE tipos_empleado(
    nombre CHAR VARYING (30) NOT NULL,
    CONSTRAINT TIPOS_EMPLEADO_PK PRIMARY KEY (nombre)
);

CREATE TABLE facultades(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (30) NOT NULL,
    ubicacion CHAR VARYING (15) NOT NULL,
    nro_telefono CHAR VARYING (15) NOT NULL,
    CONSTRAINT FACULTADES_PK PRIMARY KEY (codigo)
);

CREATE TABLE areas(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (30) NOT NULL,
    facultades_codigo INTEGER NOT NULL,
    CONSTRAINT AREAS_PK PRIMARY KEY (codigo),
    CONSTRAINT AREAS_FACULTADES_FK FOREIGN KEY (facultades_codigo) REFERENCES facultades (codigo)
);

CREATE TABLE programas(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (30) NOT NULL,
    areas_codigo INTEGER NOT NULL,
    CONSTRAINT PROGRAMAS_PK PRIMARY KEY (codigo),
    CONSTRAINT PROGRAMAS_AREAS_FK FOREIGN KEY (areas_codigo) REFERENCES areas (codigo)
);

CREATE TABLE empleados(
    identificacion CHAR VARYING (15) NOT NULL,
    nombres CHAR VARYING (30) NOT NULL,
    apellidos CHAR VARYING (30) NOT NULL,
    email CHAR VARYING (30) NOT NULL,
    tipo_contratacion CHAR VARYING (30) NOT NULL,
    tipos_empleado CHAR VARYING (30) NOT NULL,
    cod_facultad INTEGER NOT NULL,
    codigo_sede INTEGER NOT NULL,
    lugar_nacimiento INTEGER NOT NULL,
    CONSTRAINT EMPLEADOS_PK PRIMARY KEY (identificacion),
    CONSTRAINT EMPLEADOS_TIPOS_CONTRATACION_FK FOREIGN KEY (tipo_contratacion) REFERENCES tipos_contratacion (nombre),
    CONSTRAINT EMPLEADOS_TIPOS_EMPLEADO_FK FOREIGN KEY (tipos_empleado) REFERENCES tipos_empleado (nombre),
    CONSTRAINT EMPLEADOS_FACULTADES_FK FOREIGN KEY (cod_facultad) REFERENCES facultades (codigo),
    CONSTRAINT EMPLEADOS_SEDES_FK FOREIGN KEY (codigo_sede) REFERENCES sedes (codigo),
    CONSTRAINT EMPLEADOS_CIUDADES_FK FOREIGN KEY (lugar_nacimiento) REFERENCES ciudades (codigo)
);


insert into paises (codigo,nombre) values (57, 'COLOMBIA'); 

insert into departamentos (codigo,nombre, codigo_pais) values (1, 'ANTIOQUIA', 57); 

insert into ciudades (codigo,nombre, codigo_departamento) values (1, 'MEDELLIN', 1); 

insert into facultades (codigo,nombre,ubicacion,nro_telefono) values (1,'INGENIERIA', 'P38-203','3197906');

insert into sedes (codigo,nombre,codigo_ciudad) values (1, 'POBLADO', 1);

insert into tipos_contratacion (nombre) values ('LIBRE NOMBRAMIENTO');
insert into tipos_contratacion (nombre) values ('CARRERA ADMINISTRATIVA');
insert into tipos_contratacion (nombre) values ('CARRERA DOCENTE');

insert into tipos_empleado (nombre) values ('ADMINISTRATIVO');
insert into tipos_empleado (nombre) values ('DOCENTE');

insert into empleados (identificacion,nombres,apellidos,email,tipo_contratacion,tipos_empleado,cod_facultad,codigo_sede,lugar_nacimiento) values (10,'LUZ','LOPEZ','LMLOPEZ@ELPOLI.EDU.CO','CARRERA ADMINISTRATIVA','ADMINISTRATIVO', 1,1,1);
insert into empleados (identificacion,nombres,apellidos,email,tipo_contratacion,tipos_empleado,cod_facultad,codigo_sede,lugar_nacimiento) values (11,'JOSE LEONARDO','RAMIREZ','JOSERAMIREZ@ELPOLI.EDU.CO','LIBRE NOMBRAMIENTO','ADMINISTRATIVO', 1,1,1);
insert into areas (codigo,nombre,facultades_codigo) values (1, 'APIT', 1); 

insert into programas (codigo,nombre,areas_codigo) values (15,'INGENIERIA INFORMATICA', 1);


ALTER TABLE paises ALTER COLUMN nombre TYPE VARCHAR(30);
ALTER TABLE departamentos ALTER COLUMN nombre TYPE VARCHAR(30);
ALTER TABLE ciudades ALTER COLUMN nombre TYPE VARCHAR(30);
ALTER TABLE sedes ALTER COLUMN nombre TYPE VARCHAR(30);
ALTER TABLE tipos_contratacion ALTER COLUMN nombre TYPE VARCHAR(30);
ALTER TABLE tipos_empleado ALTER COLUMN nombre TYPE VARCHAR(30);
ALTER TABLE facultades ALTER COLUMN nombre TYPE VARCHAR(30);
ALTER TABLE areas ALTER COLUMN nombre TYPE VARCHAR(30);
ALTER TABLE programas ALTER COLUMN nombre TYPE VARCHAR(30);
ALTER TABLE empleados ALTER COLUMN nombres TYPE VARCHAR(30);

ALTER TABLE empleados ALTER COLUMN tipo_contratacion TYPE VARCHAR(30);
ALTER TABLE empleados ALTER COLUMN tipos_empleado TYPE VARCHAR(30);


DELETE FROM empleados;
DELETE FROM tipos_contratacion;
DELETE FROM tipos_empleado;
DELETE FROM programas;
DELETE FROM areas;
DELETE FROM facultades;
DELETE FROM sedes;
DELETE FROM ciudades;
DELETE FROM departamentos;
DELETE FROM paises;

SELECT * FROM paises;
SELECT * FROM departamentos;
SELECT * FROM ciudades;
SELECT * FROM sedes;
SELECT * FROM tipos_contratacion;
SELECT * FROM tipos_empleado;
SELECT * FROM facultades;
SELECT * FROM areas;
SELECT * FROM programas;
SELECT * FROM empleados;

SELECT * FROM empleados 
INNER JOIN tipos_contratacion ON empleados.tipo_contratacion = tipos_contratacion.nombre 
INNER JOIN tipos_empleado ON empleados.tipos_empleado = tipos_empleado.nombre 
INNER JOIN facultades ON empleados.cod_facultad = facultades.codigo 
INNER JOIN sedes ON empleados.codigo_sede = sedes.codigo 
INNER JOIN ciudades ON empleados.lugar_nacimiento = ciudades.codigo 
INNER JOIN departamentos ON ciudades.codigo_departamento = departamentos.codigo 
INNER JOIN paises ON departamentos.codigo_pais = paises.codigo 
INNER JOIN areas ON facultades.codigo = areas.facultades_codigo
INNER JOIN programas ON areas.codigo = programas.areas_codigo;


SELECT empleados.identificacion, empleados.nombres || ' ' || empleados.apellidos , 
empleados.email, empleados.tipos_empleado as relacioninstitucion, ciudades.nombre as ciudad, sedes.nombre as sede,
departamentos.nombre as departamento, paises.nombre as pais
FROM empleados 
INNER JOIN sedes ON sedes.codigo = empleados.codigo_sede
INNER JOIN ciudades ON ciudades.codigo = empleados.lugar_nacimiento
INNER JOIN departamentos ON ciudades.codigo_departamento = departamentos.codigo
INNER JOIN paises ON departamentos.codigo_pais = paises.codigo
WHERE identificacion like '${asistente.identificacion}';
