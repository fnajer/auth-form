import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { chooseLanguage } from '../../actions'
import { loadModelsList } from 'modules/LocalesManager/actions'
  
class LanguageSelector extends Component {

  handleChange = event => {
    const language = this.props.languagesList.find(lang => (
      lang === event.target.value
    ))

    this.props.dispatch(chooseLanguage(language))
    if (this.props.token && this.props.language.code) {
      this.props.dispatch(loadModelsList({
        code: language.code
      }))
    }
  }

  render() {
    return (
      <>
        <FormControl>
          <Select
            value={this.props.language}
            onChange={this.handleChange}
            displayEmpty
            name="languages"
          >
            {this.props.languagesList.map(lang => (
              <MenuItem 
                key={lang.code}
                active={(lang === this.props.language).toString()}
                value={lang}
              >
                {lang.native}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }
}

export default connect(state => ({ 
  languagesList: state.locales.languagesList,
  language: state.locales.language,
  token: state.auth.token
})
)(LanguageSelector);


