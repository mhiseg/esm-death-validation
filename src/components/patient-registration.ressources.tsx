import useSWR from 'swr';
import { openmrsFetch, useConfig, openmrsObservableFetch, refetchCurrentUser, getCurrentUser, navigate, useSession } from '@openmrs/esm-framework';

import { Patient, Relationships, PatientIdentifier, Person, Encounter, Concept, ObsFetchResponse, UsePatientPhotoResult, Address, relationshipType } from './patient-registration-types';
import { mergeMap } from 'rxjs/operators';
import { uuidPhoneNumber, encounterTypeCheckIn, unknowLocation, countryName, originCauseUuid, secondaryCauseUuid, maritalStatusConcept, habitatConcept, occupationConcept } from './constants';
import { usePatient } from './usePatient';

const BASE_WS_API_URL = '/ws/rest/v1/';
const BASE_FHIR_API_URL = '/ws/fhir2/R4/';

export const getConceptAnswer = (concept, setQuestion) => {
  setQuestion(concept.display)
  return (concept.answers).map(answer => {
    return ({ uuid: answer.uuid, name: answer.display, display: answer.display })
  })
}

export function fetchRelationships(patientUuid) {
  if (patientUuid) {
    return openmrsFetch(`${BASE_WS_API_URL}relationship?v=full&person=${patientUuid}`, { method: 'GET' });
  }
  return Promise.resolve(null);
}

export async function fetchObsByPatientAndEncounterType(patientUuid: string, encounterType: string) {
  if (patientUuid && encounterType) {
    let observations = [];
    const encounter = await openmrsFetch(`${BASE_WS_API_URL}encounter?patient=${patientUuid}&encounterType=${encounterType}&v=default`, { method: 'GET' });
    let concepts = encounter.data.results[(encounter.data.results?.length) - 1]?.obs;
    if (concepts) {
      await Promise.all(concepts.map(async concept => {
        const obs = await getObs(concept.links[0]?.uri)
        observations.push({ concept: obs?.data?.concept, answer: obs?.data?.value })
      }))
    }
    return observations;
  }
  return Promise.resolve(null);
}

export function fetchPatient(patientUuid) {
  if (patientUuid) {
    return openmrsFetch(`${BASE_WS_API_URL}patient/${patientUuid}?v=full&lang=${localStorage.getItem("i18nextLng")}`, { method: 'GET' });
  }
  return Promise.resolve(null);
}


export function formatRelationship(values): relationshipType[] {
  if (values.length > 0) {
    return (values.map(value => {
      return {
        relationUuid: value?.uuid,
        personUuid: value?.personB?.uuid,
        givenName: value?.personB?.display.split(" ")[0],
        familyName: value?.personB?.display.split(" ")[1],
        contactPhone: value?.personB?.attributes[0]?.display.split(" = ")[1],
        type: value?.relationshipType?.uuid
      }
    }))
  }
  return [{ relationUuid: '', personUuid: '', givenName: '', familyName: '', contactPhone: '', type: '' }];
}

export function getObs(path: string) {
  return openmrsFetch(`${BASE_WS_API_URL + path.split(BASE_WS_API_URL)[1]}?lang=${localStorage.getItem("i18nextLng")}`, { method: 'GET' });
}



export async function fetchConceptByUuid(conceptUuid: string, lang: string) {
  return openmrsFetch(`${BASE_WS_API_URL}concept/${conceptUuid}?v=full&lang=${lang}`, {
    method: "GET",
  });
}

export function getSynchronizedCurrentUser(opts: any) {
  return getCurrentUser(opts).pipe(
    mergeMap(async user => {
      return user;
    }),
  );
}
export function getCurrentSession() {
  return openmrsObservableFetch(`/ws/rest/v1/session`);
}

export function formAddres(address): Address {
  if (address) {
    if (typeof address === "string")
      return { country: countryName, stateProvince: address.split(", ")[1], cityVillage: address.split(", ")[0], address1: "", display: address }
    else
      return { country: address.country, stateProvince: address.stateProvince, cityVillage: address.cityVillage, address1: address.address1, display: address.cityVillage + " ," + address.stateProvince }
  }
  else {
    return null;
  }
}
export function validatePerson(abortController: AbortController, person, uuid: string) {
  return openmrsFetch(`/ws/rest/v1/person/${uuid}`, {
    method: 'POST',
    body: person,
    headers: { 'Content-Type': 'application/json' },
    signal: abortController.signal
  });
}

const formatConcept = (concepts, uuid) => {
  let value;
  concepts?.map((concept) => (concept?.concept?.uuid == uuid) && (value = concept?.answer?.display))
  return value;
}
export async function fetchRelationshipType() {
  return openmrsFetch(`${BASE_WS_API_URL}relationshiptype`, {
    method: "GET",
  });
}

export const formatPatient =  (patient,obs) => {

  const formatAttribute = (item) =>
    item?.map((identifier) => {
      return {
        type: identifier?.display.split(" = ")[0].trim(),
        value: identifier?.display.split(" = ")[1].trim(),
      };
    });
  const identities = formatAttribute(patient?.identifiers);
  const personAttributes = formatAttribute(patient?.person?.attributes);
  return {
    id: patient?.uuid,
    identify: identities?.find(
      (identifier) => identifier.type == "CIN" || identifier.type == "CIN"
    )?.value,
    No_dossier: identities?.find(
      (identifier) => identifier.type == "OpenMRS ID"
    )?.value,
    firstName: patient?.person?.names?.[0]?.familyName,
    lastName: patient?.person?.names?.[0]?.givenName,
    birth: patient?.person?.birthdate?.split("T")?.[0],
    residence: displayResidence(patient?.person?.addresses[0]),
    phoneNumber: personAttributes?.find(
      (attribute) => attribute.type == "Telephone Number"
    )?.value,
    gender: checkUndefined(patient?.person?.gender),
    birthplace: personAttributes?.find((attribute) => attribute.type == "Birthplace")?.value,
    death: patient?.person?.dead,
    occupation: formatConcept(obs, occupationConcept),
    matrimonial: formatConcept(obs, maritalStatusConcept),
    habitat: formatConcept(obs, habitatConcept),

    causeOfDeath: patient?.person?.causeOfDeath?.display,
    deathDate: patient?.person?.deathDate,
    initialCause: personAttributes?.find((attribute) => attribute.type == "Initial Cause Of Death")?.value,
    secondaryCause: personAttributes?.find((attribute) => attribute.type == "Secondary Cause Of Death")?.value
  }
};

const displayResidence = (addresses) => {
  if (addresses && addresses.country && addresses.cityVillage) {
    return (
      (addresses.address1 ? addresses.address1 + ", " : "") +
      addresses.cityVillage +
      ", " +
      addresses.country
    );
  }
};
const checkUndefined = (value) => {
  return value !== null || value !== undefined ? value : "";
};




export function performLogin(username, password) {
  const token = window.btoa(`${username}:${password}`);
  return openmrsFetch(`/ws/rest/v1/session`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  }).then((res) => {
    // refetchCurrentUser();
    return res;
  });
}

