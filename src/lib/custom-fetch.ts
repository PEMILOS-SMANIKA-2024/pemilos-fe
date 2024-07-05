export const customFetch = async (route: string, options: RequestInit) => {
  const response = await fetch(`${process.env.API_URL}${route}`, options)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
