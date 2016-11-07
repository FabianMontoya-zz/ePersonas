Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class DocumentoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Documento parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllDocumento(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListDocumento As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_Documentos_ID, " & _
                        "       DOC_Descripcion, " & _
                        "       DOC_TipoContenido, " & _
                        "       DOC_Formato, " & _
                        "       DOC_TipoVersion, " & _
                        "       DOC_Ruta_ID, " & _
                        "       DOC_IndicativoFoto, " & _
                        "       DOC_Ruta_ID_Plantilla, " & _
                        "       DOC_NombrePlantilla, " & _
                        "       DOC_Usuario_Creacion, " & _
                        "       DOC_FechaCreacion, " & _
                        "       DOC_Usuario_Actualizacion, " & _
                        "       DOC_FechaActualizacion, " & _
                        "       DOC_ChequeaVigencias, " & _
                        "       DOC_DiasVigencia, " & _
                        "       DOC_RequiereVerificacion, " & _
                        "       TC.DDLL_Descripcion, " & _
                        "       F.DDLL_Descripcion, " & _
                        "       TV.DDLL_Descripcion, " & _
                        "       R.R_Descripcion, " & _
                        "       RP.R_Descripcion, " & _
                        "       C.CLI_Nombre ," & _
                        "       ROW_NUMBER() OVER(ORDER BY DOC_Documentos_ID ASC) AS Index_Documento " & _
                        "  FROM DOCUMENTOS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'DOCUMENTOS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        "  CASE	 SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))  " & _
                        " END ")

        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_Documentos_ID, " & _
                        "       DOC_Descripcion, " & _
                        "       DOC_TipoContenido, " & _
                        "       DOC_Formato, " & _
                        "       DOC_TipoVersion, " & _
                        "       DOC_Ruta_ID, " & _
                        "       DOC_IndicativoFoto, " & _
                        "       DOC_Ruta_ID_Plantilla, " & _
                        "       DOC_NombrePlantilla, " & _
                        "       DOC_Usuario_Creacion, " & _
                        "       DOC_FechaCreacion, " & _
                        "       DOC_Usuario_Actualizacion, " & _
                        "       DOC_FechaActualizacion, " & _
                        "       DOC_ChequeaVigencias, " & _
                        "       DOC_DiasVigencia, " & _
                        "       DOC_RequiereVerificacion, " & _
                        "       TC.DDLL_Descripcion, " & _
                        "       F.DDLL_Descripcion, " & _
                        "       TV.DDLL_Descripcion, " & _
                        "       R.R_Descripcion, " & _
                        "       RP.R_Descripcion, " & _
                        "       C.CLI_Nombre ," & _
                        "       ROW_NUMBER() OVER(ORDER BY DOC_Documentos_ID ASC) AS Index_Documento " & _
                        "  FROM DOCUMENTOS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'DOCUMENTOS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        "  CASE	 SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))  " & _
                        " END ")
            Else
                sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_Documentos_ID, " & _
                        "       DOC_Descripcion, " & _
                        "       DOC_TipoContenido, " & _
                        "       DOC_Formato, " & _
                        "       DOC_TipoVersion, " & _
                        "       DOC_Ruta_ID, " & _
                        "       DOC_IndicativoFoto, " & _
                        "       DOC_Ruta_ID_Plantilla, " & _
                        "       DOC_NombrePlantilla, " & _
                        "       DOC_Usuario_Creacion, " & _
                        "       DOC_FechaCreacion, " & _
                        "       DOC_Usuario_Actualizacion, " & _
                        "       DOC_FechaActualizacion, " & _
                        "       DOC_ChequeaVigencias, " & _
                        "       DOC_DiasVigencia, " & _
                        "       DOC_RequiereVerificacion, " & _
                        "       TC.DDLL_Descripcion, " & _
                        "       F.DDLL_Descripcion, " & _
                        "       TV.DDLL_Descripcion, " & _
                        "       R.R_Descripcion, " & _
                        "       RP.R_Descripcion, " & _
                        "       C.CLI_Nombre ," & _
                        "       ROW_NUMBER() OVER(ORDER BY DOC_Documentos_ID ASC) AS Index_Documento " & _
                        "  FROM DOCUMENTOS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'DOCUMENTOS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        "  CASE	 SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))  " & _
                        " END " & _
                        " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListDocumento = listDocumento(StrQuery, Conexion, "List")

        Return ObjListDocumento

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Documento (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Documento"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertDocumento(ByVal vp_Obj_Documento As DocumentoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT DOCUMENTOS (" & _
            "DOC_Nit_ID," & _
            "DOC_Documentos_ID," & _
            "DOC_Descripcion," & _
            "DOC_TipoContenido," & _
            "DOC_Formato," & _
            "DOC_TipoVersion," & _
            "DOC_Ruta_ID," & _
            "DOC_IndicativoFoto," & _
            "DOC_Ruta_ID_Plantilla," & _
            "DOC_NombrePlantilla," & _
            "DOC_ChequeaVigencias," & _
            "DOC_DiasVigencia," & _
            "DOC_RequiereVerificacion," & _
            "DOC_Usuario_Creacion," & _
            "DOC_FechaCreacion," & _
            "DOC_Usuario_Actualizacion," & _
            "DOC_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Documento.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Documento_ID & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.TipoContenido & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Formato_ID & "',")
        sql.AppendLine("'" & vp_Obj_Documento.TipoVersion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Ruta_ID & "',")
        sql.AppendLine("'" & vp_Obj_Documento.IndicativoFoto & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Ruta_ID_Plantilla & "',")
        sql.AppendLine("'" & vp_Obj_Documento.NombrePlantilla & "',")
        sql.AppendLine("'" & vp_Obj_Documento.ChequeaVigencias & "',")
        sql.AppendLine("'" & vp_Obj_Documento.DiasVigencia & "',")
        sql.AppendLine("'" & vp_Obj_Documento.RequiereVerificacion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Documento (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Documento"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateDocumento(ByVal vp_Obj_Documento As DocumentoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE DOCUMENTOS SET " & _
                       " DOC_Descripcion ='" & vp_Obj_Documento.Descripcion & "', " & _
                       " DOC_TipoContenido ='" & vp_Obj_Documento.TipoContenido & "', " & _
                       " DOC_Formato ='" & vp_Obj_Documento.Formato_ID & "', " & _
                       " DOC_TipoVersion ='" & vp_Obj_Documento.TipoVersion & "', " & _
                       " DOC_Ruta_ID ='" & vp_Obj_Documento.Ruta_ID & "', " & _
                       " DOC_IndicativoFoto ='" & vp_Obj_Documento.IndicativoFoto & "', " & _
                       " DOC_Ruta_ID_Plantilla ='" & vp_Obj_Documento.Ruta_ID_Plantilla & "', " & _
                       " DOC_NombrePlantilla ='" & vp_Obj_Documento.NombrePlantilla & "', " & _
                       " DOC_ChequeaVigencias ='" & vp_Obj_Documento.ChequeaVigencias & "', " & _
                       " DOC_DiasVigencia ='" & vp_Obj_Documento.DiasVigencia & "', " & _
                       " DOC_RequiereVerificacion ='" & vp_Obj_Documento.RequiereVerificacion & "', " & _
                       " DOC_Usuario_Actualizacion ='" & vp_Obj_Documento.UsuarioActualizacion & "', " & _
                       " DOC_FechaActualizacion ='" & vp_Obj_Documento.FechaActualizacion & "' " & _
                       " WHERE  DOC_Nit_ID = '" & vp_Obj_Documento.Nit_ID & "' AND DOC_Documentos_ID = '" & vp_Obj_Documento.Documento_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Documento (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Documento"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseDocumento(ByVal vp_Obj_Documento As DocumentoClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE DOCUMENTOS WHERE DOC_Nit_ID = '" & vp_Obj_Documento.Nit_ID & "' AND DOC_Documentos_ID = '" & vp_Obj_Documento.Documento_ID & "'")
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
    Public Function Charge_DropListDocumentoDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_Documento_ID AS ID,CAST(A_Documento_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM Documento " & _
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
    Public Function Charge_DropListFormato(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT DDL_ID AS ID , DDL_ID + ' - ' + DDLL_Descripcion AS Descripcion  from TC_DDL_TIPO WHERE DDL_Tabla = 'DOCUMENTOS' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Documento para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listDocumento(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListDocumento As New List(Of DocumentoClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objDocumento As New DocumentoClass
                    'cargamos datos sobre el objeto de login
                    objDocumento.Nit_ID = ReadConsulta.GetValue(0)
                    objDocumento.Documento_ID = ReadConsulta.GetValue(1)
                    objDocumento.Descripcion = ReadConsulta.GetValue(2)

                    objDocumento.TipoContenido = ReadConsulta.GetValue(3)
                    objDocumento.Formato_ID = ReadConsulta.GetValue(4)
                    objDocumento.TipoVersion = ReadConsulta.GetValue(5)
                    objDocumento.Ruta_ID = ReadConsulta.GetValue(6)
                    objDocumento.IndicativoFoto = ReadConsulta.GetValue(7)
                    objDocumento.Ruta_ID_Plantilla = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objDocumento.NombrePlantilla = ReadConsulta.GetValue(9) Else objDocumento.NombrePlantilla = ""

                    objDocumento.UsuarioCreacion = ReadConsulta.GetValue(10)
                    objDocumento.FechaCreacion = ReadConsulta.GetValue(11)
                    objDocumento.UsuarioActualizacion = ReadConsulta.GetValue(12)
                    objDocumento.FechaActualizacion = ReadConsulta.GetValue(13)

                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objDocumento.ChequeaVigencias = ReadConsulta.GetValue(14) Else objDocumento.ChequeaVigencias = "N"
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objDocumento.DiasVigencia = ReadConsulta.GetValue(15) Else objDocumento.DiasVigencia = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objDocumento.RequiereVerificacion = ReadConsulta.GetValue(16) Else objDocumento.RequiereVerificacion = "N"

                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objDocumento.DescripContenido = ReadConsulta.GetValue(17) Else objDocumento.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objDocumento.DescripFormato = ReadConsulta.GetValue(18) Else objDocumento.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objDocumento.DescripVersion = ReadConsulta.GetValue(19) Else objDocumento.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objDocumento.DescripRuta = ReadConsulta.GetValue(20) Else objDocumento.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objDocumento.DescripRutaPlantilla = ReadConsulta.GetValue(21) Else objDocumento.RequiereVerificacion = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(22))) Then objDocumento.DescripEmpresa = ReadConsulta.GetValue(22) Else objDocumento.DescripEmpresa = ""
                    objDocumento.Index = ReadConsulta.GetValue(23)

                    'agregamos a la lista
                    ObjListDocumento.Add(objDocumento)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objDocumento As New DocumentoClass
                    'cargamos datos sobre el objeto de login
                    objDocumento.Documento_ID = ReadConsulta.GetValue(0)
                    objDocumento.Descripcion = ReadConsulta.GetValue(1)
                    objDocumento.Nit_ID = ReadConsulta.GetValue(2)
                    objDocumento.ChequeaVigencias = ReadConsulta.GetValue(3)
                    objDocumento.DiasVigencia = ReadConsulta.GetValue(4)
                    objDocumento.RutaDocumentoDestino = ReadConsulta.GetValue(5)
                    objDocumento.RequiereVerificacion = ReadConsulta.GetValue(6)
                    objDocumento.Formato_ID = ReadConsulta.GetValue(7)
                    objDocumento.IndicativoFoto = ReadConsulta.GetValue(8)
                    objDocumento.DescripFormato = ReadConsulta.GetValue(9)
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objDocumento.Consecutivo = ReadConsulta.GetValue(10) Else objDocumento.Consecutivo = 0

                    objDocumento.Index = ReadConsulta.GetValue(11)

                    'agregamos a la lista
                    ObjListDocumento.Add(objDocumento)
                End While

            Case "Matrix_Secuencia"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objDocumento As New DocumentoClass
                    'cargamos datos sobre el objeto de login
                    objDocumento.Documento_ID = ReadConsulta.GetValue(0)
                    objDocumento.Descripcion = ReadConsulta.GetValue(1)
                    objDocumento.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListDocumento.Add(objDocumento)
                End While

            Case "RutasOpe"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objDocumento As New DocumentoClass
                    'cargamos datos sobre el objeto de login
                    objDocumento.RutaDocumentoTemporal = ReadConsulta.GetValue(0)
                    objDocumento.RutaRelativaDocumento = ReadConsulta.GetValue(1)
                    objDocumento.RutaDocumentoVisualizacion = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListDocumento.Add(objDocumento)
                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListDocumento

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As DocumentoClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM DOCUMENTOS " & _
                       " WHERE DOC_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND DOC_Documentos_ID = '" & vp_O_Obj.Documento_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de documentos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Documento()

        Dim ObjListDocumento As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT DOC_Documentos_ID AS ID, " & _
                                         " CAST(DOC_Documentos_ID AS NVARCHAR(10)) + ' - ' + DOC_Descripcion AS Descripcion, " & _
                                         " DOC_Nit_ID, " & _
                                         " DOC_ChequeaVigencias, " & _
                                         " DOC_DiasVigencia, " & _
                                         " R.R_DESCRIPCION, " & _
                                         " DOC_RequiereVerificacion, " & _
                                         " DOC_Formato, " & _
                                         " DOC_IndicativoFoto, " & _
                                         " F.DDLL_Descripcion, " & _
                                         " C.CLI_N_Consecutivo, " & _
                                         " ROW_NUMBER() OVER(ORDER BY DOC_Documentos_ID ASC) AS Index_Documento " & _
                                         " FROM DOCUMENTOS D " & _
                                         " INNER JOIN RUTA R ON R.R_Ruta_ID = D.DOC_Ruta_ID  AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                                         " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'DOCUMENTOS' " & _
                                         " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID  = " & _
                                          "  CASE	 SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                                          "                 WHEN '' THEN 0 " & _
                                          "                ELSE SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))   " & _
                                          " END ")

        StrQuery = sql.ToString

        ObjListDocumento = listDocumento(StrQuery, Conexion, "Matrix")

        Return ObjListDocumento

    End Function

    ''' <summary>
    ''' Carga matrix de documentos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_SecuenciaPadre()

        Dim ObjListDocumento As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  D.DE_Secuencia_ID, " & _
                                        " CAST(A.A_TypeDocument_ID AS NVARCHAR(2)) +' - '+ CAST(A.A_Document_ID AS NVARCHAR(20))+' - '+ CAST(D.DE_Secuencia_ID AS NVARCHAR(5)) as descripcion, " & _
                                        " A_Nit_ID " & _
                                        " FROM DOCUMENTOS_EXISTENTES D " & _
                                        " INNER JOIN ASOCIACION_DOCUMENTOS A ON A.A_Secuencia_ID = D.DE_Secuencia_ID ")
        StrQuery = sql.ToString

        ObjListDocumento = listDocumento(StrQuery, Conexion, "Matrix_Secuencia")

        Return ObjListDocumento

    End Function

    ''' <summary>
    ''' trae las rutas de trabajo del ambiente
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function RutasOpe()

        Dim ObjList As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT TR_Ruta_Temporal,  TR_Ruta_Relativa,TR_Ruta_Visualizacion FROM RUTAS_OPERACION ")
        StrQuery = Sql.ToString

        ObjList = listDocumento(StrQuery, Conexion, "RutasOpe")

        Return ObjList

    End Function

#End Region

End Class
