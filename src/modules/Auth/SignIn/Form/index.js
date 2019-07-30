import React from 'react';
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import { FORM_ERROR } from 'final-form'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { TextField } from 'shared/components/Input';

import performSignIn from '../requests'
import { saveAuthInfo } from 'modules/Auth/actions'
import { loadModelsList } from 'modules/LocalesManager/actions'

class SignInForm extends React.Component {
  onSubmit = async values => {
    try {
      const response = await performSignIn(values)

      this.props.dispatch(saveAuthInfo(response))
      this.props.dispatch(loadModelsList({
        code: this.props.language.code
      }))

      this.props.history.push('/')
    } catch (e) {
      console.log(e)
      if (e.response.status >= 500) {
        return {
          [FORM_ERROR]: (
            <p>Sorry. Its internalServerError</p>
          ),
        }
      }

      return {
        [FORM_ERROR]: (
          <p>Sorry. Its incorrectLoginPass</p>
        ),
      }
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Form
          onSubmit={this.onSubmit}
          render={({
            handleSubmit,
            submitting,
            submitSucceeded,
            submitError,
            dirtySinceLastSubmit,
          }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                autoComplete="current-username"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              {!submitting &&
              !submitSucceeded &&
              submitError &&
              !dirtySinceLastSubmit ? (
                <div className={classes.submitError}>{submitError}</div>
              ) : null}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={submitting}
              >
                Sign In
              </Button>
            </form>
          )}
        />
    );
  }
}

export default withRouter(connect(state => ({
  language: state.locales.language,
}))(SignInForm));