import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { increaseCredit, decreaseCredit } from '../slices/totalCreditSlice';

export default function BuySell(amount: number, buy: boolean) {
    const dispatch = useDispatch();
    const credit = useSelector((state: RootState) => state.credit.credit);

    if (buy) {
        if (credit >= amount) {
            dispatch(decreaseCredit(amount));
        } else {
            console.log('Not enough credit to buy');
        }
    } else {
        dispatch(increaseCredit(amount));
        console.log(credit);
    }
}