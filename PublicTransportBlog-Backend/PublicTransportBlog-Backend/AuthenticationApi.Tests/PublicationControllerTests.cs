using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationApi.Controllers;
using AuthenticationApi.Db;
using AuthenticationApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace AuthenticationApi.Tests
{
    public class PublicationControllerTests : ControllerTestBase
    {
        [Fact]
        public async Task Publication_ReturnsNotFoundForInvalidId()
        {
            using (var dbContext = CreateTestDbContext())
            {
                // Arrange
                var controller = new PublicationController();

                var publicationId = Guid.NewGuid(); // Use an ID that doesn't exist in the test database

                // Act
                var result = await controller.Publication(publicationId);

                // Assert
                var notFoundResult = Assert.IsType<NotFoundResult>(result);
            }
        }
    }
}