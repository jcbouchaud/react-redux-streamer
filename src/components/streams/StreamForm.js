import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  renderError = meta => {
    if (meta.touched && meta.error) {
      return (
        <div className="ui error message">
          <div className="header">{meta.error}</div>
        </div>
      );
    }
  };

  renderInput = formProps => {
    // Can be destructured as {...input}
    const className = `field ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input autoComplete="off" {...formProps.input} />
        <div>{this.renderError(formProps.meta)}</div>
      </div>
    );
  };

  onSubmit = formValues => {
    // no need e.preventdefault as handleSubmit handles it
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div>
        <form
          // handleSubmit is a callback function provided by the component itself
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form"
        >
          <Field
            name="title"
            component={this.renderInput}
            label={"Enter Title"}
          />
          <Field
            name="description"
            component={this.renderInput}
            label={"Enter Description"}
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({ form: "streamForm", validate: validate })(
  StreamForm
);

// clean way to export several actions
// const formWrapped = reduxForm({ form: "streamCreate", validate: validate })(
//     StreamCreate
//   );

//   export default connect(
//     null,
//     { createStream }
//   )(formWrapped);
