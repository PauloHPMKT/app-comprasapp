import { reactive, ref } from "vue";
import type { Purchases } from "../types/purchases";
import { FormatPrice } from "../helpers/formatPrice";
import { useToast } from "./useToast";

const { addToast } = useToast();

const currentProduct = reactive<Purchases.Item>({
  name: '',
  quantity: 1,
  price: 0,
  category: {
    name: '',
    color: '',
    emoji: ''
  },
  observation: '',
  totalItemPrice: 0,
});
const purchaseItems = reactive<Purchases.Item[]>([]);
const observationDescription = ref<string>('');
const editingItemId = ref<number | null>(null);

export const usePurchaseList = () => {
  function fillCurrentProduct(item: Purchases.Item) {
    const price = FormatPrice.toBRLAsNumber(item.price);
    const quantity = Number(item.quantity);
    const totalItemPrice = price * quantity;

    const product = {
      name: item.name,
      orderId: purchaseItems.length + 1,
      quantity,
      price,
      category: item.category && { ...item.category },
      observation: item.observation,
      totalItemPrice,
    }

    Object.assign(currentProduct, product);
    return currentProduct;
  }

  function addProductToList() {
    if (currentProduct) {
      purchaseItems.push({ ...currentProduct });
      addToast({
        id: Date.now().toString(),
        message: `O item "${currentProduct.name}" foi adicionado à lista!`,
        type: 'success',
        duration: 2000,
      });
    }
  }

  function addObservationToCurrentProduct() {
    const description = observationDescription.value;

    // adicionando uma observação a um item já existente na lista
    // const itemIndex = purchaseItems.findIndex(item => item.orderId === currentProduct.orderId);
    // if (itemIndex !== -1) {
    //   console.log('adding observation to existing item', currentProduct, purchaseItems);
    //   console.log('itemIndex', itemIndex);
    //   purchaseItems[itemIndex].observation = description;
    //   return;
    // }

    // adicionando uma observação a um item que está sendo adicionado a lista
    currentProduct.observation = description;
  }

  function cleanObservationInput() {
    observationDescription.value = "";
  }

  return {
    currentProduct,
    purchaseItems,
    observationDescription,
    editingItemId,
    fillCurrentProduct,
    addProductToList,
    addObservationToCurrentProduct,
    cleanObservationInput,
  };
}
