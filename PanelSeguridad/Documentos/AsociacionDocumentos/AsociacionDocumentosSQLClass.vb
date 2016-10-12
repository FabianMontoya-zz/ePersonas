Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class AsociacionDocumentosSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo documento existente (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertDocumentosAsociados(ByVal vp_Obj As AsociacionDocumentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT ASOCIACION_DOCUMENTOS (" & _
            "A_Nit_ID," & _
            "A_TypeDocument_ID," & _
            "A_Document_ID," & _
            "A_Secuencia_Doc," & _
            "A_Contrato_ID," & _
            "A_Ref_1," & _
            "A_Factura_ID," & _
           "A_Secuencia_ID," & _
            "A_Usuario_Creacion," & _
            "A_FechaCreacion," & _
            "A_Usuario_Actualizacion," & _
            "A_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_Obj.Document_ID & "',")
        sql.AppendLine("'" & vp_Obj.Secuencia_Doc & "',")
        sql.AppendLine("'" & vp_Obj.Contrato_ID & "',")
        sql.AppendLine("'" & vp_Obj.Ref_1 & "',")
        sql.AppendLine("'" & vp_Obj.Factura_ID & "',")
        sql.AppendLine("'" & vp_Obj.Secuencia_ID & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

#End Region


#Region "OTRAS FUNCIONES"

    Public Function UpdateDocPadre(ByVal vp_Obj As AsociacionDocumentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""

        sql.AppendLine("UPDATE ASOCIACION_DOCUMENTOS SET A_Secuencia_Doc = '" & vp_Obj.Secuencia_Doc & "'" & _
                       " WHERE A_Nit_ID = '" & vp_Obj.Nit_ID & "' AND A_Secuencia_ID ='" & vp_Obj.Secuencia_Doc & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

#End Region

End Class
