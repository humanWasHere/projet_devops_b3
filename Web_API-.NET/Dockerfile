# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
# # USER app
# WORKDIR /app
# EXPOSE 8000
# # EXPOSE 8001

# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
# RUN dotnet new console
# COPY MyFile.cs Program.cs
# RUN dotnet publish -c Release -o out

# FROM mcr.microsoft.com/dotnet/runtime:8.0
# WORKDIR /app
# COPY --from=builder /app/out .
# ENTRYPOINT ["dotnet", "WebApiDevSysOps.dll"]

# Use the appropriate .NET runtime image as the base image
##FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
#WORKDIR /app
#EXPOSE 8080
#EXPOSE 8081

# Copy the published API files to the container
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
#WORKDIR /src
#COPY ["./WebApiDevSysOps.csproj", "Web_API-.NET/"]
#RUN dotnet restore "./Web_API-.NET/./WebApiDevSysOps.csproj"
#COPY . .
#WORKDIR "/src/Web_API-.NET"
#RUN dotnet build "WebApiDevSysOps.csproj" -c Release -o /app/build

# Publish the API
#FROM build AS publish
#RUN dotnet publish "WebApiDevSysOps.csproj" -c Release -o /app/publish

# Set up the final image
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "Web_API-.NET.dll"]

# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["WebApiDevSysOps.csproj", "./"]
RUN dotnet restore "WebApiDevSysOps.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "WebApiDevSysOps.csproj" -c Release -o /app/build

# Stage 2: Publish the application
FROM build AS publish
RUN dotnet publish "WebApiDevSysOps.csproj" -c Release -o /app/publish

# Stage 3: Create final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
EXPOSE 8081
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Web_API-.NET.dll"]

