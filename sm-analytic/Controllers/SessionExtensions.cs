using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace sm_analytic.Controllers
{
    /*
     * Class that lets us expand the existed ASP.NET Core sessions
     * Allows us to store class instances in sessions, instead of just strings
     */
    public static class SessionExtensions {
        public static void SetObject(this ISession session, string key, object value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T GetObject<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }
    }

}
