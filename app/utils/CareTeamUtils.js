

const ORGANIZATION_TYPE = 'organization';

export const getParticipantName = (participant) => {
  if (participant && participant.member && participant.member.type === ORGANIZATION_TYPE) {
    return participant.member.name;
  }
  return participant.member.firstName.concat(' ').concat(participant.member.lastName);
};
