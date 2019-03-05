using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using sm_analytic.Models;
using System;
using System.Text;

namespace sm_analytic
{
    public class Startup
    {
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
            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer()

            //Dependency Injection to 
            services.AddDbContext<DataDbContext>(options => options.UseSqlServer(
                                                            Configuration.GetConnectionString("DefaultConnection")));

            //Getting config data from appsettings.json
            var jwtAppSettingProps = Configuration.GetSection(nameof(JwtIssuerProps));

            //Configuring JWT properties
            services.Configure<JwtIssuerProps>(props =>
            {
                props.Issuer             = jwtAppSettingProps[nameof(JwtIssuerProps.Issuer)];
                props.Audience           = jwtAppSettingProps[nameof(JwtIssuerProps.Audience)];
                props.SigningCredentials = new SigningCredentials(_signKey, SecurityAlgorithms.HmacSha256);
            });

            
            var tokenValidationParams = new TokenValidationParameters
            {
                ValidateIssuer           = true,
                ValidIssuer              = jwtAppSettingProps[nameof(JwtIssuerProps.Issuer)],

                ValidateAudience         = true,
                ValidAudience            = jwtAppSettingProps[nameof(JwtIssuerProps.Audience)],

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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.Configure<IISOptions>(options =>
            {
                options.AutomaticAuthentication = false;
            });

            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

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

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
