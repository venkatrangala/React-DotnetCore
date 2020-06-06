namespace WebApi.Models.Users
{
    public class GuestModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Diet { get; set; }
        public bool IsConfirmed { get; set; }

    }
}