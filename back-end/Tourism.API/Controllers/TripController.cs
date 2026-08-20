using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tourism.Application.DTO.Question;
using Tourism.Application.DTO.Trip;
using Tourism.Application.Feature.Contact;
using Tourism.Application.Feature.Trip.Command.AddTrip;
using Tourism.Application.Feature.Trip.Command.EditTrip;
using Tourism.Application.Feature.Trip.Command.RemoveTrip;
using Tourism.Application.Feature.Trip.Query.GetAllTrips;
using Tourism.Application.Feature.Trip.Query.GetTripById;
using Tourism.Domain.Shared.Bases;

namespace Tourism.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController(IMediator mediator) : ControllerBase
    {

        [HttpPost]
        public async Task<ActionResult<Response<string>>> AddTripAsync([FromForm] AddTripRequest request)
        {
            var response = await mediator.Send(new AddTripCommand(request));
            return StatusCode((int)response.StatusCode, response);
        }
        [HttpPost("contact")]
        public async Task<ActionResult<Response<string>>> AddTripAsync([FromBody] ContactRequest request)
        {
            var response = await mediator.Send(new ContactCommand(request.Name, request.Phone, request.Email, request.Service, request.Message));
            return StatusCode((int)response.StatusCode, response);
        }
        [HttpDelete("{Id:int}")]
        public async Task<ActionResult<Response<string>>> DeleteTripAsync([FromRoute] int Id)
        {
            var response = await mediator.Send(new RemoveTripCommand(Id));
            return StatusCode((int)response.StatusCode, response);
        }
        [HttpGet("all")]
        public async Task<ActionResult<Response<List<GetTripResponse>>>> GetAllTripAsync()
        {
            var response = await mediator.Send(new GetAllTripQuery());
            return StatusCode((int)response.StatusCode, response);
        }
        [HttpGet("{Id:int}")]
        public async Task<ActionResult<Response<GetTripResponse>>> GetTripByIdAsync([FromRoute] int Id)
        {
            var response = await mediator.Send(new GetTripByIdQuery(Id));
            return StatusCode((int)response.StatusCode, response);
        }
        [HttpPut("{Id:int}")]
        public async Task<ActionResult<Response<string>>> EditTripAsunc([FromRoute] int Id,[FromForm] EditTripRequest request)
        {
            var response = await mediator.Send(new EditTripCommand(Id, request));
            return StatusCode((int)response.StatusCode, response);
        }
    }
}
