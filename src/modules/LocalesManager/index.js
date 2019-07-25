import React from 'react';
import { connect } from 'react-redux'
import MaterialTable from 'material-table';

import { saveTranslation, addModel, saveModel } from './actions'

class LocalesManager extends React.Component {
  state = {
    columns: [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Keyword', field: 'name' },
      { title: 'Translation', field: 'native', editable: 'onUpdate' },
      { title: 'Lexicon', field: 'lexicon', type: 'numeric' },
      { title: 'Created', field: 'created', editable: 'never', render: ({ created }) => new Date(created).toLocaleString()},
      { title: 'Updated', field: 'updated', editable: 'never', render: ({ updated }) => new Date(updated).toLocaleString() },
    ]
  }

  hasNativeChanges = (newData, oldData) => {
    return newData.native !== oldData.native
  }
  hasModelChanges = (newData, oldData) => {
    return newData.name !== oldData.name || 
      newData.lexicon !== oldData.lexicon
  }

  render() {
    
    return (
      <MaterialTable
        title="Translations"
        columns={this.state.columns}
        data={this.props.models}
        options={{
          search: false
        }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              this.props.dispatch(addModel({
                token: this.props.token,
                code: this.props.language.code,
                data: {
                  name: newData.name,
                  lexicon: newData.lexicon
                }
              }))
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              if (this.hasNativeChanges(newData, oldData)) {
                this.props.dispatch(saveTranslation({
                  code: this.props.language.code,
                  native: newData.native,
                  id: newData.id
                }))
              }
              if (this.hasModelChanges(newData, oldData)) {
                this.props.dispatch(saveModel({
                  token: this.props.token,
                  code: this.props.language.code,
                  id: newData.id,
                  data: {
                    name: newData.name,
                    lexicon: newData.lexicon
                  }
                }))
              }
              resolve();
            })
        }}
      />
    );
  }
}

export default connect(state => ({
  token: state.auth.token,
  language: state.locales.language,
  models: state.models.modelsList,
}))(LocalesManager)