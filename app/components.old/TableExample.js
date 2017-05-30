import React, { Component } from 'react';

import {Table, Column, Cell} from 'fixed-data-table';
import {filterForms} from '../lib/utils';
import ImageAnswer from './ImageAnswer.js';

export default class TableExample extends Component {
  filterResponses() {
    let forms = this.props.forms;
    let formsFiltered = this.props.filters.length > 0 ? filterForms(forms, this.props.filters) : forms;

    return formsFiltered;
  }
  render() {
    const formResponses = this.filterResponses();
    return (
      <div className='table-centered'>
        <Table
          rowsCount={formResponses.length}
          rowHeight={50}
          headerHeight={50}
          width={1000}
          height={500}
          >
          <Column
            header={<Cell>Nombre del punto de venta</Cell>}
            cell={props => (
              <Cell {...props}>
                {formResponses[props.rowIndex].name}
              </Cell>
            )}
            width={200}
          />
          {this.props.questions
              .map(ques => {
                return (
                  <Column
                    header={<Cell>{ques.Text}</Cell>}
                    cell={props => (
                      <Cell {...props}>
                        {formResponses[props.rowIndex].questions
                          .filter(question => question.Id === ques.Id)
                          .map(q => {
                            switch(q.Type) {
                              case 'FT':
                                return q.FreeText;
                              case 'MO':
                                return q.SelectedOptionName;
                              case 'YN':
                                return q.YesNoValue ? 'Sí' : 'No';
                              case 'CAM':
                                return q.ImageBase64 ? <ImageAnswer question={q} /> : 'Sin imagen';
                            }
                          })
                        }
                      </Cell>
                    )}
                    width={200}
                  />
                  )
              })}
          
        </Table>
      </div>
    )
  }

}