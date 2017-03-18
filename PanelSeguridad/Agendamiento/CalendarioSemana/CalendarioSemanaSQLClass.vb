Imports System.Data.SqlClient
Imports System.Data.OleDb
Imports Newtonsoft.Json

Public Class CalendarioSemanaSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo CALENDARIO_SEMANAS (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert_C_Semana(ByVal vp_Obj As CalendarioSemanaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        sql.AppendLine("INSERT CALENDARIO_SEMANAS (" &
            "CAS_Nit_ID," &
            "CAS_Calendario_ID," &
            "CAS_Dia," &
            "CAS_IndicativoFestivo," &
            "CAS_HoraInicial," &
            "CAS_HoraFinal," &
            "CAS_Usuario_Creacion," &
            "CAS_FechaCreacion," &
            "CAS_Usuario_Actualizacion," &
            "CAS_FechaActualizacion" &
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Calendario_ID & "',")
        sql.AppendLine("'" & vp_Obj.Dia & "',")
        sql.AppendLine("'" & vp_Obj.IndicativoFestivo & "',")
        sql.AppendLine("'" & vp_Obj.HoraInicial & "',")
        sql.AppendLine("'" & vp_Obj.HoraFinal & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        Dim StrQuery As String = sql.ToString()
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' Función que elimina los calendarios en Calendario Semanas
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    Public Function Delete_C_Semana(ByVal vp_Obj As CalendarioSemanaClass)
        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        sql.AppendLine("DELETE FROM CALENDARIO_SEMANAS " &
            " WHERE CAS_Nit_ID = '" & vp_Obj.Nit_ID & "'" &
            " AND CAS_Calendario_ID = '" & vp_Obj.Calendario_ID & "'")

        Dim StrQuery As String = sql.ToString()

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result
    End Function

#End Region

#Region "OTRAS CONSULTAS"


#End Region

End Class
