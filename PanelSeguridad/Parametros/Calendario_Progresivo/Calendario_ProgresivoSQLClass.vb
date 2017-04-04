Imports System.Data.OleDb

Public Class Calendario_ProgresivoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Calendario (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Calendario"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertH_Calendario(ByVal vp_Obj_Calendario As Calendario_ProgresivoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT CALENDARIO_PROGRESIVO(" &
            "CP_Nit_ID," &
            "CP_Calendario_ID," &
            "CP_Calendario_Base_ID," &
            "CP_Fecha," &
            "CP_HoraInicial," &
            "CP_HoraFinal," &
            "CP_Usuario_Creacion," &
            "CP_FechaCreacion," &
            "CP_Usuario_Actualizacion," &
            "CP_FechaActualizacion" &
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Calendario.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.Calendario_ID & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.Calendario_Base_ID & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.Fecha & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.HoraIni & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.HoraFin & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function


    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Calendario (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Calendario"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseH_Calendario(ByVal vp_Obj_Calendario As Calendario_ProgresivoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        sql.AppendLine("DELETE FROM dbo.CALENDARIO_PROGRESIVO " &
            " WHERE CP_Nit_ID = '" & vp_Obj_Calendario.Nit_ID & "'" &
            " AND CP_Calendario_ID = '" & vp_Obj_Calendario.Calendario_ID & "'")

        Dim StrQuery As String = sql.ToString()

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropList(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim SQLGeneral As New GeneralSQLClass

        Dim sql As New StringBuilder

        sql.Append(" SELECT T_IndexColumna As ID, T_Traductor As descripcion FROM TC_TABLAS " &
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListCalendarioDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_Calendario_ID AS ID,CAST(A_Calendario_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM Calendario " &
                   " WHERE  A_Nit_ID = '" & vp_S_NitEmpresa & "'")

        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function



#End Region

#Region "CARGAR LISTAS"



#End Region

#Region "OTRAS CONSULTAS"



#End Region

End Class
