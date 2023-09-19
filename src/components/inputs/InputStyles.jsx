import PropTypes from 'prop-types';
import './inputs.css';

export const InputWrap = ({ children }) => {
    return (
        <section className="w-full flex flex-col mb-5 relative custom-input-wrap">
            { children }
        </section>
    )
};

InputWrap.propTypes = {
    children: PropTypes.node
  }

// eslint-disable-next-line react-refresh/only-export-components
export const labelStyling = {
    marginBottom: '5px',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '15px',
    display: 'flex',
    width: '100%',
}