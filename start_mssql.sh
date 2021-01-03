#!/bin/bash

#docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Passw0rd*" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest

sqlcmd -S localhost -U SA -P "Passw0rd*"
