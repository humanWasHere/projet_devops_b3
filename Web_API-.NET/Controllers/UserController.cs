using Microsoft.AspNetCore.Mvc;
using WebApiDevSysOps.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebApiDevSysOps.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DevsysopsContext _dbContext;

        public UserController(DevsysopsContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _dbContext.Users.ToListAsync();
            var Users = new List<User>();
            foreach (var user in users)
            {
                Users.Add(new User
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Username = user.Username,
                    Password = user.Password,
                    EnrollmentDate = user.EnrollmentDate
                });
            }
            return Ok(Users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var User = new User
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.Username,
                Password = user.Password,
                EnrollmentDate = user.EnrollmentDate
            };
            return Ok(User);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User User)
        {
            var user = new User
            {   
                FirstName = User.FirstName,
                LastName = User.LastName,
                Username = User.Username,
                Password = User.Password,
                EnrollmentDate = User.EnrollmentDate
            };
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, User);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User User)
        {
            if (id != User.Id)
            {
                return BadRequest();
            }
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user.FirstName = User.FirstName;
            user.LastName = User.LastName;
            user.Username = User.Username;
            user.Password = User.Password;
            user.EnrollmentDate = User.EnrollmentDate;
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
