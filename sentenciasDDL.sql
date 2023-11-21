-- db in postgresql
CREATE TABLE paises(
	codigo INTEGER NOT NULL,
	nombre CHAR VARYING (20) NOT NULL,
	CONSTRAINT PAISES_PK PRIMARY KEY (codigo)
)

CREATE TABLE departamentos(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (20) NOT NULL,
    codigo_pais INTEGER NOT NULL,
    CONSTRAINT DEPARTAMENTOS_PK PRIMARY KEY (codigo),
    CONSTRAINT DEPARTAMENTOS_PAISES_FK FOREIGN KEY (codigo_pais) REFERENCES paises (codigo)
)

CREATE TABLE ciudades(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (20) NOT NULL,
    codigo_departamento INTEGER NOT NULL,
    CONSTRAINT CIUDADES_PK PRIMARY KEY (codigo),
    CONSTRAINT CIUDAD_DEPARTAMENTOS_FK FOREIGN KEY (codigo_departamento) REFERENCES departamentos (codigo)
)

CREATE TABLE sedes(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (20) NOT NULL,
    codigo_ciudad INTEGER NOT NULL,
    CONSTRAINT SEDES_PK PRIMARY KEY (codigo),
    CONSTRAINT SEDES_CIUDADES_FK FOREIGN KEY (codigo_ciudad) REFERENCES ciudades (codigo)
)

CREATE TABLE tipos_contratacion(
    nombre CHAR VARYING (20) NOT NULL,
    CONSTRAINT TIPOS_CONTRATACION_PK PRIMARY KEY (nombre)
)

CREATE TABLE tipos_empleado(
    nombre CHAR VARYING (20) NOT NULL,
    CONSTRAINT TIPOS_EMPLEADO_PK PRIMARY KEY (nombre)
)

CREATE TABLE facultades(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (20) NOT NULL,
    ubicacion CHAR VARYING (15) NOT NULL,
    nro_telefono CHAR VARYING (15) NOT NULL,
    id_decano CHAR VARYING (15) NOT NULL,
    CONSTRAINT FACULTADES_PK PRIMARY KEY (codigo),
    CONSTRAINT FACULTADES_EMPLEADOS_FK FOREIGN KEY (id_decano) REFERENCES empleados (identificacion),
    CONSTRAINT FACULTADES_IDX UNIQUE (id_decano)
)

CREATE TABLE areas(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (20) NOT NULL,
    facultades_codigo INTEGER NOT NULL,
    id_coordinador CHAR VARYING (15) NOT NULL,
    CONSTRAINT AREAS_PK PRIMARY KEY (codigo),
    CONSTRAINT AREAS_FACULTADES_FK FOREIGN KEY (facultades_codigo) REFERENCES facultades (codigo),
    CONSTRAINT AREAS_EMPLEADOS_FK FOREIGN KEY (id_coordinador) REFERENCES empleados (identificacion),
    CONSTRAINT AREAS_IDX UNIQUE (id_coordinador)
)

CREATE TABLE programas(
    codigo INTEGER NOT NULL,
    nombre CHAR VARYING (20) NOT NULL,
    areas_codigo INTEGER NOT NULL,
    CONSTRAINT PROGRAMAS_PK PRIMARY KEY (codigo),
    CONSTRAINT PROGRAMAS_AREAS_FK FOREIGN KEY (areas_codigo) REFERENCES areas (codigo)
)

CREATE TABLE empleados(
    identificacion CHAR VARYING (15) NOT NULL,
    nombres CHAR VARYING (30) NOT NULL,
    apellidos CHAR VARYING (30) NOT NULL,
    email CHAR VARYING (30) NOT NULL,
    tipo_contratacion CHAR VARYING (20) NOT NULL,
    tipos_empleado CHAR VARYING (20) NOT NULL,
    cod_facultad INTEGER NOT NULL,
    codigo_sede INTEGER NOT NULL,
    lugar_nacimiento CHAR VARYING (20) NOT NULL,
    CONSTRAINT EMPLEADOS_PK PRIMARY KEY (identificacion),
    CONSTRAINT EMPLEADOS_TIPOS_CONTRATACION_FK FOREIGN KEY (tipo_contratacion) REFERENCES tipos_contratacion (nombre),
    CONSTRAINT EMPLEADOS_TIPOS_EMPLEADO_FK FOREIGN KEY (tipos_empleado) REFERENCES tipos_empleado (nombre),
    CONSTRAINT EMPLEADOS_FACULTADES_FK FOREIGN KEY (cod_facultad) REFERENCES facultades (codigo),
    CONSTRAINT EMPLEADOS_SEDES_FK FOREIGN KEY (codigo_sede) REFERENCES sedes (codigo),
    CONSTRAINT EMPLEADOS_CIUDADES_FK FOREIGN KEY (lugar_nacimiento) REFERENCES ciudades (codigo)

)
