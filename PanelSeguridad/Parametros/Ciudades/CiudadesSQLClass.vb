Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class CiudadesSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Ciudades parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllCiudades(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListCiudades As New List(Of CiudadesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT C_Ciudad_ID, C_Descripcion, C_FechaActualizacion, C_Usuario, C_Pais_ID, P.P_Name FROM Ciudades C " & _
                       " INNER JOIN PAISES P ON P.P_Cod = C.C_Pais_ID ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT C_Ciudad_ID, C_Descripcion, C_FechaActualizacion, C_Usuario, C_Pais_ID, P.P_Name FROM Ciudades C " & _
                            " INNER JOIN PAISES P ON P.P_Cod = C.C_Pais_ID ")
            Else
                sql.Append("SELECT C_Ciudad_ID, C_Descripcion, C_FechaActualizacion, C_Usuario, C_Pais_ID, P.P_Name FROM Ciudades C " & _
                            " INNER JOIN PAISES P ON P.P_Cod = C.C_Pais_ID " & _
                            " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListCiudades = listCiudades(StrQuery, Conexion, "List")

        Return ObjListCiudades

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Ciudades (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Ciudades"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertCiudades(ByVal vp_Obj_Ciudades As CiudadesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT Ciudades (" & _
            "C_Pais_ID," & _
            "C_Ciudad_ID," & _
            "C_Descripcion," & _
            "C_FechaActualizacion," & _
            "C_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Ciudades.Pais_ID & "',")
        sql.AppendLine("'" & vp_Obj_Ciudades.Ciudades_ID & "',")
        sql.AppendLine("'" & vp_Obj_Ciudades.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Ciudades.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Ciudades.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Ciudades (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Ciudades"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateCiudades(ByVal vp_Obj_Ciudades As CiudadesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE Ciudades SET " & _
                       " C_Descripcion ='" & vp_Obj_Ciudades.Descripcion & "', " & _
                       " C_FechaActualizacion ='" & vp_Obj_Ciudades.FechaActualizacion & "', " & _
                       " C_Usuario ='" & vp_Obj_Ciudades.Usuario & "' " & _
                       " WHERE C_Ciudad_ID = '" & vp_Obj_Ciudades.Ciudades_ID & "' AND C_Pais_ID ='" & vp_Obj_Ciudades.Pais_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Ciudades (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Ciudades"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseCiudades(ByVal vp_Obj_Ciudades As CiudadesClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE Ciudades WHERE C_Ciudad_ID = '" & vp_Obj_Ciudades.Ciudades_ID & "' AND C_Pais_ID ='" & vp_Obj_Ciudades.Pais_ID & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropList(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim SQLGeneral As New GeneralSQLClass

        Dim sql As New StringBuilder

        sql.Append(" SELECT T_IndexColumna As ID, T_Traductor As descripcion FROM TC_TABLAS " & _
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListPais(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT P_Cod AS ID,CAST(P_Cod AS NVARCHAR(15)) + ' - ' + P_Name AS DESCRIPCION FROM PAISES ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function


#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Ciudades para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listCiudades(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_s_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListCiudades As New List(Of CiudadesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()


        Select Case vp_s_TypeList
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCiudades As New CiudadesClass
                    'cargamos datos sobre el objeto de login
                    objCiudades.Ciudades_ID = ReadConsulta.GetValue(0)
                    objCiudades.Descripcion = ReadConsulta.GetString(1)
                    objCiudades.FechaActualizacion = ReadConsulta.GetString(2)
                    objCiudades.Usuario = ReadConsulta.GetString(3)
                    objCiudades.Pais_ID = ReadConsulta.GetValue(4)
                    objCiudades.DescripPais = ReadConsulta.GetValue(5)

                    'agregamos a la lista
                    ObjListCiudades.Add(objCiudades)

                End While
            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCiudades As New CiudadesClass
                    'cargamos datos sobre el objeto de login
                    objCiudades.Pais_ID = ReadConsulta.GetValue(0)
                    objCiudades.DescripPais = ReadConsulta.GetValue(1)
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objCiudades.Ciudades_ID = ReadConsulta.GetValue(2) Else objCiudades.Ciudades_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objCiudades.Descripcion = ReadConsulta.GetValue(3) Else objCiudades.Descripcion = ""

                    'agregamos a la lista
                    ObjListCiudades.Add(objCiudades)

                End While
        End Select



        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListCiudades

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As CiudadesClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM Ciudades " & _
                       " WHERE C_Pais_ID = '" & vp_O_Obj.Pais_ID & "'" & _
                       " AND C_Ciudad_ID = '" & vp_O_Obj.Ciudades_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

   
    ''' <summary>
    ''' lee la matriz de ciudades
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_Ciudad()

        Dim ObjList As New List(Of CiudadesClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT P_Cod, CAST(P_Cod AS NVARCHAR(15)) + ' - ' + P_Name AS DescripPais ,C_Ciudad_ID, CAST(C_Ciudad_ID AS NVARCHAR(15)) + ' - ' + C_Descripcion AS DescripCiudad  FROM PAISES P " & _
                   " LEFT JOIN CIUDADES C ON P.P_Cod = C.C_Pais_ID " & _
                   " ORDER BY P_Cod,C_Ciudad_ID ASC ")
        Dim StrQuery As String = sql.ToString
    
        ObjList = listCiudades(StrQuery, Conexion, "Matrix")

        Return ObjList
    End Function
#End Region

End Class
