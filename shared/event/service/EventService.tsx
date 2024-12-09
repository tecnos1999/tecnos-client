import ApiServer from "@/shared/system/service/ApiServer";
import EventDTO from "../dto/EventDTO";

class EventService extends ApiServer {


  getEventByCode = async (eventCode: string): Promise<EventDTO> => {
    const response = await this.api<null, any>(
      `/events/${eventCode}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as EventDTO;
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to fetch event"
      );
    }
  };

  getAllEvents = async (): Promise<EventDTO[]> => {
    const response = await this.api<null, any>(
      `/events`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as EventDTO[];
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to fetch events"
      );
    }
  };
}

export default EventService;
