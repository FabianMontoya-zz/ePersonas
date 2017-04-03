Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class VehiculosSQLClass


#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo C_Activos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertVehiculos(ByVal vp_Obj As VehiculosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        sql.AppendLine("INSERT VEHICULOS (" & _
            "V_Nit_ID," & _
            "V_Ref_1," & _
            "V_Ref_2," & _
            "V_Ref_3," & _
            "V_Facecolda_ID," & _
            "V_Modelo," & _
            "V_Clase," & _
            "V_Marca," & _
            "V_Linea," & _
            "V_ValorComer," & _
            "V_ValorAcesorios," & _
            "V_Cilindraje," & _
            "V_N_Motor," & _
            "V_N_Chasis," & _
            "V_ValorChasis," & _
            "V_N_Serie," & _
            "V_N_VIN," & _
            "V_Modalidad_Servicio," & _
            "V_N_Pasajeros," & _
            "V_TipoServicio," & _
            "V_Combustible," & _
            "V_Colores_ID," & _
            "V_Capacidad," & _
            "V_Potencia," & _
            "V_Carroceria," & _
            "V_TipoCarroceria," & _
            "V_Blindaje," & _
            "V_NivelBlindaje," & _
            "V_TipoIden_Blin," & _
            "V_N_TypeDocument_ID_Blind," & _
            "V_N_Document_ID_Blind," & _
            "V_N_GPS," & _
            "V_Indicativo_Modificacion," & _
            "V_Usuario_Creacion," & _
            "V_FechaCreacion," & _
            "V_Usuario_Actualizacion," & _
            "V_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Ref_1 & "',")
        sql.AppendLine("'" & vp_Obj.Ref_2 & "',")
        sql.AppendLine("'" & vp_Obj.Ref_3 & "',")
        sql.AppendLine("'" & vp_Obj.Fasecolda_ID & "',")
        sql.AppendLine("'" & vp_Obj.Modelo & "',")
        sql.AppendLine("'" & vp_Obj.Clase & "',")
        sql.AppendLine("'" & vp_Obj.Marca & "',")
        sql.AppendLine("'" & vp_Obj.Linea & "',")
        sql.AppendLine("'" & vp_Obj.ValorComer & "',")
        sql.AppendLine("'" & vp_Obj.ValorAcesorios & "',")
        sql.AppendLine("'" & vp_Obj.Cilindraje & "',")
        sql.AppendLine("'" & vp_Obj.N_Motor & "',")
        sql.AppendLine("'" & vp_Obj.N_Chasis & "',")
        sql.AppendLine("'" & vp_Obj.ValorChasis & "',")
        sql.AppendLine("'" & vp_Obj.N_Serie & "',")
        sql.AppendLine("'" & vp_Obj.N_VIN & "',")
        sql.AppendLine("'" & vp_Obj.Modalidad_Servicio & "',")
        sql.AppendLine("'" & vp_Obj.N_Pasajeros & "',")
        sql.AppendLine("'" & vp_Obj.TipoServicio & "',")
        sql.AppendLine("'" & vp_Obj.Combustible & "',")
        sql.AppendLine("'" & vp_Obj.Colores_ID & "',")
        sql.AppendLine("'" & vp_Obj.Capacidad & "',")
        sql.AppendLine("'" & vp_Obj.Potencia & "',")
        sql.AppendLine("'" & vp_Obj.Carroceria & "',")
        sql.AppendLine("'" & vp_Obj.TipoCarroceria & "',")
        sql.AppendLine("'" & vp_Obj.Blindaje & "',")
        sql.AppendLine("'" & vp_Obj.NivelBlindaje & "',")
        sql.AppendLine("'" & vp_Obj.TipoIden_Blin & "',")
        sql.AppendLine("'" & vp_Obj.N_TypeDocument_ID_Blind & "',")
        sql.AppendLine("'" & vp_Obj.N_Document_ID_Blind & "',")
        sql.AppendLine("'" & vp_Obj.N_GPS & "',")
        sql.AppendLine("'" & vp_Obj.Indicativo_Modificacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        Dim StrQuery As String = sql.ToString
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
    Public Function Consulta_Repetido(ByVal vp_O_Obj As VehiculosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM VEHICULOS " & _
                                      " WHERE V_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                                      "        AND V_Ref_1 = '" & vp_O_Obj.Ref_1 & "'" & _
                                      "        AND V_Ref_2 = '" & vp_O_Obj.Ref_2 & "'" & _
                                      "        AND V_Ref_3 = '" & vp_O_Obj.Ref_3 & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

#End Region

End Class
