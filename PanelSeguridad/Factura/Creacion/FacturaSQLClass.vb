Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class FacturaSQLClass


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

#End Region



End Class
