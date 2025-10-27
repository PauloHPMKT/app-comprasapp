import { reactive } from "vue";
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

export const usePurchaseList = () => {
  function fillCurrentProduct(item: Purchases.Item) {
    const price = FormatPrice.toBRLAsNumber(item.price);
    const quantity = Number(item.quantity);
    const totalItemPrice = price * quantity;

    const product = {
      name: item.name,
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

  return {
    currentProduct,
    purchaseItems,
    fillCurrentProduct,
    addProductToList
  };
}
