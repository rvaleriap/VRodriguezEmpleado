using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class Empleado
    {
        public static ML.Result GetAll()
        {
            ML.Result result = new ML.Result();
            try
            {
                using (DL.VrodriguezEmpleadoContext context = new DL.VrodriguezEmpleadoContext())
                {
                    var query = context.Empleados.FromSqlRaw("EmpleadoGetAll").ToList();
                    if (query != null)
                    {
                        result.Objects = new List<object>();
                        foreach (var obj in query)
                        {
                            ML.Empleado empleado = new ML.Empleado();

                            empleado.IdEmpleado = obj.IdEmpleado;
                            empleado.NumeroNomina = obj.NumeroNomina;
                            empleado.Nombre =obj.Nombre;
                            empleado.ApellidoPaterno = obj.ApellidoPaterno;
                            empleado.ApellidoMaterno = obj.ApellidoMaterno;

                            empleado.Estado = new ML.Estado();
                            empleado.Estado.IdEstado = obj.IdEstado.Value;
                            empleado.Estado.Nombre = obj.NombreEstado;

                            result.Objects.Add(empleado);
                        }


                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                        result.Message = "No se pueden mostrar los datos";
                    }

                }

            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.Message = ex.Message;
            }
            return result;
        }
        public static ML.Result Add(ML.Empleado empleado)
        {
            ML.Result result = new ML.Result();
            try
            {
                using (DL.VrodriguezEmpleadoContext context = new DL.VrodriguezEmpleadoContext())
                {
                    int query = context.Database.ExecuteSqlRaw($"EmpleadoAdd '{empleado.Nombre}','{empleado.ApellidoPaterno}','{empleado.ApellidoMaterno}' ,{empleado.Estado.IdEstado}");
                    if (query >= 1)
                    {
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                        result.Message = "No se insertó el registro";
                    }

                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.Message = ex.Message;
            }
            return result;
        }
        public static ML.Result GetById(int IdEmpleado)

        {
            ML.Result result = new ML.Result();
            try
            {
                using (DL.VrodriguezEmpleadoContext context = new DL.VrodriguezEmpleadoContext())
                {
                    var query = context.Empleados.FromSqlRaw($"EmpleadoGetById {IdEmpleado}").AsEnumerable().FirstOrDefault();
                    result.Objects = new List<object>();
                    if (query != null)
                    {

                        ML.Empleado empleado = new ML.Empleado();

                        empleado.IdEmpleado = query.IdEmpleado;
                        empleado.NumeroNomina = query.NumeroNomina;
                        empleado.Nombre = query.Nombre;
                        empleado.ApellidoPaterno = query.ApellidoPaterno;
                        empleado.ApellidoMaterno = query.ApellidoMaterno;

                        empleado.Estado = new ML.Estado();
                        empleado.Estado.IdEstado = query.IdEstado.Value;
                        empleado.Estado.Nombre = query.NombreEstado;

                        result.Object = empleado; //boxing
                        result.Correct = true;

                    }

                    else
                    {
                        result.Correct = false;
                        result.Message = "No se puede mostrar la informacion";
                    }
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.Message = "No se logra mostrar la información";
            }
            return result;
        }
        public static ML.Result Update(ML.Empleado empleado)
        {
            ML.Result result = new ML.Result();
            try
            {
                using (DL.VrodriguezEmpleadoContext context = new DL.VrodriguezEmpleadoContext())
                {
                    var query = context.Database.ExecuteSqlRaw($"EmpleadoUpdate {empleado.IdEmpleado},'{empleado.Nombre}','{empleado.ApellidoPaterno}','{empleado.ApellidoMaterno}' ,{empleado.Estado.IdEstado}");
                    if (query >= 1)
                    {
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                        result.Message = "No se actualizo la información";
                    }
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.Message = "No se logro actualizar la información";
            }
            return result;
        }
        public static ML.Result Delete(ML.Empleado empleado)
        {
            ML.Result result = new ML.Result();
            try
            {
                using (DL.VrodriguezEmpleadoContext context = new DL.VrodriguezEmpleadoContext())
                {
                    var query = context.Database.ExecuteSqlRaw($"EmpleadoDelete {empleado.IdEmpleado}");
                    if (query >= 1)
                    {
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                        result.Message = "No se elimino el registro";
                    }
                }

            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.Message = "No se elimino el registro";
            }
            return result;
        }
    }
}
