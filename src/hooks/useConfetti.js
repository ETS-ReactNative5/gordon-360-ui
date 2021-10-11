import { ConfettiContext } from 'contexts/ConfettiContext';
import createUseContext from './createUseContext';

/**
 * Subscribe to user info.
 */
const useConfetti = createUseContext('Confetti', ConfettiContext);
export default useConfetti;
