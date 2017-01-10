Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class R_Persona_TarjetaSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo R_Persona_Tarjeta (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_R_Persona_Tarjeta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertR_Persona_Tarjeta(ByVal vp_Obj_R_Persona_Tarjeta As R_Persona_TarjetaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT R_TARJETA_PERSONA (" & _
            "RTP_Nit_ID," & _
            "RTP_TypeDocument_ID," & _
            "RTP_Document_ID," & _
            "RTP_Tarjeta_ID," & _
            "RTP_Usuario_Creacion," & _
            "RTP_FechaCreacion," & _
            "RTP_Usuario_Actualizacion," & _
            "RTP_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_R_Persona_Tarjeta.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_R_Persona_Tarjeta.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_Obj_R_Persona_Tarjeta.Document_ID & "',")
        sql.AppendLine("'" & vp_Obj_R_Persona_Tarjeta.Tarjeta_ID & "',")
        sql.AppendLine("'" & vp_Obj_R_Persona_Tarjeta.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_R_Persona_Tarjeta.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_R_Persona_Tarjeta.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_R_Persona_Tarjeta.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' proceso que elimina la relacion de persona tarje por desbloqueo para asignarla nuevamentae 
    ''' </summary>
    ''' <param name="vp_s_Tarjeta_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function DeleteRTP_Desbloqueo(ByVal vp_s_Tarjeta_ID As String)

        Dim conex As New Conector

        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("DELETE R_TARJETA_PERSONA  WHERE RTP_Tarjeta_ID ='" & vp_s_Tarjeta_ID & "'")
        StrQuery = sql.ToString

        Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "1")
        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListR_Persona_TarjetaDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_R_Persona_Tarjeta_ID AS ID,CAST(A_R_Persona_Tarjeta_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM R_Persona_Tarjeta " & _
                   " WHERE  A_Nit_ID = '" & vp_S_NitEmpresa & "'")

        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de R_Persona_Tarjeta para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listR_Persona_Tarjeta(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListR_Persona_Tarjeta As New List(Of R_Persona_TarjetaClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_Type

            Case "List"


            Case "Matrix_RTP"
                While ReadConsulta.Read

                    Dim objR_Persona_Tarjeta As New R_Persona_TarjetaClass
                    'cargamos datos sobre el objeto de login
                    objR_Persona_Tarjeta.Nit_ID = ReadConsulta.GetValue(0)
                    objR_Persona_Tarjeta.TypeDocument_ID = ReadConsulta.GetValue(1)
                    objR_Persona_Tarjeta.Document_ID = ReadConsulta.GetValue(2)
                    objR_Persona_Tarjeta.Tarjeta_ID = ReadConsulta.GetValue(3)

                    'agregamos a la lista
                    ObjListR_Persona_Tarjeta.Add(objR_Persona_Tarjeta)
                End While


        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListR_Persona_Tarjeta

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As R_Persona_TarjetaClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM R_TARJETA_PERSONA " & _
                       " WHERE RTP_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND RTP_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND RTP_Document_ID = '" & vp_O_Obj.Document_ID & "'" & _
                       " AND RTP_Tarjeta_ID = '" & vp_O_Obj.Tarjeta_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function


    ''' <summary>
    ''' consulta que trae los datos de asignar tarjeta
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_RTP()

        Dim ObjListCrud_Doc As New List(Of R_Persona_TarjetaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  RTP_Nit_ID, RTP_TypeDocument_ID, RTP_Document_ID, RTP_Tarjeta_ID  FROM  R_TARJETA_PERSONA")
        StrQuery = sql.ToString

        ObjListCrud_Doc = listR_Persona_Tarjeta(StrQuery, Conexion, "Matrix_RTP")

        Return ObjListCrud_Doc

    End Function

#End Region

End Class
