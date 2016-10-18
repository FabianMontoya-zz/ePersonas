Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class InvPuertaSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo InvPuerta (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertInvPuerta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT INVENTARIO_TARJETAS (" & _
            "IT_Nit_ID," & _
            "IT_Tarjeta_ID," & _
            "IT_Estado," & _
            "IT_MotivoBloqueo," & _
            "IT_ChequeaVigencias," & _
            "IT_Fecha_Inicio_Vigencia," & _
            "IT_Fecha_Fin_Vigencia," & _
            "IT_Nit_ID_Custodia," & _
            "IT_TypeDocument_ID_Custodia," & _
            "IT_Document_ID_Custodia," & _
            "IT_FechaCustodia," & _
            "IT_Usuario_Creacion," & _
            "IT_FechaCreacion," & _
            "IT_Usuario_Actualizacion," & _
            "IT_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Tarjeta_ID & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Estado & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.MotivoBloqueo & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.ChequeaVigencias & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Fecha_Inicio_Vigencia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Fecha_Final_Vigencia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Nit_ID_Custodia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.TypeDocument_ID_Custodia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Document_ID_Custodia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.FechaCustodia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' actualizacion por sasignacion de tarjeta a una persona
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateAsignacionTarjeta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""

        sql.AppendLine("UPDATE INVENTARIO_TARJETAS SET " & _
                    " IT_Estado ='" & vp_Obj_InvPuerta.Estado & "', " & _
                    " IT_Nit_ID_Asigna ='" & vp_Obj_InvPuerta.Nit_ID_Asigna & "', " & _
                    " IT_TypeDocument_Asigna ='" & vp_Obj_InvPuerta.TypeDocument_ID_Asigna & "', " & _
                    " IT_Document_ID_Asigna ='" & vp_Obj_InvPuerta.Document_ID_Asigna & "', " & _
                    " IT_FechaAsignacion ='" & vp_Obj_InvPuerta.FechaAsignacion & "', " & _
                    " IT_Usuario_Actualizacion ='" & vp_Obj_InvPuerta.UsuarioActualizacion & "', " & _
                    " IT_FechaActualizacion ='" & vp_Obj_InvPuerta.FechaActualizacion & "' " & _
                    " WHERE IT_Tarjeta_ID = '" & vp_Obj_InvPuerta.Tarjeta_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de InvPuerta para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listInvPuerta(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListInvPuerta As New List(Of InvPuertaClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_Type

            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objInvPuerta As New InvPuertaClass
                    'cargamos datos sobre el objeto de login
                    objInvPuerta.Nit_ID = ReadConsulta.GetValue(0)


                    objInvPuerta.UsuarioCreacion = ReadConsulta.GetValue(5)
                    objInvPuerta.FechaCreacion = ReadConsulta.GetValue(6)
                    objInvPuerta.UsuarioActualizacion = ReadConsulta.GetValue(7)
                    objInvPuerta.FechaActualizacion = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objInvPuerta.DescripEmpresa = ReadConsulta.GetValue(9) Else objInvPuerta.DescripEmpresa = ""
                    objInvPuerta.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListInvPuerta.Add(objInvPuerta)

                End While

            Case "Matrix_Asigna"
                While ReadConsulta.Read

                    Dim objInvPuerta As New InvPuertaClass
                    'cargamos datos sobre el objeto de login
                    objInvPuerta.Tarjeta_ID = ReadConsulta.GetValue(0)
                    objInvPuerta.Nit_ID_Custodia = ReadConsulta.GetValue(1)

                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objInvPuerta.TypeDocument_ID_Asigna = ReadConsulta.GetValue(2) Else objInvPuerta.TypeDocument_ID_Asigna = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objInvPuerta.Document_ID_Asigna = ReadConsulta.GetValue(3) Else objInvPuerta.Document_ID_Asigna = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objInvPuerta.TypeDocument_ID_Entrega = ReadConsulta.GetValue(4) Else objInvPuerta.TypeDocument_ID_Entrega = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objInvPuerta.Document_ID_Entrega = ReadConsulta.GetValue(5) Else objInvPuerta.Document_ID_Entrega = 0

                    'agregamos a la lista
                    ObjListInvPuerta.Add(objInvPuerta)

                End While


        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListInvPuerta

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As InvPuertaClass)

        Dim StrQuery As String = ""
        Dim ResultTarjeta As String = ""
        Dim ResultEmpresa As String = ""
        Dim ResultFinal As String = "Nuevo"
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM INVENTARIO_TARJETAS" & _
                    " WHERE IT_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                    " AND IT_Tarjeta_ID = '" & vp_O_Obj.Tarjeta_ID & "'")
        StrQuery = sql.ToString
        ResultEmpresa = conex.IDis(StrQuery, "1")

        If ResultEmpresa >= 1 Then
            ResultFinal = "Existe"
        Else

            sql = New StringBuilder()

            sql.AppendLine(" SELECT COUNT(1) FROM INVENTARIO_TARJETAS" & _
                    " WHERE IT_Tarjeta_ID = '" & vp_O_Obj.Tarjeta_ID & "'")

            StrQuery = sql.ToString
            ResultTarjeta = conex.IDis(StrQuery, "1")

            If ResultTarjeta >= 1 Then
                ResultFinal = "Asignada"
            End If
        End If

        Return ResultFinal
    End Function

    ''' <summary>
    ''' consulta que trae los datos de asignar tarjeta
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixTarjeta()

        Dim ObjListCrud_Doc As New List(Of InvPuertaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT IT_Tarjeta_ID ,  IT_Nit_ID_Custodia,  IT_TypeDocument_Asigna, IT_Document_ID_Asigna, IT_TypeDocument_Entrega, IT_Document_ID_Entrega  FROM INVENTARIO_TARJETAS ")
        StrQuery = sql.ToString

        ObjListCrud_Doc = listInvPuerta(StrQuery, Conexion, "Matrix_Asigna")

        Return ObjListCrud_Doc

    End Function

#End Region

End Class
