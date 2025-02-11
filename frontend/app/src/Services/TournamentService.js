import axios from "axios";
import { useState} from "react";

const API_BASE_URL = "/broker";

export function GetAllTournaments() {
  return axios.get(`${API_BASE_URL}/tournaments`)
    .then(response => response.data)
    .catch(error => console.error(error));
}

export function CreateTournament(tournamentData) {
  return axios
    .post(`${API_BASE_URL}/tournaments`, tournamentData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function UpdateTournament(tournamentData) {
  return axios
    .put(
      `${API_BASE_URL}/tournaments/${tournamentData.tournamentID}`,
      tournamentData
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function RemoveTournament(tournamentID) {
  return axios
    .delete(`${API_BASE_URL}/tournaments/${tournamentID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function AddParticipant(tournamentID, participant) {
  return axios
    .post(
      `${API_BASE_URL}/tournaments/${tournamentID}/participants`,
      participant
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function RemoveParticipant(tournamentID, participant) {
  axios
    .delete(
      `${API_BASE_URL}/tournaments/${tournamentID}/participants/${participant}`
    )
    .catch((error) => {
      console.error(error);
    });
}

export function NextRound(tournamentID) {
  const [nextRound, setNextRound] = useState(0);
  axios
    .get(`${API_BASE_URL}/tournaments/${tournamentID}/nextRound`)
    .then((response) => {
      setNextRound(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  return nextRound;
}
