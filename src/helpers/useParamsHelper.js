import { useParams } from "react-router-dom";

export default function useParamsHelper(num) {
  const params = useParams()

  return params['*'].split('/')[num]
}