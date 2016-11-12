Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class AccesoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Acceso parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllAcceso(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListAcceso As New List(Of AccesoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT  RPA_Nit_ID, " & _
                                    " 			   RPA_PuertaAcceso_ID, " & _
                                    " 			   RPA_Area_ID, " & _
                                    " 			   RPA_Usuario_Creacion, " & _
                                    " 			   RPA_FechaCreacion, " & _
                                    " 			   RPA_Usuario_Actualizacion, " & _
                                    " 			   RPA_FechaActualizacion, " & _
                                    " 			   PA.PA_Descripcion, " & _
                                    " 			   A.A_Descripcion, " & _
                                    "              C.CLI_Nombre, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RPA_Nit_ID  DESC) AS Index_Acceso " & _
                                    " FROM R_PACCESO_AREA RPA " & _
                                    " INNER JOIN PUERTAS_ACCESO PA ON PA.PA_PuertaAcceso_ID = RPA.RPA_PuertaAcceso_ID AND RPA.RPA_Nit_ID = PA.PA_Nit_ID " & _
                                    " INNER JOIN " & BD_Param & ".dbo.AREA A ON A.A_Area_ID = RPA.RPA_Area_ID 	AND RPA.RPA_Nit_ID = A.A_Nit_ID " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    "  CASE	 SUBSTRING(RPA.RPA_Nit_ID,0,LEN(RPA.RPA_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RPA.RPA_Nit_ID,0,LEN(RPA.RPA_Nit_ID))   " & _
                                    " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT  RPA_Nit_ID, " & _
                                    " 			   RPA_PuertaAcceso_ID, " & _
                                    " 			   RPA_Area_ID, " & _
                                    " 			   RPA_Usuario_Creacion, " & _
                                    " 			   RPA_FechaCreacion, " & _
                                    " 			   RPA_Usuario_Actualizacion, " & _
                                    " 			   RPA_FechaActualizacion, " & _
                                    " 			   PA.PA_Descripcion, " & _
                                    " 			   A.A_Descripcion, " & _
                                    "              C.CLI_Nombre, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RPA_Nit_ID  DESC) AS Index_Acceso " & _
                                    " FROM R_PACCESO_AREA RPA " & _
                                    " INNER JOIN PUERTAS_ACCESO PA ON PA.PA_PuertaAcceso_ID = RPA.RPA_PuertaAcceso_ID AND RPA.RPA_Nit_ID = PA.PA_Nit_ID " & _
                                    " INNER JOIN " & BD_Param & ".dbo.AREA A ON A.A_Area_ID = RPA.RPA_Area_ID 	AND RPA.RPA_Nit_ID = A.A_Nit_ID " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    "  CASE	 SUBSTRING(RPA.RPA_Nit_ID,0,LEN(RPA.RPA_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RPA.RPA_Nit_ID,0,LEN(RPA.RPA_Nit_ID))   " & _
                                    " END ")
            Else
                sql.Append(" SELECT  RPA_Nit_ID, " & _
                                    " 			   RPA_PuertaAcceso_ID, " & _
                                    " 			   RPA_Area_ID, " & _
                                    " 			   RPA_Usuario_Creacion, " & _
                                    " 			   RPA_FechaCreacion, " & _
                                    " 			   RPA_Usuario_Actualizacion, " & _
                                    " 			   RPA_FechaActualizacion, " & _
                                    " 			   PA.PA_Descripcion, " & _
                                    " 			   A.A_Descripcion, " & _
                                    "              C.CLI_Nombre, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RPA_Nit_ID  DESC) AS Index_Acceso " & _
                                    " FROM R_PACCESO_AREA RPA " & _
                                    " INNER JOIN PUERTAS_ACCESO PA ON PA.PA_PuertaAcceso_ID = RPA.RPA_PuertaAcceso_ID AND RPA.RPA_Nit_ID = PA.PA_Nit_ID " & _
                                    " INNER JOIN " & BD_Param & ".dbo.AREA A ON A.A_Area_ID = RPA.RPA_Area_ID 	AND RPA.RPA_Nit_ID = A.A_Nit_ID " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    "  CASE	 SUBSTRING(RPA.RPA_Nit_ID,0,LEN(RPA.RPA_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RPA.RPA_Nit_ID,0,LEN(RPA.RPA_Nit_ID))   " & _
                                    " END " & _
                                    " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListAcceso = listAcceso(StrQuery, Conexion, "List")

        Return ObjListAcceso

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Acceso (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Acceso"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertAcceso(ByVal vp_Obj_Acceso As AccesoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT R_PACCESO_AREA (" & _
            "RPA_Nit_ID," & _
            "RPA_PuertaAcceso_ID," & _
            "RPA_Area_ID," & _
            "RPA_Usuario_Creacion," & _
            "RPA_FechaCreacion," & _
            "RPA_Usuario_Actualizacion," & _
            "RPA_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Acceso.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Acceso.PuertaAcceso_ID & "',")
        sql.AppendLine("'" & vp_Obj_Acceso.Area_ID & "',")
        sql.AppendLine("'" & vp_Obj_Acceso.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Acceso.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Acceso.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Acceso.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Acceso (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Acceso"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseAcceso(ByVal vp_Obj_Acceso As AccesoClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE R_PACCESO_AREA WHERE RPA_Nit_ID = '" & vp_Obj_Acceso.Nit_ID & "' AND RPA_PuertaAcceso_ID = '" & vp_Obj_Acceso.PuertaAcceso_ID & "' AND RPA_Area_ID ='" & vp_Obj_Acceso.Area_ID & "'")
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
    Public Function Charge_DropListAccesoDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_Acceso_ID AS ID,CAST(A_Acceso_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM Acceso " & _
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
    ''' funcion que trae el listado de Acceso para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listAcceso(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListAcceso As New List(Of AccesoClass)

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

                    Dim objAcceso As New AccesoClass
                    'cargamos datos sobre el objeto de login
                    objAcceso.Nit_ID = ReadConsulta.GetValue(0)
                    objAcceso.PuertaAcceso_ID = ReadConsulta.GetValue(1)
                    objAcceso.Area_ID = ReadConsulta.GetValue(2)

                    objAcceso.UsuarioCreacion = ReadConsulta.GetValue(3)
                    objAcceso.FechaCreacion = ReadConsulta.GetValue(4)
                    objAcceso.UsuarioActualizacion = ReadConsulta.GetValue(5)
                    objAcceso.FechaActualizacion = ReadConsulta.GetValue(6)

                    objAcceso.DescripPAcceso = ReadConsulta.GetValue(7)
                    objAcceso.DescripArea = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objAcceso.DescripEmpresa = ReadConsulta.GetValue(9) Else objAcceso.DescripEmpresa = ""
                    objAcceso.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListAcceso.Add(objAcceso)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objAcceso As New AccesoClass
                    'cargamos datos sobre el objeto de login
                    objAcceso.Nit_ID = ReadConsulta.GetValue(0)
                    objAcceso.PuertaAcceso_ID = ReadConsulta.GetValue(1)
                    objAcceso.Area_ID = ReadConsulta.GetValue(2)
                    objAcceso.DescripArea = ReadConsulta.GetValue(3)

                    'agregamos a la lista
                    ObjListAcceso.Add(objAcceso)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListAcceso

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As AccesoClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM R_PACCESO_AREA " & _
                       " WHERE RPA_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND RPA_PuertaAcceso_ID = '" & vp_O_Obj.PuertaAcceso_ID & "'" & _
                       " AND RPA_Area_ID = '" & vp_O_Obj.Area_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de puertas de acceso
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_R_PuertaAcceso_Area()

        Dim ObjList As New List(Of AccesoClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder

        sql.Append(" SELECT RPA_Nit_ID, RPA_PuertaAcceso_ID, RPA_Area_ID, A.A_Descripcion  FROM R_PACCESO_AREA RPA " & _
                                 " INNER JOIN " & BD_Param & ".dbo.AREA A ON A.A_Area_ID = RPA.RPA_Area_ID 	AND RPA.RPA_Nit_ID = A.A_Nit_ID " & _
                                 " ORDER BY RPA_PuertaAcceso_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listAcceso(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class
