import axios from 'axios';
import { useCallback } from "react";

export const useHttp = () => {
  const dataCurrency = useCallback(async (url: string) => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      alert('Помилка сервера');
      console.error(error)
    }
  }, []);

  return { dataCurrency }
}
