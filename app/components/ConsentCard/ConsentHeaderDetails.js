import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import teal from 'material-ui-next/colors/teal';
import Avatar from 'material-ui-next/Avatar';
import upperFirst from 'lodash/upperFirst';

import TextLabelGroup from 'components/TextLabelGroup';
import StyledChip from 'components/StyledChip';
import messages from './messages';

function ConsentHeaderDetails(props) {
  const { medicalInformation, purpose } = props;
  return (
    <div>
      {medicalInformation &&
      <TextLabelGroup
        boldText={false}
        label={<FormattedMessage {...messages.consentCardHeader.medicalInfoLabel} />}
        text={
          medicalInformation.map((info) => (
            <StyledChip
              key={info.code}
              label={upperFirst(info.display)}
              avatar={
                <Avatar>
                  <CheckCircleIcon color={teal['500']} />
                </Avatar>
              }
            />
          ))
        }
      />
      }
      {purpose &&
      <TextLabelGroup
        boldText={false}
        label={<FormattedMessage {...messages.consentCardHeader.purposeLabel} />}
        text={
          purpose.map((pou) => (
            <StyledChip
              key={pou.code}
              label={upperFirst(pou.display)}
              avatar={
                <Avatar>
                  <CheckCircleIcon color={teal['500']} />
                </Avatar>
              }
            />
          ))
        }
      />
      }
    </div>
  );
}

ConsentHeaderDetails.propTypes = {
  medicalInformation: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  purpose: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
};

export default ConsentHeaderDetails;
