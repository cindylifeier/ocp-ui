/**
 *
 * TodoCardHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import StyledToDoCardHeader from 'components/ToDoCardHeader/StyledToDoCardHeader';
import ToDoCardGrid from 'components/ToDoCardGrid';
import ToDoCardCell from 'components/ToDoCardCell';
import { Cell, Grid } from 'styled-css-grid';
import Align from 'components/Align';


function ToDoCardHeader(props) {
  const { dueDateStr, patientName } = props;
  return (
    <StyledToDoCardHeader>
      <ToDoCardGrid column={12}>
        <ToDoCardCell top={1} left={1} width={12}>
          <Grid columns="6fr 6fr" gap="">
            <Cell>
              <strong>
                {dueDateStr}
              </strong>
            </Cell>
            <Cell>
              <Align variant="right">
                <strong>{patientName}</strong>
              </Align>
            </Cell>
          </Grid>
        </ToDoCardCell>
      </ToDoCardGrid>
    </StyledToDoCardHeader>
  );
}

ToDoCardHeader.propTypes = {
  dueDateStr: PropTypes.string.isRequired,
  patientName: PropTypes.string,
};

export default ToDoCardHeader;
