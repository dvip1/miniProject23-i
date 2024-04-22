import { increaseCredit, decreaseCredit } from '../slices/totalCreditSlice';

type DispatchType = (arg: { type: string; payload?: any }) => void;

const buySell = (amount: number, buy: boolean, dispatch: DispatchType) => {
  if (buy) {
    dispatch(decreaseCredit(amount));
  } else {
    dispatch(increaseCredit(amount));
  }
};

export default buySell;