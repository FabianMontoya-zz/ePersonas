Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Adm_RolesSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla roles parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllRoles(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListRoles As New List(Of Adm_RolesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT R_Nit_ID, R_Rol_ID, R_Descripcion, R_Sigla, R_Estado, " & _
                       " R_Usuario_Creacion, R_FechaCreacion, R_Usuario_Actualizacion, R_FechaActualizacion, " & _
                       " ROW_NUMBER() OVER(ORDER BY R_Nit_ID, R_Rol_ID ASC) AS Index_Roles, TC.DDLL_Descripcion " & _
                       " FROM ROLES  R " & _
                       " INNER JOIN  TC_DDL_TIPO TC ON  TC.DDL_ID = R.R_Estado AND TC.DDL_Tabla='ESTADO_GENERAL' ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT R_Nit_ID, R_Rol_ID, R_Descripcion, R_Sigla, R_Estado, " & _
                       " R_Usuario_Creacion, R_FechaCreacion, R_Usuario_Actualizacion, R_FechaActualizacion, " & _
                       " ROW_NUMBER() OVER(ORDER BY R_Nit_ID, R_Rol_ID ASC) AS Index_Roles, TC.DDLL_Descripcion " & _
                       " FROM ROLES  R " & _
                       " INNER JOIN  TC_DDL_TIPO TC ON  TC.DDL_ID = R.R_Estado AND TC.DDL_Tabla='ESTADO_GENERAL' ")
            Else
                sql.Append(" SELECT R_Nit_ID, R_Rol_ID, R_Descripcion, R_Sigla, R_Estado, " & _
                       " R_Usuario_Creacion, R_FechaCreacion, R_Usuario_Actualizacion, R_FechaActualizacion, " & _
                       " ROW_NUMBER() OVER(ORDER BY R_Nit_ID, R_Rol_ID ASC) AS Index_Roles, TC.DDLL_Descripcion " & _
                       " FROM ROLES  R " & _
                       " INNER JOIN  TC_DDL_TIPO TC ON  TC.DDL_ID = R.R_Estado AND TC.DDL_Tabla='ESTADO_GENERAL' " & _
                       "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%' ")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  R_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY R_Nit_ID, R_Rol_ID ASC")
            Else
                vl_sql_filtro.Append("AND  R_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY R_Nit_ID, R_Rol_ID ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY R_Nit_ID, R_Rol_ID ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString
        ObjListRoles = listrol(StrQuery, Conexion, "Read")

        Return ObjListRoles

    End Function

    ''' <summary>
    ''' funcion que crea el query para el estado del rol (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Rol"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function DeleteRol(ByVal vp_Obj_Rol As Adm_RolesClass)
        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        Dim StrQuery As String = ""

        sql.AppendLine("UPDATE ROLES SET " & _
                       " R_Estado ='" & 2 & "', " & _
                       " R_Usuario_Actualizacion = '" & vp_Obj_Rol.UsuarioActualizacion & "', " & _
                       " R_FechaActualizacion = '" & vp_Obj_Rol.FechaActualizacion & "' " & _
                       " WHERE R_Nit_ID = '" & vp_Obj_Rol.Nit_ID & "' AND R_Rol_ID = '" & vp_Obj_Rol.Rol_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del rol (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Rol"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateRol(ByVal vp_Obj_Rol As Adm_RolesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE ROLES SET " & _
                       " R_Descripcion ='" & vp_Obj_Rol.Descripcion & "', " & _
                       " R_Sigla ='" & vp_Obj_Rol.Sigla & "', " & _
                       " R_Usuario_Actualizacion ='" & vp_Obj_Rol.UsuarioActualizacion & "', " & _
                       " R_FechaActualizacion ='" & vp_Obj_Rol.FechaActualizacion & "' " & _
                       " WHERE R_Nit_ID = '" & vp_Obj_Rol.Nit_ID & "' AND R_Rol_ID = '" & vp_Obj_Rol.Rol_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo rol (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_rol"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertRol(ByVal vp_Obj_rol As Adm_RolesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT ROLES (" & _
                       "R_Nit_ID," & _
                       "R_Rol_ID," & _
                       "R_Descripcion," & _
                       "R_Sigla," & _
                       "R_Estado," & _
                       "R_Usuario_Creacion," & _
                       "R_FechaCreacion," & _
                       "R_Usuario_Actualizacion," & _
                       "R_FechaActualizacion" & _
                       ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_rol.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_rol.Rol_ID & "',")
        sql.AppendLine("'" & vp_Obj_rol.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_rol.Sigla & "', ")
        sql.AppendLine("'" & 1 & "', ")
        sql.AppendLine("'" & vp_Obj_rol.UsuarioCreacion & "', ")
        sql.AppendLine("'" & vp_Obj_rol.FechaCreacion & "', ")
        sql.AppendLine("'" & vp_Obj_rol.UsuarioActualizacion & "', ")
        sql.AppendLine("'" & vp_Obj_rol.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

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
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ORDER BY T_Traductor ASC")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de ROLES para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listrol(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListRol As New List(Of Adm_RolesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type

            Case "Read"

                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objRol As New Adm_RolesClass
                    'cargamos datos sobre el objeto de login
                    objRol.Nit_ID = ReadConsulta.GetValue(0)
                    objRol.Rol_ID = ReadConsulta.GetValue(1)
                    objRol.Descripcion = ReadConsulta.GetValue(2)
                    objRol.Sigla = ReadConsulta.GetValue(3)
                    objRol.Estado = ReadConsulta.GetValue(4)

                    objRol.UsuarioCreacion = ReadConsulta.GetValue(5)
                    objRol.FechaCreacion = ReadConsulta.GetValue(6)
                    objRol.UsuarioActualizacion = ReadConsulta.GetValue(7)
                    objRol.FechaActualizacion = ReadConsulta.GetValue(8)
                    objRol.Index = ReadConsulta.GetValue(9)
                    objRol.DescripEstado = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListRol.Add(objRol)

                End While

            Case "MatrixAll"

                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objRol As New Adm_RolesClass
                    'cargamos datos sobre el objeto de login
                    objRol.Nit_ID = ReadConsulta.GetValue(0)
                    objRol.Rol_ID = ReadConsulta.GetValue(1)
                    objRol.Descripcion = ReadConsulta.GetValue(2)
                    objRol.Sigla = ReadConsulta.GetValue(3)
                    objRol.Estado = ReadConsulta.GetValue(4)
                    objRol.Index = ReadConsulta.GetValue(5)

                    'agregamos a la lista
                    ObjListRol.Add(objRol)

                End While

        End Select
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListRol

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As Adm_RolesClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM ROLES " & _
                       " WHERE R_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND R_Rol_ID = '" & vp_O_Obj.Rol_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de Roles
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixAll_Roles(ByVal vp_O_Obj As ClienteClass)
        Dim ObjListRoles As New List(Of Adm_RolesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        sql.AppendLine(" SELECT  R_Nit_ID,  " & _
                               "                     R_Rol_ID, " & _
                               "                     R_Descripcion, " & _
                               "                     R_Sigla, " & _
                               "                     R_Estado, " & _
                               "                     ROW_NUMBER() OVER(ORDER BY R_Nit_ID, R_Rol_ID ASC) AS Index_Roles " & _
                               "       FROM ROLES ") 'Trae los roles

      
        Select Case vp_O_Obj.TipoSQL

            Case "Usuario"
                vl_sql_filtro.Append(" WHERE R_Nit_ID ='" & vp_O_Obj.Nit_ID & "'" & _
                                                     " ORDER BY R_Nit_ID, R_Rol_ID ASC  ")

            Case "All"
                vl_sql_filtro.Append(" ORDER BY R_Nit_ID, R_Rol_ID ASC  ")

        End Select

        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListRoles = listrol(StrQuery, Conexion, "MatrixAll")

        Return ObjListRoles

    End Function

#End Region


End Class
