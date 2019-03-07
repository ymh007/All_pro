FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["../API_ProDocker/API_ProDocker.csproj", "../API_ProDocker/"]
RUN dotnet restore "../API_ProDocker/API_ProDocker.csproj"
COPY . .
WORKDIR "/src/../API_ProDocker"
RUN dotnet build "API_ProDocker.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "API_ProDocker.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "API_ProDocker.dll"]