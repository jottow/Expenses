using System;
using System.Diagnostics;
using System.IO;
using Ausgabenverwaltung.EF;
using Ausgabenverwaltung.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

namespace Ausgabenverwaltung
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                 .AddJsonOptions(options =>
                 {
                     var resolver = options.SerializerSettings.ContractResolver;
                     if (resolver != null)
                     {
                         (resolver as DefaultContractResolver).NamingStrategy = null;
                     }
                 });

            // EF-Context mit DevConnection hinufügen
            services.AddDbContext<AusgabenContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //else
            //{
            //    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            //    app.UseHsts();
            //}

            //app.UseHttpsRedirection();
            app.UseCors(options =>
           
            options.WithOrigins("http://ausgabenverwaltung")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowAnyOrigin());
            app.Use(async (context, next) =>
            {
                await next();
                Debug.Print(context.Request.Path.Value);
                Debug.Print(context.Response.StatusCode.ToString());
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                {
                   context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc();
        }

      
    }
}
