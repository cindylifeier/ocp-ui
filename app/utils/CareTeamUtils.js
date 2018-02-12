import isEmpty from 'lodash/isEmpty';
import { EMPTY_STRING } from '../containers/App/constants';
import Util from './Util';

const ORGANIZATION_TYPE = 'organization';

export const getParticipantName = (participant) => {
  if (participant && participant.member && Util.equalsIgnoreCase(participant.memberType, ORGANIZATION_TYPE)) {
    return participant.memberName;
  }
  const firstName = isEmpty(participant.memberFirstName) ? EMPTY_STRING : participant.memberFirstName;
  const lastName = isEmpty(participant.memberLastName) ? EMPTY_STRING : participant.memberLastName;
  return `${firstName} ${lastName}`;
};