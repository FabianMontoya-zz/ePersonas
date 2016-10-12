Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class InvPuertaSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla InvPuerta parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllInvPuerta(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListInvPuerta As New List(Of InvPuertaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT PA_Nit_ID, " & _
                        "      PA_InvPuerta_ID, " & _
                        "      PA_Descripcion, " & _
                        "      PA_Cod_Numeric, " & _
                        "      PA_Cod_AlfaNumeric, " & _
                        "      PA_Usuario_Creacion, " & _
                        "      PA_FechaCreacion, " & _
                        "      PA_Usuario_Actualizacion, " & _
                        "      PA_FechaActualizacion, " & _
                        "      C.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY PA_Nit_ID DESC) AS Index_InvPuerta " & _
                        " FROM PUERTAS_ACCESO PA " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        " CASE	 SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID )) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID ))   " & _
                        " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT PA_Nit_ID, " & _
                        "      PA_InvPuerta_ID, " & _
                        "      PA_Descripcion, " & _
                        "      PA_Cod_Numeric, " & _
                        "      PA_Cod_AlfaNumeric, " & _
                        "      PA_Usuario_Creacion, " & _
                        "      PA_FechaCreacion, " & _
                        "      PA_Usuario_Actualizacion, " & _
                        "      PA_FechaActualizacion, " & _
                        "      C.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY PA_Nit_ID DESC) AS Index_InvPuerta " & _
                        " FROM PUERTAS_ACCESO PA " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        " CASE	 SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID )) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID ))   " & _
                        " END ")
            Else
                sql.Append(" SELECT PA_Nit_ID, " & _
                        "      PA_InvPuerta_ID, " & _
                        "      PA_Descripcion, " & _
                        "      PA_Cod_Numeric, " & _
                        "      PA_Cod_AlfaNumeric, " & _
                        "      PA_Usuario_Creacion, " & _
                        "      PA_FechaCreacion, " & _
                        "      PA_Usuario_Actualizacion, " & _
                        "      PA_FechaActualizacion, " & _
                        "      C.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY PA_Nit_ID DESC) AS Index_InvPuerta " & _
                        " FROM PUERTAS_ACCESO PA " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        " CASE	 SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID )) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID ))   " & _
                        " END " & _
                        " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListInvPuerta = listInvPuerta(StrQuery, Conexion, "List")

        Return ObjListInvPuerta

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo InvPuerta (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertInvPuerta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT PUERTAS_ACCESO (" & _
            "PA_Nit_ID," & _
            "PA_InvPuerta_ID," & _
            "PA_Descripcion," & _
            "PA_Cod_Numeric," & _
            "PA_Cod_AlfaNumeric," & _
            "PA_Usuario_Creacion," & _
            "PA_FechaCreacion," & _
            "PA_Usuario_Actualizacion," & _
            "PA_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.InvPuerta_ID & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Cod_Numeric & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Cod_AlfaNumeric & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del InvPuerta (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateInvPuerta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE PUERTAS_ACCESO SET " & _
                       " PA_Descripcion ='" & vp_Obj_InvPuerta.Descripcion & "', " & _
                       " PA_Cod_Numeric ='" & vp_Obj_InvPuerta.Cod_Numeric & "', " & _
                       " PA_Cod_AlfaNumeric ='" & vp_Obj_InvPuerta.Cod_AlfaNumeric & "', " & _
                       " PA_Usuario_Actualizacion ='" & vp_Obj_InvPuerta.UsuarioActualizacion & "', " & _
                       " PA_FechaActualizacion ='" & vp_Obj_InvPuerta.FechaActualizacion & "' " & _
                       " WHERE  PA_Nit_ID = '" & vp_Obj_InvPuerta.Nit_ID & "' AND PA_InvPuerta_ID = '" & vp_Obj_InvPuerta.InvPuerta_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del InvPuerta (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseInvPuerta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE PUERTAS_ACCESO WHERE PA_Nit_ID = '" & vp_Obj_InvPuerta.Nit_ID & "' AND PA_InvPuerta_ID = '" & vp_Obj_InvPuerta.InvPuerta_ID & "'")
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
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListInvPuertaDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_InvPuerta_ID AS ID,CAST(A_InvPuerta_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM InvPuerta " & _
                   " WHERE  A_Nit_ID = '" & vp_S_NitEmpresa & "'")

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
    Public Function Charge_DropListSeguridad(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT PS_Politica_ID AS ID,CAST(PS_Politica_ID AS NVARCHAR(5)) + ' - ' + PS_Descripcion AS DESCRIPCION FROM POLITICA_SEGURIDAD ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de InvPuerta para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listInvPuerta(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListInvPuerta As New List(Of InvPuertaClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_Type

            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objInvPuerta As New InvPuertaClass
                    'cargamos datos sobre el objeto de login
                    objInvPuerta.Nit_ID = ReadConsulta.GetValue(0)
                    objInvPuerta.InvPuerta_ID = ReadConsulta.GetValue(1)

                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objInvPuerta.Descripcion = ReadConsulta.GetValue(2) Else objInvPuerta.Descripcion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objInvPuerta.Cod_Numeric = ReadConsulta.GetValue(3) Else objInvPuerta.Cod_Numeric = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objInvPuerta.Cod_AlfaNumeric = ReadConsulta.GetValue(4) Else objInvPuerta.Cod_AlfaNumeric = ""

                    objInvPuerta.UsuarioCreacion = ReadConsulta.GetValue(5)
                    objInvPuerta.FechaCreacion = ReadConsulta.GetValue(6)
                    objInvPuerta.UsuarioActualizacion = ReadConsulta.GetValue(7)
                    objInvPuerta.FechaActualizacion = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objInvPuerta.DescripEmpresa = ReadConsulta.GetValue(9) Else objInvPuerta.DescripEmpresa = ""
                    objInvPuerta.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListInvPuerta.Add(objInvPuerta)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objInvPuerta As New InvPuertaClass
                    'cargamos datos sobre el objeto de login
                    objInvPuerta.InvPuerta_ID = ReadConsulta.GetValue(0)
                    objInvPuerta.Descripcion = ReadConsulta.GetValue(1)
                    objInvPuerta.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListInvPuerta.Add(objInvPuerta)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListInvPuerta

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As InvPuertaClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM PUERTAS_ACCESO" & _
                       " WHERE PA_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND PA_InvPuerta_ID = '" & vp_O_Obj.InvPuerta_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de puertas de acceso
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_InvPuerta()

        Dim ObjList As New List(Of InvPuertaClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.Append(" SELECT PA_InvPuerta_ID AS ID,CAST(PA_InvPuerta_ID AS NVARCHAR(5)) + ' - ' + PA_Descripcion AS DESCRIPCION, PA_Nit_ID FROM PUERTAS_ACCESO " & _
                   " ORDER BY PA_InvPuerta_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listInvPuerta(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function


#End Region

End Class
