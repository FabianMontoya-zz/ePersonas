Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class RDoc_VerificacionSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla RDoc_Verificacion parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllRDoc_Verificacion(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListRDoc_Verificacion As New List(Of RDoc_VerificacionClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT  RDV_Nit_ID, " & _
                                    " 			   RDV_Documentos_ID, " & _
                                    " 			   RDV_Documentos_ID_Verif, " & _
                                    " 			   RDV_Usuario_Creacion, " & _
                                    " 			   RDV_FechaCreacion, " & _
                                    " 			   RDV_Usuario_Actualizacion, " & _
                                    " 			   RDV_FechaActualizacion, " & _
                                    " 			   D_1.DOC_Descripcion, " & _
                                    " 			   D_2.DOC_Descripcion, " & _
                                    "              C.CLI_Nombre, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RDV_Nit_ID DESC) AS Index_RDoc_Verificacion " & _
                                    " FROM R_DOCUMENTO_VERIFICACION RDV " & _
                                    " INNER JOIN 	DOCUMENTOS D_1 ON D_1.DOC_Documentos_ID = RDV.RDV_Documentos_ID " & _
                                    " INNER JOIN 	DOCUMENTOS D_2 ON D_2.DOC_Documentos_ID = RDV.RDV_Documentos_ID_Verif " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    "  CASE	 SUBSTRING(RDV.RDV_Nit_ID,0,LEN(RDV.RDV_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RDV.RDV_Nit_ID,0,LEN(RDV.RDV_Nit_ID)) " & _
                                    " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT  RDV_Nit_ID, " & _
                                    " 			   RDV_Documentos_ID, " & _
                                    " 			   RDV_Documentos_ID_Verif, " & _
                                    " 			   RDV_Usuario_Creacion, " & _
                                    " 			   RDV_FechaCreacion, " & _
                                    " 			   RDV_Usuario_Actualizacion, " & _
                                    " 			   RDV_FechaActualizacion, " & _
                                    " 			   D_1.DOC_Descripcion, " & _
                                    " 			   D_2.DOC_Descripcion, " & _
                                    "              C.CLI_Nombre, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RDV_Nit_ID DESC) AS Index_RDoc_Verificacion " & _
                                    " FROM R_DOCUMENTO_VERIFICACION RDV " & _
                                    " INNER JOIN 	DOCUMENTOS D_1 ON D_1.DOC_Documentos_ID = RDV.RDV_Documentos_ID " & _
                                    " INNER JOIN 	DOCUMENTOS D_2 ON D_2.DOC_Documentos_ID = RDV.RDV_Documentos_ID_Verif " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    "  CASE	 SUBSTRING(RDV.RDV_Nit_ID,0,LEN(RDV.RDV_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RDV.RDV_Nit_ID,0,LEN(RDV.RDV_Nit_ID)) " & _
                                    " END ")
            Else
                sql.Append(" SELECT  RDV_Nit_ID, " & _
                                    " 			   RDV_Documentos_ID, " & _
                                    " 			   RDV_Documentos_ID_Verif, " & _
                                    " 			   RDV_Usuario_Creacion, " & _
                                    " 			   RDV_FechaCreacion, " & _
                                    " 			   RDV_Usuario_Actualizacion, " & _
                                    " 			   RDV_FechaActualizacion, " & _
                                    " 			   D_1.DOC_Descripcion, " & _
                                    " 			   D_2.DOC_Descripcion, " & _
                                    "              C.CLI_Nombre, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RDV_Nit_ID DESC) AS Index_RDoc_Verificacion " & _
                                    " FROM R_DOCUMENTO_VERIFICACION RDV " & _
                                    " INNER JOIN 	DOCUMENTOS D_1 ON D_1.DOC_Documentos_ID = RDV.RDV_Documentos_ID " & _
                                    " INNER JOIN 	DOCUMENTOS D_2 ON D_2.DOC_Documentos_ID = RDV.RDV_Documentos_ID_Verif " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    "  CASE	 SUBSTRING(RDV.RDV_Nit_ID,0,LEN(RDV.RDV_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RDV.RDV_Nit_ID,0,LEN(RDV.RDV_Nit_ID)) " & _
                                    " END " & _
                                    " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListRDoc_Verificacion = listRDoc_Verificacion(StrQuery, Conexion, "List")

        Return ObjListRDoc_Verificacion

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo RDoc_Verificacion (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_RDoc_Verificacion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertRDoc_Verificacion(ByVal vp_Obj_RDoc_Verificacion As RDoc_VerificacionClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT R_DOCUMENTO_VERIFICACION (" & _
            "RDV_Nit_ID," & _
            "RDV_Documentos_ID," & _
            "RDV_Documentos_ID_Verif," & _
            "RDV_Usuario_Creacion," & _
            "RDV_FechaCreacion," & _
            "RDV_Usuario_Actualizacion," & _
            "RDV_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_RDoc_Verificacion.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_RDoc_Verificacion.Doc_ID & "',")
        sql.AppendLine("'" & vp_Obj_RDoc_Verificacion.Doc_ID_Verif & "',")
        sql.AppendLine("'" & vp_Obj_RDoc_Verificacion.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_RDoc_Verificacion.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_RDoc_Verificacion.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_RDoc_Verificacion.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del RDoc_Verificacion (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_RDoc_Verificacion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseRDoc_Verificacion(ByVal vp_Obj_RDoc_Verificacion As RDoc_VerificacionClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE R_DOCUMENTO_VERIFICACION WHERE RDV_Nit_ID = '" & vp_Obj_RDoc_Verificacion.Nit_ID & "' AND RDV_Documentos_ID = '" & vp_Obj_RDoc_Verificacion.Doc_ID & "' AND RDV_Documentos_ID_Verif ='" & vp_Obj_RDoc_Verificacion.Doc_ID_Verif & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

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
    Public Function Charge_DropListRDoc_VerificacionDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_RDoc_Verificacion_ID AS ID,CAST(A_RDoc_Verificacion_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM RDoc_Verificacion " & _
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
    ''' funcion que trae el listado de RDoc_Verificacion para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listRDoc_Verificacion(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListRDoc_Verificacion As New List(Of RDoc_VerificacionClass)

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

                    Dim objRDoc_Verificacion As New RDoc_VerificacionClass
                    'cargamos datos sobre el objeto de login
                    objRDoc_Verificacion.Nit_ID = ReadConsulta.GetValue(0)
                    objRDoc_Verificacion.Doc_ID = ReadConsulta.GetValue(1)
                    objRDoc_Verificacion.Doc_ID_Verif = ReadConsulta.GetValue(2)

                    objRDoc_Verificacion.UsuarioCreacion = ReadConsulta.GetValue(3)
                    objRDoc_Verificacion.FechaCreacion = ReadConsulta.GetValue(4)
                    objRDoc_Verificacion.UsuarioActualizacion = ReadConsulta.GetValue(5)
                    objRDoc_Verificacion.FechaActualizacion = ReadConsulta.GetValue(6)

                    objRDoc_Verificacion.DescripDoc = ReadConsulta.GetValue(7)
                    objRDoc_Verificacion.DescripDoc_Verif = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objRDoc_Verificacion.DescripEmpresa = ReadConsulta.GetValue(9) Else objRDoc_Verificacion.DescripEmpresa = ""
                    objRDoc_Verificacion.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListRDoc_Verificacion.Add(objRDoc_Verificacion)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objRDoc_Verificacion As New RDoc_VerificacionClass
                    'cargamos datos sobre el objeto de login
                    objRDoc_Verificacion.Nit_ID = ReadConsulta.GetValue(0)
                    objRDoc_Verificacion.Doc_ID = ReadConsulta.GetValue(1)
                    objRDoc_Verificacion.Doc_ID_Verif = ReadConsulta.GetValue(2)
                    objRDoc_Verificacion.DescripDoc = ReadConsulta.GetValue(3)
                    objRDoc_Verificacion.DescripDoc_Verif = ReadConsulta.GetValue(4)
                    'agregamos a la lista
                    ObjListRDoc_Verificacion.Add(objRDoc_Verificacion)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListRDoc_Verificacion


    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As RDoc_VerificacionClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM R_DOCUMENTO_VERIFICACION " & _
                       " WHERE RDV_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND RDV_Documentos_ID = '" & vp_O_Obj.Doc_ID & "'" & _
                       " AND RDV_Documentos_ID_Verif = '" & vp_O_Obj.Doc_ID_Verif & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de relacion documentos verificacion
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_R_Documento_Verificacion()

        Dim ObjList As New List(Of RDoc_VerificacionClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT RDV_Nit_ID, RDV_Documentos_ID, RDV_Documentos_ID_Verif, D_1.DOC_Descripcion, D_2.DOC_Descripcion  FROM R_DOCUMENTO_VERIFICACION  RDV" & _
                                        " INNER JOIN DOCUMENTOS D_1 ON D_1.DOC_Documentos_ID = RDV.RDV_Documentos_ID " & _
                                        " INNER JOIN DOCUMENTOS D_2 ON D_2.DOC_Documentos_ID = RDV.RDV_Documentos_ID_Verif ")
        StrQuery = sql.ToString

        ObjList = listRDoc_Verificacion(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class
