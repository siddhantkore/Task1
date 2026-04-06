const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    let message = 'Something went wrong while fetching data.'

    try {
      const payload = await response.json()
      message = payload.message || message
    } catch {
      message = `${message} (${response.status})`
    }

    throw new Error(message)
  }

  return response.json()
}

export function getCategoryInsights() {
  return request('/insights/categories')
}

export function getCategoryVendors(slug) {
  return request(`/categories/${slug}/vendors`)
}

export function getVendorVerificationCounts(slug) {
  return request(`/vendors/verified-count/${slug}`)
}
