!macro customInit
  # Ask an already-running Snow App to perform its normal cleanup and exit.
  # Older releases do not understand this argument, so the standard elevated
  # electron-builder process check remains the compatibility fallback.
  nsProcess::_FindProcess "${APP_EXECUTABLE_FILENAME}"
  Pop $0
  ${If} $0 == 0
    Exec '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" --quit-for-update'
    Sleep 1500
  ${EndIf}
!macroend
