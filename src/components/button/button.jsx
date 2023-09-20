import PropTypes from 'prop-types';

export const ButtonHoverDark = ({text, handleClick}) => {
    return (
        <button 
            className="bg-transparent mt-2 hover:bg-black text-black font-semibold hover:text-white py-2 px-6 border border-black hover:border-transparent rounded"
            onClick={handleClick}
        >
            {text}
        </button>
    )
};

ButtonHoverDark.propTypes = {
    text: PropTypes.node.isRequired,
    handleClick: PropTypes.func
}