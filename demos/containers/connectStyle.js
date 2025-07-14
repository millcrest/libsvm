import { connect } from 'react-redux';

const mapStateToProps = (state) => state.style;

export default connect(mapStateToProps);
