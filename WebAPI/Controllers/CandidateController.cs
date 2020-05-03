using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CandidateController : ControllerBase
    {
        private ICandidateService _candidateService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public CandidateController(
            ICandidateService candidateService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _candidateService = candidateService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]DCandidate model)
        {
            // map model to entity
            var candidate = _mapper.Map<Candidate>(model);

            try
            {
                // create candidate
                _candidateService.Create(candidate);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetCandidates()
        {
            var candidates = _candidateService.GetAll();
            var model = _mapper.Map<IList<DCandidate>>(candidates);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var candidate = _candidateService.GetById(id);
            var model = _mapper.Map<DCandidate>(candidate);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]DCandidate model)
        {
            // map model to entity and set id
            var candidate = _mapper.Map<Candidate>(model);
            candidate.Id = id;

            try
            {
                // update candidate 
                _candidateService.Update(candidate);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _candidateService.Delete(id);
            return Ok();
        }
    }
}
