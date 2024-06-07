export async function onDelete(slug: string) {

  const response = await fetch(`https://api.restful-api.dev/objects/${slug}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    const res = await response.json();
    return res

}