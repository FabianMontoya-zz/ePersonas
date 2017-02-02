Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Adm_UsuarioSQLClass

#Region "CRUD"

    ''' <summary>
    ''' crea la consulta para la tabla Usuarios parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllUser(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListUser As New List(Of Adm_UsuarioClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT  U_Nit_ID,  " & _
                               " U_Usuario_ID, " & _
                               " U_Type_Document, " & _
                               " U_Documento, " & _
                               " U_Nombre, " & _
                               " U_Rol_Nit_ID, " & _
                               " U_Rol_ID, " & _
                               " U_Estado, " & _
                               " U_Acceso_Informacion, " & _
                               " U_Nivel_Politica_Seguridad_Grupo, " & _
                               " U_Politica_Seguridad, " & _
                               " U_Acceso_Documentos, " & _
                               " U_Grupo_Documentos_Nit_ID, " & _
                               " U_Grupo_Documentos, " & _
                               " U_Acceso_Informacion_Documentos, " & _
                               " U_Acceso_Reportes, " & _
                               " U_Grupo_Reportes_Nit_ID, " & _
                               " U_Grupo_Reportes, " & _
                               " U_Acceso_Informacion_Reportes, " & _
                               " U_Token, " & _
                               " U_Intentos_Fallidos, " & _
                               " U_Tipo_Acceso, " & _
                               " U_password, " & _
                               " U_Huella, " & _
                               " U_Usuario_Creacion, " & _
                               " U_FechaCreacion, " & _
                               " U_Usuario_Actualizacion, " & _
                               " U_FechaActualizacion, " & _
                               " ROW_NUMBER() OVER(ORDER BY U_Nit_ID, U_Usuario_ID ASC) AS Index_Usuarios " & _
                               " FROM USUARIOS " )
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT  U_Nit_ID,  " & _
                               " U_Usuario_ID, " & _
                               " U_Type_Document, " & _
                               " U_Documento, " & _
                               " U_Nombre, " & _
                               " U_Rol_Nit_ID, " & _
                               " U_Rol_ID, " & _
                               " U_Estado, " & _
                               " U_Acceso_Informacion, " & _
                               " U_Nivel_Politica_Seguridad_Grupo, " & _
                               " U_Politica_Seguridad, " & _
                               " U_Acceso_Documentos, " & _
                               " U_Grupo_Documentos_Nit_ID, " & _
                               " U_Grupo_Documentos, " & _
                               " U_Acceso_Informacion_Documentos, " & _
                               " U_Acceso_Reportes, " & _
                               " U_Grupo_Reportes_Nit_ID, " & _
                               " U_Grupo_Reportes, " & _
                               " U_Acceso_Informacion_Reportes, " & _
                               " U_Token, " & _
                               " U_Intentos_Fallidos, " & _
                               " U_Tipo_Acceso, " & _
                               " U_password, " & _
                               " U_Huella, " & _
                               " U_Usuario_Creacion, " & _
                               " U_FechaCreacion, " & _
                               " U_Usuario_Actualizacion, " & _
                               " U_FechaActualizacion, " & _
                               " ROW_NUMBER() OVER(ORDER BY U_Nit_ID, U_Usuario_ID ASC) AS Index_Usuarios " & _
                               " FROM USUARIOS ")
            Else
                sql.Append(" SELECT  U_Nit_ID,  " & _
                               " U_Usuario_ID, " & _
                               " U_Type_Document, " & _
                               " U_Documento, " & _
                               " U_Nombre, " & _
                               " U_Rol_Nit_ID, " & _
                               " U_Rol_ID, " & _
                               " U_Estado, " & _
                               " U_Acceso_Informacion, " & _
                               " U_Nivel_Politica_Seguridad_Grupo, " & _
                               " U_Politica_Seguridad, " & _
                               " U_Acceso_Documentos, " & _
                               " U_Grupo_Documentos_Nit_ID, " & _
                               " U_Grupo_Documentos, " & _
                               " U_Acceso_Informacion_Documentos, " & _
                               " U_Acceso_Reportes, " & _
                               " U_Grupo_Reportes_Nit_ID, " & _
                               " U_Grupo_Reportes, " & _
                               " U_Acceso_Informacion_Reportes, " & _
                               " U_Token, " & _
                               " U_Intentos_Fallidos, " & _
                               " U_Tipo_Acceso, " & _
                               " U_password, " & _
                               " U_Huella, " & _
                               " U_Usuario_Creacion, " & _
                               " U_FechaCreacion, " & _
                               " U_Usuario_Actualizacion, " & _
                               " U_FechaActualizacion, " & _
                               " ROW_NUMBER() OVER(ORDER BY U_Nit_ID, U_Usuario_ID ASC) AS Index_Usuarios " & _
                               " FROM USUARIOS " & _
                      " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%' ")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  U_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY U_Nit_ID, U_Usuario_ID ASC ")
            Else
                vl_sql_filtro.Append("AND  U_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY U_Nit_ID, U_Usuario_ID ASC ")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY U_Nit_ID, U_Usuario_ID ASC ")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString
        ObjListUser = ListUser(StrQuery, Conexion, "MatrixAll")

        Return ObjListUser

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion del nuevo usuario (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_User"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertUser(ByVal vp_Obj_User As Adm_UsuarioClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT USUARIOS (" & _
                        " U_Nit_ID,  " & _
                        " U_Usuario_ID, " & _
                        " U_Type_Document, " & _
                        " U_Documento, " & _
                        " U_Nombre, " & _
                        " U_Rol_Nit_ID, " & _
                        " U_Rol_ID, " & _
                        " U_Estado, " & _
                        " U_Acceso_Informacion, " & _
                        " U_Nivel_Politica_Seguridad_Grupo, " & _
                        " U_Politica_Seguridad, " & _
                        " U_Acceso_Documentos, " & _
                        " U_Grupo_Documentos_Nit_ID, " & _
                        " U_Grupo_Documentos, " & _
                        " U_Acceso_Informacion_Documentos, " & _
                        " U_Acceso_Reportes, " & _
                        " U_Grupo_Reportes_Nit_ID, " & _
                        " U_Grupo_Reportes, " & _
                        " U_Acceso_Informacion_Reportes, " & _
                        " U_Token, " & _
                        " U_Intentos_Fallidos, " & _
                        " U_Tipo_Acceso, " & _
                        " U_password, " & _
                        " U_Huella, " & _
                        " U_Usuario_Creacion, " & _
                        " U_FechaCreacion, " & _
                        " U_Usuario_Actualizacion, " & _
                        " U_FechaActualizacion " & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_User.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_User.Usuario_ID & "',")
        sql.AppendLine("'" & vp_Obj_User.TypeDocument & "',")
        sql.AppendLine("'" & vp_Obj_User.Documento & "',")
        sql.AppendLine("'" & vp_Obj_User.Nombre & "',")
        sql.AppendLine("'" & vp_Obj_User.Rol_Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_User.Rol_ID & "',")
        sql.AppendLine("'" & vp_Obj_User.Estado & "',")
        sql.AppendLine("'" & vp_Obj_User.Acceso_Informacion & "',")
        sql.AppendLine("'" & vp_Obj_User.Nivel_Politica_Seguridad_Grupo & "',")
        sql.AppendLine("'" & vp_Obj_User.Politica_Seguridad & "',")
        sql.AppendLine("'" & vp_Obj_User.Acceso_Documentos & "',")
        sql.AppendLine("'" & vp_Obj_User.Grupo_Documentos_Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_User.Grupo_Documentos & "',")
        sql.AppendLine("'" & vp_Obj_User.Acceso_Informacion_Documentos & "',")
        sql.AppendLine("'" & vp_Obj_User.Acceso_Reportes & "',")
        sql.AppendLine("'" & vp_Obj_User.Grupo_Reportes_Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_User.Grupo_Reportes & "',")
        sql.AppendLine("'" & vp_Obj_User.Acceso_Informacion_Reportes & "',")
        sql.AppendLine("'" & vp_Obj_User.Token & "',")
        sql.AppendLine("'" & vp_Obj_User.Intentos_Fallidos & "',")
        sql.AppendLine("'" & vp_Obj_User.Tipo_Acceso & "',")
        sql.AppendLine("'" & vp_Obj_User.Password & "',")
        sql.AppendLine("'" & vp_Obj_User.Huella & "',")
        sql.AppendLine("'" & vp_Obj_User.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_User.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_User.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_User.FechaActualizacion & "')")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del usuario (UPDATE)
    ''' </summary>
    ''' <param name="vp_ObjUser"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateUser(ByVal vp_ObjUser As Adm_UsuarioClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE USUARIOS SET " & _
                        " U_Type_Document ='" & vp_ObjUser.TypeDocument & "', " & _
                        " U_Documento ='" & vp_ObjUser.Documento & "', " & _
                        " U_Nombre ='" & vp_ObjUser.Nombre & "', " & _
                        " U_Rol_Nit_ID ='" & vp_ObjUser.Rol_Nit_ID & "', " & _
                        " U_Rol_ID ='" & vp_ObjUser.Rol_ID & "', " & _
                        " U_Estado ='" & vp_ObjUser.Estado & "', " & _
                        " U_Acceso_Informacion ='" & vp_ObjUser.Acceso_Informacion & "', " & _
                        " U_Nivel_Politica_Seguridad_Grupo ='" & vp_ObjUser.Nivel_Politica_Seguridad_Grupo & "', " & _
                        " U_Politica_Seguridad ='" & vp_ObjUser.Politica_Seguridad & "', " & _
                        " U_Acceso_Documentos ='" & vp_ObjUser.Acceso_Documentos & "', " & _
                        " U_Grupo_Documentos_Nit_ID ='" & vp_ObjUser.Grupo_Documentos_Nit_ID & "', " & _
                        " U_Grupo_Documentos ='" & vp_ObjUser.Grupo_Documentos & "', " & _
                        " U_Acceso_Informacion_Documentos ='" & vp_ObjUser.Acceso_Informacion_Documentos & "', " & _
                        " U_Acceso_Reportes ='" & vp_ObjUser.Acceso_Reportes & "', " & _
                        " U_Grupo_Reportes_Nit_ID ='" & vp_ObjUser.Grupo_Reportes_Nit_ID & "', " & _
                        " U_Grupo_Reportes ='" & vp_ObjUser.Grupo_Reportes & "', " & _
                        " U_Acceso_Informacion_Reportes ='" & vp_ObjUser.Acceso_Informacion_Reportes & "', " & _
                        " U_Token ='" & vp_ObjUser.Token & "', " & _
                        " U_Intentos_Fallidos ='" & vp_ObjUser.Intentos_Fallidos & "', " & _
                        " U_Tipo_Acceso ='" & vp_ObjUser.Tipo_Acceso & "', " & _
                        " U_Huella ='" & vp_ObjUser.Huella & "', " & _
                        " U_Usuario_Actualizacion ='" & vp_ObjUser.UsuarioActualizacion & "', " & _
                        " U_FechaActualizacion  ='" & vp_ObjUser.FechaActualizacion & "' " & _
                        " WHERE U_Nit_ID  ='" & vp_ObjUser.Nit_ID & "' " & _
                        " AND U_Usuario_ID = '" & vp_ObjUser.Usuario_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    'Eliminación no hay, solo se actualiza el estado

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
    ''' funcion que trae el listado de Usuarios, los coloca en listas que se usan para armar las tablas
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ListUser(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListUser As New List(Of Adm_UsuarioClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type

            Case "MatrixAll"

                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objUser As New Adm_UsuarioClass
                    'cargamos datos sobre el objeto de login
                    objUser.Nit_ID = ReadConsulta.GetValue(0)
                    objUser.Usuario_ID = ReadConsulta.GetValue(1)
                    objUser.TypeDocument = ReadConsulta.GetValue(2)
                    objUser.Documento = ReadConsulta.GetValue(3)
                    objUser.Nombre = ReadConsulta.GetValue(4)
                    objUser.Rol_Nit_ID = ReadConsulta.GetValue(5)
                    objUser.Rol_ID = ReadConsulta.GetValue(6)
                    objUser.Estado = ReadConsulta.GetValue(7)
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objUser.Acceso_Informacion = ReadConsulta.GetValue(8) Else objUser.Acceso_Informacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objUser.Nivel_Politica_Seguridad_Grupo = ReadConsulta.GetValue(9) Else objUser.Nivel_Politica_Seguridad_Grupo = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objUser.Politica_Seguridad = ReadConsulta.GetValue(10) Else objUser.Politica_Seguridad = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objUser.Acceso_Documentos = ReadConsulta.GetValue(11) Else objUser.Acceso_Documentos = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objUser.Grupo_Documentos_Nit_ID = ReadConsulta.GetValue(12) Else objUser.Grupo_Documentos_Nit_ID = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objUser.Grupo_Documentos = ReadConsulta.GetValue(13) Else objUser.Grupo_Documentos = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objUser.Acceso_Informacion_Documentos = ReadConsulta.GetValue(14) Else objUser.Acceso_Informacion_Documentos = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objUser.Acceso_Reportes = ReadConsulta.GetValue(15) Else objUser.Acceso_Reportes = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objUser.Grupo_Reportes_Nit_ID = ReadConsulta.GetValue(16) Else objUser.Grupo_Reportes_Nit_ID = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objUser.Grupo_Reportes = ReadConsulta.GetValue(17) Else objUser.Grupo_Reportes = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objUser.Acceso_Informacion_Reportes = ReadConsulta.GetValue(18) Else objUser.Acceso_Informacion_Reportes = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objUser.Token = ReadConsulta.GetValue(19) Else objUser.Token = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objUser.Intentos_Fallidos = ReadConsulta.GetValue(20) Else objUser.Intentos_Fallidos = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objUser.Tipo_Acceso = ReadConsulta.GetValue(21) Else objUser.Tipo_Acceso = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(22))) Then objUser.Password = ReadConsulta.GetValue(22) Else objUser.Password = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(23))) Then objUser.Huella = ReadConsulta.GetValue(23) Else objUser.Huella = ""
                    objUser.UsuarioCreacion = ReadConsulta.GetValue(24)
                    objUser.FechaCreacion = ReadConsulta.GetValue(25)
                    objUser.UsuarioActualizacion = ReadConsulta.GetValue(26)
                    objUser.FechaActualizacion = ReadConsulta.GetValue(27)
                    objUser.Index = ReadConsulta.GetValue(28)

                    'agregamos a la lista
                    ObjListUser.Add(objUser)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListUser

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As Adm_UsuarioClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM USUARIOS " & _
                       " WHERE U_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND U_Usuario_ID = '" & vp_O_Obj.Usuario_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de todos los Usuarios existentes en la BD
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixAllUsers(ByVal Nit_ID As String)
        Dim ObjListUsuarios As New List(Of Adm_UsuarioClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  U_Nit_ID,  " & _
                               " U_Usuario_ID, " & _
                               " U_Type_Document, " & _
                               " U_Documento, " & _
                               " U_Nombre, " & _
                               " U_Rol_Nit_ID, " & _
                               " U_Rol_ID, " & _
                               " U_Estado, " & _
                               " U_Acceso_Informacion, " & _
                               " U_Nivel_Politica_Seguridad_Grupo, " & _
                               " U_Politica_Seguridad, " & _
                               " U_Acceso_Documentos, " & _
                               " U_Grupo_Documentos_Nit_ID, " & _
                               " U_Grupo_Documentos, " & _
                               " U_Acceso_Informacion_Documentos, " & _
                               " U_Acceso_Reportes, " & _
                               " U_Grupo_Reportes_Nit_ID, " & _
                               " U_Grupo_Reportes, " & _
                               " U_Acceso_Informacion_Reportes, " & _
                               " U_Token, " & _
                               " U_Intentos_Fallidos, " & _
                               " U_Tipo_Acceso, " & _
                               " U_password, " & _
                               " U_Huella, " & _
                               " U_Usuario_Creacion, " & _
                               " U_FechaCreacion, " & _
                               " U_Usuario_Actualizacion, " & _
                               " U_FechaActualizacion, " & _
                               " ROW_NUMBER() OVER(ORDER BY U_Nit_ID, U_Usuario_ID ASC) AS Index_Usuarios " & _
                               " FROM USUARIOS " & _
                               " ORDER BY U_Nit_ID, U_Usuario_ID ASC") 'Trae todos los usuarios

        StrQuery = sql.ToString

        ObjListUsuarios = ListUser(StrQuery, Conexion, "MatrixAll")

        Return ObjListUsuarios

    End Function

    ''' <summary>
    ''' Carga matrix de todos los Usuarios de una empresa [NIT]
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixUsuariosNIT(ByVal Nit_ID As String)
        Dim ObjListUsuarios As New List(Of Adm_UsuarioClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  U_Nit_ID,  " & _
                               " U_Usuario_ID, " & _
                               " U_Type_Document, " & _
                               " U_Documento, " & _
                               " U_Nombre, " & _
                               " U_Rol_Nit_ID, " & _
                               " U_Rol_ID, " & _
                               " U_Estado, " & _
                               " U_Acceso_Informacion, " & _
                               " U_Nivel_Politica_Seguridad_Grupo, " & _
                               " U_Politica_Seguridad, " & _
                               " U_Acceso_Documentos, " & _
                               " U_Grupo_Documentos_Nit_ID, " & _
                               " U_Grupo_Documentos, " & _
                               " U_Acceso_Informacion_Documentos, " & _
                               " U_Acceso_Reportes, " & _
                               " U_Grupo_Reportes_Nit_ID, " & _
                               " U_Grupo_Reportes, " & _
                               " U_Acceso_Informacion_Reportes, " & _
                               " U_Token, " & _
                               " U_Intentos_Fallidos, " & _
                               " U_Tipo_Acceso, " & _
                               " U_password, " & _
                               " U_Huella, " & _
                               " U_Usuario_Creacion, " & _
                               " U_FechaCreacion, " & _
                               " U_Usuario_Actualizacion, " & _
                               " U_FechaActualizacion, " & _
                               " ROW_NUMBER() OVER(ORDER BY U_Nit_ID, U_Usuario_ID ASC) AS Index_Usuarios " & _
                               " FROM USUARIOS " & _
                               " WHERE U_Nit_ID = '" & Nit_ID & "' " & _
                               " ORDER BY U_Nit_ID, U_Usuario_ID ASC") 'Trae los usuarios de la empresa seleccionada

        StrQuery = sql.ToString

        ObjListUsuarios = ListUser(StrQuery, Conexion, "MatrixAll")

        Return ObjListUsuarios

    End Function

#End Region

End Class
