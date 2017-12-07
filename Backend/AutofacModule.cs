using System.Data;
using System.Data.SqlClient;
using Autofac;
using Microsoft.Data.Sqlite;

namespace Backend
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<SqliteConnection>().As<IDbConnection>();
        }
    }
}