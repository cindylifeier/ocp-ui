import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import ArrowFowardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import StyledIconButton from 'components/StyledIconButton';
import { Cell, Grid } from 'styled-css-grid';
import StyledListItem from './StyledListItem';
import StyledList from './StyledList';
import PermissionAddButtonsSection from './PermissionAddButtonsSection';

function PermissionsList(props) {
  const {
    scopes,
  } = props;
  return (
    <div>
      <Grid columns={5}>
        <Cell row={1} width={2}>
          <Subheader>Permissions</Subheader>
          <StyledList defaultValue={1}>
            {scopes && scopes.map((scope) => (
              <StyledListItem
                key={scope.id}
                primaryText={scope.description}
              />))
            }
          </StyledList>
        </Cell>
        <Cell row={1} width={1}>
          <PermissionAddButtonsSection>
            <Grid columns={1}>
              <StyledIconButton svgIconSize="large">
                <ArrowFowardIcon />
              </StyledIconButton>
              <StyledIconButton svgIconSize="large">
                <ArrowBackIcon />
              </StyledIconButton>
            </Grid>
          </PermissionAddButtonsSection>
        </Cell>
        <Cell row={1} width={2}>
          <Subheader>Added Permissions</Subheader>
          <StyledList defaultValue={1}>
          </StyledList>
        </Cell>
      </Grid>
    </div>
  );
}

PermissionsList.propTypes = {
  scopes: PropTypes.array,
};

export default PermissionsList;
