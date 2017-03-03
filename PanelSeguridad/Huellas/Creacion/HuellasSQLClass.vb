Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class HuellasSQLClass

#Region "CRUD"

    ''' <summary>
    ''' Función que crea el query para la inserción de huellas del cliente
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertHuellas(ByVal vp_Obj As HuellasClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT HUELLAS (" & _
                       "H_Nit_ID, " & _
                       "H_TypeDocument_ID, " & _
                       "H_Document_ID, " & _
                       "H_Menique_IZ, " & _
                       "H_Anular_IZ, " & _
                       "H_Medio_IZ, " & _
                       "H_Indice_IZ, " & _
                       "H_Pulgar_IZ, " & _
                       "H_Menique_DER, " & _
                       "H_Anular_DER, " & _
                       "H_Medio_DER, " & _
                       "H_Indice_DER, " & _
                       "H_Pulgar_DER, " & _
                       "H_Usuario_Creacion, " & _
                       "H_FechaCreacion, " & _
                       "H_Usuario_Actualizacion, " & _
                       "H_FechaActualizacion" & _
                       ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.TypeDocument_ID & "', ")
        sql.AppendLine("'" & vp_Obj.Document_ID & "', ")
        sql.AppendLine("@Menique_IZ, ")
        sql.AppendLine("@Anular_IZ, ")
        sql.AppendLine("@Medio_IZ, ")
        sql.AppendLine("@Indice_IZ, ")
        sql.AppendLine("@Pulgar_IZ, ")
        sql.AppendLine("@Menique_DER, ")
        sql.AppendLine("@Anular_DER, ")
        sql.AppendLine("@Medio_DER, ")
        sql.AppendLine("@Indice_DER, ")
        sql.AppendLine("@Pulgar_DER, ")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "', ")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "', ")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "', ")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        Dim parametros As List(Of SqlParameter) = New List(Of SqlParameter)

        parametros.Add(New SqlParameter("@Menique_IZ", vp_Obj.Menique_IZ))
        parametros.Add(New SqlParameter("@Anular_IZ", vp_Obj.Anular_IZ))
        parametros.Add(New SqlParameter("@Medio_IZ", vp_Obj.Medio_IZ))
        parametros.Add(New SqlParameter("@Indice_IZ", vp_Obj.Indice_IZ))
        parametros.Add(New SqlParameter("@Pulgar_IZ", vp_Obj.Pulgar_IZ))

        parametros.Add(New SqlParameter("@Menique_DER", vp_Obj.Menique_DER))
        parametros.Add(New SqlParameter("@Anular_DER", vp_Obj.Anular_DER))
        parametros.Add(New SqlParameter("@Medio_DER", vp_Obj.Medio_DER))
        parametros.Add(New SqlParameter("@Indice_DER", vp_Obj.Indice_DER))
        parametros.Add(New SqlParameter("@Pulgar_DER", vp_Obj.Pulgar_DER))


        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_With_Parameters(StrQuery, "1", parametros)

        Return Result

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Huellas para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of HuellasClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_TypeList
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New HuellasClass
                    'cargamos datos sobre el objeto
                    obj.Nit_ID = ReadConsulta.GetValue(0)
                    obj.UsuarioCreacion = ReadConsulta.GetValue(3)
                    obj.FechaCreacion = ReadConsulta.GetValue(4)
                    obj.UsuarioActualizacion = ReadConsulta.GetValue(5)
                    obj.FechaActualizacion = ReadConsulta.GetValue(6)
                    obj.Index = ReadConsulta.GetValue(7)
                    'agregamos a la lista
                    ObjList.Add(obj)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta

        Return ObjList

    End Function

#End Region

#Region "OTRAS CONSULTAS"


    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As HuellasClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM HUELLAS " & _
                       " WHERE H_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND H_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND H_Document_ID = '" & vp_O_Obj.Document_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

    

#End Region

End Class
