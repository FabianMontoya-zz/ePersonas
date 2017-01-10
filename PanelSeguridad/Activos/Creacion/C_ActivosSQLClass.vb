Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class C_ActivosSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo C_Activos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertC_Activos(ByVal vp_Obj As C_ActivosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
       
        sql.AppendLine("INSERT ACTIVOS (" & _
            "ACT_Nit_ID," & _
            "ACT_Ref_1," & _
            "ACT_Ref_2," & _
            "ACT_Ref_3," & _
            "ACT_Descripcion," & _
            "ACT_TA_ID," & _
            "ACT_STA_ID," & _
            "ACT_Cod_Pais_U," & _
            "ACT_Ciudad_ID_U," & _
            "ACT_Direccion_U," & _
            "ACT_Cod_Pais_R," & _
            "ACT_Ciudad_ID_R," & _
            "ACT_TypeDocument_ID_R," & _
            "ACT_Document_ID_R," & _
            "ACT_Surcursal_ID," & _
            "ACT_Cod_Moneda," & _
            "ACT_valor_Bien," & _
            "ACT_Val_Op_Compra," & _
            "ACT_CompraBien," & _
            "ACT_Asegurado," & _
            "ACT_EstadoActivo," & _
            "ACT_TipoAdministracion," & _
            "ACT_TipoEscritura," & _
            "ACT_N_Escritura," & _
            "ACT_FechaConta_Recibo," & _
            "ACT_FechaConta_Retiro," & _
            "ACT_TypeDocument_ID_T," & _
            "ACT_Document_ID_T," & _
            "ACT_TypeDocument_ID_Not," & _
            "ACT_Document_ID_Not," & _
            "ACT_Num_Poliza," & _
            "ACT_N_Notaria," & _
            "ACT_Usuario_Creacion," & _
            "ACT_FechaCreacion," & _
            "ACT_Usuario_Actualizacion," & _
            "ACT_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Ref_1 & "',")
        sql.AppendLine("'" & vp_Obj.Ref_2 & "',")
        sql.AppendLine("'" & vp_Obj.Ref_3 & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj.TA_ID & "',")
        sql.AppendLine("'" & vp_Obj.STA_ID & "',")
        sql.AppendLine("'" & vp_Obj.Cod_Pais_U & "',")
        sql.AppendLine("'" & vp_Obj.Ciudad_ID_U & "',")
        sql.AppendLine("'" & vp_Obj.Direccion_U & "',")
        sql.AppendLine("'" & vp_Obj.Cod_Pais_R & "',")
        sql.AppendLine("'" & vp_Obj.Ciudad_ID_R & "',")
        sql.AppendLine("'" & vp_Obj.TypeDocument_ID_R & "',")
        sql.AppendLine("'" & vp_Obj.Document_ID_R & "',")
        sql.AppendLine("'" & vp_Obj.Surcursal_ID & "',")
        sql.AppendLine("'" & vp_Obj.Cod_Moneda_ID & "',")
        sql.AppendLine("'" & vp_Obj.Valor_Bien & "',")
        sql.AppendLine("'" & vp_Obj.Val_Op_Compra & "',")
        sql.AppendLine("'" & vp_Obj.CompraBien & "',")
        sql.AppendLine("'" & vp_Obj.Asegurado & "',")
        sql.AppendLine("'" & vp_Obj.EstadoActivo & "',")
        sql.AppendLine("'" & vp_Obj.TipoAdministracion & "',")
        sql.AppendLine("'" & vp_Obj.TipoEscritura & "',")
        sql.AppendLine("'" & vp_Obj.N_Escritura & "',")
        sql.AppendLine("'" & vp_Obj.FechaConta_Recibo & "',")
        sql.AppendLine("'" & vp_Obj.FechaConta_Retiro & "',")
        sql.AppendLine("'" & vp_Obj.TypeDocument_ID_T & "',")
        sql.AppendLine("'" & vp_Obj.Document_ID_T & "',")
        sql.AppendLine("'" & vp_Obj.TypeDocument_ID_Not & "',")
        sql.AppendLine("'" & vp_Obj.Document_ID_Not & "',")
        sql.AppendLine("'" & vp_Obj.Num_Poliza & "',")
        sql.AppendLine("'" & vp_Obj.N_Notaria & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        Dim StrQuery As String = sql.ToString()
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"


#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de C_Activos para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listC_Activos(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListC_Activos As New List(Of C_ActivosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type
            Case "List"



        End Select


        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListC_Activos

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' funcion que valida si esta repetido el registro a ingresar
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As C_ActivosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM ACTIVOS " & _
                                      " WHERE ACT_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                                      "        AND ACT_Ref_1 = '" & vp_O_Obj.Ref_1 & "'" & _
                                      "        AND ACT_Ref_2 = '" & vp_O_Obj.Ref_2 & "'" & _
                                      "        AND ACT_Ref_3 = '" & vp_O_Obj.Ref_3 & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

#End Region

End Class
