
set file=%1
set folder=%2
shift
shift
CALL "%VS140COMNTOOLS%\VsDevCmd.bat"
cd %folder%
cl %file%.c
