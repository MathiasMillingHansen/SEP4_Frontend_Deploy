using Microsoft.AspNetCore.Mvc;
using SharedObjects.Models;
using Broker.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Broker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrokerController : ControllerBase
    {
        private IBrokerService _brokerService;

        public BrokerController(IBrokerService brokerService)
        {
            _brokerService = brokerService;
        }

        [HttpGet("GetSensorData/{hallId}")]
        public async Task<ActionResult<List<SensorData>>> GetSensorData(int hallId)
        {
            var result = await _brokerService.GetSensorData(hallId);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("GetSensorData/{hallId}/{limit}")]
        public async Task<ActionResult<List<SensorData>>> GetSensorData(int hallId, int limit, [FromHeader(Name = "Authorization")] string bearerToken)
        {
            string token = bearerToken.Substring("Bearer ".Length);
            var result = await _brokerService.GetLimitedSensorData(hallId, limit, token);
            if (result == null)
            {
                return NoContent();
            }
            return Ok(result);
        }

        [HttpGet("tournaments")]
        public async Task<IActionResult> GetTournaments()
        {
            var result = await _brokerService.GetTournaments();
            if (result?.Value == null)
            {
                return NoContent();
            }
            return Ok(result.Value);
        }

        // Corresponds to CreateTournament
        [HttpPost("tournaments")]
        public async Task<ActionResult<Tournament>> CreateTournament(Tournament tournamentData)
        {
            return await _brokerService.CreateTournament(tournamentData);
        }

        // Corresponds to UpdateTournament
        [HttpPut("tournaments/{tournamentID}")]
        public async Task<ActionResult<Tournament>> UpdateTournament(string tournamentID, Tournament tournamentData)
        {
            return await _brokerService.UpdateTournament(tournamentID, tournamentData);
        }

        // Corresponds to RemoveTournament
        [HttpDelete("tournaments/{tournamentID}")]
        public async Task<ActionResult> DeleteTournament(string tournamentID)
        {
            return await _brokerService.DeleteTournament(tournamentID);
        }

        // Corresponds to AddParticipant
        [HttpPost("tournaments/{tournamentID}/participants")]
        public async Task<ActionResult<string>> AddParticipant(string tournamentID, string participant)
        {
            return await _brokerService.AddParticipant(tournamentID, participant);
        }

        // Corresponds to RemoveParticipant
        [HttpDelete("tournaments/{tournamentID}/participants/{participant}")]
        public async Task<ActionResult> RemoveParticipant(string tournamentID, string participant)
        {
            return await _brokerService.RemoveParticipant(tournamentID, participant);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] JObject user)
        {
            var result = await _brokerService.Login(user);
            return Content(result, "application/json");
        }

        [HttpGet("superUsers")]
        public async Task<IActionResult> FetchSuperUsers()
        {
            var result = await _brokerService.FetchSuperUsers();
            return Content(result, "application/json");
        }

        [HttpGet("nonSuperUsers")]
        public async Task<IActionResult> FetchNonAdminUsers()
        {
            var result = await _brokerService.FetchNonAdminUsers();
            return Content(result, "application/json");
        }

        [HttpPut("adjustUserPermissions/{usersToChange}")]
        public async Task<IActionResult> AdjustUserPermissions(string usersToChange)
        {
            var result = await _brokerService.AdjustUserPermissions(usersToChange);
            return Content(result, "application/json");
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] JObject user)
        {
            var result = await _brokerService.RegisterUser(user);
            return new StatusCodeResult((int)result);
        }

        [HttpGet("getallusers")]
        public async Task<IActionResult> GetAllUsers([FromHeader(Name = "Authorization")] string bearerToken)
        {
            string token = bearerToken.Substring("Bearer ".Length);
            var result = await _brokerService.GetAllUsers(token);
            return Content(result.ToString(), "application/json");
        }


    }
}