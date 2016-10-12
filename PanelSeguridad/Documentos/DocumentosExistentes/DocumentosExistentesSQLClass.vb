Imports System.Data.SqlClient
Imports System.Data.OleDb
Public Class DocumentosExistentesSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo documento existente (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertDocumentosExistentes(ByVal vp_Obj As DocumentosExistentesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT DOCUMENTOS_EXISTENTES (" & _
            "DE_Nit_ID," & _
            "DE_Secuencia_ID," & _
            "DE_Documento_ID," & _
            "DE_Nombre_Save," & _
            "DE_RutaDocumento," & _
            "DE_Formato," & _
            "DE_IndicativoFoto," & _
            "DE_Verificado," & _
           "DE_Observaciones_Captura," & _
            "DE_Fecha_Vencimiento," & _
            "DE_Fecha_Inicio_Vigencia," & _
            "DE_Dias_Vigencia," & _
            "DE_Usuario_Creacion," & _
            "DE_FechaCreacion," & _
            "DE_Usuario_Actualizacion," & _
            "DE_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Secuencia_ID & "',")
        sql.AppendLine("'" & vp_Obj.Documento_ID & "',")
        sql.AppendLine("'" & vp_Obj.Nombre_Save & "',")
        sql.AppendLine("'" & vp_Obj.RutaDocumento & "',")
        sql.AppendLine("'" & vp_Obj.Formato & "',")
        sql.AppendLine("'" & vp_Obj.Indicativo & "',")
        sql.AppendLine("'" & vp_Obj.Verificado & "',")
        sql.AppendLine("'" & vp_Obj.Observaciones_Captura & "',")
        sql.AppendLine("'" & vp_Obj.Fecha_Vencimiento & "',")
        sql.AppendLine("'" & vp_Obj.Fecha_Inicio_Vigencia & "',")
        sql.AppendLine("'" & vp_Obj.Dias_Vigencia & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result
    End Function

#End Region

End Class
