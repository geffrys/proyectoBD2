import { set, useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { useFetch } from "./hooks/UseFetch";


function App() {
  interface iAsistente {
    nombres: string;
    rol: string;
  }
  // const ciudades = useFetch('http://localhost:3000/api/v1/ciudades');
  const roles = ['',]

  const { register, handleSubmit } = useForm();
  const [asistentes, setAsistentes] = useState<object>([]);
  const [facultades, setFacultades] = useState<any>([]);
  let asistente: iAsistente;

  const onSubmitEvento = handleSubmit((data: FieldValues) => {
    let isValido: boolean = true;
    let mensaje: string = '';
    if (data.titulo === '') {
      isValido = false;
      mensaje += 'El titulo es requerido\n';
    }
    if (data.descripcion === '') {
      isValido = false;
      mensaje += 'La descripcion es requerida\n';
    }
    if (data.fecha === '') {
      isValido = false;
      mensaje += 'La fecha es requerida\n';
    }
    if (data.categorias === '') {
      isValido = false;
      mensaje += 'La categoria es requerida\n';
    }
    if (data.lugar === '') {
      isValido = false;
      mensaje += 'El lugar es requerido\n';
    }
    if (isValido) {
      toast.success('Evento creado con exito');
    } else {
      toast.error(mensaje);
    }
  });

  function addAsistente() {
    setAsistentes([...asistentes, asistente]);
    asistente = {
      nombres: '',
      rol: ''
    }
  }

  return (
    <>
      <Toaster />
      <form onSubmit={onSubmitEvento}>

        <div>
          <label htmlFor="">Titulo del evento</label>
          <input type="text" {...register('titulo')} />
        </div>

        <div>
          <label htmlFor="">Descripcion del evento</label>
          <input type="text" {...register('descripcion')} />
        </div>

        <div>
          <label htmlFor="">Fecha del evento</label>
          <input type="date" {...register('fecha')} />
        </div>

        <div>
          <label htmlFor="">Categorias del evento</label>
          <input type="" {...register('categorias')} />
        </div>

        <div>
          <label htmlFor="">Lugar del evento</label>
          <input type="text" {...register('lugar')} />
        </div>
       
        {/* Aqui los asistentes */}
        <div>
          <div>
            <label htmlFor="">Agregar asistente</label>
            <input type="text" onChange={(v)=>{
              asistente.nombres = v.target.value;
            }} />
            <label htmlFor="">Selecciona su rol</label>
            <select name="" id="" onChange={(v)=>{
              asistente.rol = v.target.value;
            }}>
              <option value="">Selecciona un rol</option>
            </select>
            <button type="button" onClick={addAsistente}>Agregar</button>
          </div>
          <div>
            <label htmlFor="">Lista de asistentes</label>
            <ol>

            </ol>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="">Agregar facultad</label>
            <select name="" id="">
              <option value="">Selecciona una facultad</option>
            </select>
            <button type="button">Agregar</button>
          </div>
          <div>
            <label htmlFor="">Lista de facultades Organizadoras</label>
            <ol>

            </ol>
          </div>
        </div>

        <div>
          <label htmlFor="">Programa Organizador</label>
          <input type="text" {...register('programaOrganizador')} />
        </div>

        <div>
          <label htmlFor="">Comentarios</label>
          <input type="text" />
          <button type="button">Agregar</button>
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>

      </form>
    </>
  )
}

export default App
