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
  padding: 10px;
  margin: 4vh auto;
`;

LoginStyledCard.propTypes = {};

export default LoginStyledCard;
