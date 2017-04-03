Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Adm_Grupo_DocumentosSQLClass
#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la inserción de nuevo GRUPO_DOCUMENTO (INSERT [**Completar**])
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertAdm_Grupo_Documentos(ByVal vp_Obj As Adm_Grupo_DocumentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        'sql.AppendLine("INSERT CONTRATOS (" & _
        '    "CO_Nit_ID," & _
        '    "CO_Sucursal_ID, " & _
        '    "CO_Colocacion_ID, " & _
        '    "CO_Descripcion, " & _
        '    "CO_TypeDocument_ID, " & _
        '    "CO_Document_ID, " & _        
        '    "CO_Usuario_Creacion, " & _
        '    "CO_Fecha_Creacion, " & _
        '    "CO_UsuarioActualizacion, " & _
        '    "CO_Fecha_Actualizacion " & _
        '    ")")
        'sql.AppendLine("VALUES (")
        'sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Sucursal_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Colocacion_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        'sql.AppendLine("'" & vp_Obj.TypeDocument_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Document_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Moneda_ID & "',")        
        'sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        'sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        'sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        'sql.AppendLine("'" & vp_Obj.FechaActualizacion & "') ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

#End Region

#Region "CARGAR LISTAS"
    ''' <summary>
    ''' funcion que trae el listado de Grupo de Documentos para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listGrupoDocumentos(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListGrupoDocumentos As New List(Of Adm_Grupo_DocumentosClass)

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
                    Dim objGrupoDocumentos As New Adm_Grupo_DocumentosClass
                    'cargamos datos sobre el objeto de Politicas

                    objGrupoDocumentos.Nit_ID = ReadConsulta.GetValue(0)
                    objGrupoDocumentos.Grp_Documento_ID = ReadConsulta.GetValue(1)
                    objGrupoDocumentos.Descripcion = ReadConsulta.GetValue(2)
                    objGrupoDocumentos.TipoGrupo = ReadConsulta.GetValue(3)
                    objGrupoDocumentos.Index = ReadConsulta.GetValue(4)

                    'agregamos a la lista
                    ObjListGrupoDocumentos.Add(objGrupoDocumentos)
                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()

        'retornamos la consulta
        Return ObjListGrupoDocumentos

    End Function
#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As Adm_Grupo_DocumentosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM GRUPO_DOCUMENTO " & _
                       " WHERE GD_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND GD_Grp_Documento_ID = '" & vp_O_Obj.Grp_Documento_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de Grupo de Documentos Genéricas y De la empresa
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixAll_GrupoDocumentos(ByVal Nit_ID As String)
        Dim ObjListGrupoDocumentos As New List(Of Adm_Grupo_DocumentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  GD_Nit_ID,  " & _
                               " GD_Grp_Documento_ID, " & _
                               " GD_Descripcion, " & _
                               " GD_TipoGrupo, " & _
                               " ROW_NUMBER() OVER(ORDER BY GD_Nit_ID, GD_Grp_Documento_ID ASC) AS Index_GrupoDocumentos " & _
                               " FROM GRUPO_DOCUMENTO " & _
                               " WHERE GD_Nit_ID = '0' " & _
                               " OR GD_Nit_ID = '" & Nit_ID & "' " & _
                               " ORDER BY GD_Nit_ID, GD_Grp_Documento_ID ASC") 'Trae los grupos genericos (Con cero) y los de la empresa seleccionada

        StrQuery = sql.ToString

        ObjListGrupoDocumentos = listGrupoDocumentos(StrQuery, Conexion, "MatrixAll")

        Return ObjListGrupoDocumentos

    End Function

#End Region
End Class
