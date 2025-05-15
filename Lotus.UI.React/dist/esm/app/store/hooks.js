import { useDispatch, useSelector } from 'react-redux';
export const useAppDispatchCore = useDispatch.withTypes();
export const useAppSelectorCore = useSelector.withTypes();
