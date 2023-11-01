import { LoansField } from '@/types/loans-interface'

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
    console.log('error', error)
  }
}