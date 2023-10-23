import { LoansField } from '@/types/interface'

export const submitCommercialLoans = async (formData: LoansField) => {
  try {
    const res = await fetch('/api/home-loans/commercial-loans', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.log('Error in updating Product (service) =>', error)
  }
}