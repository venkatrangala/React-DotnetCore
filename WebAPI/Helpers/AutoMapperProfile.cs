using AutoMapper;
using WebApi.Entities;
using WebApi.Models;
using WebApi.Models.Users;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<User, GuestModel>();
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateModel, User>();
            CreateMap<GuestModel, Guest>();

            CreateMap<DCandidate, Candidate>();
            CreateMap<Candidate, DCandidate>();
        }
    }
}