import PropTypes from 'prop-types';

export const ErrorMsg = ({ msg }) => {
  return <section className="text-sm text-red-700 mt-1.5" role="alert">{msg}</section>;
};

ErrorMsg.propTypes = {
  msg: PropTypes.string.isRequired
}