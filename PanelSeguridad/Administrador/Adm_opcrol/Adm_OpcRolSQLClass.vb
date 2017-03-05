Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Adm_OpcRolSQLClass

#Region "CRUD"

    ''' <summary>
    ''' crea la consulta para la tabla opcion perfil parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllOpcRol(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListOpcRol As New List(Of Adm_OpcRolClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")


        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT OR_Nit_ID, " & _
                                     "              OR_OPRol_ID, " & _
                                     "              OR_Consecutivo, " & _
                                     "              OR_Tipo, " & _
                                     "              [OR_Subrol/rol_Nit_ID], " & _
                                     "              [OR_Subrol/rol], " & _
                                     "              OR_Link_ID, " & _
                                     "              OR_Usuario_Creacion, " & _
                                     "              OR_FechaCreacion, " & _
                                     "              OR_Usuario_Actualizacion, " & _
                                     "              OR_FechaActualizacion, " & _
                                     "              ROW_NUMBER() OVER(ORDER BY OR_Nit_ID, OR_OPRol_ID, OR_Consecutivo ASC) AS Index_OptionRoles, " & _
                                     "              TC.DDLL_Descripcion, " & _
                                     "              L.L_Descripcion, " & _
                                     "              R.R_Descripcion " & _
                                     "  FROM OPTION_ROL ROP " & _
                                     " 	INNER JOIN   TC_DDL_TIPO TC ON  TC.DDL_ID = ROP.OR_Tipo AND TC.DDL_Tabla='OPTION_ROL'  " & _
                                     " 	LEFT JOIN  ROLES R ON  R.R_Rol_ID = ROP.[OR_Subrol/rol] AND R.R_Nit_ID = ROP.[OR_Subrol/rol_Nit_ID]  " & _
                                     " 	LEFT JOIN  LINKS L ON  L.L_Link_ID = ROP.OR_Link_ID  ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT OR_Nit_ID, " & _
                                         "              OR_OPRol_ID, " & _
                                         "              OR_Consecutivo, " & _
                                         "              OR_Tipo, " & _
                                         "              [OR_Subrol/rol_Nit_ID], " & _
                                         "              [OR_Subrol/rol], " & _
                                         "              OR_Link_ID, " & _
                                         "              OR_Usuario_Creacion, " & _
                                         "              OR_FechaCreacion, " & _
                                         "              OR_Usuario_Actualizacion, " & _
                                         "              OR_FechaActualizacion, " & _
                                         "              ROW_NUMBER() OVER(ORDER BY OR_Nit_ID, OR_OPRol_ID, OR_Consecutivo ASC) AS Index_OptionRoles, " & _
                                         "              TC.DDLL_Descripcion, " & _
                                         "              L.L_Descripcion, " & _
                                         "              R.R_Descripcion " & _
                                         "  FROM OPTION_ROL ROP " & _
                                         " 	INNER JOIN   TC_DDL_TIPO TC ON  TC.DDL_ID = ROP.OR_Tipo AND TC.DDL_Tabla='OPTION_ROL'  " & _
                                         " 	LEFT JOIN  ROLES R ON  R.R_Rol_ID = ROP.[OR_Subrol/rol] AND R.R_Nit_ID = ROP.[OR_Subrol/rol_Nit_ID]  " & _
                                         " 	LEFT JOIN  LINKS L ON  L.L_Link_ID = ROP.OR_Link_ID  ")
            Else
                sql.Append(" SELECT OR_Nit_ID, " & _
                                         "              OR_OPRol_ID, " & _
                                         "              OR_Consecutivo, " & _
                                         "              OR_Tipo, " & _
                                         "              [OR_Subrol/rol_Nit_ID], " & _
                                         "              [OR_Subrol/rol], " & _
                                         "              OR_Link_ID, " & _
                                         "              OR_Usuario_Creacion, " & _
                                         "              OR_FechaCreacion, " & _
                                         "              OR_Usuario_Actualizacion, " & _
                                         "              OR_FechaActualizacion, " & _
                                         "              ROW_NUMBER() OVER(ORDER BY OR_Nit_ID, OR_OPRol_ID, OR_Consecutivo ASC) AS Index_OptionRoles, " & _
                                         "              TC.DDLL_Descripcion, " & _
                                         "              L.L_Descripcion, " & _
                                         "              R.R_Descripcion " & _
                                         "  FROM OPTION_ROL ROP " & _
                                         " 	INNER JOIN   TC_DDL_TIPO TC ON  TC.DDL_ID = ROP.OR_Tipo AND TC.DDL_Tabla='OPTION_ROL'  " & _
                                         " 	LEFT JOIN  ROLES R ON  R.R_Rol_ID = ROP.[OR_Subrol/rol] AND R.R_Nit_ID = ROP.[OR_Subrol/rol_Nit_ID]  " & _
                                         " 	LEFT JOIN  LINKS L ON  L.L_Link_ID = ROP.OR_Link_ID  " & _
                                         " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%' ")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  OR_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY OR_Nit_ID, OR_OPRol_ID, OR_Consecutivo ASC")
            Else
                vl_sql_filtro.Append("AND  OR_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY OR_Nit_ID, OR_OPRol_ID, OR_Consecutivo ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY OR_Nit_ID, OR_OPRol_ID, OR_Consecutivo ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListOpcRol = listOpcRol(StrQuery, Conexion, "Read")

        Return ObjListOpcRol

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de la nueva opcion rol (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_OpcRol"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertOpcRol(ByVal vp_Obj_OpcRol As Adm_OpcRolClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT OPTION_ROL (" & _
            "OR_Nit_ID," & _
           "OR_OPRol_ID," & _
            "OR_Consecutivo," & _
            "OR_Tipo," & _
            "[OR_Subrol/rol_Nit_ID]," & _
            "[OR_Subrol/rol]," & _
            "OR_Link_ID, " & _
            "OR_Usuario_Creacion, " & _
            "OR_FechaCreacion, " & _
            "OR_Usuario_Actualizacion, " & _
            "OR_FechaActualizacion " & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_OpcRol.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.OPRol_ID & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.Consecutivo & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.Tipo & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.Subrol_rol_Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.Subrol_rol & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.Link_ID & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_OpcRol.FechaActualizacion & "')")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion de la opcion rol (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_OpcRol"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseOpcRol(ByVal vp_Obj_OpcRol As Adm_OpcRolClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE OPTION_ROL WHERE OR_Nit_ID = '" & vp_Obj_OpcRol.Nit_ID & _
                                        "' AND OR_OPRol_ID = '" & vp_Obj_OpcRol.OPRol_ID & _
                                        "' AND OR_Consecutivo = '" & vp_Obj_OpcRol.Consecutivo & "'")
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

    ''' <summary>
    ''' funcion que consulta el subrol
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DL_Subrol()

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim SQLGeneral As New GeneralSQLClass

        Dim sql As New StringBuilder

        sql.Append(" SELECT OR_Link_ID AS ID, L_Descripcion AS descripcion FROM OPTION_ROL OPR " & _
                   " INNER JOIN LINKS L ON L.L_Link_ID = OPR.OR_Link_ID " & _
                   " WHERE OR_Tipo = '1'")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' funcion que consulta los links existentes
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DL_Links()

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim SQLGeneral As New GeneralSQLClass

        Dim sql As New StringBuilder

        sql.Append(" SELECT L_Link_ID AS ID, L_Descripcion AS descripcion FROM LINKS ")
        sql.Append(" WHERE l_LinkPag <> '' ")

        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de opcion roles para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listOpcRol(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListOpcRol As New List(Of Adm_OpcRolClass)

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

                    Dim objOpcRol As New Adm_OpcRolClass
                    'cargamos datos sobre el objeto de login
                    objOpcRol.Nit_ID = ReadConsulta.GetValue(0)
                    objOpcRol.OPRol_ID = ReadConsulta.GetValue(1)
                    objOpcRol.Consecutivo = ReadConsulta.GetValue(2)
                    objOpcRol.Tipo = ReadConsulta.GetValue(3)
                    objOpcRol.Subrol_rol_Nit_ID = ReadConsulta.GetValue(4)
                    objOpcRol.Subrol_rol = ReadConsulta.GetValue(5)
                    objOpcRol.Link_ID = ReadConsulta.GetValue(6)

                    objOpcRol.UsuarioCreacion = ReadConsulta.GetValue(7)
                    objOpcRol.FechaCreacion = ReadConsulta.GetValue(8)
                    objOpcRol.UsuarioActualizacion = ReadConsulta.GetValue(9)
                    objOpcRol.FechaActualizacion = ReadConsulta.GetValue(10)

                    objOpcRol.Index = ReadConsulta.GetValue(11)
                    objOpcRol.DescripTipo = ReadConsulta.GetValue(12)
                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objOpcRol.DescripPagina = ReadConsulta.GetValue(13) Else objOpcRol.DescripPagina = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objOpcRol.DescripRol = ReadConsulta.GetValue(14) Else objOpcRol.DescripRol = ""

                    'agregamos a la lista
                    ObjListOpcRol.Add(objOpcRol)

                End While

        End Select
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListOpcRol


    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As Adm_OpcRolClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM OPTION_ROL " & _
                       " WHERE OR_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                      " AND OR_OPRol_ID = '" & vp_O_Obj.OPRol_ID & "'" & _
                       " AND OR_Consecutivo = '" & vp_O_Obj.Consecutivo & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

#End Region

End Class
