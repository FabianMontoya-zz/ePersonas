Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class SucursalSQLClass
#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Cliente para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of SucursalClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_TypeList
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New SucursalClass
                    'cargamos datos sobre el objeto de login
                    obj.Nit_ID = ReadConsulta.GetValue(0)
                    obj.Sucursal_ID = ReadConsulta.GetValue(1)
                    obj.Descripcion = ReadConsulta.GetValue(2)
                    obj.UsuarioCreacion = ReadConsulta.GetValue(3)
                    obj.FechaCreacion = ReadConsulta.GetValue(4)
                    obj.UsuarioActualizacion = ReadConsulta.GetValue(5)
                    obj.FechaActualizacion = ReadConsulta.GetValue(6)
                    'agregamos a la lista
                    ObjList.Add(obj)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New SucursalClass
                    'cargamos datos sobre el objeto de login
                    obj.Nit_ID = ReadConsulta.GetValue(0)
                    obj.Sucursal_ID = ReadConsulta.GetValue(1)
                    obj.Descripcion = ReadConsulta.GetValue(2)
                    'agregamos a la lista
                    ObjList.Add(obj)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta

        Return ObjList

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' lee la matriz de Grupo documentos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Sucursal()

        Dim ObjList As New List(Of SucursalClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append("  SELECT SUC_Nit_ID, SUC_Surcursal_ID,CAST(SUC_Surcursal_ID AS NVARCHAR(5)) + ' - ' + SUC_Descripcion AS DESCRIPCION FROM SUCURSAL  " & _
                                "  ORDER BY SUC_Surcursal_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class
