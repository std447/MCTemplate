using Vite.AspNetCore;
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddViteServices();
builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
      u.UseBackOffice();
      u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
      u.UseInstallerEndpoints();
      u.UseBackOfficeEndpoints();
      u.UseWebsiteEndpoints();
    });
if (app.Environment.IsDevelopment())
{
  app.UseViteDevelopmentServer(true);
}

await app.RunAsync();
