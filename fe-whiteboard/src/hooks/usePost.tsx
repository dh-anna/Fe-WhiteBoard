import { useState } from "react";
import axios from "axios";

export const usePost = <Req extends any, Res extends any>(
  url: string,
): [
  (body: Req) => void,
  { data: Res | null; loading: boolean; error: any },
] => {
  const [data, setData] = useState<Res | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchFunction = async (body: Req) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await axios.post(url, body);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [fetchFunction, { data, loading, error }];
};
