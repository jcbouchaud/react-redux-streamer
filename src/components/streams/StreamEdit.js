import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
  }

  onSubmit = formValues => {
    // console.log(formValues);
    const { id } = this.props.match.params;
    this.props.editStream(id, formValues);
  };

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading ...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* _.pick helps to only pass the keys we want to, in order to get no error from backend for example, as if we send the entire object, some keys will not be required */}
        <StreamForm
          initialValues={_.pick(stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
