using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using sm_analytic.Controllers;
using sm_analytic.Models;
using System;
using System.Net;
using System.Text;

namespace sm_analytic
{
    public class Startup
    {
        static IHostingEnvironment _configureEnv;
        private readonly SymmetricSecurityKey _signKey 
            = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Manager.HashPasswordSHA256("@Per1Astera6Ad1Astra8SMAnalytic@")));

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Dependency Injection to 
            services.AddDbContext<DataDbContext>(options => options.UseSqlServer(
                                                            Configuration.GetConnectionString("AzureConnection"/*"DefaultConnection"*/)));
            services.BuildServiceProvider().GetService<DataDbContext>().Database.Migrate();
            

            services.AddSingleton<IJwtManager, JwtManager>();
            services.AddHttpContextAccessor();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //Getting config data from appsettings.json
            var jwtAppSettingProps = Configuration.GetSection(nameof(JwtIssuerProps));

            //Configuring JWT properties
            services.Configure<JwtIssuerProps>(props =>
            {
                props.Issuer             = jwtAppSettingProps[nameof(JwtIssuerProps.Issuer)];
                props.Audience           = Environment.GetEnvironmentVariable("baseURL");
                props.SigningCredentials = new SigningCredentials(_signKey, SecurityAlgorithms.HmacSha256);
                
            });

            
            var tokenValidationParams = new TokenValidationParameters
            {
                ValidateIssuer           = true,
                ValidIssuer              = jwtAppSettingProps[nameof(JwtIssuerProps.Issuer)],

                ValidateAudience         = false,
                ValidAudience            = Environment.GetEnvironmentVariable("baseURL"),

                ValidateIssuerSigningKey = true,
                IssuerSigningKey         = _signKey,

                RequireExpirationTime    = false,
                ValidateLifetime         = true,
                ClockSkew                = TimeSpan.Zero
            };

            //Inserting authentication in the pipeline
            services
                .AddAuthentication(i =>
                {
                    i.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    i.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(i =>
                {
                    i.ClaimsIssuer              = jwtAppSettingProps[nameof(JwtIssuerProps.Issuer)];
//                  i.Audience                  = jwtAppSettingProps[nameof(JwtIssuerProps.Audience)];
                    i.TokenValidationParameters = tokenValidationParams;
                    i.SaveToken                 = true;
                })
                ;

            services
                .AddAuthorization(i =>
                {
                    i.AddPolicy("SMAnalytic", prop =>
                                              {
                                                  prop.RequireClaim(Manager.JwtClaimHelper.ClaimIdentifierRole,
                                                                    Manager.JwtClaimHelper.ClaimValue);
                                              });
                });

            var builder = services.AddIdentityCore<IdentityCustomModel>(i =>
            {
                i.Password.RequireDigit           = true;
                i.Password.RequireLowercase       = true;
                i.Password.RequireUppercase       = true;
                i.Password.RequireNonAlphanumeric = false;
                i.Password.RequiredLength         = 6;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<DataDbContext>().AddDefaultTokenProviders();

            services.AddAutoMapper();
            services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());
            services.AddMemoryCache();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.Configure<IISOptions>(options =>
            {
                options.AutomaticAuthentication = true;
            });

            services.AddCors(o => o.AddPolicy("AllowMyOrigin", i =>
            {
                i.AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader();
            }));



            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromMinutes(1);
            });

            services.AddHttpClient();
        }




        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            _configureEnv = env;

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                Environment.SetEnvironmentVariable("baseURL", "http://127.0.0.1:5000/");
                Environment.SetEnvironmentVariable("redirectURL", "http://127.0.0.1:5000/dashboard");
            }
            else
            {
                app.UseExceptionHandler("/Error");
                Environment.SetEnvironmentVariable("baseURL", "http://myvmlab.senecacollege.ca:6448/");
                Environment.SetEnvironmentVariable("redirectURL", "http://myvmlab.senecacollege.ca:6448/dashboard");

                // app.UseHsts(); don't know what this is for, leaving it just in case
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            }

            //Adds "Access-Control-Allow-Origin" header to the requester of unknown origin(otherwise, raises annoing CORP exception)
            app.UseExceptionHandler(builder =>
            {
                builder.Run(async item =>
                {
                    item.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    item.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
                    item.Response.StatusCode = (int)HttpStatusCode.InternalServerError; /*HTTP 500*/

                    if (item.Features.Get<IExceptionHandlerFeature>() != null)
                    {
                        item.Response.Headers.Add("Application-Error", item.Features.Get<IExceptionHandlerFeature>().Error.Message);
                        item.Response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
                        Console.WriteLine("____!!!  CORS Policy Excepption happened");
                        await item.Response.WriteAsync(item.Features.Get<IExceptionHandlerFeature>().Error.Message).ConfigureAwait(false);
                    }
                });
            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSession();
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseCors("AllowMyOrigin");

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath     = "ClientApp";
                spa.Options.StartupTimeout = new TimeSpan(0, 1, 30);

                if (env.IsDevelopment())
                {
                   spa.UseAngularCliServer(npmScript: "start");
                }

            });

            
        }
    }
}
