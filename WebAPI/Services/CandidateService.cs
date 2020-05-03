using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Helpers;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Services
{
    public interface ICandidateService
    {
        IEnumerable<Candidate> GetAll();
        Candidate GetById(int id);
        Candidate Create(Candidate candidate);
        void Update(Candidate candidate, string password = null);
        void Delete(int id);
    }

    public class CandidateService : ICandidateService
    {
        private DataContext _context;

        public CandidateService(DataContext context)
        {
            _context = context;
        }
             
        public IEnumerable<Candidate> GetAll()
        {
            return _context.Candidates;
        }

        public Candidate GetById(int id)
        {
            return _context.Candidates.Find(id);
        }

        public Candidate Create(Candidate candidate)
        {
            
            _context.Candidates.Add(candidate);
            _context.SaveChanges();

            return candidate;
        }

        public void Update(Candidate candidateParam, string password = null)
        {
            //var candidate = _context.Candidates.Find(candidateParam.Id);

            //if (candidate == null)
            //    throw new AppException("Candidate not found");

            //// update candidatename if it has changed
            //if (!string.IsNullOrWhiteSpace(candidateParam.Candidatename) && candidateParam.Candidatename != candidate.Candidatename)
            //{
            //    // throw error if the new candidatename is already taken
            //    if (_context.Candidates.Any(x => x.Candidatename == candidateParam.Candidatename))
            //        throw new AppException("Candidatename " + candidateParam.Candidatename + " is already taken");

            //    candidate.Candidatename = candidateParam.Candidatename;
            //}

            //// update candidate properties if provided
            //if (!string.IsNullOrWhiteSpace(candidateParam.FirstName))
            //    candidate.FirstName = candidateParam.FirstName;

            //if (!string.IsNullOrWhiteSpace(candidateParam.LastName))
            //    candidate.LastName = candidateParam.LastName;

            //// update password if provided
            //if (!string.IsNullOrWhiteSpace(password))
            //{
            //    byte[] passwordHash, passwordSalt;
            //    CreatePasswordHash(password, out passwordHash, out passwordSalt);

            //    candidate.PasswordHash = passwordHash;
            //    candidate.PasswordSalt = passwordSalt;
            //}

            //_context.Candidates.Update(candidate);
            //_context.SaveChanges();
        }

        public void Delete(int id)
        {
            var candidate = _context.Candidates.Find(id);
            if (candidate != null)
            {
                _context.Candidates.Remove(candidate);
                _context.SaveChanges();
            }
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}