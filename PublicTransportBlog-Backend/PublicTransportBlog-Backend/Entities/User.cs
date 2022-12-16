using Microsoft.AspNetCore.Identity;

namespace AuthenticationApi.Entities;

public class User : IdentityUser
{
    public User()
    {
        this.Publications = new HashSet<Publication>();
        this.PublicationComments = new HashSet<PublicationComment>();
    }

    public ICollection<Publication> Publications { get; set; }

    public ICollection<PublicationComment> PublicationComments { get; set; }
}

