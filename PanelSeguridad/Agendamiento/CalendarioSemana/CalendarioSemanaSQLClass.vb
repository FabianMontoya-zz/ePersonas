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

        sql.AppendLine("INSERT CALENDARIO_SEMANAS (" & _
            "CAS_Nit_ID," & _
            "CAS_Calendario_ID," & _
            "CAS_Dia_1_8," & _
            "CAS_IndicativoFoto," & _
            "CAS_HoraInicial," & _
            "CAS_HoraFinal," & _
            "CAS_Usuario_Creacion," & _
            "CAS_FechaCreacion," & _
            "CAS_Usuario_Actualizacion," & _
            "CAS_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Calendario_ID & "',")
        sql.AppendLine("'" & vp_Obj.Dia_1_8 & "',")
        sql.AppendLine("'" & vp_Obj.IndicativoFoto & "',")
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

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' CREACION DE LISTA DE STRING A OBJ FACTURA PARA INSERCION EN ITERACION
    ''' </summary>
    ''' <param name="vp_S_listFactura"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Create_List(ByVal vp_S_list As String)

        Dim NewList = JsonConvert.DeserializeObject(Of List(Of CalendarioSemanaClass))(vp_S_list)
        Dim Objlist As New List(Of CalendarioSemanaClass)

        For Each item As CalendarioSemanaClass In NewList

            Dim Obj As New CalendarioSemanaClass

            Obj.Nit_ID = item.Nit_ID
            Obj.Calendario_ID = item.Calendario_ID
            Obj.Dia_1_8 = item.Dia_1_8
            Obj.IndicativoFoto = item.IndicativoFoto
            Obj.HoraInicial = item.HoraInicial
            Obj.HoraFinal = item.HoraFinal
            Obj.UsuarioCreacion = item.UsuarioCreacion
            Obj.UsuarioActualizacion = item.UsuarioCreacion
            Obj.FechaCreacion = Date.Now
            Obj.FechaActualizacion = Date.Now

            Objlist.Add(Obj)

        Next

        Return Objlist
    End Function

#End Region
    
End Class
