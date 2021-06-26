using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
       public AccountController(DataContext context,ITokenService tokenService)
       {
           _context = context;
           _tokenService = tokenService;
       } 

       [HttpPost("register")]
       public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
       {
           if(await UserNameExists(registerDTO.UserName)) return BadRequest("Username is Taken");
           using var hmac = new HMACSHA512();
          var user = new AppUser{
              UserName = registerDTO.UserName,
              PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
              PasswordSalt = hmac.Key
          };
          _context.Users.Add(user);
          await _context.SaveChangesAsync();

          return new UserDTO{
              UserName = user.UserName,
              Token = _tokenService.CreateToken(user)
          };
       }

       [HttpPost("login")]
       public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
       {
           var user =await  _context.Users.SingleOrDefaultAsync(u=>u.UserName==loginDTO.UserName.ToLower());
           if(user == null) return Unauthorized("Invalid username");

           using var hmac = new HMACSHA512(user.PasswordSalt);
           var password = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

           for(int k=0;k<password.Length;k++){
               if(user.PasswordHash[k]!=password[k]) return Unauthorized("Password Incorrect");
           }
              return new UserDTO{
              UserName = user.UserName,
              Token = _tokenService.CreateToken(user)
          };
       }

       private async Task<bool> UserNameExists(string UserName)
       {
           return await _context.Users.AnyAsync(u=>u.UserName==UserName.ToLower());
       }
    
    }
}