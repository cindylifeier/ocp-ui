/**
 *
 * LoginStyledCard
 *
 */
import Card from '../Card/index';

const LoginStyledCard = Card.extend.attrs({
  style: {
    backgroundColor: 'rgba(242, 242, 242, 1)',
    borderWidth: '1px',
  },
})`
  width: 25%;
`;

LoginStyledCard.propTypes = {};

export default LoginStyledCard;
