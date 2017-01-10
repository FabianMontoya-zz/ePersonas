Imports System.Data.SqlClient
Imports System.Data.OleDb
Imports Newtonsoft.Json


Public Class FacturaSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo FACT_ORD_COMPRA (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertC_Factura(ByVal vp_Obj As FacturaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        sql.AppendLine("INSERT FACT_ORD_COMPRA (" & _
            "F_Nit_ID," & _
            "F_Ref_1," & _
            "F_Ref_2," & _
            "F_Ref_3," & _
            "F_Fact_Oct_ID," & _
            "F_Fecha," & _
            "F_Cod_Moneda," & _
            "F_Valor_Total," & _
            "F_Valor_Sin_IVA," & _
            "F_Valor_IVA," & _
            "F_Usuario_Creacion," & _
            "F_FechaCreacion," & _
            "F_Usuario_Actualizacion," & _
            "F_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Ref_1 & "',")
        sql.AppendLine("'" & vp_Obj.Ref_2 & "',")
        sql.AppendLine("'" & vp_Obj.Ref_3 & "',")
        sql.AppendLine("'" & vp_Obj.Fact_Oct_ID & "',")
        sql.AppendLine("'" & vp_Obj.F_Fecha & "',")
        sql.AppendLine("'" & vp_Obj.Cod_Moneda_ID & "',")
        sql.AppendLine("'" & vp_Obj.Valor_Total & "',")
        sql.AppendLine("'" & vp_Obj.Valor_Sin_IVA & "',")
        sql.AppendLine("'" & vp_Obj.Valor_IVA & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        Dim StrQuery As String = sql.ToString()
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' funcion que valida si esta repetido el registro a ingresar
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As FacturaClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM FACT_ORD_COMPRA " & _
                                      " WHERE F_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                                      "        AND F_Ref_1 = '" & vp_O_Obj.Ref_1 & "'" & _
                                      "        AND F_Ref_2 = '" & vp_O_Obj.Ref_2 & "'" & _
                                      "        AND F_Ref_3 = '" & vp_O_Obj.Ref_2 & "'" & _
                                      "        AND F_Fact_Oct_ID = '" & vp_O_Obj.Fact_Oct_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' CREACION DE LISTA DE STRING A OBJ FACTURA PARA INSERCION EN ITERACION
    ''' </summary>
    ''' <param name="vp_S_listFactura"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Create_List_Factura(ByVal vp_S_listFactura As String)

        Dim NewList = JsonConvert.DeserializeObject(Of List(Of FacturaClass))(vp_S_listFactura)
        Dim ObjlistTercero As New List(Of FacturaClass)

        For Each item As FacturaClass In NewList

            Dim Obj As New FacturaClass

            Obj.Nit_ID = item.Nit_ID
            Obj.Ref_1 = item.Ref_1
            Obj.Ref_2 = item.Ref_2
            Obj.Ref_3 = item.Ref_3
            Obj.Fact_Oct_ID = item.Fact_Oct_ID
            Obj.F_Fecha = item.F_Fecha
            Obj.Cod_Moneda_ID = item.Cod_Moneda_ID
            Obj.Valor_Total = item.Valor_Total
            Obj.Valor_Sin_IVA = item.Valor_Sin_IVA
            Obj.Valor_IVA = item.Valor_IVA
            Obj.UsuarioCreacion = item.UsuarioCreacion
            Obj.UsuarioActualizacion = item.UsuarioCreacion
            Obj.FechaCreacion = Date.Now
            Obj.FechaActualizacion = Date.Now

            ObjlistTercero.Add(Obj)

        Next

        Return ObjlistTercero
    End Function

#End Region

End Class
