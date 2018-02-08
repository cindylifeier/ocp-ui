import isEmpty from 'lodash/isEmpty';
import { EMPTY_STRING } from '../containers/App/constants';
import Util from './Util';

const ORGANIZATION_TYPE = 'organization';

export const getParticipantName = (participant) => {
  if (participant && participant.member && Util.equalsIgnoreCase(participant.member.type, ORGANIZATION_TYPE)) {
    return participant.member.name;
  }
  const firstName = isEmpty(participant.member.firstName) ? EMPTY_STRING : participant.member.firstName;
  const lastName = isEmpty(participant.member.lastName) ? EMPTY_STRING : participant.member.lastName;
  return `${firstName} ${lastName}`;
};
