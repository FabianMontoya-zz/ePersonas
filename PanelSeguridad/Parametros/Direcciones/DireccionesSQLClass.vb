Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class DireccionesSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla direcciones parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Nit"></param>
    ''' <param name="vp_S_TypeDoc"></param>
    ''' <param name="vp_S_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Nit As String, ByVal vp_S_TypeDoc As String, ByVal vp_S_Doc As String)

        Dim ObjList As New List(Of DireccionesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT D_Nit_ID, " & _
                   "       D_TypeDocument_ID, " & _
                   "       D_Document_ID, " & _
                   "       D_Consecutivo, " & _
                   "       D_Name, " & _
                   "       D_PaginaWeb, " & _
                   "       D_Direccion, " & _
                   "       D_Telefono_1, " & _
                   "       D_Telefono_2, " & _
                   "       D_Telefono_3, " & _
                   "       D_Telefono_4, " & _
                   "       D_Correo_1, " & _
                   "       D_Correo_2, " & _
                   "       D_FechaActualizacion, " & _
                   "       D_Usuario,  " & _
                   "       D_Pais_ID,  " & _
                   "       D_Ciudad_ID,  " & _
                   "       P_Name, " & _
                   "       C_Descripcion  " & _
                   " FROM DIRECCIONES D " & _
                   " INNER JOIN PAISES P ON P.P_Cod = D.D_Pais_ID " & _
                   " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = D.D_Ciudad_ID " & _
                   " WHERE D_Nit_ID = '" & vp_S_Nit & "' " & _
                   " AND D_TypeDocument_ID = '" & vp_S_TypeDoc & "' " & _
                   " AND D_Document_ID = '" & vp_S_Doc & "' " & _
                   " ORDER BY D_Consecutivo ASC ")

        StrQuery = sql.ToString

        ObjList = list(StrQuery, Conexion)

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo  Direcciones (INSERT)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vp_O_Obj As DireccionesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT Direcciones (" & _
            " D_Nit_ID, " & _
            " D_TypeDocument_ID, " & _
            " D_Document_ID, " & _
            " D_Consecutivo, " & _
            " D_Name, " & _
            " D_PaginaWeb, " & _
            " D_Direccion, " & _
            " D_Telefono_1, " & _
            " D_Telefono_2, " & _
            " D_Telefono_3, " & _
            " D_Telefono_4, " & _
            " D_Correo_1, " & _
            " D_Correo_2, " & _
            " D_Pais_ID, " & _
            " D_Ciudad_ID, " & _
            " D_FechaActualizacion, " & _
            " D_Usuario " & _
             ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_O_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.TypeDoc_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Doc_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Consecutivo & "',")
        sql.AppendLine("'" & vp_O_Obj.Contacto & "',")
        sql.AppendLine("'" & vp_O_Obj.PaginaWeb & "',")
        sql.AppendLine("'" & vp_O_Obj.Direccion & "',")
        sql.AppendLine("'" & vp_O_Obj.Telefono_1 & "',")
        sql.AppendLine("'" & vp_O_Obj.Telefono_2 & "',")
        sql.AppendLine("'" & vp_O_Obj.Telefono_3 & "',")
        sql.AppendLine("'" & vp_O_Obj.Telefono_4 & "',")
        sql.AppendLine("'" & vp_O_Obj.Correo_1 & "',")
        sql.AppendLine("'" & vp_O_Obj.Correo_2 & "',")
        sql.AppendLine("'" & vp_O_Obj.Pais_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Ciudad_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_O_Obj.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Direcciones (DELETE)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Delete_All(ByVal vp_O_Obj As DireccionesClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine(" DELETE DIRECCIONES " & _
                       " WHERE D_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND D_TypeDocument_ID = '" & vp_O_Obj.TypeDoc_ID & "'" & _
                       " AND D_Document_ID = '" & vp_O_Obj.Doc_ID & "'")

        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Direcciones para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of DireccionesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objDirecciones As New DireccionesClass
            'cargamos datos sobre el objeto de login
            If Not (IsDBNull(ReadConsulta.GetValue(0))) Then objDirecciones.Nit_ID = ReadConsulta.GetValue(0) Else objDirecciones.Nit_ID = ""
            objDirecciones.TypeDoc_ID = ReadConsulta.GetValue(1)
            objDirecciones.Doc_ID = ReadConsulta.GetValue(2)
            objDirecciones.Consecutivo = ReadConsulta.GetValue(3)

            If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objDirecciones.Contacto = ReadConsulta.GetValue(4) Else objDirecciones.Contacto = ""
            If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objDirecciones.PaginaWeb = ReadConsulta.GetValue(5) Else objDirecciones.PaginaWeb = ""
            If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objDirecciones.Direccion = ReadConsulta.GetValue(6) Else objDirecciones.Direccion = ""
            If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objDirecciones.Telefono_1 = ReadConsulta.GetValue(7) Else objDirecciones.Telefono_1 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objDirecciones.Telefono_2 = ReadConsulta.GetValue(8) Else objDirecciones.Telefono_2 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objDirecciones.Telefono_3 = ReadConsulta.GetValue(9) Else objDirecciones.Telefono_3 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objDirecciones.Telefono_4 = ReadConsulta.GetValue(10) Else objDirecciones.Telefono_4 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objDirecciones.Correo_1 = ReadConsulta.GetValue(11) Else objDirecciones.Correo_1 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objDirecciones.Correo_2 = ReadConsulta.GetValue(12) Else objDirecciones.Correo_2 = ""

            objDirecciones.FechaActualizacion = ReadConsulta.GetValue(13)
            objDirecciones.Usuario = ReadConsulta.GetValue(14)

            objDirecciones.Pais_ID = ReadConsulta.GetValue(15)
            objDirecciones.Ciudad_ID = ReadConsulta.GetValue(16)
            objDirecciones.DescripPais = ReadConsulta.GetValue(17)
            objDirecciones.DescripCiudad = ReadConsulta.GetValue(18)

            'agregamos a la lista
            ObjList.Add(objDirecciones)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region
End Class
