cd dist
for /f "delims=" %%a in ('dir/ad/b') do rd /s /q "%%~a"
del /f/q/s *

cd ..
rd dist