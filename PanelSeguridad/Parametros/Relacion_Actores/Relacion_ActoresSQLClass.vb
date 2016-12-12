Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Relacion_ActoresSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Cargo (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Relacion_Actores"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertCargo(ByVal vp_Obj_Relacion_Actores As Relacion_ActoresClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT RELACION_ACTORES (" & _
            "RA_Nit_ID," & _
            "RA_Cargo_ID," & _
            "RA_Descripcion," & _
            "RA_CargoDependencia," & _
            "RA_Politica_ID," & _
            "RA_Usuario_Creacion," & _
            "RA_Fecha_Creacion," & _
            "RA_Usuario_Actualizacion," & _
            "RA_Fecha_Actualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Relacion_Actores.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Relacion_Actores.Contrato_ID & "',")
        sql.AppendLine("'" & vp_Obj_Relacion_Actores.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_Obj_Relacion_Actores.Document_ID & "',")
        sql.AppendLine("'" & vp_Obj_Relacion_Actores.TypeRelation & "',")
        sql.AppendLine("'" & vp_Obj_Relacion_Actores.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Relacion_Actores.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Relacion_Actores.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Relacion_Actores.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Relacion_Actores para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listRelacion_Actores(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListRelacion_Actores As New List(Of Relacion_ActoresClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()
        Select Case vp_S_TypeList
            Case "List"

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objRelacion_Actores As New Relacion_ActoresClass
                    'cargamos datos sobre el objeto de login

                    'agregamos a la lista
                    ObjListRelacion_Actores.Add(objRelacion_Actores)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListRelacion_Actores

    End Function

#End Region

#Region "OTRAS CONSULTAS"

#End Region

End Class
