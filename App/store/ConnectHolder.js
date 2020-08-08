import {connect} from 'react-redux';
import {
  REMOVE_ITEM_FROM_CART,
  SET_CART_ITEM_COUNT,
  LOAD_CATEGORIES,
  LOAD_PRODUCT_DETAILS,
  CLEAR_CART,
  ADD_TO_CART_ITEM,
  LOAD_PRODUCT_LIST_SUCCESS,
  LOAD_PRODUCT_DETAILS_SUCCESS,
  FILTER_ITEMS,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_PRODUCT_LIST,
} from '../reducers/rootReducer';

const mapStateToProps = (state) => {
  const {cart, storage, config} = state;
  return {
    ...storage,
    config,
    isLoading: cart.productIsLoading,
    categoriesIsLoading: cart.categoriesIsLoading,
    cart,
    productsList: cart.productsList,
    cartTotal: cart.cartTotal,
    cartItems: cart.cartItems,
  };
};

const mapDatePickerProps = (state) => {
  return {...state.date};
};

const mapConfigStateToProps = (state) => {
  const {config} = state;
  return {...config};
};

const saveEdit = (payload) => ({
  type: 'SAVE_EDIT',
  payload,
});

export const removeItem = (payload) => ({
  type: 'REMOVE_ITEM',
  payload,
});

export const showModal = (payload) => ({
  type: 'SHOW_MODAL',
  payload,
});

export const hideModal = () => ({
  type: 'HIDE_MODAL',
});

export const loadDataFromStore = () => ({
  type: 'LOAD_DATA_FROM_STORAGE_START',
});

export const setLocalStorage = (payload) => ({
  type: 'SET_LOCAL_STORAGE',
  payload,
});

export const setRemoteStorage = (payload) => ({
  type: 'SET_REMOTE_STORAGE',
  payload,
});

export const getLocalStorage = (payload) => ({
  type: 'LOAD_LOCAL_STORAGE',
  payload,
});

export const getRemoteStorage = (payload) => ({
  type: 'LOAD_REMOTE_STORAGE',
  payload,
});

export const removeProductFromCart = (payload) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload,
});

export const setCartItemCount = (payload) => ({
  type: SET_CART_ITEM_COUNT,
  payload,
});

export const addProductToCart = (payload) => ({
  type: ADD_TO_CART_ITEM,
  payload,
});

export const filterItems = (payload) => ({
  type: FILTER_ITEMS,
  payload,
});
export const clearCart = () => ({type: CLEAR_CART});

export const loadProductListStart = () => ({
  type: LOAD_PRODUCT_LIST,
});

export const loadProductListSuccess = (payload) => ({
  type: LOAD_PRODUCT_LIST_SUCCESS,
  payload,
});

export const loadProductDetails = (payload) => ({
  type: LOAD_PRODUCT_DETAILS,
  payload,
});

export const loadCategories = (payload) => ({
  type: LOAD_CATEGORIES,
  payload,
});

export const loadCategoriesSuccess = (payload) => ({
  type: LOAD_CATEGORIES_SUCCESS,
  payload,
});

export const newInvoice = (payload) => ({
  type: 'INVOICE',
  payload,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (payload) => dispatch(removeItem(payload)),
  saveEdit: (payload) => dispatch(saveEdit(payload)),
  showEditModal: (payload) => dispatch(showModal(payload)),
  hideEditModal: () => dispatch(hideModal()),
  loadDataFromStore: () => dispatch(loadDataFromStore()),
  setLocalStorage: (payload) => dispatch(setLocalStorage(payload)),
  setRemoteStorage: (payload) => dispatch(setRemoteStorage(payload)),
  getLocalStorage: () => dispatch(getLocalStorage()),
  getRemoteStorage: () => dispatch(getRemoteStorage()),
  newInvoice: (payload) => dispatch(newInvoice(payload)),
  removeProductFromCart: (payload) => dispatch(removeProductFromCart(payload)),
  setCartItemCount: (payload) => dispatch(setCartItemCount(payload)),
  addProductToCart: (payload) => dispatch(addProductToCart(payload)),
  clearCart: () => dispatch(clearCart()),
  loadCategories: () => dispatch(loadCategories()),
  loadCategoriesSuccess: (payload) => dispatch(loadCategoriesSuccess(payload)),
  loadProductListStart: () => dispatch(loadProductListStart()),
  loadProductListSuccess: (payload) =>
    dispatch(loadProductListSuccess(payload)),
  setConfig: (payload) => dispatch({type: 'SET_CONFIG', payload}),
  loadConfig: () => dispatch({type: 'LOAD_CONFIG'}),
});

const mapConfigDispatchToProps = (dispatch) => ({
  setConfig: (payload) => dispatch({type: 'SET_CONFIG', payload}),
  loadConfig: () => dispatch({type: 'LOAD_CONFIG'}),
});

const mapDatePickerDispatch = (dispatch) => ({
  setDate: (payload) => dispatch({type: 'SET_DATE', payload}),
  setStartDate: (payload) => dispatch({type: 'SET_START_DATE', payload}),
  setEndDate: (payload) => dispatch({type: 'SET_END_DATE', payload}),
  setMaxDate: (payload) => dispatch({type: 'SET_MAX_DATE', payload}),
  setMinDate: (payload) => dispatch({type: 'SET_MIN_DATE', payload}),
});

export const connectToStore = (WrappedComponent) =>
  connect(
    (state) => mapStateToProps(state),
    mapDispatchToProps,
  )(WrappedComponent);

export const connectDatePickerToStore = (WrappedComponent) =>
  connect(
    (state) => mapDatePickerProps(state),
    mapDatePickerDispatch,
  )(WrappedComponent);

export const connectConfigToStore = (WrappedComponent) =>
  connect(
    (state) => mapConfigStateToProps(state),
    mapConfigDispatchToProps,
  )(WrappedComponent);
