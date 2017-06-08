
set file=%1
set folder=%2
shift
shift
cd %folder%
cl %file%.c
