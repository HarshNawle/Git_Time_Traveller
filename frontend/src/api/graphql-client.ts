import axios from "axios";

const GRAPHQL_URL =
  import.meta.env.VITE_API_URL + "/graphql";

export async function graphqlRequest<
  TData,
  TVariables = Record<string, unknown>
>(
  query: string,
  variables?: TVariables
): Promise<TData> {
  const response = await axios.post<{
    data: TData;
    errors?: Array<{
      message: string;
    }>;
  }>(
    GRAPHQL_URL,
    {
      query,
      variables,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  if (response.data.errors?.length) {
    throw new Error(
      response.data.errors[0].message
    );
  }

  return response.data.data;
}