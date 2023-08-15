using AuthenticationApi.Db;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationApi.Tests
{
    public class ControllerTestBase
    {
        protected AppDbContext CreateTestDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            return new AppDbContext(options);
        }
    }
}