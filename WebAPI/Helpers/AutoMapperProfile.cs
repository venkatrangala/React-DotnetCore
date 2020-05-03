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
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateModel, User>();

            CreateMap<DCandidate, Candidate>();
            CreateMap<Candidate, DCandidate>();
        }
    }
}