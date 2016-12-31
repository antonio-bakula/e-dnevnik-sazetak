@echo off
SET source=%~dp0
SET target=c:\temp\release\e-dnevnik-sazetak

echo. e-dnevnik-sazetak build.  
echo. Source = %source%
echo. Target = %target%
rd %target% /S /Q
md %target%

copy %source%\manifest.json %target%\
copy %source%\README.md %target%\
copy %source%\popup.html %target%\
copy %source%\LICENSE %target%\

md %target%\icons
copy %source%\icons\*.png %target%\icons\

md %target%\css
copy %source%\css\*.css %target%\css\

md %target%\js
copy %source%\js\*.js %target%\js\

md %target%\img
copy %source%\img\*.* %target%\img\

del /f %target%.zip
7z a -r %target%.zip %target%\*.*