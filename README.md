# proyectoBD2

El Politécnico Colombiano JIC, necesita un sistema para gestionar los diferentes eventos, charlas, conferencias y reuniones que se realizan, para ello se necesita una aplicación que permita registrar los eventos y se quiere que sean almacenados en una BD NoSQL como (Libre). Del evento se requiere título, descripción, categorías que sirven para realizar búsquedas,  fecha y  lugar del evento, así como la información de los asistentes, conferencistas o facilitadores, las facultades organizadoras (de forma opcional se puede tener el programa que organizó) y los comentarios del evento. 

Del lugar del evento se necesita nombre, dirección y ciudad.  De los asistentes y los conferencistas se tiene identificador, nombre de usuario, nombre completo, tipo de relación con la institución (profesor, estudiante, graduado, empresario, administrativo, directivo, etc), email y ciudad. De la ciudad, se requiere su nombre, el departamento y país.

De los comentarios se requiere el texto del comentario y el usuario que lo realizó.

Se necesita que se puedan mostrar para un evento, las facultades o programas organizadores, los facilitadores y los asistentes. En caso de que sean empleados del poli, se debe cargar la información que está en el sistema relacional.

Existe una base de datos relacional, implementada en Postgresql, actualmente con la información de los profesores, el área o el programa al que está adscrito y la Facultad y Sedes. Ver modelo relacional

Se espera que la aplicación tome la información que hay disponible en Postgresql para alimentar la información del sistema de registro de eventos - EventosPoli. Se anexa el script del esquema de la BD.

<!-- import inage -->
![image](Screenshot%202023-11-21%20103605.png)

Ejemplo de un evento. 

Se realizó el evento de programación “Maratón de BD”, el día 7 de septiembre de 2019, fue organizado por la Facultad de Ingeniería y el programa de Ingeniería Informática, en el P13-211.  Las categorías que se registran son: “programación”, “Maratón BD”.

## Actividad a realizar:

De acuerdo a  lo anterior, construya una aplicación Web (solo el Back-End), en el lenguaje de programación que prefiera, con el fin de dar solución al requerimiento de Politécnico.  Tenga en cuenta los datos disponibles en la BD Relacional. Desarrollar el CRUD en la herramienta NoSQL que el equipo elija. 

## Se evaluará:
- Aplicación web (Conectar)
- BD NoSQL (realice el modelo de la solución solicitada - CRUD)


# Documentación API

[API-Doc](https://red-sunset-865503.postman.co/workspace/Universidad~310a255d-1378-4326-ab18-ceaa0b3db798/collection/22903412-381f882e-152d-42dd-abd4-1d02687bec8a?action=share&creator=22903412)