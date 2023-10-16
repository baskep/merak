import { Dayjs } from 'dayjs'

interface Field {
  amount?: number
  periods?: number
  loanType?: number
  firsthMomth?: Dayjs
  rateType?: number
  rateValue?: number
}

export const submitCommercialLoans = async (formData: Field) => {
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