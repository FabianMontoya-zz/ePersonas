Set fso = CreateObject("Scripting.FileSystemObject")
Archivo = "C:\Program Files\SASIF FingerPrint\Enroller\EnrollermentApp.exe"
If fso.FileExists(Archivo) Then
	anno = Year(Date)

	Titulo = "Autorización de Acceso"

	Mensaje = "AUTORIZACIÓN DE ACCESO A ARCHIVOS DEL EQUIPO"+ vbCrLf + vbCrLf +""

	Mensaje = Mensaje + "¿Autoriza que este archivo ejecute única y exclusivamente el programa encargado de realizar el proceso de captura de su huella?"+ vbCrLf +  vbCrLf +""

	Mensaje = Mensaje + "Luego de responder, este archivo se eliminará automáticamente sin importar la opción elegida."+ vbCrLf + vbCrLf + ""

	Mensaje = Mensaje + "© SASIF S.A.S. " & anno

	Acepta = Msgbox(Mensaje, vbYesNo+vbQuestion+vbSystemModal, Titulo)

	Set WshShell = CreateObject("WScript.Shell")

	if Acepta = vbYes then
		Set WshShell = CreateObject("WScript.Shell")
		Return = WshShell.Run("cmd /c start """" ""C:\Program Files\SASIF FingerPrint\Enroller\EnrollermentApp.exe""", 0, false)
	else
		Msgbox "Se canceló la ejecución automática.", vbOKOnly+64+vbSystemModal, "Ejecución Automática Cancelada"
	end if
Else
    MsgBox "Programa no se encuentra en equipo"
End If

Set PV4 = CreateObject("Scripting.FileSystemObject")
PV4.deletefile Wscript.ScriptFullName